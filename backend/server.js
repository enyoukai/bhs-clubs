const express = require('express');
const mongoose = require("mongoose");

const clubRouter = require("./routes/clubs")
const Club = require("./models/clubs")

const app = express()
const PORT = 3001

mongoose.connect("mongodb://localhost/clubsdb");

app.use(express.json());
app.use("/clubs", clubRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})