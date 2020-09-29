const dbConnection = require('./database/dbConnection');

module.exports = function (io) {

    let usernames = [];

    io.on('connection', socket => {

        let connection;

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
                msg: data,
                username: socket.username
            });
            insertChat(socket.username, data);

        });


        socket.on('disconnect', (data) => {
            if (!socket.username) return;
            usernames.splice(usernames.indexOf(socket.username), 1)
            updateUsernames();
        });

        socket.on('delete_messages', () => {
            deleteChat();
            setTimeout(()=>{
                updateChat();
            },500)
            
        })

        function updateUsernames() {
            io.sockets.emit('usernames', usernames);
        }

        function updateChat() {
            connection = dbConnection();
            connection.query(`SELECT * FROM chat_room`, (err, data) => {
                io.sockets.emit('chats', data);
            })
            connection.end();
        }

        function insertChat(username, msg) {
            connection = dbConnection();
            connection.query(`INSERT INTO chat_room (username, chat) VALUES ('${username}', '${msg}')`);
            connection.end();
        }

        function deleteChat() {
            connection = dbConnection();
            connection.query(`DELETE FROM chat_room`);
            connection.end();
        }


    });
}