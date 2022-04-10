# Storefront Backend Project

# Getting started

Before you start you need to create a `.env` file that contains the required environment variables:

```
POSTGRES_HOST={your host}
POSTGRES_DB={your dev database name}
POSTGRES_TEST_DB={your test database name}
POSTGRES_USER={your databse user}
POSTGRES_PASSWORD={your database password}
ENV=dev
PEPPER={bcrypt password}
SALT_ROUNDS={salt rounds, default is 10}
TOKEN_SECRET={jwt token secret}
```

You also need to setup a Postgres Database on port `5432` before running the server. You could also setup the databse using the provided `docker-compose.yml` file.

To run the server locally (Default port is 3000):

- Clone this repo
- `yarn` to install all required dependencies
- `yarn migrate` to create the required database tables
- `yarn start` or `yarn watch` to start the local server

Other scripts:

- `yarn migrate` to run database migrations
- `yarn test` to run tests

## Used Technologies

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing
