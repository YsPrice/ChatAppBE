const express = require('express');
const cors = require('cors');
const parser = require('body-parser');

const app = express();
app.use(parser.json());
app.use(cors());

app.get('/', (req,res)=>{
    res.status(200).send("hello world")
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});