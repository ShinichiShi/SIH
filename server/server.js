require("dotenv").config();

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT;

app.use(cors());

const states = require('./states.json');

app.get('/states', (req, res) => {
  res.json(Object.keys(states));
});

app.get('/districts/:state', (req, res) => {
  const state = req.params.state;
  const districts = Object.keys(states[state] || {});
  res.json(districts);
});

app.get('/subdistricts/:state/:district', (req, res) => {
  const state = req.params.state;
  const district = req.params.district;
  const subDistricts = Object.keys(states[state][district] || {});
  res.json(subDistricts);
});

app.get('/areas/:state/:district/:subdistrict', (req, res) => {
  const state = req.params.state;
  const district = req.params.district;
  const subdistrict = req.params.subdistrict;
  const areas = states[state][district][subdistrict] || [];
  res.json(areas);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
