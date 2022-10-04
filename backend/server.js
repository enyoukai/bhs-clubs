const express = require('express');


const app = express()
const PORT = 3001

app.use(express.json());

const clubRouter = require("./routes/clubs")

app.use("/clubs", clubRouter);


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})