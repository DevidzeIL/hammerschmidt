# UI Audit: Admin Dashboard — shadcn dashboard-01 Style Mismatch

**Дата аудита:** 2024  
**Цель:** Выявить причины расхождения внешнего вида админки с shadcn dashboard-01 demo и составить план исправлений.

---

## 1) Быстрый вывод (TL;DR)

### Главные причины mismatch:

- **Hardcoded цвета вместо design tokens**: Использование `bg-green-100`, `bg-gray-100`, `bg-yellow-500/10`, `text-green-800`, `text-gray-800` вместо semantic tokens (`bg-muted`, `text-muted-foreground`, `bg-accent`, etc.)
- **Кастомные data-slot стили на карточках**: Использование `*:data-[slot=card]:bg-gradient-to-t` и `*:data-[slot=card]:from-primary/5` — нестандартный подход, не из shadcn dashboard-01
- **Отсутствие правильного контейнера/максимальной ширины**: Dashboard страницы не используют `container` или `max-w-*` для ограничения ширины контента
- **Неправильные spacing/padding**: Dashboard использует `gap-4 p-4 lg:p-6`, но может не соответствовать стандартам dashboard-01
- **Hardcoded border на Table wrapper**: `app/admin/products/page.tsx` использует `border rounded-lg` напрямую вместо использования Card компонента
- **Отсутствие правильной структуры layout**: Dashboard не следует структуре dashboard-01 (нет правильного разделения на секции, нет использования правильных компонентов для группировки)

### Самые важные изменения (приоритет):

- **P0**: Заменить все hardcoded цвета на semantic tokens (`bg-green-100` → `bg-muted`, `text-green-800` → `text-foreground`, etc.)
- **P0**: Убрать кастомные data-slot стили с градиентами, использовать стандартные Card стили из shadcn
- **P1**: Добавить правильную структуру layout для dashboard (использовать container, правильные spacing)
- **P1**: Обернуть Table в Card компонент вместо прямого использования `border rounded-lg`
- **P2**: Проверить и унифицировать spacing/padding на всех админ страницах
- **P2**: Убедиться, что все компоненты используют правильные border-radius и shadow из design tokens
- **P3**: Добавить правильную типографику (размеры заголовков, spacing между элементами)

---

## 2) Версии и базовая конфигурация

### Версии:

- **Next.js**: `14.1.0`
- **Tailwind CSS**: `^3.4.1`
- **shadcn/ui**: Не указана явно в package.json (используется через CLI)
- **next-themes**: `^0.2.1` ✅
- **tailwindcss-animate**: `^1.0.7` ✅

### Конфигурация:

- **darkMode**: `["class"]` ✅ (в `tailwind.config.ts`)
- **ThemeProvider**: Используется в `app/admin/providers.tsx` с `attribute="class"` ✅
- **HTML className**: Не применяется напрямую в `app/layout.tsx` (только `suppressHydrationWarning`), но ThemeProvider управляет классом через `attribute="class"` ✅

### Выдержки из конфигурации:

#### `package.json` (релевантные зависимости):
```json
{
  "dependencies": {
    "next": "14.1.0",
    "next-themes": "^0.2.1",
    "tailwind-merge": "^2.2.0",
    "tailwindcss-animate": "^1.0.7",
    "lucide-react": "^0.323.0",
    "clsx": "^2.1.0",
    "class-variance-authority": "^0.7.1"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.1"
  }
}
```

#### `tailwind.config.ts`:
```typescript
{
  darkMode: ["class"],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Все цвета используют oklch(var(--token-name))
        background: 'oklch(var(--background))',
        foreground: 'oklch(var(--foreground))',
        // ... sidebar colors
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
}
```

#### `app/layout.tsx`:
```tsx
<html lang="ru" suppressHydrationWarning>
  <body className={inter.className}>
    <Providers>{children}</Providers>
  </body>
</html>
```

#### `app/admin/providers.tsx`:
```tsx
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  {children}
</ThemeProvider>
```

#### `app/globals.css`:
- CSS variables определены в `:root` и `.dark`
- Используется формат `oklch()` для всех цветов
- `--radius: 0.65rem`
- Все необходимые tokens присутствуют

---

## 3) CSS variables / tokens — сравнение с shadcn default

### Таблица токенов:

| Token name | Current value (:root) | Current value (.dark) | Notes |
|------------|----------------------|----------------------|-------|
| `--background` | `oklch(1 0 0)` | `oklch(0.141 0.005 285.823)` | ✅ OK (белый → темно-серый) |
| `--foreground` | `oklch(0.141 0.005 285.823)` | `oklch(0.985 0 0)` | ✅ OK (темный → светлый) |
| `--card` | `oklch(1 0 0)` | `oklch(0.21 0.006 285.885)` | ✅ OK |
| `--card-foreground` | `oklch(0.141 0.005 285.823)` | `oklch(0.985 0 0)` | ✅ OK |
| `--popover` | `oklch(1 0 0)` | `oklch(0.21 0.006 285.885)` | ✅ OK |
| `--popover-foreground` | `oklch(0.141 0.005 285.823)` | `oklch(0.985 0 0)` | ✅ OK |
| `--primary` | `oklch(0.488 0.243 264.376)` | `oklch(0.488 0.243 264.376)` | ✅ OK (фиолетовый, одинаковый в обеих темах) |
| `--primary-foreground` | `oklch(0.97 0.014 254.604)` | `oklch(0.97 0.014 254.604)` | ✅ OK |
| `--secondary` | `oklch(0.967 0.001 286.375)` | `oklch(0.274 0.006 286.033)` | ✅ OK |
| `--secondary-foreground` | `oklch(0.21 0.006 285.885)` | `oklch(0.985 0 0)` | ✅ OK |
| `--muted` | `oklch(0.967 0.001 286.375)` | `oklch(0.274 0.006 286.033)` | ✅ OK |
| `--muted-foreground` | `oklch(0.552 0.016 285.938)` | `oklch(0.705 0.015 286.067)` | ✅ OK |
| `--accent` | `oklch(0.967 0.001 286.375)` | `oklch(0.274 0.006 286.033)` | ✅ OK |
| `--accent-foreground` | `oklch(0.21 0.006 285.885)` | `oklch(0.985 0 0)` | ✅ OK |
| `--destructive` | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` | ✅ OK (красный) |
| `--border` | `oklch(0.92 0.004 286.32)` | `oklch(1 0 0 / 10%)` | ✅ OK |
| `--input` | `oklch(0.92 0.004 286.32)` | `oklch(1 0 0 / 15%)` | ✅ OK |
| `--ring` | `oklch(0.708 0 0)` | `oklch(0.556 0 0)` | ✅ OK |
| `--radius` | `0.65rem` | `0.65rem` | ✅ OK |

### Проверка dark mode:

- ✅ `.dark` класс применяется через `ThemeProvider` с `attribute="class"`
- ✅ Нет конфликтов с другими темами (нет `.theme-dark`, `.admin-dark`)
- ⚠️ **ПРОБЛЕМА**: В некоторых компонентах используются hardcoded цвета, которые не реагируют на dark mode

### Переопределения в админ-layout:

- ❌ **НЕТ** прямых переопределений типа `bg-zinc-950`, `text-white`, `border-zinc-800` в `app/admin/layout.tsx`
- ✅ Layout использует `SidebarProvider`, `SidebarInset` из shadcn/ui
- ✅ Используются правильные компоненты sidebar

---

## 4) Tailwind usage — есть ли перебивание дизайн-системы

### Найденные проблемы:

#### `app/admin/page.tsx`:
- **Строка 48**: `*:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card`
  - ❌ Кастомные градиенты через data-slot — не из shadcn dashboard-01
  - ❌ Использование `*:` селектора для стилизации всех карточек
  - **Исправление**: Убрать градиенты, использовать стандартные Card стили

- **Строка 131**: `bg-yellow-500/10 text-yellow-600 dark:text-yellow-400`
  - ❌ Hardcoded цвета вместо semantic tokens
  - **Исправление**: Использовать `bg-accent text-accent-foreground` или создать кастомный Badge variant

#### `app/admin/products/page.tsx`:
- **Строка 40**: `<div className="border rounded-lg">`
  - ❌ Прямое использование border вместо Card компонента
  - **Исправление**: Обернуть Table в `<Card>` компонент

- **Строки 70-71**: `bg-green-100 text-green-800` и `bg-gray-100 text-gray-800`
  - ❌ Hardcoded цвета, не работают в dark mode
  - **Исправление**: Использовать `bg-muted text-muted-foreground` или Badge компонент с variants

#### `app/admin/requests/page.tsx`:
- **Строка 38**: `<h1 className="text-3xl font-bold">Заявки</h1>`
  - ⚠️ Использование `text-3xl` напрямую — можно, но лучше проверить соответствие dashboard-01 типографике

#### `app/admin/products/new/page.tsx` и `app/admin/products/[id]/edit/page.tsx`:
- **Строки с `text-destructive`**: ✅ Правильно используют semantic tokens

#### `app/admin/login/page.tsx`:
- **Строка 44**: `bg-muted/50` ✅ Правильно использует semantic token

### Сводка нарушений:

| Файл | Строка | Проблема | Приоритет |
|------|--------|----------|-----------|
| `app/admin/page.tsx` | 48 | Кастомные градиенты через data-slot | P0 |
| `app/admin/page.tsx` | 131 | Hardcoded yellow цвета | P0 |
| `app/admin/products/page.tsx` | 40 | Прямой border вместо Card | P1 |
| `app/admin/products/page.tsx` | 70-71 | Hardcoded green/gray цвета | P0 |

---

## 5) Проблемы layout/spacing

### Текущая структура:

#### `app/admin/layout.tsx`:
```tsx
<SidebarProvider>
  <AdminSidebar />
  <SidebarInset>
    <AdminHeader title={getTitle()} />
    <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
      {children}
    </div>
  </SidebarInset>
</SidebarProvider>
```

**Анализ:**
- ✅ Используется `SidebarProvider` и `SidebarInset` — правильно
- ✅ `flex flex-1 flex-col` — правильная структура
- ⚠️ `gap-4 p-4 lg:p-6` — может не соответствовать dashboard-01 spacing
- ❌ Нет `min-h-screen` на основном контейнере (но может быть не нужно, если SidebarInset уже это делает)

#### `app/admin/page.tsx`:
```tsx
<div className="space-y-6">
  <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 ...">
    {/* Cards */}
  </div>
  <div className="flex gap-4">
    {/* Buttons */}
  </div>
</div>
```

**Анализ:**
- ✅ `space-y-6` — правильный spacing между секциями
- ⚠️ `gap-4` для grid — может быть правильным, но нужно проверить dashboard-01
- ❌ Использование `@xl/main` и `@5xl/main` — это container queries, могут не работать без правильной настройки
- ❌ Кастомные data-slot стили

### Сравнение с dashboard-01:

**Как сейчас:**
- Dashboard контент обернут в `div` с `gap-4 p-4 lg:p-6`
- Cards используют кастомные градиенты через data-slot
- Нет четкого разделения на секции (header, stats, actions)

**Как ожидается по dashboard-01:**
- Dashboard должен использовать стандартные Card компоненты без кастомных градиентов
- Правильная структура: Header → Stats Cards → Charts/Tables → Actions
- Использование `container` или `max-w-*` для ограничения ширины (опционально)
- Правильные spacing между элементами (обычно `gap-6` или `space-y-6`)

### Проблемы:

1. **Нет правильной структуры секций**: Dashboard не разделен на четкие секции
2. **Кастомные градиенты**: Использование data-slot для градиентов не из shadcn
3. **Container queries**: Использование `@xl/main` может не работать без правильной настройки
4. **Spacing**: Нужно проверить соответствие spacing с dashboard-01

---

## 6) Проверка shadcn setup

### Наличие компонентов:

- ✅ `components.json` присутствует и настроен правильно
- ✅ `components/ui/*` — компоненты установлены
- ✅ `lib/utils.ts` — функция `cn` присутствует и использует `clsx` + `tailwind-merge`
- ✅ `tsconfig.json` — paths настроены: `"@/*": ["./*"]`
- ✅ `tailwind.config.ts` — content paths включают `app/**/*.{ts,tsx}` и `components/**/*.{ts,tsx}`
- ✅ `tailwindcss-animate` установлен и подключен в plugins

### Проверка `components.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

**Анализ:**
- ✅ Все настройки корректны
- ✅ `cssVariables: true` — правильно
- ✅ Aliases настроены правильно

### Проверка компонентов UI:

- ✅ `Card` — присутствует, использует правильные классы (`rounded-lg border bg-card text-card-foreground shadow-sm`)
- ✅ `Button` — присутствует
- ✅ `Badge` — присутствует
- ✅ `Table` — присутствует
- ✅ `Sidebar` — присутствует (из dashboard-01)

**Вывод:** shadcn setup корректен, проблемы не в конфигурации, а в использовании компонентов.

---

## 7) Конкретные рекомендации (fix plan)

### P0 (критично): Токены/темизация/dark-mode

#### 1. Заменить hardcoded цвета на semantic tokens

**Файлы:**
- `app/admin/page.tsx`
- `app/admin/products/page.tsx`

**Изменения:**

**`app/admin/page.tsx` (строка 131):**
```diff
- <Badge variant="outline" className="flex gap-1 rounded-lg text-xs bg-yellow-500/10 text-yellow-600 dark:text-yellow-400">
+ <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
  Новые
</Badge>
```
Или создать кастомный variant для "warning" Badge.

**`app/admin/products/page.tsx` (строки 68-75):**
```diff
- <span className={`px-2 py-1 rounded text-xs ${
-   product.isActive
-     ? 'bg-green-100 text-green-800'
-     : 'bg-gray-100 text-gray-800'
- }`}>
+ <Badge variant={product.isActive ? "default" : "secondary"}>
  {product.isActive ? 'Активен' : 'Неактивен'}
- </span>
+ </Badge>
```

#### 2. Убрать кастомные data-slot стили с градиентами

**Файл:** `app/admin/page.tsx` (строка 48)

**Изменение:**
```diff
- <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card">
+ <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
```

И убрать `data-slot="card"` с Card компонентов, или оставить только если это нужно для других целей (но без кастомных стилей).

### P1: Убрать перебивание классов

#### 3. Обернуть Table в Card компонент

**Файл:** `app/admin/products/page.tsx` (строка 40)

**Изменение:**
```diff
- <div className="border rounded-lg">
+ <Card>
  <Table>
    ...
  </Table>
- </div>
+ </Card>
```

**Также проверить:** `app/admin/requests/page.tsx` — возможно там тоже нужен Card wrapper.

### P2: Привести layout к dashboard-01

#### 4. Улучшить структуру dashboard страницы

**Файл:** `app/admin/page.tsx`

**Рекомендации:**
- Добавить четкое разделение на секции
- Использовать правильные spacing
- Убрать container queries, если они не работают
- Использовать стандартные Card стили

**Пример структуры:**
```tsx
<div className="space-y-6">
  {/* Stats Cards */}
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
    {/* Cards без кастомных градиентов */}
  </div>
  
  {/* Actions */}
  <div className="flex gap-4">
    {/* Buttons */}
  </div>
</div>
```

#### 5. Проверить spacing на всех страницах

**Файлы:**
- `app/admin/page.tsx`
- `app/admin/products/page.tsx`
- `app/admin/products/new/page.tsx`
- `app/admin/products/[id]/edit/page.tsx`
- `app/admin/requests/page.tsx`
- `app/admin/requests/[id]/page.tsx`

**Рекомендации:**
- Унифицировать spacing между секциями (`space-y-6` или `gap-6`)
- Проверить padding внутри Card компонентов
- Убедиться, что заголовки имеют правильные отступы

### P3: Визуальные мелочи

#### 6. Проверить border-radius и shadow

**Проверить:**
- Все Card компоненты используют `rounded-lg` (из `--radius`)
- Shadow использует `shadow-sm` (стандарт для Card)
- Badge использует правильный `rounded-lg` или `rounded-md`

#### 7. Типографика

**Проверить:**
- Заголовки используют правильные размеры (`text-2xl`, `text-3xl`)
- Spacing между заголовками и контентом
- Использование `font-semibold` vs `font-bold`

---

## 8) Список файлов для дальнейшего "fix prompt"

### Критичные файлы (P0):

1. `app/admin/page.tsx` — убрать градиенты, заменить hardcoded цвета
2. `app/admin/products/page.tsx` — заменить hardcoded цвета, обернуть Table в Card

### Важные файлы (P1):

3. `app/admin/layout.tsx` — проверить spacing (возможно, не требует изменений)
4. `app/admin/requests/page.tsx` — проверить, нужен ли Card wrapper для Table
5. `app/admin/requests/[id]/page.tsx` — проверить использование semantic tokens

### Дополнительные файлы (P2-P3):

6. `app/admin/products/new/page.tsx` — проверить spacing и типографику
7. `app/admin/products/[id]/edit/page.tsx` — проверить spacing и типографику
8. `components/admin/admin-sidebar.tsx` — проверить, все ли использует semantic tokens
9. `components/admin/admin-header.tsx` — проверить стили
10. `components/ui/card.tsx` — проверить, что стили соответствуют shadcn стандарту

### Файлы для проверки (не требуют изменений, но стоит проверить):

11. `app/globals.css` — CSS variables (уже проверены, все OK)
12. `tailwind.config.ts` — конфигурация (уже проверена, все OK)
13. `components.json` — shadcn конфигурация (уже проверена, все OK)
14. `lib/utils.ts` — функция `cn` (уже проверена, все OK)

---

## Заключение

Основные проблемы:
1. **Hardcoded цвета** вместо semantic tokens (P0)
2. **Кастомные градиенты** через data-slot (P0)
3. **Прямое использование border** вместо Card компонента (P1)
4. **Неправильная структура dashboard** с container queries (P2)

Все проблемы исправимы без изменения базовой конфигурации. shadcn setup корректен, CSS variables настроены правильно, dark mode работает. Проблемы только в использовании компонентов и классов в конкретных файлах.
