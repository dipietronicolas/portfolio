module.exports = function (io) {

    let usernames = [];

    io.on('connection', socket => {

        socket.on('new user', (data, callback) => {
            if (usernames.indexOf(data) != -1 || data == "") {
                callback(false);
            } else {
                callback(true);
                socket.username = data;
                usernames.push(socket.username);
                updateUsernames();
                console.log('Nuevo usuario conectado: ' + socket.username);
            }
        })

        socket.on('send message', data => {
            io.sockets.emit('new message', {
                msg:data,
                username:socket.username
            });
        });

        socket.on('disconnect', data => {
            if (!socket.username) return;
            usernames.splice(usernames.indexOf(socket.username), 1)
            updateUsernames();
        });

        function updateUsernames(){
            io.sockets.emit('usernames', usernames);
        }
    });
}