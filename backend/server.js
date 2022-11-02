const express = require('express');
const mongoose = require("mongoose");
const firebase = require('firebase-admin');

const clubRouter = require("./routes/clubs");
const authRouter = require("./routes/auth");
const accountRouter = require("./routes/account");
const adminRouter = require("./routes/admin");

const serviceAccount = require('./firebase.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const app = express()
const PORT = 3001

mongoose.connect("mongodb://localhost/clubsdb");

app.use(express.json());
app.use("/clubs", clubRouter);
app.use("/auth", authRouter);
app.use("/account", accountRouter);
app.use("/admin", adminRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})