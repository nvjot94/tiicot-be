const express = require('express');
const connectDb= require('./config/db');
const app = express();
const User = require('./modals/user');
//connect to mongodb
connectDb();

app.use(express.json({ extended: false }));

app.get('/users', async (req, res) => {
    try {
      const users = await User.find({}).sort({
        date: -1,
      });
      res.json(users);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

app.listen(process.env.port||8888,()=>{
console.log('server has been started');
});