
#  ORAAN Backend RESTful API Node Server 


A boilerplate/starter RESTful APIs using Node.js, Express, and Mongoose.


## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Error Handling](#error-handling)
- [Validation](#validation)

## Features

- **NoSQL database**: [MongoDB](https://www.mongodb.com) object data modeling using [Mongoose](https://mongoosejs.com)
- **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
- **Error handling**: showing error to the terminal
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env#readme)

## Getting Started

### Installation

Clone the repo:

```bash
git https://github.com/ameenmari/OraanBackendTest.git
cd OraanTest
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

### Commands

Running locally:

```bash
npm run server
```

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes 
 |--validations\    # Request data validation schemas
 |--server.js          # Express app and App entry point
 
```

## API Documentation

To test the APIs end-points, run the server and go to `http://localhost:5000` in your postman..

### API Endpoints

List of available routes:

**USER routes**:\
`POST /api/users/register` - register\
`GET /api/users/signin` - signin\

**Instalment routes**:\
`POST /api/instalments/saveinstalment` - store the user instalment info\
`GET /api/instalments/totalInstalments` - get the total amount the user paid\

## Error Handling

For example, if you are trying to get a user from the DB who is not found, and you want to send a 404 error, the code should look something like:

```javascript

const getUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).send('User not found');
  }
};
```


## Validation

Request data is validated using [Joi](https://hapi.dev/family/joi/). Check the [documentation](https://hapi.dev/family/joi/api/) for more details on how to write Joi validation schemas.

The validation schemas are defined in the `/validations.js` directory and are used in the routes by providing them as parameters to the userRoute and instalmentRoute.

```javascript
const express = require('express');
const {registerValidation,signinValidation} = require('../validatation');

const router = express.Router();

router.post('/signin', async (req, res) => {

    const { error } = signinValidation(req.body)
     }
```

## License

[MIT](LICENSE)
