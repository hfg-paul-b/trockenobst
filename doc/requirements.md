zur [Doku-Vorlage](../readme.md)

# Must Have

## Projektbeschreibung

* verteiltes System (prototypisch / funktional umgesetzt) / Microservices Infrastruktur
* sauber strukturiert
* testbar mit eigenem Frontend
* Struktur / Aufbau begründet
* Doku als readme.md

## Projektaufbau

* Sensormodul, das Daten erhebt und in ein System einspeist
* Begründung Kommunikationstechnologien 
* Überlegungen zur Skalierbarkeit: Anzahl User, Anzahl Sensormodule je User (was verändert sich wie, wenn man weiter
  skaliert, bisschen Text bitte)
* Backend mit eigener API für HTTP-Requests
* User-Authentifizierung (Login / Logout)
* Sessions / Tokens
* Userverwaltung Datenbank, Hashing
* Anzeige der gespeicherten Sensorwerte
* github-Repo(s)
* Dockerfiles
* shell + batch für alle Images + Container

# Should Have

* Überlegungen zur Energieversorgung (Laufzeit, Energiespeicher, Lademöglichkeit, etc.)
* Gestaltung Frontend (muss keinen Designpreis gewinnen)
* Zuordnung der User zu ihren Sensormodulen, damit sie nur ihre eigenen Sensoren sehen Visualisierung der Sensorwerte
* Session-Timeouts Zuordnung neue Sensormodule zu User (Pairing) (zumindest als Überlegung)
* Sensorinformationen in DB bearbeiten

# Could Have

* User-Authentifizierung über externen Dienst (z. B. Google)
* User-Authentifizierung über distinguierte Libraries / Frameworks (z. B. Passport, Jason Web Tokens)
* Deep Sleep-Implementierung
* Onboarding: Logon speichern / Cookie setzen / localStorage / Wizard statistische / prognostische Auswertung der
  Daten (AI?)
* erweiterte Visualisierung, z. B. Übersicht von historischen Daten
* Alerts / Alarme Konfigurieren einzelner Sensormodule (z. B. Intervalle ändern)
* OpenAPI / Swagger.io / apicur.io
* Benutzerrollen (nur ansehen, editieren, etc.)
