# NestJS Starter Boilerplate

## Introduction
Introducing the NestJS boilerplate - a great way to get started on your next Node.js project! It's built using the latest version of NestJS, which is a powerful and flexible framework for creating efficient and scalable server-side applications. The boilerplate includes TypeScript, PostgreSQL, and JWT authentication right out of the box, so you don't have to worry about setting those up yourself.

Other awesome features include configuration support with Dotenv, Prisma for interacting with databases, Swagger for API documentation, and Docker Compose for container orchestration. Plus, the boilerplate also comes with pre-configured linting tools and secure HTTP headers with Helmet.

Getting started is easy - just clone the repository, install the dependencies, and you're ready to start building your next great idea!

## 🚀 Features

- 📱 **NestJS** — latest version
- 🎉 **TypeScript** - Type checking
- ⚙️ **Dotenv** - Supports environment variables
- 🗝 **Authentication** - JWT, RSA256
- 🏬 **Authorization** - RBAC, CBAC
- 🏪 **Prisma** - Database ORM
- 🏪 **PostgreSQL** - Open-Source Relational Database
- 🧠 **Configuration** - Single config for all
- 📃 **Swagger** - API Documentation
- 🐳 **Docker Compose** - Container Orchestration
- 🔐 **Helmet** - secure HTTP headers
- 📏 **ESLint** — Pluggable JavaScript linter
- 💖 **Prettier** - Opinionated Code Formatter
- ✨ **Commitlint** - Lint your conventional commits
- 🕵️‍♂️ **Code Scanning** - Code scanning with CodeQL

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

## Commit Message Guidelines
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]


Type: The type of change (e.g., feat, fix, docs, style, refactor, test, chore).
Scope: The scope of the change (e.g., core, api, config), which is optional.
Description: A short, imperative summary of the change.
Body: Detailed explanation of the change, which is optional.
Footer: Any footer notes, such as breaking changes or issues closed, which is optional.

git commit -m "feat(api): add new endpoint for user registration"
git commit -m "fix(core): handle edge case in data processing"


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).

## Author

🇮🇳 Dharmesh Patel <br>
[Github](https://github.com/dharmesh-r-patel/nestjs-starter)
[Linkedin](https://www.linkedin.com/in/dharmeshbbay)
[Instagram](https://www.instagram.com/dharmesh_numbertank)
