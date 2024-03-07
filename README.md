## Description

Star Wars API.

The project was created for learning purposes. Based on the principles of "REST," the goal of the project is to apply "
CRUD" operations and connect all Star Wars entities together. "TypeOrm" is used for working with the database.

## Installation

```bash
$ npm install
```

## Database configuration

In this project, you'll need to use the MySQL database. Set up your credentials in the "ormconfig.js" file. After that, you'll need to add two databases. The first one should be named "Star_Wars" and the second one should be named "Test_Star_Wars".

## Running migrations

Before starting the app, you need to run migrations.

```
NODE_ENV=development npm run typeorm migration:run -- -d ./ormconfig.js,
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Open Swagger

To access Swagger, go to this link: http://localhost:3000/. To do CRUD operations, first log in to the app. Look for the "Users" section and go to the "/signin" route. There, you can log in either as an "admin" or as a regular "user" with read-only permission.


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

## Stay in touch

- Author - Dan Berezin
- Mail - bogdanlinee@gmail.com
- Telegram - @bogdanlinee

## License

Nest is [MIT licensed](LICENSE).
