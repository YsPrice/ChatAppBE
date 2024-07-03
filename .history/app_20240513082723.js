const express = require('express');
const cors = require('cors');
const parser = require('body-parser');
const sequelize = require('./database');

const app = express();
app.use(parser.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

// app.get('/', (req,res)=>{
//     res.status(200).send("hello world")
// })
sequelize.sync({force: true}).then(()=>{
  console.log('database Synced!')
}).catch((error)=>{
  console.log('oh nah it didnt work!',error);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});