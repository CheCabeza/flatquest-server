const express = require('express');
const cors = require('cors');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const passport = require('passport');
const mongoose = require('mongoose');
const flatsRouter = require('./routes/flatsRoutes');
const authRouter = require('./routes/authRoutes');
const usersRouter = require('./routes/usersRoutes');

require('dotenv').config();

const server = express();
const port = process.env.PORT || 4545;

mongoose.connect(
  process.env.DDBB_URL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
);

require('./passport/passport.config');

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(morgan('dev'));

server.use('/api/flats', flatsRouter);
server.use('/', authRouter);
server.use(
  '/api/user',
  passport.authenticate('jwt', { session: false }),
  usersRouter,
);

server.listen(port,
  () => debug(`Server is running in ${chalk.yellow(`localhost:${port}`)}`));
