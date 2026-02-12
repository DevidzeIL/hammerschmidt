# Инструкция по применению миграции для добавления полей согласия

После обновления схемы Prisma необходимо применить миграцию:

```bash
pnpm prisma:migrate
```

Или вручную:

```bash
pnpm prisma migrate dev --name add_consent_fields
```

Это добавит в таблицу `Inquiry` два новых поля:
- `consentAt` (DateTime, nullable) - дата и время получения согласия
- `policyVersion` (String, nullable) - версия политики обработки ПДн

После миграции перезапустите приложение.
