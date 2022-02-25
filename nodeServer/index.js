// node server which will handle socket io connections
const io = require('socket.io')(8000, {
    cors:{
        origin:'*'
    }
});

const users = {};



io.on('connection', socket =>{
    // if any user joins let others know!
    socket.on('new-user-joined', Name =>{
        users[socket.id] = Name;
        socket.broadcast.emit('user-joined' , Name);
    });
    
    // when someone sends the message broadcast it to others
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, Name: users[socket.id]})
    })

    // when someone left the chat broadcast it to others
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})
