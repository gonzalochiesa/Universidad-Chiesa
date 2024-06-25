const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 5000;
const app = express();
app.use(morgan("dev"));
app.use(cookieParser());

require("./config/configMongoDB.js");


app.use(
  cors({
    origin: [
      "https://master--universidad-chiesa.netlify.app",
      "https://667a1003125f350008844ced--universidad-chiesa.netlify.app"
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "/public")));

app.use("/uploads", express.static(path.join(__dirname, "/public")));


app.get("/", (req, res) => {
  res.status(200).sendFile(__dirname + "/public/html/welcome.html");
});


app.use("/api/v3", require("./routes/mongodb/users"));
app.use("/api/v3", require("./routes/mongodb/course.js"));
app.use("/api/v3", require("./routes/mongodb/teacher.js"));
app.use("/api/v3", require("./routes/mongodb/Student.js"));
app.use("/api/v3", require("./routes/mongodb/Matricula.js"));
app.use("/api/v3", require("./routes/mongodb/contacts.js"));

app.use((red, res, next) => {
  res.status(404).sendFile(__dirname + "/public/html/404.html");
});

app.listen(port, () => {
  console.log("Servidor disponible en puerto ..:" + port);
});
