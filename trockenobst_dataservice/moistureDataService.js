require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

const dbUri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`;

const { MongoClient } = require('mongodb');

const dbClient = new MongoClient(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

let collection;

dbClient.connect(err => {
  if (err) {
    console.log(err);
  }
  else {
    collection = dbClient.db("moistureTracking").collection("moistureData");
    console.log("connected to mongodb");
  }

});


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
      .then(tokenCheckRes => {
        console.log(tokenCheckRes.data)
        if (tokenCheckRes.data.validToken) {
          console.log("token is valid");
          collection.find({}).sort({ 'createdAt': 1 }).next()
            .then(async (latest) => {
              console.log(latest);
              res.send(latest);
            });
        }
      })
      .catch(tokenCheckErr => {
        //console.log(tokenCheckErr);
        console.log("error checking token")
      })
  }
});




