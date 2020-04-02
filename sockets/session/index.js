const express         = require('express');
var socket            = require('socket.io')
const app             = module.exports = express();
const hbs             = require('hbs');
const path            = require('path');
const util            = require('util')

const rooms = []

function emitToRoom(io,socket,data) {
    socket.join(data.roomID)
}

function getRooms(io,socket,data) {
    try {
        console.log(data)
        socket.emit('getRooms')
    } catch (error) {
        console.log(error);
        
    } 
    
}


module.exports.emitToRoom = emitToRoom;
module.exports.getRooms = getRooms;