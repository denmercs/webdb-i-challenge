const express = require("express");
const customerRouter = require("./customers/customers-router");
const server = express();

server.use(express.json());
server.use("/", customerRouter);

server.get("/", (req, res) => {
  res.send("<h3>DB Helpers with Knex</h3>");
});

module.exports = server;
