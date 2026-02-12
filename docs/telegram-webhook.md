# Настройка Telegram Webhook

Этот документ описывает, как настроить webhook для Telegram бота, чтобы получать обновления о подключении получателей уведомлений.

## Предварительные требования

1. **Telegram Bot Token** — получен через [@BotFather](https://t.me/BotFather)
2. **APP_URL** — публичный URL вашего приложения (обязателен для production)
3. **TELEGRAM_WEBHOOK_SECRET** (опционально) — секретный токен для защиты webhook

## Настройка Webhook

### 1. Автоматическая установка Webhook (Рекомендуется)

**Через админ-панель:**
1. Откройте `/admin/settings/notifications`
2. Включите "Telegram уведомления"
3. В блоке "Статус Telegram Webhook" нажмите "Настроить webhook"
4. Система автоматически установит webhook с правильными параметрами

**Что делает автонастройка:**
- Проверяет наличие `TELEGRAM_BOT_TOKEN` и `APP_URL`
- Проверяет, что в production используется HTTPS
- Формирует правильный URL webhook
- Устанавливает webhook через Telegram API
- Показывает статус и предупреждения

### 2. Ручная установка Webhook (Альтернатива)

Если нужно установить вручную через curl:

```bash
curl -X POST "https://api.telegram.org/bot<BOT_TOKEN>/setWebhook?url=<APP_URL>/api/telegram/webhook&secret_token=<SECRET_TOKEN>"
```

**Пример:**
```bash
curl -X POST "https://api.telegram.org/bot123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11/setWebhook?url=https://yourdomain.com/api/telegram/webhook&secret_token=bc26ecc444bad92054f408c8520d9a715a68dcbcba94172472c04d9e214c544f"
```

**Важно:** 
- `secret_token` должен совпадать с `TELEGRAM_WEBHOOK_SECRET` в вашем `.env`
- Если вы не используете secret token, просто не указывайте параметр `secret_token` в URL

### 3. Проверка Webhook

**Через админ-панель:**
- Откройте `/admin/settings/notifications`
- В блоке "Статус Telegram Webhook" нажмите "Обновить"
- Вы увидите текущий статус, URL, количество pending updates и ошибки

**Через API:**
```bash
curl "https://api.telegram.org/bot<BOT_TOKEN>/getWebhookInfo"
```

**Ожидаемый ответ:**
```json
{
  "ok": true,
  "result": {
    "url": "https://yourdomain.com/api/telegram/webhook",
    "has_custom_certificate": false,
    "pending_update_count": 0
  }
}
```

### 3. Генерация Secret Token

`TELEGRAM_WEBHOOK_SECRET` — это секретный токен для защиты webhook от несанкционированного доступа. 

**Сгенерировать токен можно несколькими способами:**

1. **Через Node.js:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Через OpenSSL:**
   ```bash
   openssl rand -hex 32
   ```

3. **Или используйте любой генератор случайных строк (минимум 32 символа)**

**Пример сгенерированного токена:**
```
bc26ecc444bad92054f408c8520d9a715a68dcbcba94172472c04d9e214c544f
```

### 4. Переменные окружения

Добавьте в `.env`:

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_WEBHOOK_SECRET=bc26ecc444bad92054f408c8520d9a715a68dcbcba94172472c04d9e214c544f  # Сгенерированный токен
APP_URL=https://yourdomain.com  # Обязательно для production
NEXT_PUBLIC_TELEGRAM_BOT_USERNAME=YourBotName  # Для ссылок на бота
```

**Важно:** 
- Если `TELEGRAM_WEBHOOK_SECRET` не установлен, webhook будет работать без проверки (не рекомендуется для production)
- Токен должен совпадать с тем, который вы указали при установке webhook через `setWebhook`

## Локальная разработка

Для локальной разработки нужно создать публичный URL, так как Telegram не может достучаться до `localhost`.

### Вариант 1: ngrok (Рекомендуется)

1. Установите [ngrok](https://ngrok.com/)
2. Запустите туннель:
   ```bash
   ngrok http 3000
   ```
3. Скопируйте HTTPS URL (например: `https://abc123.ngrok-free.app`)
4. Установите в `.env`:
   ```env
   APP_URL=https://abc123.ngrok-free.app
   ```
5. В админ-панели нажмите "Настроить webhook"

### Вариант 2: cloudflared

1. Установите [cloudflared](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/)
2. Запустите туннель:
   ```bash
   cloudflared tunnel --url http://localhost:3000
   ```
3. Используйте полученный URL в `APP_URL`

### Вариант 3: Другие туннели

Можно использовать любой сервис, который создаёт публичный HTTPS URL для localhost:
- [localtunnel](https://localtunnel.github.io/www/)
- [serveo](https://serveo.net/)
- И другие

**Важно:** Telegram требует HTTPS для webhook, поэтому `http://localhost:3000` не будет работать.

## Как это работает

### Публичный Invite Flow

1. **Админ создаёт инвайт-ссылку:**
   - В админ-панели: `/admin/settings/notifications`
   - Нажимает "Добавить получателя" → "Сгенерировать ссылку"
   - Получает публичную ссылку: `https://yourdomain.com/telegram/invite/<token>`

2. **Получатель открывает ссылку:**
   - Открывает публичную страницу (не требует авторизации)
   - Видит инструкцию и кнопку "Открыть бота и подключить"
   - Нажимает кнопку → открывается Telegram с deep-link: `https://t.me/BotName?start=<token>`

3. **Telegram обрабатывает deep-link:**
   - Автоматически отправляет команду `/start <token>` боту
   - Пользователю не нужно вручную копировать команду

4. **Webhook получает обновление:**
   - Telegram отправляет POST на `/api/telegram/webhook`
   - Система проверяет secret token (если настроен)
   - Извлекает токен из команды `/start <token>`

5. **Обработка подключения:**
   - Хеширует токен и ищет инвайт в БД
   - Проверяет: не истёк, не использован
   - Создаёт/обновляет получателя по `chatId`
   - Помечает инвайт как использованный
   - Отправляет подтверждение пользователю в Telegram

6. **Статус обновляется:**
   - Invite page периодически проверяет статус через `/api/telegram/invites/status`
   - При успешном подключении показывает "Подключено"

7. **Уведомления:**
   - При создании новой заявки система отправляет уведомления всем активным получателям

## Безопасность

- **Secret Token**: Используйте `TELEGRAM_WEBHOOK_SECRET` для защиты webhook от несанкционированного доступа
- **Токены инвайтов**: Хранятся только в виде SHA-256 хеша, одноразовые, с TTL 24 часа
- **Валидация**: Все входящие запросы проверяются на корректность формата

## Отладка

### Проверка состояния (только development)

Откройте в браузере:
```
http://localhost:3000/api/telegram/webhook/debug
```

Это покажет:
- Список всех получателей
- Список всех инвайтов
- Настроены ли переменные окружения

### Проверка логов

Смотрите логи сервера для отладки:
- Получение запроса: `[Telegram Webhook] Received request`
- Текст сообщения: `[Telegram Webhook] Message text: "...", chatId: ...`
- Извлеченный токен: `[Telegram Webhook] Extracted token: ...`
- Хеш токена: `[Telegram Webhook] Token hash: ...`
- Найденный инвайт: `[Telegram Webhook] Found invite: ...`
- Успешные подключения: `[Telegram Webhook] ✅ SUCCESS: Recipient connected: ...`
- Ошибки: `[Telegram Webhook] Error processing webhook: ...`

### Тестирование вручную

Можно протестировать webhook напрямую:

```bash
curl -X POST "https://yourdomain.com/api/telegram/webhook" \
  -H "Content-Type: application/json" \
  -H "X-Telegram-Bot-Api-Secret-Token: your_secret_token" \
  -d '{
    "message": {
      "text": "/start test_token_here",
      "chat": {
        "id": 123456789,
        "first_name": "Test",
        "username": "testuser"
      }
    }
  }'
```

## Обработка Pending Updates

Если до установки webhook накопились необработанные обновления (например, пользователи уже отправляли `/start` команды), их можно обработать:

**Через админ-панель:**
1. Откройте `/admin/settings/notifications`
2. В блоке "Статус Telegram Webhook" увидите количество pending updates
3. Нажмите "Вытащить pending updates"
4. Система обработает все накопленные обновления

**Что происходит:**
- Система вызывает `getUpdates` API для получения всех pending updates
- Каждое обновление обрабатывается той же логикой, что и webhook
- После обработки offset сохраняется в БД
- Можно запускать несколько раз, пока pending updates не закончатся

## Устранение проблем

### Webhook не получает обновления

1. **Проверьте статус в админ-панели:**
   - Откройте `/admin/settings/notifications`
   - В блоке "Статус Telegram Webhook" проверьте:
     - URL установлен?
     - Есть ли pending updates?
     - Есть ли ошибки?

2. **Проверьте конфигурацию:**
   - `TELEGRAM_BOT_TOKEN` установлен?
   - `APP_URL` публичный и HTTPS (в production)?
   - `TELEGRAM_WEBHOOK_SECRET` совпадает с тем, что в `setWebhook`?

3. **Проверьте доступность:**
   - URL должен быть доступен извне (не localhost без туннеля)
   - В production обязательно HTTPS

4. **Проверьте логи сервера:**
   - Должны появляться логи `[Telegram Webhook] Received request`
   - Если логов нет → webhook не настроен или Telegram не может достучаться

### Получатель не подключается

1. **Проверьте webhook:**
   - В админ-панели проверьте статус webhook
   - Если webhook не настроен → нажмите "Настроить webhook"
   - Если есть pending updates → нажмите "Вытащить pending updates"

2. **Проверьте invite-ссылку:**
   - Откройте ссылку в браузере (должна быть публичной, не требовать авторизацию)
   - Проверьте статус на странице: pending/used/expired/not_found
   - Если expired → создайте новую ссылку

3. **Проверьте deep-link:**
   - Кнопка "Открыть бота и подключить" должна открывать Telegram с правильным токеном
   - Формат: `https://t.me/BotName?start=<token>`
   - Telegram автоматически отправит `/start <token>` боту

4. **Проверьте логи webhook:**
   - После отправки команды боту проверьте логи сервера:
     - `[Telegram Webhook] Received request` — запрос получен?
     - `[Telegram Handler] Extracted token: ...` — токен извлечён?
     - `[Telegram Handler] Token hash: ...` — хеш вычислен?
     - `[Telegram Handler] Found invite: ...` — инвайт найден?
     - `[Telegram Handler] ✅ SUCCESS` — успешное подключение?

5. **Проверьте токен инвайта:**
   - Токен не истёк (TTL 24 часа)
   - Токен не был использован ранее
   - Формат команды поддерживается: `/start <token>`, `/start<token>`, deep-link payload

6. **Если получатель уже существует:**
   - Webhook должен обновить получателя и пометить инвайт как использованный
   - Это не должно блокировать подключение
   - Проверьте в админ-панели список получателей

### Уведомления не отправляются

1. Проверьте, что получатель активен (`isActive: true`)
2. Проверьте, что `TELEGRAM_BOT_TOKEN` установлен
3. Проверьте логи отправки уведомлений
4. Убедитесь, что бот не заблокирован получателем
