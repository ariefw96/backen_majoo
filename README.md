
<h1 align="center">Test Backend Dev</h1>
  
Built with NodeJs using the <a href="https://en.wikipedia.org/wiki/Express.js">Express.Js</a> Framework.


Express.js is a web application framework for Node.js.</p> 


## Contents

  

-  [Description](#description)

-  [Requirements](#requirements)

-  [Installation](#installation)

-  [Endpoint](#endpoint)

-  [Documentation](#documentation)


  

## Description

  

Resfull API simple CRUD Product with JWT.

Built with Node js, using ExpressJs framework and other libraries.

  

## Requirements

  

-  [`Node Js`](https://nodejs.org/en/)

-  [`npm`](https://www.npmjs.com/get-npm)

-  [`ExpressJs`](https://expressjs.com/)

-  [`Postman`](https://www.postman.com/downloads/)

-  [`Remote MYSQL`](https://remotemysql.com/phpmyadmin/index.php)

  

## Installation

  

1. Open your terminal or command prompt

2. Type `git clone https://github.com/ariefw96/sagaratest.git`

3. Open the folder and type `npm install` for install dependencies

4. Create file **_.env_** in root folder with the following contents :

  

```bash

Env

MYSQL_USERNAME=5ffpsC****
MYSQL_PASSWORD=15BqHr****
MYSQL_HOST=3306
MYSQL_PORT=5ffpsC****
MYSQL_DATABASE=5ffpsC****
MYSQL_HOSTNAME=remotemysql.com
SECRET_JWT=**********

```

  

Customize each value with the one you are using.
 

5. Type `npm start` in terminal for run this backend.

  

## Endpoint
 

### Auth Router

**Used for authentication**

| No. | Method | Endpoint                           | Information                          |
| --- | ------ | ---------------------------------- | ------------------------------------ |
| 1.  | POST   | api/v1/user/login                  | Used for login to create auth token  |


### Product Router
**Used for supplying data to home, history, and notification**

| No. | Method | Endpoint                             | Information                                                   |
| --- | ------ | ------------------------------------ | ------------------------------------------------------------- |
| 1.  | POST   | api/v1/product/add_product           | Used for add new product, using JWT auth.                     |
| 2.  | GET    | api/v1/product/all_product           | Used for get all product.                                     |
| 3.  | GET    | api/v1/product/get_product?id=       | Used for get single product.                                  |
| 4.  | UPDATE | api/v1/product/update_product?id=    | Used for update product, using JWT auth.                      |
| 4.  | DELETE | api/v1/product/delete_product?id=    | Used for delete product, using JWT auth.                       |

## Documentation

For more documentation , check it out below!

<a  href="https://documenter.getpostman.com/view/16435417/UV5c9vKz">

<img  src="https://img.shields.io/badge/Documentation-POSTMAN-blue.svg?style=popout&logo=postman"/>

</a>

