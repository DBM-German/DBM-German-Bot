## Bot stoppen
Führt einen Logout aus und stoppt dann den restlichen Bot.


## Embed senden
Erstellt und versendet ein generisches Embed anhand der übergebenen Daten.

| Ein- / Ausgabe | Variable          | Art der Variable | Datentyp                | Optional | Standard                      | Beschreibung                                                                                          |
|----------------|-------------------|------------------|-------------------------|----------|-------------------------------|-------------------------------------------------------------------------------------------------------|
| Eingabe        | ephemeral         | Temp             | [boolean]               |          |                               | Nur für den Nutzer sichtbar, der die Interaction aufgerufen hat                                       |
| Eingabe        | edit              | Temp             | [boolean]               |          |                               | Die Nachricht soll bearbeitet werden (nur bei Interactions möglich)                                   |
| Eingabe        | channel           | Temp             | [TextBasedChannel]      |          |                               | Der Kanal, in den die Nachricht gesendet werden soll (auf Interactions wird wenn möglich geantwortet) |
| Eingabe        | title             | Temp             | [string]                |          |                               | Der Titel des Embeds                                                                                  |
| Eingabe        | description       | Temp             | [string]                |          |                               | Die Beschreibung des Embeds                                                                           |
| Eingabe        | color             | Temp             | [string]                | x        | `globalVars("default-color")` | Die Farbe des Embeds                                                                                  |
| Eingabe        | image             | Temp             | [string]                | x        | *nichts*                      | Ein anzuzeigendes Bild (URL)                                                                          |
| Eingabe        | thumbnail         | Temp             | [string]                | x        | *nichts*                      | Ein anzuzeigendes Thumbnail (URL)                                                                     |


## Failure Embed senden
Erstellt und versendet ein Fehlschlags-Embed anhand der übergebenen Daten.

| Ein- / Ausgabe | Variable          | Art der Variable | Datentyp                | Optional | Standard                      | Beschreibung                                                                                          |
|----------------|-------------------|------------------|-------------------------|----------|-------------------------------|-------------------------------------------------------------------------------------------------------|
| Eingabe        | ephemeral         | Temp             | [boolean]               |          |                               | Nur für den Nutzer sichtbar, der die Interaction aufgerufen hat                                       |
| Eingabe        | edit              | Temp             | [boolean]               |          |                               | Die Nachricht soll bearbeitet werden (nur bei Interactions möglich)                                   |
| Eingabe        | channel           | Temp             | [TextBasedChannel]      |          |                               | Der Kanal, in den die Nachricht gesendet werden soll (auf Interactions wird wenn möglich geantwortet) |
| Eingabe        | title             | Temp             | [string]                | x        | `"❌ Fehler"`                | Der Titel der Meldung (wird nach `"❌ "` eingefügt)                                                   |
| Eingabe        | description       | Temp             | [string]                |          |                               | Die Beschreibung der Meldung                                                                          |
| Eingabe        | color             | Temp             | [string]                | x        | `globalVars("default-color")` | Die Farbe des Embeds                                                                                  |
| Eingabe        | image             | Temp             | [string]                | x        | *nichts*                      | Ein anzuzeigendes Bild (URL)                                                                          |
| Eingabe        | thumbnail         | Temp             | [string]                | x        | *nichts*                      | Ein anzuzeigendes Thumbnail (URL)                                                                     |


## Feiertage prüfen
Überprüft, ob der aktuelle Tag ein deutscher Feiertag ist.

| Ein- / Ausgabe | Variable          | Art der Variable | Datentyp                | Optional | Standard                      | Beschreibung                                                                                          |
|----------------|-------------------|------------------|-------------------------|----------|-------------------------------|-------------------------------------------------------------------------------------------------------|
| Ausgabe        | holiday           | Global           | [string]                | x        | `null`                        | Der Name des aktuellen Feiertags                                                                      |


## Info Embed senden
Erstellt und versendet ein Info-Embed anhand der übergebenen Daten.

| Ein- / Ausgabe | Variable          | Art der Variable | Datentyp                | Optional | Standard                      | Beschreibung                                                                                          |
|----------------|-------------------|------------------|-------------------------|----------|-------------------------------|-------------------------------------------------------------------------------------------------------|
| Eingabe        | ephemeral         | Temp             | [boolean]               |          |                               | Nur für den Nutzer sichtbar, der die Interaction aufgerufen hat                                       |
| Eingabe        | edit              | Temp             | [boolean]               |          |                               | Die Nachricht soll bearbeitet werden (nur bei Interactions möglich)                                   |
| Eingabe        | channel           | Temp             | [TextBasedChannel]      |          |                               | Der Kanal, in den die Nachricht gesendet werden soll (auf Interactions wird wenn möglich geantwortet) |
| Eingabe        | title             | Temp             | [string]                | x        | `"ℹ Information"`             | Der Titel der Meldung (wird nach `"ℹ "` eingefügt)                                                     |
| Eingabe        | description       | Temp             | [string]                |          |                               | Die Beschreibung der Meldung                                                                          |
| Eingabe        | color             | Temp             | [string]                | x        | `globalVars("default-color")` | Die Farbe des Embeds                                                                                  |
| Eingabe        | image             | Temp             | [string]                | x        | *nichts*                      | Ein anzuzeigendes Bild (URL)                                                                          |
| Eingabe        | thumbnail         | Temp             | [string]                | x        | *nichts*                      | Ein anzuzeigendes Thumbnail (URL)                                                                     |


## Leveling System
Verteilt Level und XP anhand gesendeter Nachrichten.

| Ein- / Ausgabe | Variable          | Art der Variable | Datentyp                | Optional | Standard                      | Beschreibung                                                                                          |
|----------------|-------------------|------------------|-------------------------|----------|-------------------------------|-------------------------------------------------------------------------------------------------------|
| Eingabe        | message           | Temp             | [Message]               |          |                               | Die Nachricht, welche als XP verrechnet werden soll                                                   |
| Eingabe        | member            | Temp             | [GuildMember]           |          |                               | Das Servermitglied, welches die XP erhalten soll                                                      |


## Nickname prüfen
Überprüft, ob ein Nickname gegen die Regeln verstößt oder unübliche Zeichen beinhaltet.

| Ein- / Ausgabe | Variable          | Art der Variable | Datentyp                | Optional | Standard                      | Beschreibung                                                                                          |
|----------------|-------------------|------------------|-------------------------|----------|-------------------------------|-------------------------------------------------------------------------------------------------------|
| Eingabe        | member            | Temp             | [GuildMember]           |          |                               | Das zu prüfende Servermitglied                                                                        |


## Page Embed senden
Erstellt und versendet ein mehrseitiges Embed. Einzelne Seiten können über entsprechende Knöpfe aufgerufen werden.

| Ein- / Ausgabe | Variable          | Art der Variable | Datentyp                | Optional | Standard                      | Beschreibung                                                                                          |
|----------------|-------------------|------------------|-------------------------|----------|-------------------------------|-------------------------------------------------------------------------------------------------------|
| Eingabe        | embeds            | Temp             | [Array]<[MessageEmbed]> |          |                               | Die anzuzeigenden Embeds<sup>1</sup>                                                                  |
| Eingabe        | index             | Temp             | [number]                | x        | `0`                           | Die erste Seite, welche angezeigt weren soll (beginnt bei 0; wird während der Verarbeitung geändert)  |
| Eingabe        | channel           | Temp             | [TextBasedChannel]      |          |                               | Der Kanal, in den die Nachricht gesendet werden soll (auf Interactions wird wenn möglich geantwortet) |

<sup>1</sup> Folgende Werte werden aktuell unterstützt:
- title
- description
- color (optional)
- image (optional)
- thumbnail (optional)


## Server prüfen
Überprüft, ob ein Befehl auf dem vorgesehenen Server ausgeführt wird und beendet ggf. die Aktionssequenz.

| Ein- / Ausgabe | Variable          | Art der Variable | Datentyp                | Optional | Standard                      | Beschreibung                                                                                          |
|----------------|-------------------|------------------|-------------------------|----------|-------------------------------|-------------------------------------------------------------------------------------------------------|
| Eingabe        | check-team-server | Temp             | [boolean]               | x        | `false`                       | Zusätzlich zum Hauptserver soll auch auf den Teamserver geprüft werden                                |


## Serveraustritt
Verkündet Servermitglieder, die ausgetreten sind.

| Ein- / Ausgabe | Variable          | Art der Variable | Datentyp                | Optional | Standard                      | Beschreibung                                                                                          |
|----------------|-------------------|------------------|-------------------------|----------|-------------------------------|-------------------------------------------------------------------------------------------------------|
| Eingabe        | member            | Temp             | [GuildMember]           |          |                               | Das Servermitglied, das ausgetreten ist                                                               |


## Serverbeitritt
Verkündet Servermitglieder, die beigetreten sind.

| Ein- / Ausgabe | Variable          | Art der Variable | Datentyp                | Optional | Standard                      | Beschreibung                                                                                          |
|----------------|-------------------|------------------|-------------------------|----------|-------------------------------|-------------------------------------------------------------------------------------------------------|
| Eingabe        | member            | Temp             | [GuildMember]           |          |                               | Das Servermitglied, das beigetreten ist                                                               |


## Success Embed senden
Erstellt und versendet ein Erfolgs-Embed anhand der übergebenen Daten.

| Ein- / Ausgabe | Variable          | Art der Variable | Datentyp                | Optional | Standard                      | Beschreibung                                                                                          |
|----------------|-------------------|------------------|-------------------------|----------|-------------------------------|-------------------------------------------------------------------------------------------------------|
| Eingabe        | ephemeral         | Temp             | [boolean]               |          |                               | Nur für den Nutzer sichtbar, der die Interaction aufgerufen hat                                       |
| Eingabe        | edit              | Temp             | [boolean]               |          |                               | Die Nachricht soll bearbeitet werden (nur bei Interactions möglich)                                   |
| Eingabe        | channel           | Temp             | [TextBasedChannel]      |          |                               | Der Kanal, in den die Nachricht gesendet werden soll (auf Interactions wird wenn möglich geantwortet) |
| Eingabe        | title             | Temp             | [string]                | x        | `"✅ Erfolg"`                | Der Titel der Meldung (wird nach `"✅ "` eingefügt)                                                   |
| Eingabe        | description       | Temp             | [string]                |          |                               | Die Beschreibung der Meldung                                                                          |
| Eingabe        | color             | Temp             | [string]                | x        | `globalVars("default-color")` | Die Farbe des Embeds                                                                                  |
| Eingabe        | image             | Temp             | [string]                | x        | *nichts*                      | Ein anzuzeigendes Bild (URL)                                                                          |
| Eingabe        | thumbnail         | Temp             | [string]                | x        | *nichts*                      | Ein anzuzeigendes Thumbnail (URL)                                                                     |


## Warning Embed senden
Erstellt und versendet ein Warnungs-Embed anhand der übergebenen Daten.

| Ein- / Ausgabe | Variable          | Art der Variable | Datentyp                | Optional | Standard                      | Beschreibung                                                                                          |
|----------------|-------------------|------------------|-------------------------|----------|-------------------------------|-------------------------------------------------------------------------------------------------------|
| Eingabe        | ephemeral         | Temp             | [boolean]               |          |                               | Nur für den Nutzer sichtbar, der die Interaction aufgerufen hat                                       |
| Eingabe        | edit              | Temp             | [boolean]               |          |                               | Die Nachricht soll bearbeitet werden (nur bei Interactions möglich)                                   |
| Eingabe        | channel           | Temp             | [TextBasedChannel]      |          |                               | Der Kanal, in den die Nachricht gesendet werden soll (auf Interactions wird wenn möglich geantwortet) |
| Eingabe        | title             | Temp             | [string]                | x        | `"⚠ Warnung"`                | Der Titel der Meldung (wird nach `"⚠ "` eingefügt)                                                    |
| Eingabe        | description       | Temp             | [string]                |          |                               | Die Beschreibung der Meldung                                                                          |
| Eingabe        | color             | Temp             | [string]                | x        | `globalVars("default-color")` | Die Farbe des Embeds                                                                                  |
| Eingabe        | image             | Temp             | [string]                | x        | *nichts*                      | Ein anzuzeigendes Bild (URL)                                                                          |
| Eingabe        | thumbnail         | Temp             | [string]                | x        | *nichts*                      | Ein anzuzeigendes Thumbnail (URL)                                                                     |


## Werbung prüfen
Überprüft, ob eine Nachricht oder Servermitglied Werbung beinhalten / anzeigen.

| Ein- / Ausgabe | Variable          | Art der Variable | Datentyp                | Optional | Standard                      | Beschreibung                                                                                          |
|----------------|-------------------|------------------|-------------------------|----------|-------------------------------|-------------------------------------------------------------------------------------------------------|
| Eingabe        | message           | Temp             | [Message]               |          |                               | Die zu prüfende Nachricht                                                                             |
| Eingabe        | member            | Temp             | [GuildMember]           |          |                               | Das zu prüfende Servermitglied                                                                        |


[boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
[number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
[string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[Array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
[GuildMember]: https://old.discordjs.dev/#/docs/discord.js/v13/class/GuildMember
[Message]: https://old.discordjs.dev/#/docs/discord.js/v13/class/Message
[MessageEmbed]: https://old.discordjs.dev/#/docs/discord.js/v13/class/MessageEmbed
[TextBasedChannel]: https://old.discordjs.dev/#/docs/discord.js/v13/typedef/TextBasedChannels