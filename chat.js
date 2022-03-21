const socket = new WebSocket('ws://localhost:8080');

socket.onopen = function() {
  console.log('Connected successfully.');
};

const $form = document.querySelector('.footer');
const $input = document.querySelector('.footer input')
const $chat = document.querySelector('.chat')

const username = prompt('Enter your username');

$form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = $input.value;
  const data = {
    message,
    sender: username,
    time: Date.now()
  };
  if(message) {
    socket.send(JSON.stringify(data));
    $input.value = ''
    addSentMessage(data);
  }
})

socket.onmessage = e => {
  addReceivedMessage(JSON.parse(e.data));
}

function addReceivedMessage(data) {
  const $msg = document.createElement('div');
  const date = new Date(data.time);
  $msg.innerHTML = `
  <div class="message__sender">${data.sender || 'Anonymous'}</div>
  <div class="message">${data.message}
  
  <span>${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}</span>
  </div>
  `;
  $msg.classList.add('received-message');
  $chat.append($msg);
}

function addSentMessage(data) {
  const $msg = document.createElement('div');
  const date = new Date(data.time);
  $msg.innerHTML = `
  <div class="message__sender">${data.sender || 'Anonymous'}</div>
  <div class="message">${data.message}
  
  <span>${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}</span>
  </div>
  `;
  $msg.classList.add('sent-message');
  $chat.append($msg);
}