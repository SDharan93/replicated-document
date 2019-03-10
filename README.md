# Replicated Document
[![Build Status](https://travis-ci.com/SDharan93/replicated-document.svg?branch=master)](https://travis-ci.com/SDharan93/replicated-document)

A replicated document that allows collaborative editing. This document is built on the CRDT algorihtm "Logoot".
This project is an experiment to see the effectiveness on CRDTs and a fun project to build a real-time editor.

##Setup
This program can be setup using two methods:
1) Setup using Docker and Docker-Compose
2) Setup locally

### Setup using Docker and Docker-Compose
To setup using Docker and Docker-Compose, please install both Docker and Docker-compose.
Docker installation guide: https://docs.docker.com/install/
Docker-Compose installation guide: https://docs.docker.com/compose/install/

Once you have all dependencies installed, run the following command:
`
docker-compose build api
`

##### Note
On Linux machines, there is funniness with the permissions with volumes from docker containers
with the MySQL volume. Since we do not plan on deploying with a MySQL container, we do not 
plan on fixing this anytime soon, however rebuilding the MySQL container can throw issues.

### Setup locally
To setup using node locally, you must make sure you have all dependencies installed. I would recommend using nvm to 
control your node version: https://github.com/creationix/nvm

You can also install node v10 directly from this link: https://nodejs.org/en/download/

Once you have node v10 and npm v6 installed, run the following command in the root of this project to install all 
dependencies: 
`
npm install
`

Run the following to build the project and compile the protos: `npm run build`.

Install MySQL sever. [WIP]

## Testing
If you are using node locally:
`
npm run test
`

## Run the application
If you are using Docker and Docker-Compose: 
`
docker-compose up
`

If you are using node locally:
`
npm run run-api
`



