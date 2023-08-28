const express= require('express');
const mongoose = require('mongoose');
const app = express();

const dotenv = require('dotenv').config();
PORT = process.env.PORT;

// Import Routes
const UserRoute = require('./routes/userRoutes');
const PostRoute = require('./routes/postRoutes');

app.use(express.json());
app.use('/api/user', UserRoute);
app.use('/api/post', PostRoute);


// Connect to DB
mongoose.connect(process.env.DB_CONNECT).then(()=>app.listen(PORT)).then(() => {
    console.log('Connected to DB');
}).catch((err) => {
    console.log(err);
});

app.get('/', (req, res) => {
    res.send('Hello World');
});