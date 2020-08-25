const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const config = require('config');
const bodyParser = require('body-parser');
const cors = require('cors');

const { port: serverPort } = config.get('webServer');
const mongoURI = config.get('mongoURI');
const userRouter = require('./server/api/routes/user');

const start = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Data base connected');
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
};

start();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

app.use('/api', userRouter);

const port = process.env.PORT || serverPort;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }

  console.log(`server is listening on ${port}`);
});
