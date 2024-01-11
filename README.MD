# FIND A Friend API

- A simple API to Adopt a pet, filtering by he's characteristics like user want's

## Tecnologies

- Typescript
- Node JS
- SOLID
- Unit Tests
- E2E Tests
- JWT (JSON Web Token)
- Prisma ORM
- Docker

### Regras da aplicação

- [x] Deve ser possível cadastrar um pet, contendo as seguintes informações
    - Nome
    - Sobre
    - Idade
    - Porte
    - Nivel de Energia
    - Nivel de Independência
    - Ambiente
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [x] Deve ser possível filtrar pets por suas características
- [x] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deve ser possível realizar login como uma ORG   
- [] (PLUS) Salvar uma foto do pet no S3 da AWS 

### Regras de negócio

- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [x] Todos os filtros, além da cidade, são opcionais
- [x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

## Commands reminder

### Create Docker Postgres Database
- docker run --name ContainerName -e POSTGRES_USERNAME=user -e POSTGRESQL_PASSWORD=password -e POSTGRESQL_DATABASE=database -p port:port bitnami/postgresql

### Use Another test environment

- "npm link" inside the environment folder
- "npm link" in Src folder, to install the environment test
- "main": need to have the same name of execution file
- Setup the the "vite.config.ts" file