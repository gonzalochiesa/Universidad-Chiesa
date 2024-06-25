const mongoose = require("mongoose");
const path = require("path");
const { port, host, user, password, database, uri } = require('./config')
require("dotenv").config({
  path: path.join(__dirname, "../envirome/devEnvirome.env"),
});

const dbmongo_host = host;
const dbmongo_port = port
const dbmongo_db = database;

let MONGODB_URL = "mongodb://" + dbmongo_host + ":" + dbmongo_port + "/" + dbmongo_db;

 if(uri){
   MONGODB_URL = uri;
 }


mongoose
  .connect(MONGODB_URL, {})
  .then((bd) => console.log("Conexión exitosa a la BD de Mongoose"))
  .catch((err) => console.log("Error de Conexión db ", err));