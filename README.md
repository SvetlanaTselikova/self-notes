# Self Notes application

Pet project for CRUD notes **microfrontend** application using Webpack **Module Fedearation plugin** and **nx dev** monorepo tool.

## Technology stack

- Typescript
- Angular
- React
- Material UI
- Nestjs
- Rxjs
- Redux rtk query
- Nx dev
- Docker
- Swagger codegen
- Typeorm
- Postgresql

## Applications

- api-gate:
**CRUD api** app for notes actions based on Nest js and typeorm. 

- core-client:
**Core microfrontend** application based on Angular. All child applications will be built into it. 

- notes-client:
**Child microfrontend** application based on React.

## Shared Libraries

- client-message-bus:
Message bus lib for **communication** between child notes-client app and core application. Message bus based on rxjs.

- database:
Library with db **entities, migrations and types**.

- utils:
Common application utils lib.

## Local run

### Using docker

1. Change variables in .env file.
2. Run ` docker-compose -f docker-compose.infra.yaml -f docker-compose.apps.yaml up -d`.
3. Go to [localhost:4200](http://localhost:4200).

### Without docker

1. Set up and configure postgres. 
2. Change variables in .env file.
3. Install dependencies: `npm install`. 
4. Run migrations: `npm run typeorm:run`.
5. Run api: `nx serve api-gate`.
6. Run client: `nx serve core-client`.
7. Go to [localhost:4200](http://localhost:4200).
