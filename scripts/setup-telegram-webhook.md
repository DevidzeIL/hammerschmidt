# Настройка Telegram Webhook

## Быстрая настройка

1. **Сгенерируйте secret token** (если еще не сделали):
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Добавьте в `.env`:**
   ```env
   TELEGRAM_BOT_TOKEN=your_bot_token
   TELEGRAM_WEBHOOK_SECRET=your_generated_secret_token
   APP_URL=https://yourdomain.com  # или http://localhost:3000 для локальной разработки
   ```

3. **Установите webhook:**

   **Для production:**
   ```bash
   curl -X POST "https://api.telegram.org/bot<BOT_TOKEN>/setWebhook?url=<APP_URL>/api/telegram/webhook&secret_token=<SECRET_TOKEN>"
   ```

   **Для локальной разработки (с ngrok):**
   ```bash
   # 1. Запустите ngrok
   ngrok http 3000
   
   # 2. Используйте ngrok URL
   curl -X POST "https://api.telegram.org/bot<BOT_TOKEN>/setWebhook?url=https://<ngrok-url>/api/telegram/webhook&secret_token=<SECRET_TOKEN>"
   ```

4. **Проверьте webhook:**
   ```bash
   curl "https://api.telegram.org/bot<BOT_TOKEN>/getWebhookInfo"
   ```

   Должно вернуть:
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

5. **Обработайте pending updates:**
   Если `pending_update_count > 0`, можно обработать их:
   ```bash
   curl -X POST "https://api.telegram.org/bot<BOT_TOKEN>/getUpdates?offset=-1"
   ```

## Важно

- `APP_URL` должен быть публично доступен (не localhost для production)
- `secret_token` в URL должен совпадать с `TELEGRAM_WEBHOOK_SECRET` в `.env`
- После настройки webhook, отправьте боту `/start <token>` и проверьте логи сервера
