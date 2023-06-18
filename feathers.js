
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import authentication from '@feathersjs/authentication-client'

import io from 'socket.io-client';
import { feathers } from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';

const socket = io('https://cac7-2402-3a80-1b3d-e77a-c873-1ada-49d3-fad8.ngrok-free.app/', {
    transports: ['websocket'],
    forceNew: true
})

const client = feathers();

client.configure(socketio(socket));

export default client;
