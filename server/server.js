require("dotenv").config({ path: './.env.local' });

const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const {Server} = require('socket.io');
const {handleAudio, translate} = require("./audioHandler");

const SERVER_PORT = process.env.SERVER_PORT;
const CLIENT_PORT = process.env.CLIENT_PORT;
const states = require('./states.json');

const server = http.createServer(app);

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.raw({ type: 'audio/wav', limit: '10mb' }));

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
app.post('/chat/audioUpload', handleAudio);
app.post('/chat/translate', translate);

//socket.io connections
const io = new Server(server, {
  cors:{
      origin : `http://localhost:${CLIENT_PORT}`,
      methods : ['GET', 'POST']
  }

})


io.on("connection", (socket)=>{
  console.log(socket.id);

  socket.on('join-room', (room)=>{
    console.log(`${socket.id} joined ${room}`);
    socket.emit("joined-room", room);
    socket.join(room);
  })
  socket.on('leave-room', (room)=>{
    console.log(`${socket.id} left ${room}`);
    socket.emit("left-room", room);
    socket.leave(room);
  })


  socket.on('send-message', (data)=>{
    socket.to(data.room).emit("recieve-message", data);
  })
})

server.listen(SERVER_PORT, () => {
  console.log(`Server is running on http://localhost:${SERVER_PORT}`);
});

