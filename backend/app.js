const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

//import router from router file
const authRouter = require('./router/api/auth');
const profileRouter = require('./router/api/profile');
const postRouter = require('./router/api/posts');

const app = express();
app.use(express.json({ extended: false }));

//Router
app.use('/auth', authRouter);

app.use('/profile', profileRouter);

app.use('/post', postRouter);
//connect database
connectDB();

// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static('client/build'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Jing, Server started on port ${PORT}`);
});

const io = require('./socket').init(server);
io.on('connection', socket => {
  console.log('Client Connected!!');
});
