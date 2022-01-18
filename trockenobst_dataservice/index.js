require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

const { MongoClient } = require('mongodb');
const dbUri = "mongodb+srv://dbUser:2203@cluster0.i7srp.mongodb.net/trockenobst?retryWrites=true&w=majority";
const dbClient = new MongoClient(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
let connection = ""
let collection;

let adminPost = ""

connectDB()

async function connectDB() {
  try {
    await client.connect();
    connection = client.db("trockenobst").collection("userData")

    console.log("Database connected!")

  } catch (error) {
    console.error("Database connection attempt failed!")
    await client.close();
  }
}

const mqtt = require('mqtt');
const topic = process.env.MQTT_TOPIC;
const mqttId = uuidv4();
const mqttClient = mqtt.connect(process.env.MQTT_HOST, { clientId: mqttId });

mqttClient.on("connect", function () {
  mqttClient.subscribe(topic, function (err) {
    if (err) {
      console.log(err);
    }
    else {
      mqttClient.publish(topic + "logs/", mqttId + " connected");
      console.log("subscribed to " + topic);
    }
  });
});

mqttClient.on("message", function (topic, message) {
  // console.log(JSON.parse(message));
  if (collection) {

    let msg = JSON.parse(message);
    msg.createdAt = new Date();
    msg.modifiedAt = new Date();

    collection.insertOne(msg);
  }
});


// Basic - Login 1
async function basiclogin (email, password) {
  const response = await zlFetch.post(loginEndpoint, {
    auth: {
      username: email,
      password: password
    },
      body: { /*...*/ }
  })
}


const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.MOISTURE_SERVICE_PORT;

app.listen(port, () => {
  console.log(`data service listening at http://127.0.0.1:${port}`);
});

app.get('/', (req, res) => {
  res.send('Welcome to Trockenobst data service (joyful app)!');
});

app.post('/api/latest', (req, res) => {
  const sentToken = req.body.token;
  if (collection) {
    axios.post(process.env.USERSERVICE_LOCATION + "/api/validateToken/", { token: token })
      .then(tokValRes => {
        console.log(tokValRes.data)
        if (tokValRes.data.validToken) {
          console.log("token is valid");
          collection.find({}).sort({ 'createdAt': 1 }).next()
            .then(async (latest) => {
              console.log(latest);
              res.status(200).send(latest);
            });
        }
        else {
          console.log("invalid token");
          res.status(401);
        }
      })
      .catch(tokenCheckErr => {
        //console.log(tokenCheckErr);
        console.log("error checking token");
        console.log(err.toString());
      });
  }
});




