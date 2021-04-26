import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:5000');


// Manage all socket calls in this file


const downloadPercentage = cb => {
    socket.on('percentagePing', bytesDone => cb(null, bytesDone));
}

const testConnection = cb => {
	socket.on('connection', res => console.log(res));
}

const authRequested = cb => {
	socket.on('auth', res => console.log(res) );
	return socket.off('auth', res => console.log(res) );
}

export { downloadPercentage, testConnection, authRequested };