const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const cors = require('cors');

const errorMiddleware = require('./middleware/error');

// Config
if (process.env.NODE_ENV !== 'PRODUCTION') {
	require('dotenv').config({ path: 'backend/config/config.env' });
}

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(fileUpload());

// Route Imports

const user = require('./routes/userRoute');
const transaction = require('./routes/transactionRoute');
const deposit = require('./routes/depositRoute');
const email = require('./routes/emailRoute');
const notice = require('./routes/noticeRoute');
const withdraw = require('./routes/withdrawRoute');
const company = require('./routes/companyRoute');
const verify = require('./routes/verifyRoute');
const price = require('./routes/priceRoute');
const mining = require('./routes/miningRoute');

app.use('/api/v1', user);
app.use('/api/v1', transaction);
app.use('/api/v1', deposit);
app.use('/api/v1', email);
app.use('/api/v1', notice);
app.use('/api/v1', withdraw);
app.use('/api/v1', company);
app.use('/api/v1', verify);
app.use('/api/v1', price);
app.use('/api/v1', mining);

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
});

// Middleware for Errors

// app.get('/', (req, res) => {
// 	res.send('Hello World');
// });
app.use(errorMiddleware);

module.exports = app;
