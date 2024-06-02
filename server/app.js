require("dotenv").config();
require("./db/conn.js");
const router = require("./routers/router.js");

const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const PORT = process.env.PORT || 4004;

// middleware

app.use(router);

app.listen(PORT, () => {
  console.log(`Server start at Port No : http://localhost:${PORT}`);
});
