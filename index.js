// const { sequelize } = require('./models');
// sequelize.sync({ alter: true });

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoute = require('./route/authRoute');
const roomRoute = require('./route/roomRoute');
const bookRoute = require('./route/bookingRoute');
const adminRoute = require('./route/adminRoute');

const error = require('./middleware/error');
const notfound = require('./middleware/notfound');
const authenticate = require('./middleware/authenticate');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRoute);
app.use('/rooms', authenticate, roomRoute);
app.use('/book', authenticate, bookRoute);
app.use('/profile', authenticate, bookRoute);
app.use('/admin', authenticate, adminRoute);

app.use(notfound);
app.use(error);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server running on port : ${port}`));
