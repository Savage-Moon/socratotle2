const express         = require('express');
//var socket            = require('socket.io')
const app             = module.exports = express();
const hbs             = require('hbs');
const path            = require('path');
const util            = require('util')

const rooms = []

function joinRoom(io,socket,data) {
    socket.join(data.roomID)
}

function checkIfRoomExists(rooms,roomID) {
    try {
        if(rooms.hasOwnProperty(roomID)){
            console.log(`Room ${roomID} exists`);
            return true;
        }
        else {
            console.log(`Room ${roomID} Doesnt Exist`);
            return false;
        } 
    } catch (error) {
        console.log(error);
        
    } 
    
}


module.exports.joinRoom = joinRoom;
module.exports.checkIfRoomExists = checkIfRoomExists;