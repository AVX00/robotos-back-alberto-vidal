const serverSays = require("debug")("robots:router:");
const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  serverSays("get at robots/");
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  serverSays(`get at robots/${id}`);
});

module.exports = router;
