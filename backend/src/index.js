// eslint-disable-next-line import/newline-after-import
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const middlewares = require('./middlewares');

// Set Socket IO to the app object for use within API routes
app.set('io', io);

// Connect to MongoDB (Atlas)
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(morgan('common'));
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Echo - Humanitarian Communiction',
  });
});

app.use('/users', require('./api/users'));
app.use('/admins', require('./api/admins'));

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1255;
server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening at http://127.0.0.1:${port}`);
});
