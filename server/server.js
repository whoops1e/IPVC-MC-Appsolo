const express = require('express');
const mongoose = require('mongoose');
const { OK, INTERNAL_SERVER_ERROR: ISR, CREATED } = require('http-codes');
const verifyToken = require('./firebase/verifyToken.js');

const app = express();

const port = 5000;

app.use(express.json());

const Markers = require('./dbMarkers.js');

mongoose.connect('mongodb+srv://admin:Jh5OTDUslZOZ1naF@cluster0.9ooj4.mongodb.net/markers?retryWrites=true&w=majority', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get('/api/markers', (req, res) => {
  Markers.find((err, data) => {
    if (err) {
      return res.status(ISR).json({ error: true, message: err.message });
    }
    return res.status(OK).json({ data });
  });
});

app.post('/api/markers/new', verifyToken, (req, res) => {
  const marker = req.body;
  Markers.create({ ...marker, user: req.userUid }, (err, data) => {
    if (err) {
      return res.status(ISR).json({ error: true, message: err.message });
    }
    return res.status(CREATED).json({ data });
  });
});

app.post('/api/markers/edit', verifyToken, (req, res) => {
  const { newData, _id } = req.body;
  Markers.updateOne({ _id, user: req.userUid }, newData, (err) => {
    if (err) {
      return res.status(ISR).json({ error: true, message: err.message });
    }
    return res.status(CREATED).json({ error: false });
  });
});

app.post('/api/markers/delete', verifyToken, (req, res) => {
  const { newData, _id } = req.body;
  Markers.deleteOne({ _id, user: req.userUid }, newData, (err) => {
    if (err) {
      return res.status(ISR).json({ error: true, message: err.message });
    }
    return res.status(CREATED).json({ error: false });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
