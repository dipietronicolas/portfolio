const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const { log } = require('console');

const app = express();
const server = http.createServer(app);

// Conexion de web sockets
const io = socketio.listen(server);


app.set('port', process.env.PORT || 3000);

// requiero el archivo sockets.js y le paso mi constante io.
require('./sockets')(io);

app.get('/chat/', (req, res) =>{
     res.sendFile(path.join(__dirname, '/public', '/views', '/chat.html'));
})

app.get('/resume/', (req, res) => {
    console.log(path.join(__dirname, 'public', 'cv'));
    res.sendFile(path.join(__dirname, 'public', 'cv', 'my_cv.pdf'));
})
app.use(express.static(path.join(__dirname, "public")));
server.listen(app.get('port'), () => {
    console.log('listen on port ' + app.get('port'));
})