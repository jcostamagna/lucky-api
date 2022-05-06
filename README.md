<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>

</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

Versions:
```
Node v16.15.0
yarn v1.22.18
Postgres v8.7.3
```

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# extra db methods
$ yarn db:drop
$ yarn db:migrate
$ yarn db:seed
```

## Endpoints

### Create Profile

```
POST /profile
```
Body:
```json
{
  "user": {
    "username": "Username",
    "password": "123",
    "name": "Name",
    "address": "Street 123",
    "cityId": 3
  }
}
```

it returns same user with JWT in field token.


### Log in user
```
POST /users/login
```
Body:
```json
{
  "user": {
    "username": "Username",
    "password": "123",
  }
}
```

it returns same user with JWT in field token.

### Get Profile
```
GET /profile
```

Authorization header required ("Authorization": "jwt.token")

It returns a relevant profile of the user logged.