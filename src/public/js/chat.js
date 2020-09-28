window.onload = function wtd() {

  const socket = io();

  const message_form = document.getElementById('message-form');
  const message_box = document.getElementById('message');
  const chat = document.getElementById('chat');

  const login_form = document.getElementById('login-form');
  const username = document.getElementById('username');
  const chat_username = document.getElementById('chat-username');
  const username_error = document.getElementById('username-error');

  // Users
  const users = document.getElementById('users');

  // DELETE button
  const delete_button = document.querySelector('#delete_button');

  username_error.style.display = "none";
  /*
  chat_room.style.display = "none";  
  chat_username.style.display = "none";
  */

  login_form.addEventListener('submit', e => {
    e.preventDefault();
    socket.emit('new user', username.value, data => {
      if (data) {
        
        $('#login').addClass('d-none');
        $('#chat-room').removeClass('d-none');
        $('#chat-username').removeClass('d-none');
        $('#delete_button').removeClass('d-none');
        
        chat_username.textContent = username.value;
        message_box.focus();
      } else {
        username_error.style.display = "";
      }
    });
  });

  // DELETE button
  delete_button.addEventListener('click', e => {
    //e.preventDefault();
    socket.emit('delete_messages');
  })

  // Hola esto es un comentario.
  message_form.addEventListener('submit', e => {
    e.preventDefault();
    if (message_box.value != '') {
      socket.emit('send message', message_box.value);
      message_box.value = '';
    }
  });

  socket.on('new message', function (data) {
    chat.innerHTML += '<b>' + data.username + '</b>: ' + data.msg + '<br/>';
  });

  socket.on('usernames', data => {
    let html = '';
    for (let i = 0; i < data.length; i++) {
      html += '<i class="fas fa-user mt-1"/>&nbsp;' + data[i] + '<br/>'
    }
    users.innerHTML = html;
  });

  socket.on('chats', data => {
    $('#chat').html('');
    for (let chat of data) {
      $('#chat').append(`
          <b>${chat.username}</b>: ${chat.chat}<br/>
      `)
    }
  })
}