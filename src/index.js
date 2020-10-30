const express = require('express'),
    http = require('http'),
    socketio = require('socket.io'),
    path = require('path'),
    app = express(),
    server = http.createServer(app);

require('dotenv').config();

// Conexion de web sockets
const io = socketio.listen(server);

// Settings
app.set('port', process.env.PORT || 3000);

// requiero el archivo sockets.js y le paso mi constante io.
require('./sockets')(io);

// Middlewares
app.use(express.urlencoded({ extended: false }));

// Use
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, './public', './weather')));

// MongoDB Connection
require('./atlas-db/atlas-db');

// Routes
app.use(require('./routes/routes'));
app.use(require('./routes/routes.wheather'));

server.listen(app.get('port'), () => {
    console.log('listen on port ' + app.get('port'));
})