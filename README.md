# alferd-tech-task

[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/1a84cf2e25ae4c6e88f3a8efb71998b0)](https://www.codacy.com/gh/SoulHarsh007/alferd-tech-task/dashboard?utm_source=github.com&utm_medium=referral&utm_content=SoulHarsh007/alferd-tech-task&utm_campaign=Badge_Grade)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/SoulHarsh007/alferd-tech-task.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/SoulHarsh007/alferd-tech-task/context:javascript)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/SoulHarsh007/alferd-tech-task.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/SoulHarsh007/alferd-tech-task/alerts/)
[![deepcode](https://www.deepcode.ai/api/gh/badge?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF0Zm9ybTEiOiJnaCIsIm93bmVyMSI6IlNvdWxIYXJzaDAwNyIsInJlcG8xIjoiYWxmZXJkLXRlY2gtdGFzayIsImluY2x1ZGVMaW50IjpmYWxzZSwiYXV0aG9ySWQiOjI4MzI0LCJpYXQiOjE2MTg2NjUzNzl9.aCdk6KmE2nXyG-ci9ClUr9ZLwxhK-lpYdaqqUgJcI-8)](https://www.deepcode.ai/app/gh/SoulHarsh007/alferd-tech-task/_/dashboard?utm_content=gh%2FSoulHarsh007%2Falferd-tech-task)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Tools Used

### Next.js

Next.js is used for serverless approach.

### React

React is used for frontend.

### React-Dom

React-Dom is used for rendering react.

### React-Bootstrap

React-Bootstrap is used for accessing bootstrap in react.
Bootstrap uses jQuery and React-Bootstrap allows us to use bootstrap without jQuery.

### Bootstrap

Bootstrap is used for designing clean UI of the webpages.

### Bcrypt

Bcrypt is used hashing and verifying passwords.

### JS-Cookie

JS-Cookie is used to set a cookie on client-side.

### JsonWebToken

JsonWebToken is used to generate and verify json web tokens (JWT(s)) which are used to store/identify user sessions.

### Mongodb

Mongodb is used for storing users and their progress.

### UUID

UUID is used to assign user with a unique id.

## Usage

### Installing Required Packages

#### Use any one of these methods to install dependencies

#### Installation Via NPM

Run:

```bash
npm install
```

#### Installation Via YARN (Recommended)

Run:

```bash
yarn install
```

#### Installation Via PNPM

Run:

```bash
pnpm install
```

### Building Project

#### Building Via NPM

Run:

```bash
npm build
```

#### Building Via YARN

Run:

```bash
yarn build
```

#### Building Via PNPM

Run:

```bash
pnpm build
```

### Running Locally

#### Running Via NPM

Run:

```bash
npm start
```

#### Running Via YARN

Run:

```bash
yarn start
```

#### Running Via PNPM

Run:

```bash
pnpm start
```

### Env Setup

Edit `.env.local` according to your needs and rename it to `.env`

### Accessing

Open a browser and visit: <http://localhost:3000> Add your question and answers
to start the quiz head to <http://localhost:3000/quiz>

## Route Information

### /

**The index page**
**Auto redirects to /login if user is not logged in**

### /quiz

**The quiz page**
**Auto redirects to /login if user is not logged in**

### /login

**The login page**
**Redirects to / after successful login**
**Auto redirects to / if user is logged in**

### /signup

**The signup page**
**Redirects to / after successful account creation**

### /api/login

**Allowed Methods: POST**
Returns StatusCode 403 on incorrect method used

**Body Parameters - POST:**  
email: string - user's email address  
password: string - user's password

### /api/me

**Allowed Methods: GET, POST**
Returns StatusCode 403 on incorrect method used

**Query Parameters - GET:**  
token: string - client-side JWT Cookie

**Body Parameters - POST:**
token: string - client-side JWT Cookie  
questions: array - array of questions with their answers and score

### /api/signup

**Allowed Methods: POST:**

**Body Parameters - POST:**  
email: string - user's email address  
password: string - user's password
