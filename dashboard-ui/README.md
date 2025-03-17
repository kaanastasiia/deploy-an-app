## Pre-installation

 1. Setup `yarn` version 1.22.22 or higher.
 2. Setup Node.js v16

## Clone project

```bash
$ git clone git@otusteam.gitlab.yandexcloud.net:devops/devops-otus-app/dashboard-ui.git
```

 
## Installation

```bash
$  yarn install
```

## Prepare environment


```bash
$  cp .env.example .env
```
  
  Replace values in `.env` according to your connection settings for users-api and documents-api.

  USERS_API_BASE_URL and DOCUMENTS_API_BASE_URL are required

## Build the app

```bash
$  yarn build
```

## Running the app

```bash
$  yarn  start
```

## Check the app

! Don't forget to check that users-api and documents-api are available from environment where you run dashboard-ui

```bash
$ curl {DOCUMENTS_API_BASE_URL}/documents/health-check
```
Successfully configured application return response like:

```json
{
  "configuration":{
    "database_host":"127.0.0.1",
    "database_port":"5432",
    "database_username":"garantme",
    "database_password":"yours_db_password",
    "database_name":"otus_users_db",
    "host":"0.0.0.0",
    "port":"3000"
  },
  "createdDocumentsCount":9
}
```

```bash
$ curl {USERS_API_BASE_URL}/users/health-check
```
Successfully configured application return response like:

```json
{
  "configuration":{
    "database_host":"127.0.0.1",
    "database_port":"5432",
    "database_username":"garantme",
    "database_password":"yours_db_password",
    "database_name":"otus_users_db",
    "host":"0.0.0.0",
    "port":"3000"
  },
  "createdUsersCount":9
}
```

If APIs are not available or something is wrong with .env you will see errors on /users and /documents pages