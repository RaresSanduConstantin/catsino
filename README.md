# Catsino

## Introduction
Catsino is a demo landing app that showcases a conceptual casino-themed application centered around cats. This repository contains both the client and server side of the project. The client is built with Next.js and provides the frontend interface, while the server, developed with Express, handles backend logic and data management.

## Prerequisites
Before you begin, ensure you have the following installed on your system:
- Node.js (https://nodejs.org/)
- npm (usually comes with Node.js)
- Git (https://git-scm.com/)

## Setup
To get the app running locally, follow these steps:

### 1. Clone the repository
First, clone the repository to your local machine:

```bash
git clone https://github.com/RaresSanduConstantin/catsino.git
cd catsino
```

### 2. Set up the Client
Navigate to the client directory and install dependencies:

```bash
cd client
npm install
```

#### Environment Configuration
Create an `.env.local` file in the root of the `client` directory. Add necessary environment variables:
```text
MONGODB_URI=
NEXTAUTH_SECRET=
```

### 3. Set up the Server

Navigate to the server directory and install dependencies:

```bash
cd ../server
npm install
```

### 4. Run the Application
##### Running the Server
Start the server by running:
```bash
npm start
```
#### Running the client
Open a new terminal, navigate to the client directory, and run:
```bash
npm run dev
```
This will start the Next.js development server on http://localhost:3000. Navigate to this URL in a web browser to view the application.