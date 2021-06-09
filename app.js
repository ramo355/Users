const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const cors = require("cors");

const employee = require("./routes/employee");

const PORT = config.get("port") || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.post("/api/employee", employee);
app.get("/api/employee", employee);
app.delete("/api/employee/:id", employee);

async function start() {
  try {
    await mongoose.connect(config.get("mongoURI"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => {
      console.log(`PORT - ${PORT}`);
    });
  } catch (e) {
    process.exit(1);
  }
}

start();
