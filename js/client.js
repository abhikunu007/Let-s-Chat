const socket = io ('http://localhost:8000');

// get DOMS Elements in respective js variables

const form = document.getElementById('send-container');
const messageInput = document.getElementById('msginp');
const messageContainer = document.querySelector(".container");
// for playing audio
var audio = new Audio('tone.mp3');

// Function that will append event info to the container

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');    
    messageElement.classList.add(position);    
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
}
// ask name to join

const Name = prompt("Enter your name to join");
socket.emit('new-user-joined', Name);

// if new user joins, receive the event from the server  so it can broadcast

socket.on('user-joined', Name =>{
    append(`${Name} joined the chat`, 'right');
})

// when server sends a message,receive it

socket.on('receive', data =>{
    append(`${data.Name}: ${data.message}`, 'left');
})

// when someone leave the chat

socket.on('left', Name =>{
    append(`${Name}: left the chat`, 'right');
})
// if the form ges submitted , send server the message
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send',message);
    messageInput.value = ''
})
