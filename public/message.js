//var socket = io.connect('http://localhost:5000', { 'forceNew': true });
//var socket = io();

//var socket = io.connect('http://localhost:5000');
//var socket = io.connect('ws://localhost:5000/', { secure: true, transports: ['websocket'], port: 5000 } );

var socket = io.connect();

socket.on('messages', function(data) {  
  console.log(data);
  render(data);
})

function render (data) {  
  var html = data.map(function(elem, index) {
    return(`<div>
              <strong>${elem.author}</strong>:
              <em>${elem.text}</em>
            </div>`);
  }).join(" ");

  document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {  
  var message = {
    author: document.getElementById('username').value,
    text: document.getElementById('texto').value
  };

  socket.emit('new-message', message);
  return false;
}