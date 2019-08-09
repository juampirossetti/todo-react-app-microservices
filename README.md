# Users ToDo List implemented with microservices

we are creating a new MVP, this new platform must be scalable and flexible to support our continuous growth. We want to implement a micro-service architecture and the first part of the project is to develop a to-do web app with two sets of REST endpoints and the UI to display the data

## Running the services

You have to clone the repository, install npm packages and run services.

### User microservices
```
cd users
npm install
npm start
```
This will run Users service on localhost on port 3001. It has a preconfigured (production) database from mLab for Rose Global easy check.

### ToDos microservices
```
cd todos
npm install
npm start
```
This will run Todos service on localhost on port 3002. It has a preconfigured (production) database from mLab for Rose Global easy check.

## Running React app

After running the services you have to run the React Todo App: 

```
cd app
npm install
npm start
```

## Running the tests

For each microservice I have code some unit testings. To run them you have to move to the microservice folder and run the tests. For users microservice it would be:

```
cd users
npm test
```

### What do the tests do?

They check get, create, update and delete endpoints of each microservice.

## Authors

**Juan Pablo Rossetti**

## License

This project is licensed under the ISC License.

