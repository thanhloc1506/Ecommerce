var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
const exphbs = require('express-handlebars');

var indexRouter = require('./routes/index');

var app = express();

// connect database
const connectDB = async () => {
	try {
		await mongoose.connect('mongodb://localhost/Ecommerce', {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		});

		console.log('MongoDB connected');
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
};

connectDB();

// view engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', indexRouter);

module.exports = app;
