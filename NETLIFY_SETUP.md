# Настройка Netlify для деплоя

## Настройки Build settings в Netlify Dashboard

Заполните следующие поля в разделе "Build settings":

### Branch to deploy
```
main
```

### Base directory
```
(оставьте пустым)
```

### Build command
```
pnpm build
```

### Publish directory
```
.next
```

### Functions directory
```
netlify/functions
(или оставьте пустым, если не используете serverless functions)
```

## Переменные окружения

Добавьте в раздел "Environment variables":

```
NEXT_PUBLIC_SITE_URL=https://your-domain.netlify.app
```

(Замените на ваш реальный домен после первого деплоя)

## Важно

- Файл `netlify.toml` уже настроен и автоматически применит эти настройки
- Плагин `@netlify/plugin-nextjs` установлен и автоматически обработает Next.js сборку
- После первого деплоя обновите `NEXT_PUBLIC_SITE_URL` на реальный домен

## Альтернатива: Использование netlify.toml

Если вы используете `netlify.toml`, настройки из интерфейса можно оставить пустыми - файл переопределит их.
