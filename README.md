# Polling System

Web Api, to create questions for poll. Anyone can create question, option, add vote, delete question, delete option

## Built using (Tech):

- Backend
  - Node
  - Express
  - Mongoose / Mongo DB

## Installation

Requires [Node.js](https://nodejs.org/) v18+ to run,
[MongoDB](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/) as Database

Install the dependencies and start the server.

```sh
cd PollingSystem
npm install
npm start
```

### Test API in Postman

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/12324240-7580d4eb-90d4-4f47-87d6-5897a809832f?action=collection%2Ffork&collection-url=entityId%3D12324240-7580d4eb-90d4-4f47-87d6-5897a809832f%26entityType%3Dcollection%26workspaceId%3D2c404a1b-06b4-4ba1-bd2a-f962a63f049d)

## Routes

- /questions/create (To create a question)
- /questions/:id/options/create (To add options to a specific question)
- /questions/:id/delete (To delete a question)
- /options/:id/delete (To delete an option)
- /options/:id/add_vote (To increment the count of votes)
- /questions/:id (To view a question and it’s options)
