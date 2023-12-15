# BART Railroad System API Documentation

## Overview

This documentation provides details on the RESTful API endpoints for the BART Railroad System. The system is developed using Node.js for the backend, React.js for the frontend, and MongoDB as the database.

## Technologies Used

- **Backend:** Node.js
- **Frontend:** React.js
- **Styling:** TailwindCSS

## Libraries Used

- **Form Validation:** Formik
- **HTTP Requests:** Axios
  - **Purpose of Axios:** Axios is used for making HTTP requests, facilitating communication between the frontend and backend of the BART Railroad System.

- **Database ORM:** Mongoose
  - **Purpose of Mongoose:** Mongoose is an Object-Document Mapper (ODM) for MongoDB, providing a structured schema and validation for data stored in the MongoDB database.
 
- **Authentication:** 
  - **jsonwebtoken:** JSON Web Token (JWT) implementation for authentication.
    - **Purpose of jsonwebtoken:** jsonwebtoken is used for generating and verifying JWTs, providing a secure way to authenticate users.

  - **bcryptjs:** Library for hashing passwords.
    - **Purpose of bcryptjs:** bcryptjs is used for securely hashing and comparing passwords, enhancing the security of user authentication.

- **Logging:** Winston Logger
  - **Purpose of Winston Logger:** Winston Logger is used for logging purposes, helping to track and troubleshoot events in the backend of the BART Railroad System.

## Stations Information

### Get All Stations

- **Endpoint:** `/api/stations`
- **Method:** `GET`
- **Description:** Retrieve a list of all BART stations.

### Get Station Details

- **Endpoint:** `/api/stations/:stationId`
- **Method:** `GET`
- **Description:** Get details about a specific BART station identified by `stationId`.

### Add New Station

- **Endpoint:** `/api/stations`
- **Method:** `POST`
- **Description:** Add a new station to the system. (Accessible to admin users)

## Train Routes

### Get All Routes

- **Endpoint:** `/api/routes`
- **Method:** `GET`
- **Description:** Retrieve a list of all BART train routes.

### Get Route Details

- **Endpoint:** `/api/routes/:routeId`
- **Method:** `GET`
- **Description:** Get details about a specific BART train route identified by `routeId`.

## Real-time Train Information

### Get Real-time Train Information

- **Endpoint:** `/api/trains`
- **Method:** `GET`
- **Description:** Fetch real-time information about BART trains, including arrival times and delays. Display the current location of trains on a map.

## User Authentication

### Create a New User

- **Endpoint:** `/api/users`
- **Method:** `POST`
- **Description:** Allow users to create new accounts.

### Get User Information

- **Endpoint:** `/api/users`
- **Method:** `GET`
- **Description:** Retrieve information about the currently authenticated user.

## Admin Panel

### Manage Stations

- **Endpoint:** `/api/admin/stations`
- **Methods:** `GET`, `POST`, `PUT`, `DELETE`
- **Description:** Allow admin users to perform CRUD operations on BART stations.

### Manage Routes

- **Endpoint:** `/api/admin/routes`
- **Methods:** `GET`, `POST`, `PUT`, `DELETE`
- **Description:** Allow admin users to perform CRUD operations on BART routes.

### Manage Users

- **Endpoint:** `/api/admin/users`
- **Methods:** `GET`, `PUT`, `DELETE`
- **Description:** Allow admin users to perform CRUD operations on user accounts.

## Dashboard/Statistics and Analytics

### Retrieve Dashboard Data

- **Endpoint:** `/api/dashboard`
- **Method:** `GET`
- **Description:** Gather and display statistics on number of users, trains, and routes, etc.

## Conclusion


