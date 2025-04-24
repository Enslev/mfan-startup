# MFAN Stack – Docker Setup

This repository provides a simple Docker Compose configuration for running a full MFAN stack (MongoDB, Fastify, Angular, Node.js) locally using containers.

## 🐳 Stack Overview

- **MongoDB** – NoSQL database
- **Fastify** – Node.js framework
- **Angular** – Frontend framework

## 🚀 Getting Started

1. Clone the repo:

    ```bash
    git clone https://github.com/enslev/mfan-startup.git
    cd mfan-startup
    ```

2. Start the stack:

    ```bash
    docker compose up --build
    ```

3. Access the app:
    - Angular frontend: `http://localhost:4200`
    - Fastify API: `http://localhost:9001`
    - MongoDB: `mongodb://localhost:27017?directConnection=true`

## 🌳 Environment

A sample .env file is included to configure the server port and local MongoDB connection string.  
You can customize it as needed.

## 🖥️ MongoDB UI connection

If you're connecting to MongoDB using a UI tool like [MongoDB Compass](https://www.mongodb.com/products/tools/compass), make sure to use:

```
mongodb://localhost:27017?directConnection=true
```
 
> ⚠️ **Don't use the connection string from `.env`**, which points to `mongodb://mongodb:27017` — that hostname only works inside the Docker network.

This setup uses a single-node Replica Set to enable features like Change Streams and Transactions. Adding `directConnection=true` tells Compass to skip cluster discovery and connect directly.

## 📁 Structure

- `client/` – Angular app
- `server/` – Fastify API
- `docker-compose.yml` – Service configuration
- `Dockerfile` – App build instructions (in each subfolder)

## 🛠️ Requirements

- Docker
- Docker Compose (comes with Docker Desktop, or install separately on Linux)

## 🧹 Cleanup

To stop and remove containers (but not volumes)

```
docker compose down
```

To stop and remove containers, networks, and volumes:
> ⛔ **This will permanently delete all local data in the database**

```
docker compose down -v
```
