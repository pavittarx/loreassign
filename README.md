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

  - /db - connects with DB & exposes the connection to the app. 
  - /libs - purely javascript logic code, interfaces b/w API & the database 
  - /routes - API routes dealing with recieving requests and sending responses.
  - /utils - utility functions that can be used interchangeably within parts of the app.


-----------------------------
`/app` - frontend of the app built with React. 

  - /components - reusable components used within different pages
  - /data - some random dummy data for items that can be ordered. (since none was provided I used it.)
  - /libs - javascript code dealing with sending requests to the REST API and recieving respnses. 
  - /pages - different pages of the app.
  - /utils - javascript utility functions that has been used at different parts of the app.

-----

# Eniornment Variabls 

`DB_URI` - Connection string to connect with MongoDb instance. 

`APP_REQUEST_ENDPOINT` - Base URL API endpoint to make requests on.

