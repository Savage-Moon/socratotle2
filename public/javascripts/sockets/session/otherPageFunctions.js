

const SessionCodeDisplay =  document.getElementById('SessionCode')

const sessionTopic  = localStorage.getItem('sessionTopic');
const sessionID     = localStorage.getItem('sessionID');
const userID        = localStorage.getItem('userID')

//adds session code to SideBar
addSessionCode(sessionID)

function addSessionCode(code) {

    const sessionElement = document.createElement('div')

    if (userID == 'leader') {sessionElement.innerText = `Session Code: ${code}`}
    SessionCodeDisplay.append(sessionElement)
    
}