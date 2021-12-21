/* const dbAccess = require('./config').dbAccess;
*/
const bcrypt = require('bcryptjs');
const saltRounds = 10;

require('dotenv').config();

const { v4: uuidv4 } = require('uuid');

const dbUri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`;

const { MongoClient } = require('mongodb');
const dbClient = new MongoClient(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

let userCollection;

let sessions = { "test": "test" };

dbClient.connect(err => {
  if (err) {
    console.log(err);
  }
  else {
    userCollection = dbClient.db("moistureTracking").collection("users");
    console.log("connected to mongodb");
  }
});

const express = require('express');
const app = express();
const port = process.env.USER_SERVICE_PORT;
const cors = require('cors');
const corsOptions = {
  origin: process.env.FRONTEND_LOCATION,
};
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.listen(port, () => {
  console.log(`UserService listening at http://127.0.0.1:${port}`);
});

app.get('/', (req, res) => {
  res.send('Welcome to User Service of Trockenobst');
});

app.post('/api/register', (req, res) => {
  console.log("someone is trying to register.");
  let userData = req.body;
  let now = new Date();
  const hash = bcrypt.hashSync(userData.password, saltRounds);
  delete userData.password;
  userData.hashedPass = hash;
  userData.createdAt = now;
  userData.modifiedAt = now;
  console.log(userData);
  if (userData) {
    userCollection.insertOne(userData, (dbErr) => {
      if (dbErr) {
        console.log(dbErr);
        res.status(500).send({
          message: "database error"
        });
      }
      else {
        console.log("inserted user data into database");
        res.status(200).send({
          message: "inserted user data into database"
        });
      }
    })
  }
  else {
    res.status(500).send({
      message: "not connected to database"
    });
  }
});

app.post('/api/validateToken', (req, res) => {
  console.log("validating token");
  let sentData = req.body;
  if (sessions.hasOwnProperty(sentData.token)) {
    res.status(200).send({ validToken: true });
    console.log("token is valid");
  }
  else {
    res.status(500).send({ validToken: false });
    console.log("token is invalid");
  }
});

app.post('/api/login', (req, res) => {
  console.log("someone is trying to login.");
  let sentData = req.body;
  userCollection.findOne({ username: sentData.username })
    .then((dbres) => {
      if (dbres) {
        // user exists in database
        console.log("user exists");
        if (bcrypt.compareSync(sentData.password, dbres.hashedPass)) {
          // correct password
          const session = createSession(dbres._id);
          res.status(200).send(session);
          console.log(sessions);
          console.log("password is correct");
        }
        else {
          // wrong password
          res.status(400).send({
            message: "wrong password"
          });
          console.log("wrong password");
        };
      }
      else {
        res.status(400).send({
          message: "user doesn't exist"
        });
        // username not found in database
      }
    });
});


function createSession(userid) {
  const token = uuidv4();
  const now = new Date();

  const session = {
    token: token,
    createdAt: now,
    modifiedAt: now,
    userId: userid
  };

  sessions[token] = session;
  return session;
}