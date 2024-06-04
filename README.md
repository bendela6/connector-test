## Space unified API

This is a unified API for the Space rockets companies. 
It provides a single endpoint to get information about the rockets of different companies.

## Table of Contents

- [Installation](#installation)
- [To run the project](#to-run-the-project)
- [Testing](#testing)
- [generate types](#generate-types-and-json-specs)
- [Contributing](#contributing)

### Installation

to install the project, you need to clone the repository and run the following command:
```bash
$ npm install
```

### To run the project

To start the project, you need to run the following command:
```bash
$ npm start
```

### Usage
After running the project, you can access the API from the following endpoint:
```
http://localhost:4000/hello
```
to get specific rocket information, you can use the following endpoint:
```
http://localhost:4000/space/rockets/:rocketId
header: {
  "x-provider": ":providerName"
}
```
where `:rocketId` is the id of the rocket you want to get information about, and `:providerName` is the name of the provider you want to get the information from.

### Testing

To run the tests, you need to run the following command:
```bash
$ npm test
```

### Generate types and json specs
To generate the types from the openapi specs files, you need to run the following command:
```bash
$ npm run generate-ts
```
this command will walk through all the specs.yml files in the services folder and generate the types and json specs files.


### Contributing
to add a new space service.
- create a new folder in `src/services` with the name of the service.
- create a new class that implements the `SpaceProvider` from `src/types/SpaceProvider.ts`.
- create an openapi specs file for the service in the `src/services/<service-name>/spec.yml`.
- add the new provider to the `providers` array in `src/services/providers.ts`.
- to generate types from the openapi specs file, you need to run the following command:
```bash
$ npm run generate-types
```

Important notes when adding a new service:
- the service should implement the `SpaceProvider` interface.
- the service should have a `spec.yml` file that contains the openapi specs for the service.
- the service should be added to the `providers` array in `src/services/providers.ts`.
- you need to run the `npm run generate-ts` command to generate the types and json specs files.

```
