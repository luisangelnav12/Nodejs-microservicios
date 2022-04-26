const express = require("express");

const response = require("../../../network/response");
const Controler = require("./index");
const router = express.Router();

router.get("/", (req, res) => {
  // res.send("todo funciona");
  Controler.list()
    .then((lista) => {
      response.success(req, res, lista, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
});
router.get("/:id", (req, res) => {
  // res.send("todo funciona");
  Controler.get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
});
router.post("/", upsert);

function upsert(req, res) {
  Controler.upsert(req.body)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
}

module.exports = router;
