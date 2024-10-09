
# Assignment Submission portal

This project is a web application that allows users to register, log in, and submit assignments. Admins can manage assignments, including rejecting/accepting submissions. The application uses Express.js for the server, MongoDB for the database, and JWT for authentication and zod for input validation.


## Project Structure
```bash
.env
.env.example
.gitignore
package.json
src/
    authMiddleware.ts
    dbConnect.ts
    index.ts
    models/
        admin.ts
        assignment.ts
        user.ts
    routes/
        adminRoutes.ts
        userRoutes.ts
    types/
        InputValidation.ts
tsconfig.json
tsconfig.tsbuildinfo
```
## Prerequisites

- Node.js
- npm
- MongoDB
## Run Locally

Clone the project

```bash
  git clone https://github.com/Ultimate-conscious/assignment-portal.git
```

Go to the project directory

```bash
  cd assignment-portal
```

Install dependencies

```bash
  npm install
```

Set up env variables and Database
```bash
  - Fill the .env with your credentials refering .env.example
  - make sure that the database cluster is alive
```

Start the server (this will transpile and start you server)

```bash
  npm run start
```


## Project Features

- User Registration and Login:
    - Users can register and log in using the endpoints in userRoutes.ts.
    - Passwords are hashed using bcrypt, and JWT tokens are generated for authentication.
- Assignment Submission:
    - Users can submit assignments using the /upload endpoint in userRoutes.ts.
    - The application checks for duplicate submissions and saves the submission time.
- Admin Management:
    - Admins can reject assignments using the endpoint in adminRoutes.ts.
    - The status of the assignment is updated to 'rejected'.
## Important Files

- index.ts: Entry point of the application.
- dbConnect.ts: Handles MongoDB connection.
- userRoutes.ts: Contains user-related routes.
- adminRoutes.ts: Contains admin-related routes.
- models: Contains Mongoose models for users, assignments, and admins.
- authMiddleware.ts: Middleware for authenticating routes.