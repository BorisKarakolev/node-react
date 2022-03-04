const express = require("express");
const app = express();

const PORT = process.env.PORT || 6900;

app.get("/", (req, res) => {
  res.send({ status: "OK" });
});

app.listen(PORT)
