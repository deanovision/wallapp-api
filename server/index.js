const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const server = express();
const router = express.Router();
const config = require("./config");

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(morgan("combined"));
config(server, router);

module.exports = server;
