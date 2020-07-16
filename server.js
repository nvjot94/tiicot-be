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
//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('./public'));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
  );
}
app.listen(process.env.PORT||8888,()=>{
console.log('server has been started');
});