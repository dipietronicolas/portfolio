const dbConnection = require('./database/dbConnection');

module.exports = function (io) {

    let usernames = [];

    const connection = dbConnection();

    io.on('connection', socket => {

        socket.on('new user', (data, callback) => {
            if (usernames.indexOf(data) != -1 || data == "") {
                callback(false);
            } else {
                callback(true);
                socket.username = data;
                usernames.push(socket.username);
                updateUsernames();
                updateChat();
                console.log('Nuevo usuario conectado: ' + socket.username);
            }
        })

        socket.on('send message', data => {
            io.sockets.emit('new message', {
                msg:data,
                username:socket.username
            });
            connection.query(`INSERT INTO chat_room (username, chat) VALUES ('${socket.username}', '${data}')`, () =>{
                console.log("data insertada correctamente");
            });
        });

        socket.on('disconnect', data => {
            if (!socket.username) return;
            usernames.splice(usernames.indexOf(socket.username), 1)
            updateUsernames();
        });

        socket.on('delete_messages', () =>{
            deleteChat();
            updateChat();
        })

        function updateUsernames(){
            io.sockets.emit('usernames', usernames);
        }

        function updateChat(){
            connection.query(`SELECT * FROM chat_room`, (err, data ) =>{
                io.sockets.emit('chats', data);
            })
        }

        function deleteChat(){
            connection.query(`DELETE FROM chat_room`);
        }
    });
}