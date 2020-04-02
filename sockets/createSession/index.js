const express         = require('express');
//var socket            = require('socket.io')
const app             = module.exports = express();
const hbs             = require('hbs');
const path            = require('path');
const util            = require('util')

const rooms = []

function createRoom(io,socket,data) {
    socket.join(data.roomID)
}

module.exports.createRoom = createRoom;