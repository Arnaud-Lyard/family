# Relaxing-HippoQuests

Welcome to Relaxing-HippoQuests, a community platform for passionate gamers. This application allows players to connect, join rankings, propose matches, and much more.

## Table of Contents
- [Installation](#installation)
- [Prerequisites](#prerequisites)
- [Technologies](#technologies)
  - [Server](#server)
  - [Client](#client)
  - [Tools](#tools)
- [Deployment](#deployment)
- [Key Features](#key-features)
  - [User](#user)
  - [Administrator](#administrator)
  - [Super Admin](#super-admin)

## Installation
In local development, use the following command to initialize the database and server:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

To launch the client in development, run the following commands:

```bash
cd ./client
pnpm i
pnpm dev
```
For production deployment, use the following command:
```bash
docker-compose -f docker-compose.production.yml up --build
```

## Prerequisites
Before installing Relaxing-HippoQuests, make sure you have the following installed on your machine:
- Node.js
- pnpm
  
## Technologies
### Server
- Node.js
- Express
- JavaScript / TypeScript
- GraphQL
- PostgreSQL
- WebSocket
### Client
- Vue.js
- Vite
- JavaScript / TypeScript
- GraphQL
- Vue Router
### Tools
- Docker
- Docker Compose
- Nginx
  
## Deployment
This project uses Docker and Docker Compose for deployment. It is designed to be deployed on a VPS, with a Continuous Deployment (CD) system in place.

## Key Features
### User
- Create a player profile
- Login / Logout
- Register for the list of players available for matches
### Administrator
- Create and edit articles with a wysiwyg editor
### Super Admin
- Rights management
- Promote users to administrators
