## Быстрый старт с нуля

1. **Требования**  
   - Установлены: `Node.js` (LTS), `pnpm`, Docker Desktop.

2. **Клонировать и зайти в проект**
```bash
git clone <repo-url>
cd project-vet-plast
```

3. **Поднять PostgreSQL в Docker**
```bash
pnpm db:up
```
или
```bash
docker compose -f docker-compose.dev.yml up -d
```

4. **Установить зависимости**
```bash
pnpm install
```

5. **Создать и настроить `.env`**
```bash
cp .env.example .env
```
Минимум проверь:
- `DATABASE_URL=postgresql://vetplast:vetplast123@localhost:5432/vetplast?schema=public`
- `NEXTAUTH_SECRET` (любой сгенерированный секрет)
- `ADMIN_EMAIL` / `ADMIN_PASSWORD`

6. **Миграции и тестовые данные**
```bash
pnpm prisma:generate
pnpm prisma:migrate
pnpm prisma:seed
```

7. **Запуск dev-сервера**
```bash
pnpm dev
```
Открыть: `http://localhost:5000`

---

## Как запускать для разработки

- **Старт БД (если ещё не запущена)**  
```bash
pnpm db:up
```

- **Запуск dev-сервера**  
```bash
pnpm dev
```

- **Применить новые миграции**  
```bash
pnpm prisma:migrate
```

- **Перезаполнить БД с нуля (осторожно, удаляет данные)**  
```bash
pnpm db:reset
pnpm prisma:seed
```

- **Prisma Studio (GUI к БД)**  
```bash
pnpm prisma:studio
```

