const socket = io('http://localhost:3008')
const messageBox = document.getElementById('textbox')
const submitButton = document.getElementById('submitbutton')

const whoBox        = document.getElementById('whosubjectbox')
const whatBox       = document.getElementById('whatsubjectbox')
const whyBox        = document.getElementById('whysubjectbox')
const whereBox      = document.getElementById('wheresubjectbox')
const whenBox       = document.getElementById('whensubjectbox')
const howBox        = document.getElementById('howsubjectbox')
const sessionTopic  = localStorage.getItem('sessionTopic');
const sessionID     = localStorage.getItem('sessionID');
const userID        = localStorage.getItem('userID')

messageBox.value    = 'testing'

var dataForServer ={}
dataForServer.user      = userID
dataForServer.subject   = sessionTopic
dataForServer.roomID    = sessionID

console.log(userID);
console.log(sessionID);
console.log(sessionTopic);


if(userID == 'leader'){
    socket.emit('createRoom',dataForServer);
}
else{
    socket.emit('joinRoom',dataForServer);
}


submitButton.onclick= function emitMessage() {

    var message = messageBox.value
    dataForServer.message = message;
    socket.emit('answer', dataForServer)

    messageBox.value = '';
    
}

function appendStudentAnswer(message){
    const answerElement = document.createElement('div')
    answerElement.innerText = message
    whoBox.append(answerElement)


    
}


socket.on('message',data => {
    appendAnswer(data)
})