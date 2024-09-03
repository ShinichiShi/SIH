require("dotenv").config({ path: './.env.local' });

const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const {Server} = require('socket.io');

const SERVER_PORT = process.env.SERVER_PORT;
const CLIENT_PORT = process.env.CLIENT_PORT;
const states = require('./states.json');

const server = http.createServer(app);

//middleware
app.use(cors());

//routings
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

//socket.io connections
const io = new Server(server, {
  cors:{
      origin : `http://localhost:${CLIENT_PORT}`,
      methods : ['GET', 'POST']
  }

})
io.on("connection", (socket)=>{
  console.log(socket.id);

  socket.on("send-message", (data)=>{
    console.log('sending message');
    socket.broadcast.emit("recieve-message", data.message);
  })
})

server.listen(SERVER_PORT, () => {
  console.log(`Server is running on http://localhost:${SERVER_PORT}`);
});
