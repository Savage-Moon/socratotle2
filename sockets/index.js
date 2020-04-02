const express         = require('express');
var socket            = require('socket.io')
const app             = module.exports = express();
const hbs             = require('hbs');
const path            = require('path');
const bodyParser      = require('body-parser');
const cookieParser    = require('cookie-parser');
const methodOverride  = require('method-override');
const util            = require('util')


//*******************Socket Functions*******************//
const createSession   = require('./createSession')
const joinSession   = require('./joinSession')
const session   = require('./session')

//*********************socket setup*********************//
async function socketSetup(server) {
    try {
        var io = socket(server);

        io.on('connection', function(socket) {
            console.log('made a socket connection',socket.id)

            socket.on('joinRoom',function (data) {
                var rooms = io.sockets.adapter.rooms
                console.log('Join Room Socket Emit');
                if(joinSession.checkIfRoomExists(rooms,data.roomID)){
                    joinSession.joinRoom(io,socket,data)
                    console.log(util.inspect(io.sockets.adapter.rooms,{depth:null}))
                }
                else{
                    return `Room ${data.roomID} doesnt exist.`
                }
            })
            socket.on('createRoom',function (data) {
                socket.nickname = data.user
                createSession.createRoom(io,socket,data)
                console.log(socket.rooms)
                //console.log('createSession socket emit:\r\n'+ util.inspect(data,{depth:null}));
            })
            socket.on('getRooms',function (data) {
                console.log(socket.rooms)

                //console.log('createSession socket emit:\r\n'+ util.inspect(data,{depth:null}));
            })
            socket.on('answer',function (data) {
                session.getRooms(io,socket,data)
                socket.emit('message',data.message)
                //console.log('createSession socket emit:\r\n'+ util.inspect(data,{depth:null}));
            })
            
        })

    } catch (error) {
        console.log(error);
        
    }
}




module.exports.socketSetup = socketSetup