const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cors = require('cors');

const cookieParser = require('cookie-parser');
const config = require('./config/key');

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const mongoose = require('mongoose');
mongoose
	.connect(config.mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	})
	.then(() => console.log('MongoDB Connected...'))
	.catch((err) => console.log(err));

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/api/users', require('./routes/users'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
