// Conexion a base de datos
const dbConnection = require('./database/dbConnection');

// Controlador que se exporta 
const messageService = {};

messageService.refreshChat = (io) => {
   
  const connection = dbConnection();
  connection.query(`SELECT * FROM chat_room`, (err, data) => {
    io.sockets.emit('chats', data)
  })
  connection.end();
};

messageService.insertChat = (username, msg) => {
  const connection = dbConnection();
  connection.query(`INSERT INTO chat_room (username, chat) VALUES ('${username}', '${msg}')`);
  connection.end();
}

messageService.deleteChat = () => {
  const connection = dbConnection();
  connection.query(`DELETE FROM chat_room`);
  connection.end();
}


module.exports = messageService;
