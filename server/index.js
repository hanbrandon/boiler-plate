const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('../config/db');
const path = require('path');

connectDB();

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/api/users', require('./routes/users'));

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

app.listen(port, () => {
	console.log(`Server Running at ${port}`);
});
