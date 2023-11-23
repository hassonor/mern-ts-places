# MERN Places Project Setup Guide

## Backend (BE) Setup

Follow these steps to set up the backend environment:

### Redis Installation and Setup

1. **Install Redis**:
    - Follow the installation guide available at [Redis Official Website](https://redis.io/docs/install).
2. **Start Redis Service**:
    - After installation, start the Redis service. This step varies depending on your operating system.
3. **Install Redis Commander Globally**:
    - Run `npm i -g redis-commander` in your terminal.
4. **Start Redis Commander**:
    - Open a new terminal window and run `redis-commander`.
5. **Install Project Dependencies**:
    - Navigate to your backend project directory and run `npm i`.
6. **Start the Backend Server**:
    - In your project directory, execute `npm run dev`.
7. **Run Jest Tests**:
    - Execute `npm run test` to run the Jest tests.

### Access Bull Dashboard Queues

- Navigate to `localhost:5000/queues` in your web browser to view the Bull Dashboard Queues.

## Frontend (FE) Setup

Set up the frontend part of your project with these steps:

1. **Install Frontend Dependencies**:
    - In your frontend project directory, run `npm i`.
2. **Start the Frontend Server**:
    - Execute `npm run dev` to start the server.
