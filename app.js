const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const noteRouter = require('./routes/noteRoute');
const port=5000;

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));




app.use('/notes', noteRouter);

app.listen(port, () => {
  console.log("Server up on PORT:" + port);
});

module.exports = app;
