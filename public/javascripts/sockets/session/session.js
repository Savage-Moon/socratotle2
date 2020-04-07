const socket = io('http://100.24.65.92:3008/')
//var socket = io.connect('http://localhost:3008');

const messageBox = document.getElementById('textbox')
const submitButton = document.getElementById('submitbutton')

const whoBox        = document.getElementById('whosubjectbox')
const whatBox       = document.getElementById('whatsubjectbox')
const whyBox        = document.getElementById('whysubjectbox')
const whereBox      = document.getElementById('wheresubjectbox')
const whenBox       = document.getElementById('whensubjectbox')
const howBox        = document.getElementById('howsubjectbox')

//for navigating boxes
var boxes = [whoBox,whatBox,whyBox,whereBox,whenBox,howBox]
var box = 0
var currentSubjectBox = boxes[box];
var prev = document.getElementById("Prevbutton");
var next = document.getElementById("Nextbutton");



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
    
    console.log(socket.id);
    dataForServer.socketID = socket.id
    console.log(dataForServer);
    
    //getRooms(dataForServer)
    socket.emit('answer', dataForServer)
 
    messageBox.value = '';
    
}

prev.onclick= function emitMessage() {
    if(box!=0){box = box-1}
    dataForServer.currentBox = box;
    socket.emit('boxChange',dataForServer)
}
next.onclick= function emitMessage() {
    if(box != 5 ){box = box+1}
    dataForServer.currentBox = box;
    socket.emit('boxChange',dataForServer)
    
}

function appendAnswer(data){
    var message = data.message;
    var sender  = data.user;

    const answerElement = document.createElement('div')

    if (sender == 'student') {answerElement.innerText = `A: ${message}`} 
    else {answerElement.innerText = `Q: ${message}`}
    currentSubjectBox.append(answerElement)
    
}

function getRooms() {
    socket.emit('getRooms')
}


socket.on('message',data => {
    appendAnswer(data)
})

socket.on('changeBox',data => {
    box = data.currentBox
    currentSubjectBox.style.backgroundColor = "white";
    currentSubjectBox = boxes[data.currentBox]
    currentSubjectBox.style.backgroundColor = "aqua";
})