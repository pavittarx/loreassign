## loreassign
This is a sample porject for assignment at applore. 

## Project Structure 

Stack - MongoDb Atlas, ExpressJs, React & Nodejs (MERN)


```
  / app       front-end react code
  / server    Express app Code 
  - index.js  (entry point)
```

--------------------

`index.js` serves as the entry point for both the React app as well as the Express server. React files bundled via parcel-bundler is also server with Express. 

---------------------


`/server` - contains code related to Express server, exposes routes for registration, login, authentication as well as performing CRUD operations on Orders. 



-----------------------------
`/app` - frontend of the app built with React. 

# Eniornment Variabls 

`DB_URI` - Connection string to connect with MongoDb instance. 

`APP_REQUEST_ENDPOINT` - Base URL API endpoint to make requests on.