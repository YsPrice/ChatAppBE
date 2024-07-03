const express = require('express');
const cors = require('cors');
const parser = require('body-parser');
const sequelize = require('./db/database.js');
const User = require('./Models/User.js');

const app = express();
app.use(parser.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

// app.get('/', (req,res)=>{
//     res.status(200).send("hello world")
sequelize
  .sync()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});