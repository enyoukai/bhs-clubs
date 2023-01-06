const express = require('express');
const mongoose = require("mongoose");
const firebase = require('firebase-admin');

const clubRouter = require("./routes/clubs");
const authRouter = require("./routes/auth");
const accountRouter = require("./routes/account");
const adminRouter = require("./routes/admin");
const feedRouter = require("./routes/feed");

const serviceAccount = require('./firebase.json');

require('dotenv').config({ path: '.env.local' });

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const app = express()
app.use(express.json());

const PORT = 3001

try {
  // Connect to the MongoDB cluster
  mongoose.connect(
    process.env.MONGODB_URI_LOCAL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Mongoose is connected")
  );

} catch (e) {
  console.log("Could not connect");
}

app.use('/images', express.static('images'));

app.use("/clubs", clubRouter);
app.use("/auth", authRouter);
app.use("/account", accountRouter);
app.use("/admin", adminRouter);
app.use("/feed", feedRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})