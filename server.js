require('dotenv').config({ path: './config/.env' });
const express = require('express');
const connectDB = require('./config/db');

connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

app.disable('x-powered-by');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('client/public'));

app.use('/api/url/', require('./routes/url'));
app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/user'));
app.use('/', require('./routes'));

app.get('*', (req, res) => {
  //@TODO redirect to 404 page
  res
    .status(404)
    .send(
      `<h1> Page not found </h1><h3>${req.originalUrl} could not be found.</h3>`
    );
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
