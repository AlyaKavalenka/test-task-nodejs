# Nest.js + Prisma + PostgreSQL API

This project API. Stack: Nest.js, Prisma and PostgreSQL. Include authentication with jwt and role model.

## Installation

1. **Clone repository**

    ```bash
    $ git clone https://github.com/AlyaKavalenka/test-task-nodejs.git
    $ cd test-task-nodejs
    ```
2. **Install dependencies**
    ```bash
    $ npm install
    ```
3. **If you're using docker for postgreSQL**
    
    Start the PostgreSQL container
    ```bash
    $ docker-compose up -d
    ```


4. **Configure the database**
    Create a .env file in the root directory of the project and add the following environment variables:
    ```
    DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<database_name>?schema=public"
    AUTH_SECRET=<your_jwt_secret>
    DB_PORT=<your_database_port>
    DB_USERNAME=<your_database_username>
    DB_PASSWORD=<your_database_password>
    ```
5. **Setup Prisma**

    Generate the Prisma client:
    ```bash
    npx prisma generate
    ```
6. **Run migrations**
   
    Apply the migrations to the database:

    ```bash
    npx prisma migrate dev --name init
    ```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# Using the API

## Authentication
  
  ```bash
  # Register
  Post /auth/register
  {
    "email": "user@example.com",
    "password": "password"
  }

  # Login
  POST /auth/login
   {
     "email": "user@example.com",
     "password": "password"
   }
  ```

## Users

```bash
# Get all users (admin only)
GET /users?page=5
Authorization: Bearer <your_jwt_token>

# Get user profile (admin and the user themselves)
GET /users/:id
Authorization: Bearer <your_jwt_token>

# Update user profile (admin and the user themselves)
PUT /users/:id
Authorization: Bearer <your_jwt_token>

{
  "email": "user@example.com",
  "password": "newpassword"
}

# Delete user (admin and the user themselves)
DELETE /users/:id
Authorization: Bearer <your_jwt_token>
```

## Posts

```bash
# Create a new post (authenticated users)
POST /posts
Authorization: Bearer <your_jwt_token>

{
  "title": "Post Title",
  "content": "Post Content",
  "userId": <number>
}

# Get all posts
GET /posts?page=5

# Get post details
GET /posts/:id

# Update a post (post author)
PUT /posts/:id
Authorization: Bearer <your_jwt_token>

{
  "title": "Updated Post Title",
  "content": "Updated Post Content"
}

# Delete a post (admin and post author)
DELETE /posts/:id
Authorization: Bearer <your_jwt_token>
```

# Stay in touch
This README file includes instructions for setting up PostgreSQL using Docker Compose. If you have any further questions or need more details, please let me know!

- Author - [Alina Kavalenka](https://github.com/AlyaKavalenka)
- [![Linkedin Badge](https://img.shields.io/badge/-Alina-0077b5?style=flat&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/alina-kavalenka-aa8979180/)  
- [![Mail Badge](https://img.shields.io/badge/-kovalenkoalinam@gmail.com-c71610?style=flat&logo=gmail&logoColor=white)](mailto:kovalenkoalinam@gmail.com)
