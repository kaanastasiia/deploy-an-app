Данное приложение предоставлено школой Otus, его деплой осуществяется только с целью обучения.

Для запуска приложения подразумевается наличие файла .env в директории deploy-an-app со следующими переменными:

POSTGRES_USER=some-postgres-user <br />
POSTGRES_PASSWORD=some-postgres-password <br />
POSTGRES_DB=users-api-database-name <br />
POSTGRES_DB2=documents-api-database-name

Запуск приложения производится командой docker compose --env-file .env up -d в директории deploy-an-app
