const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    process.env.ATLAS_URI ||
      'mongodb://sasha:Sasha123@ds235658.mlab.com:35658/heroku_8g6wl22h',
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    },
    console.log('connected!')
  )
  .catch(e => console.error('ERROR: ', e.message));

// mongoose
//   .connect(process.env.MONGODB_URI, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//     useCreateIndex: true
//   })
//   .catch(e => console.error('ERROR: ', e.message));
mongoose.set('debug', true);
const connection = mongoose.connection;
connection.once('open', () =>
  console.log('\n*** MongoDB database connection established successfully.')
);

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => console.log(`Server is running on port: ${port}`));
