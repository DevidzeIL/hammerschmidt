# Telegram Invite Link Flow — Полный Аудит

**Дата создания:** 2025-01-XX  
**Цель:** Диагностика проблемы с подключением Telegram получателей через one-time invite links

---

## A. Current Flow Overview

### Схема шагов (End-to-End Flow)

1. **Админ создаёт инвайт-ссылку:**
   - Админ открывает `/admin/settings/notifications`
   - Нажимает "Добавить получателя" → вводит имя (опционально) → "Сгенерировать ссылку"
   - API `POST /api/admin/telegram/invites` создаёт `TelegramInvite` с токеном (32 байта, base64url)
   - Токен хешируется SHA-256 и сохраняется как `tokenHash`
   - Возвращается URL: `${APP_URL}/admin/settings/notifications/telegram/invite/${token}`

2. **Получатель открывает invite-страницу:**
   - URL: `/admin/settings/notifications/telegram/invite/[token]`
   - Страница показывает инструкцию: отправить `/start <token>` боту
   - Кнопка "Открыть бота" → `https://t.me/${NEXT_PUBLIC_TELEGRAM_BOT_USERNAME}`
   - Кнопка "Проверить подключение" → опрашивает `GET /api/admin/telegram/invites/status?token=<token>`

3. **Получатель отправляет команду боту:**
   - В Telegram: `/start <token>` (или `/start<token>` без пробела)
   - Telegram отправляет webhook на `/api/telegram/webhook`

4. **Webhook обрабатывает команду:**
   - Проверяет `X-Telegram-Bot-Api-Secret-Token` (если `TELEGRAM_WEBHOOK_SECRET` установлен)
   - Парсит `body.message.text`, извлекает токен
   - Хеширует токен SHA-256, ищет `TelegramInvite` по `tokenHash`
   - Проверяет: не истёк (`expiresAt`), не использован (`usedAt === null`)
   - Создаёт/обновляет `TelegramRecipient` по `chatId`
   - Помечает инвайт как использованный (`usedAt = now`, `chatId = chatId`)

5. **Статус обновляется:**
   - Invite page периодически опрашивает `/api/admin/telegram/invites/status`
   - При `status: "used"` показывает успех и данные получателя

### Используемые URL

- **Invite page:** `/admin/settings/notifications/telegram/invite/[token]`
- **API create invite:** `POST /api/admin/telegram/invites`
- **API check status:** `GET /api/admin/telegram/invites/status?token=<token>`
- **Telegram webhook:** `POST /api/telegram/webhook`
- **Debug endpoint:** `GET /api/telegram/webhook/debug` (только development)

---

## B. Environment & Deployment

### Переменные окружения (ENV)

| Ключ | Описание | Обязательность | Пример значения (masked) |
|------|----------|-----------------|--------------------------|
| `TELEGRAM_BOT_TOKEN` | Токен бота от @BotFather | ✅ Обязательно | `123456:ABC-DEF...xyz` |
| `TELEGRAM_WEBHOOK_SECRET` | Секретный токен для защиты webhook | ⚠️ Рекомендуется | `bc26ecc4...c544f` (32+ байта hex) |
| `APP_URL` | Публичный URL приложения | ✅ Обязательно для production | `https://yourdomain.com` или `http://localhost:3000` (dev) |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | Username бота (для ссылок) | ⚠️ Опционально | `VetPlastAlertsBot` |

### Проверка наличия ENV

```typescript
// В коде проверяется:
- process.env.TELEGRAM_BOT_TOKEN (в lib/telegram.ts)
- process.env.TELEGRAM_WEBHOOK_SECRET (в app/api/telegram/webhook/route.ts)
- process.env.APP_URL (в lib/telegram-invite.ts, lib/telegramNotify.ts)
- process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME (в invite page)
```

### Deployment

- **Хостинг:** Не указан (локальная разработка или production)
- **HTTPS:** Требуется для production webhook (Telegram требует HTTPS)
- **Reverse Proxy:** Не указан

---

## C. Telegram Webhook Setup

### Установка Webhook

**Команда для установки:**
```bash
curl -X POST "https://api.telegram.org/bot<BOT_TOKEN>/setWebhook?url=<APP_URL>/api/telegram/webhook&secret_token=<SECRET_TOKEN>"
```

**Проверка webhook:**
```bash
curl "https://api.telegram.org/bot<BOT_TOKEN>/getWebhookInfo"
```

**Текущий статус (из пользовательского запроса):**
```json
{
  "ok": true,
  "result": {
    "url": "",  // ⚠️ ПУСТОЙ — webhook НЕ настроен!
    "has_custom_certificate": false,
    "pending_update_count": 14  // ⚠️ 14 необработанных обновлений
  }
}
```

### Проверка Secret Header

**Код проверки:**
```typescript
// app/api/telegram/webhook/route.ts:14-25
const secretToken = process.env.TELEGRAM_WEBHOOK_SECRET
if (secretToken) {
  const headerSecret = request.headers.get("X-Telegram-Bot-Api-Secret-Token")
  if (headerSecret !== secretToken) {
    console.log("[Telegram Webhook] Invalid secret token")
    return NextResponse.json({ error: "Invalid secret token" }, { status: 401 })
  }
}
```

**Важно:** Если `TELEGRAM_WEBHOOK_SECRET` не установлен, проверка пропускается (не рекомендуется для production).

---

## D. Prisma Models

### TelegramInvite

```prisma
model TelegramInvite {
  id         String   @id @default(cuid())
  tokenHash  String   @unique  // SHA-256 хеш токена (hex)
  label      String?  // Опциональное имя получателя
  expiresAt  DateTime // TTL: 24 часа от создания
  usedAt     DateTime? // null = не использован, Date = использован
  chatId     String?  // chatId получателя (заполняется при использовании)
  createdAt  DateTime @default(now())

  @@index([tokenHash])
  @@index([expiresAt])
}
```

### TelegramRecipient

```prisma
model TelegramRecipient {
  id        String   @id @default(cuid())
  label     String?  // Имя: "Илия", "Менеджер", etc.
  chatId    String   @unique  // Telegram chat.id (String)
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  notificationLogs NotificationLog[]
}
```

### NotificationLog

```prisma
model NotificationLog {
  id           String   @id @default(cuid())
  type         String   // "TELEGRAM_REQUEST_CREATED"
  entityId     String   // requestId
  channel      String   // "telegram"
  status       String   // "SENT" | "FAILED" | "SKIPPED"
  error        String?
  recipientId  String?  // TelegramRecipient.id (nullable)
  createdAt    DateTime @default(now())

  recipient    TelegramRecipient? @relation(fields: [recipientId], references: [id], onDelete: SetNull)

  @@unique([type, entityId, channel, recipientId])
  @@index([type, entityId, channel, recipientId])
}
```

---

## E. API: Invite Create

### Endpoint

**Путь:** `POST /api/admin/telegram/invites`  
**Auth:** Требуется NextAuth session (admin)  
**Body:**
```json
{
  "label": "Илия" // опционально
}
```

**Response (200):**
```json
{
  "url": "https://yourdomain.com/admin/settings/notifications/telegram/invite/51McL-u-qUFgKeUfWAYMn_RZdxCAG60w0lDAO1rx8IQ",
  "token": "51McL-u-qUFgKeUfWAYMn_RZdxCAG60w0lDAO1rx8IQ", // только один раз!
  "expiresAt": "2025-01-XXTXX:XX:XX.XXXZ"
}
```

### Код Handler

```typescript
// app/api/admin/telegram/invites/route.ts

export async function POST(request: NextRequest) {
  // 1. Проверка auth
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  // 2. Генерация токена
  const token = generateInviteToken() // 32 байта → base64url
  const tokenHash = hashToken(token)  // SHA-256 → hex

  // 3. TTL: 24 часа
  const expiresAt = new Date()
  expiresAt.setHours(expiresAt.getHours() + 24)

  // 4. Сохранение в БД
  await prisma.telegramInvite.create({
    data: { tokenHash, label: label || null, expiresAt },
  })

  // 5. Формирование URL
  const url = createInviteUrl(token) // `${APP_URL}/admin/settings/notifications/telegram/invite/${token}`

  return NextResponse.json({ url, token, expiresAt: expiresAt.toISOString() })
}
```

### Генерация токена

```typescript
// lib/telegram-invite.ts

export function generateInviteToken(): string {
  const bytes = crypto.randomBytes(32) // 32 байта
  return bytes.toString('base64url')   // base64url encoding (URL-safe)
}

export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex') // SHA-256 → hex
}
```

**Важно:**
- Токен: **32 байта → base64url** (URL-safe, без `+`, `/`, `=`)
- Хеш: **SHA-256 → hex** (64 символа)
- TTL: **24 часа**

---

## F. API: Invite Status

### Endpoint

**Путь:** `GET /api/admin/telegram/invites/status?token=<token>`  
**Auth:** Требуется NextAuth session (admin)  
**Query Params:** `token` (обязательно)

**Response (200):**
```json
// pending
{
  "status": "pending",
  "existingRecipientsCount": 0
}

// used
{
  "status": "used",
  "recipient": {
    "id": "...",
    "label": "Илия",
    "chatId": "277668379",
    "isActive": true
  }
}

// expired
{
  "status": "expired"
}

// not_found
{
  "status": "not_found"
}
```

### Код Handler

```typescript
// app/api/admin/telegram/invites/status/route.ts

export async function GET(request: NextRequest) {
  // 1. Auth check
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  // 2. Извлечение token из query
  const token = searchParams.get('token')
  if (!token) return NextResponse.json({ error: "Token is required" }, { status: 400 })

  // 3. Хеширование и поиск
  const tokenHash = hashToken(token)
  console.log(`[Invite Status] Checking token hash: ${tokenHash.substring(0, 16)}...`)
  
  const invite = await prisma.telegramInvite.findUnique({
    where: { tokenHash },
  })

  if (!invite) {
    console.log(`[Invite Status] Invite not found for hash: ${tokenHash.substring(0, 16)}...`)
    return NextResponse.json({ status: "not_found" })
  }

  console.log(`[Invite Status] Found invite: ${invite.id}, expiresAt: ${invite.expiresAt}, usedAt: ${invite.usedAt || 'null'}`)

  const now = new Date()

  // 4. Проверка истечения
  if (invite.expiresAt < now) {
    return NextResponse.json({ status: "expired" })
  }

  // 5. Проверка использования
  if (invite.usedAt) {
    const recipient = invite.chatId
      ? await prisma.telegramRecipient.findUnique({ where: { chatId: invite.chatId } })
      : null

    return NextResponse.json({
      status: "used",
      recipient: recipient ? { id, label, chatId, isActive } : null,
    })
  }

  // 6. pending
  return NextResponse.json({
    status: "pending",
    existingRecipientsCount: (await prisma.telegramRecipient.findMany({ take: 10 })).length,
  })
}
```

---

## G. Page: Invite UI

### Путь

`app/admin/settings/notifications/telegram/invite/[token]/page.tsx`

### Код Page (Client Component)

```typescript
'use client'

export default function TelegramInvitePage() {
  const params = useParams()
  const token = params.token as string // Из URL: /invite/[token]
  
  const botUsername = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || 'VetPlastAlertsBot'
  const botUrl = `https://t.me/${botUsername}`

  // Проверка статуса при загрузке и по кнопке
  const checkStatus = async () => {
    const response = await fetch(`/api/admin/telegram/invites/status?token=${encodeURIComponent(token)}`)
    const data = await response.json()
    setStatus(data.status)
    if (data.recipient) setRecipient(data.recipient)
  }

  // UI показывает:
  // - Инструкцию: отправить `/start {token}` боту
  // - Кнопку "Открыть бота" → t.me/VetPlastAlertsBot
  // - Кнопку "Проверить подключение" → checkStatus()
  // - Статус: pending/used/expired/not_found
}
```

### Формирование команды `/start <token>`

**В UI отображается:**
```html
<code>/start {token}</code>
```

**Где `token` — это параметр из URL (`params.token`).**

**Важно:** Пользователь должен **вручную скопировать** команду и отправить боту. Нет автоматической отправки.

### Ссылки на бота

- **Кнопка "Открыть бота":** `https://t.me/${NEXT_PUBLIC_TELEGRAM_BOT_USERNAME}`
- **Fallback:** `VetPlastAlertsBot` (если env не установлен)

---

## H. Telegram Webhook Handler

### Endpoint

**Путь:** `POST /api/telegram/webhook`  
**Auth:** Нет (публичный endpoint, защищён только `TELEGRAM_WEBHOOK_SECRET` header)  
**Middleware:** Не защищён `middleware.ts` (только `/admin/*`)

### Полный код Handler

```typescript
// app/api/telegram/webhook/route.ts

export async function POST(request: NextRequest) {
  try {
    console.log("[Telegram Webhook] Received request")
    
    // 1. Проверка secret token (если установлен)
    const secretToken = process.env.TELEGRAM_WEBHOOK_SECRET
    if (secretToken) {
      const headerSecret = request.headers.get("X-Telegram-Bot-Api-Secret-Token")
      if (headerSecret !== secretToken) {
        console.log("[Telegram Webhook] Invalid secret token")
        return NextResponse.json({ error: "Invalid secret token" }, { status: 401 })
      }
    }

    // 2. Парсинг body
    const body = await request.json()
    console.log("[Telegram Webhook] Body:", JSON.stringify(body, null, 2))
    
    const message = body.message

    // 3. Проверка типа сообщения
    if (!message || !message.text || !message.chat) {
      console.log("[Telegram Webhook] Not a text message or missing chat")
      return NextResponse.json({ ok: true })
    }

    const text = message.text.trim()
    const chatId = String(message.chat.id)
    
    console.log(`[Telegram Webhook] Message text: "${text}", chatId: ${chatId}`)

    // 4. Извлечение токена из команды
    let token: string | null = null
    
    if (text.startsWith("/start ")) {
      token = text.substring(7).trim() // Убираем "/start "
    } else if (text.startsWith("/start")) {
      // Обрабатываем случай, когда нет пробела: /start<token>
      token = text.substring(6).trim()
    }
    
    if (!token || token.length === 0) {
      console.log("[Telegram Webhook] No token found in command")
      return NextResponse.json({ ok: true })
    }
    
    console.log(`[Telegram Webhook] Extracted token: ${token.substring(0, 10)}...`)

    // 5. Хеширование и поиск инвайта
    const tokenHash = hashToken(token)
    console.log(`[Telegram Webhook] Token hash: ${tokenHash.substring(0, 16)}...`)
    
    const invite = await prisma.telegramInvite.findUnique({
      where: { tokenHash },
    })

    if (!invite) {
      console.log(`[Telegram Webhook] Invite not found for token hash: ${tokenHash.substring(0, 16)}...`)
      // Debug: показываем последние 5 инвайтов
      const allInvites = await prisma.telegramInvite.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      })
      console.log(`[Telegram Webhook] Recent invites count: ${allInvites.length}`)
      return NextResponse.json({ ok: true })
    }
    
    console.log(`[Telegram Webhook] Found invite: ${invite.id}, expiresAt: ${invite.expiresAt}, usedAt: ${invite.usedAt}`)

    const now = new Date()

    // 6. Проверка истечения
    if (invite.expiresAt < now) {
      console.log(`[Telegram Webhook] Invite expired: ${invite.id}`)
      return NextResponse.json({ ok: true })
    }

    // 7. Проверка использования
    if (invite.usedAt) {
      console.log(`[Telegram Webhook] Invite already used: ${invite.id}`)
      return NextResponse.json({ ok: true })
    }

    // 8. Формирование label
    const username = message.chat.username
    const firstName = message.chat.first_name
    const lastName = message.chat.last_name
    const label =
      invite.label ||
      [firstName, lastName].filter(Boolean).join(" ") ||
      username ||
      `Chat ${chatId}`

    // 9. Создание/обновление получателя
    const recipient = await prisma.telegramRecipient.upsert({
      where: { chatId },
      create: { chatId, label, isActive: true },
      update: { label, isActive: true },
    })

    // 10. Помечаем инвайт как использованный
    await prisma.telegramInvite.update({
      where: { id: invite.id },
      data: { usedAt: now, chatId },
    })

    console.log(`[Telegram Webhook] ✅ SUCCESS: Recipient connected: ${recipient.id} (${label}, chatId: ${chatId})`)
    console.log(`[Telegram Webhook] Invite ${invite.id} marked as used`)

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[Telegram Webhook] Error processing webhook:", error)
    // Всегда возвращаем 200, чтобы Telegram не повторял запрос
    return NextResponse.json({ ok: true })
  }
}
```

### Парсинг сообщения

**Ожидаемые форматы:**
- `/start <token>` (с пробелом)
- `/start<token>` (без пробела)

**Извлечение:**
```typescript
if (text.startsWith("/start ")) {
  token = text.substring(7).trim()
} else if (text.startsWith("/start")) {
  token = text.substring(6).trim()
}
```

**Важно:** После извлечения применяется `.trim()` для удаления пробелов.

### Источники данных из Telegram

- **chat.id:** `message.chat.id` → `String(chatId)`
- **username:** `message.chat.username` (может быть `null`)
- **first_name:** `message.chat.first_name` (может быть `null`)
- **last_name:** `message.chat.last_name` (может быть `null`)

### Запись в БД

1. **TelegramRecipient.upsert:**
   - `where: { chatId }` (unique)
   - `create: { chatId, label, isActive: true }`
   - `update: { label, isActive: true }` (активирует при повторном подключении)

2. **TelegramInvite.update:**
   - `usedAt = now`
   - `chatId = chatId` (для связи)

---

## I. Logs & Symptoms

### Текущая проблема

**Симптом:** Отправка `/start <token>` боту не приводит к подключению, статус остаётся "ожидайте подключения" (pending).

### Известные факты

1. **Webhook не настроен:**
   - `getWebhookInfo` возвращает `url: ""` (пустой)
   - `pending_update_count: 14` (14 необработанных обновлений)

2. **Логи сервера:**
   - Не указаны (нужно проверить после настройки webhook)

3. **HTTP статусы:**
   - Webhook всегда возвращает `200 OK` (даже при ошибках, чтобы Telegram не повторял)

### Потенциальные причины

1. **Webhook не установлен** → Telegram не отправляет запросы на сервер
2. **URL не публичный** → Telegram не может достучаться до `localhost`
3. **Secret token mismatch** → Webhook отклоняется с `401`
4. **Token hash mismatch** → Инвайт не находится в БД
5. **Invite expired** → Инвайт истёк до использования
6. **Invite already used** → Инвайт уже использован
7. **Token URL encoding** → Токен повреждён при передаче в URL
8. **Timezone issue** → `expiresAt` сравнивается с неправильным временем

### Логи для диагностики

**В webhook handler уже есть:**
- `[Telegram Webhook] Received request`
- `[Telegram Webhook] Body: ...`
- `[Telegram Webhook] Message text: "...", chatId: ...`
- `[Telegram Webhook] Extracted token: ...`
- `[Telegram Webhook] Token hash: ...`
- `[Telegram Webhook] Found invite: ...` или `Invite not found`
- `[Telegram Webhook] ✅ SUCCESS: ...` или ошибки

**В status handler добавлено:**
- `[Invite Status] Checking token hash: ...`
- `[Invite Status] Found invite: ...` или `Invite not found`

---

## J. Quick Checks (Diagnostic Checklist)

### ✅ Чеклист быстрых проверок

- [ ] **Telegram webhook установлен на правильный URL?**
  - Проверить: `curl "https://api.telegram.org/bot<BOT_TOKEN>/getWebhookInfo"`
  - Должно быть: `"url": "https://yourdomain.com/api/telegram/webhook"`

- [ ] **URL публичный и HTTPS?**
  - Для production: обязательно HTTPS
  - Для локальной разработки: использовать ngrok или аналогичный сервис

- [ ] **Route `/api/telegram/webhook` доступен без auth?**
  - Проверить: `middleware.ts` не блокирует `/api/telegram/webhook`
  - ✅ Подтверждено: `middleware.ts` защищает только `/admin/*`

- [ ] **Secret token header совпадает?**
  - Проверить: `TELEGRAM_WEBHOOK_SECRET` в `.env` совпадает с `secret_token` в `setWebhook`
  - Если не установлен: проверка пропускается (не рекомендуется для production)

- [ ] **Token hash совпадает (sha256 base64url → hex)?**
  - Проверить: токен из URL хешируется как `crypto.createHash('sha256').update(token).digest('hex')`
  - В БД хранится hex (64 символа)

- [ ] **Token URL-encoding не ломает base64url?**
  - Проверить: токен в URL не содержит `+`, `/`, `=` (base64url безопасен)
  - Next.js `useParams()` должен корректно декодировать

- [ ] **`/start` message приходит с правильным payload?**
  - Проверить логи: `[Telegram Webhook] Message text: "..."`
  - Формат: `/start <token>` или `/start<token>`

- [ ] **Invite page не режет token (trailing spaces)?**
  - Проверить: `params.token` в invite page не обрезан
  - В коде: `token = text.substring(7).trim()` (удаляет пробелы)

- [ ] **Invite истёк (`expiresAt`) раньше времени?**
  - Проверить: `invite.expiresAt < now` в webhook handler
  - TTL: 24 часа от создания

- [ ] **Timezone issue?**
  - Проверить: серверное время совпадает с UTC
  - В коде: `new Date()` использует системное время сервера

- [ ] **Pending updates обработаны?**
  - Если `pending_update_count > 0`: обработать через `getUpdates` или дождаться webhook

---

## K. Debug Endpoints

### GET /api/telegram/webhook/debug

**Доступ:** Только в `NODE_ENV !== "production"`

**Response:**
```json
{
  "recipients": [
    {
      "id": "...",
      "chatId": "277668379",
      "label": "Илия",
      "isActive": true,
      "createdAt": "2025-01-XXTXX:XX:XX.XXXZ"
    }
  ],
  "invites": [
    {
      "id": "...",
      "tokenHash": "bc26ecc444bad9...",
      "label": "Илия",
      "expiresAt": "2025-01-XXTXX:XX:XX.XXXZ",
      "usedAt": null,
      "chatId": null,
      "createdAt": "2025-01-XXTXX:XX:XX.XXXZ"
    }
  ],
  "webhookSecretConfigured": true,
  "botTokenConfigured": true
}
```

**Использование:**
```bash
curl http://localhost:3000/api/telegram/webhook/debug
```

---

## L. Temporary Debug Logs

### Добавленные логи (временные, для диагностики)

**В `app/api/admin/telegram/invites/status/route.ts`:**
```typescript
console.log(`[Invite Status] Checking token hash: ${tokenHash.substring(0, 16)}...`)
console.log(`[Invite Status] Found invite: ${invite.id}, expiresAt: ${invite.expiresAt}, usedAt: ${invite.usedAt || 'null'}`)
```

**В `app/api/telegram/webhook/route.ts` (уже были):**
- Все логи помечены префиксом `[Telegram Webhook]`
- Токены логируются частично (первые 10 символов)
- Хеши логируются частично (первые 16 символов)

**Важно:** После диагностики эти логи можно оставить или удалить по необходимости.

---

## M. Related Files

### Полные пути к файлам

1. **API Routes:**
   - `app/api/admin/telegram/invites/route.ts` — создание инвайта
   - `app/api/admin/telegram/invites/status/route.ts` — проверка статуса
   - `app/api/admin/telegram/recipients/route.ts` — список получателей
   - `app/api/admin/telegram/recipients/[id]/route.ts` — обновление/удаление получателя
   - `app/api/telegram/webhook/route.ts` — обработка webhook
   - `app/api/telegram/webhook/debug/route.ts` — debug endpoint

2. **Pages:**
   - `app/admin/settings/notifications/telegram/invite/[token]/page.tsx` — invite page

3. **Lib:**
   - `lib/telegram-invite.ts` — генерация токена, хеширование, создание URL
   - `lib/telegram.ts` — отправка сообщений в Telegram
   - `lib/telegramNotify.ts` — уведомления о новых заявках
   - `lib/telegramFormat.ts` — форматирование сообщений

4. **Components:**
   - `components/admin/telegram-recipients.tsx` — UI управления получателями

5. **Schema:**
   - `prisma/schema.prisma` — модели `TelegramInvite`, `TelegramRecipient`, `NotificationLog`

6. **Middleware:**
   - `middleware.ts` — защита `/admin/*` (не блокирует `/api/telegram/webhook`)

---

## N. Next Steps for Debugging

### Рекомендуемый порядок действий

1. **Установить webhook:**
   ```bash
   curl -X POST "https://api.telegram.org/bot<BOT_TOKEN>/setWebhook?url=<APP_URL>/api/telegram/webhook&secret_token=<SECRET_TOKEN>"
   ```

2. **Проверить webhook:**
   ```bash
   curl "https://api.telegram.org/bot<BOT_TOKEN>/getWebhookInfo"
   ```
   Должно вернуть: `"url": "https://yourdomain.com/api/telegram/webhook"`, `"pending_update_count": 0`

3. **Создать новый инвайт:**
   - Открыть `/admin/settings/notifications`
   - Сгенерировать новую ссылку
   - Скопировать токен из URL

4. **Отправить команду боту:**
   - Открыть бота в Telegram
   - Отправить: `/start <token>`

5. **Проверить логи сервера:**
   - Должны появиться логи `[Telegram Webhook]`
   - Проверить: токен извлечён? хеш вычислен? инвайт найден?

6. **Проверить статус:**
   - На invite page нажать "Проверить подключение"
   - Должен вернуться `status: "used"` с данными получателя

7. **Проверить debug endpoint:**
   ```bash
   curl http://localhost:3000/api/telegram/webhook/debug
   ```
   Должен показать получателя в списке `recipients`

---

## O. Known Issues & Workarounds

### Известные проблемы

1. **Webhook не настроен:**
   - **Симптом:** `getWebhookInfo` возвращает `url: ""`
   - **Решение:** Установить webhook через `setWebhook` API

2. **Pending updates:**
   - **Симптом:** `pending_update_count: 14`
   - **Решение:** После установки webhook, обработать через `getUpdates` или дождаться новых обновлений

3. **Localhost не работает:**
   - **Симптом:** Telegram не может достучаться до `http://localhost:3000`
   - **Решение:** Использовать ngrok или аналогичный сервис для локальной разработки

---

## P. Summary

### Текущее состояние

- ✅ **Код реализован:** Все endpoints и UI компоненты на месте
- ✅ **Логи добавлены:** Достаточно логов для диагностики
- ⚠️ **Webhook не настроен:** Это основная причина проблемы
- ⚠️ **Pending updates:** 14 необработанных обновлений

### Критический путь для исправления

1. Установить webhook через `setWebhook` API
2. Проверить, что `APP_URL` публичный и HTTPS (для production)
3. Убедиться, что `TELEGRAM_WEBHOOK_SECRET` совпадает в `.env` и `setWebhook`
4. Создать новый инвайт и протестировать подключение
5. Проверить логи сервера при отправке `/start <token>`

---

**Конец аудита.**
