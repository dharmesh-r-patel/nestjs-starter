# NestJS Starter Boilerplate

## Introduction
This project is a nestjs starter. It aims to nestjs bootstrap. The main features include:
- Feature 1
- Feature 2
- Feature 3

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js (20+)
- Yarn or npm (yarn recomandation)
- Docker (if applicable)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/dharmesh--patel/nestjs-starter.git
   cd yourproject

## Visual Studio Code Extensions
    - ESLint - `dbaeumer.vscode-eslint` - Dirk Baeumer

    - Prettier - Code formatter by `esbenp.prettier-vscode` - Esben Petersen
     
    - Prisma - `Prisma.prisma` - prisma.io

    - Dockfile - `foxundermoon.shell-format` - foxundermoon

    - markdown - `yzhang.markdown-all-in-one` - Yu Zhang

    - To open the command pallette, 
      you can use Command + Shift + P on Mac or Control + Shift + P on Windows. 
      In the command pallette search format, then choose Format Document.

## Installation

```bash
$ yarn
```

## Running Server

## Development / Staging / Production

```bash
# development
$ yarn start

# staging
$ yarn staging

# production
$ yarn production
```

## Build

```bash
yarn build
```

## Tests

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Database Migration Development
```bash
   # Change in database file (it will create migration file in prisma/migration)
   $ yarn migration
```

## Docker Container and Database Migration for Staging/Production 
```bash
   # To run docker file run script (it will create docker container run update database)
   $ bash ./start.sh staging/production
```

## Docker Container down
```bash
   # To run docker file run script (it will create docker container run update database)
   $ bash ./stop.sh staging/production
```

## Running all services on Docker

```bash
docker-compose up --build
```

## Run only database and redis services on Docker

```bash
docker-compose up postgres redis
```

## Swagger Documentation

- Swagger documentation endpoint will be running at <b> `/docs` </b>.

## K8s Deployment Local

```bash
# first start minikube
minikube start

# deployment
kubectl apply -f k8s/

# get endpoint of k8s cluster
minikube service nestjs-starter-service
```
<!-- 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 -->
<!-- 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 -->

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).

## Author

🇮🇳 Dharmesh Patel <br>
[Github](https://github.com/dharmesh-r-patel/nestjs-starter)
[Linkedin](https://www.linkedin.com/in/dharmeshbbay)
[Instagram](https://www.instagram.com/dharmesh_numbertank)
