const express = require('express');
const connectDB = require('./config/db');
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Jing, Server started on port ${PORT}`);
});
