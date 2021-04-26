const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('../config/db');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const cookieSession = require('cookie-session');
const config = require('config');
const cookieEncryptionKey = config.get('cookieEncryptionKey');

connectDB();

app.use(morgan('dev'));

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//application/json

var corsOptions = {
	origin: 'http://localhost:3000',
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.header('Access-Control-Allow-Credentials', 'true');
	next();
});

//application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const cookieSessionMiddleware = cookieSession({
	maxAge: 1209600000, // two weeks in milliseconds
	keys: [cookieEncryptionKey], //
})

/* -------------------- SOCKET ----------------------- */

global._users = [];

const io = require('socket.io')(http, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
		credentials: true,
	},
}); 

io.use((socket, next) => {
	cookieSessionMiddleware(socket.request, socket.request.res || {}, next);
});

// Cookie setup
app.use(cookieSessionMiddleware);

// Socket connection
io.on('connection', (socket) => {
	console.log("Connection established");

	console.log(socket.request);

	socket.on("disconnect",()=>{
		console.log("connection disconnected");
	});
});

app.set('socketio', io);

/* -------------------- SOCKET END ----------------------- */

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/api/users', require('./routes/users'));
app.use('/api/reset', require('./routes/reset'));

if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	// index.html for all page routes
	app.get('*', (req, res) => {
		res.sendFile(
			path.resolve(__dirname, '../client', 'build', 'index.html')
		);
	});
}

const port = process.env.PORT || 5000;

http.listen(port, () => {
	console.log(`Server Running at ${port}`);
});
