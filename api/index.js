const express = require("express");
const bodyParser = require("body-parser");
const config = require("../config.js");
const user = require("./components/user/network");
const auth = require("./components/auth/network");
const errors = require("../network/errors");
//rutas
const app = express();
app.use(bodyParser.json());
//aqui usamos el la redireccion hacia un modulo especifico
app.use("/api/user", user);
app.use("/api/auth", auth);

app.use(errors);
app.listen(config.api.port, () => {
  console.log("escuchando en el puerto: ", config.api.port);
});
