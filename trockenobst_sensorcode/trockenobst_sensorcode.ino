#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include "config.h"

const int interval = 5000;
const unsigned int MOISTURE_PIN = 2;
String clientId;
unsigned int moisture;
WiFiClient espClient;
PubSubClient client(espClient);
char msg[50];

void setup()
{
  pinMode(MOISTURE_PIN, INPUT);
  Serial.begin(115200);
  connect_wifi();
  client.setServer(MQTT_BROKER, 1883);
  clientId = composeClientID();
  Serial.print("clientID: ");
  Serial.println(clientId);
}

void connect_wifi()
{
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(SSID);

  WiFi.begin(SSID, PSK);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void reconnect()
{
  while (!client.connected())
  {
    Serial.print("Reconnecting...");
    if (!client.connect(MQTT_CLIENT_ID))
    {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" retrying in 5 seconds");
      delay(5000);
    }
  }
}

void loop()
{
  moisture = analogRead(MOISTURE_PIN);
  if (!client.connected())
  {
    reconnect();
  }
  client.loop();
  String output = "{\"mac\":\"" + clientId + "\",\"val\":" + moisture + "}";
  String(output).toCharArray(msg, 50);
  client.publish(TOPIC, msg);
  delay(interval);
}

String composeClientID()
{
  uint8_t mac[6];
  WiFi.macAddress(mac);
  clientId += macToStr(mac);
  return clientId;
}

String macToStr(const uint8_t *mac)
{
  String result;
  for (int i = 0; i < 6; ++i)
  {
    result += String(mac[i], 16);
    if (i < 5)
      result += ':';
  }
  return result;
}
