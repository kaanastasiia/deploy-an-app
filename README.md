Данное приложение предоставлено школой Otus, его деплой осуществяется только с целью обучения.

Для запуска приложения подразумевается наличие файла .env в директории deploy-an-app со следующими переменными:

POSTGRES_USER=some-postgres-user <br />
POSTGRES_PASSWORD=some-postgres-password <br />
POSTGRES_DB=users-api-database-name <br />
POSTGRES_DB2=documents-api-database-name

Запуск приложения производится командой docker compose --env-file .env up -d в директории deploy-an-app.

Так как при создании контейнера postgres возможно создание только одной базы данных, а наш проект
подразумевает создание двух, то был создан дополнительный скрипт database-init-script/init.sql, который будет исполняться при создании контейнера и создавать вторую бд.

Nginx обеспечивает доступность приложения по внешнему ip-адресу и защищает сервисы от необходимости открытия портов в Интернет, поэтому перед разворачиванием приложения в своей инфраструктуре в файле nginx/app.conf необходимо указать внешний ip-адрес сервера, на котором будет деплоиться приложение.
