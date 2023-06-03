## Bot stoppen
Performs a logout and then stops the rest of the bot.


## Embed senden
Creates and sends a generic embed based on the provided data.

| Input / output | Variable          | Type of variable | Data type               | Optional | Default                       | Beschreibung                                                                                          |
|----------------|-------------------|------------------|-------------------------|----------|-------------------------------|-------------------------------------------------------------------------------------------------------|
| Input          | ephemeral         | Temp             | [boolean]               |          |                               | Only visible to the user that invoked the interaction                                                 |
| Input          | edit              | Temp             | [boolean]               |          |                               | The message is to be edited (only possible for interactions)                                          |
| Input          | channel           | Temp             | [TextBasedChannel]      |          |                               | The channel in which the message is to be sent (interactions will be replied to if possible)          |
| Input          | title             | Temp             | [string]                |          |                               | The title of the embed                                                                                |
| Input          | description       | Temp             | [string]                |          |                               | The description of the embed                                                                          |
| Input          | color             | Temp             | [string]                | x        | `globalVars("default-color")` | The color of the embed                                                                                |
| Input          | image             | Temp             | [string]                | x        | *none*                        | An image to display (URL)                                                                             |
| Input          | thumbnail         | Temp             | [string]                | x        | *none*                        | A thumbnail to display (URL)                                                                          |


## Failure Embed senden
Creates and sends a failure embed based on the provided data.

| Input / output | Variable          | Type of variable | Data type               | Optional | Default                       | Beschreibung                                                                                          |
|----------------|-------------------|------------------|-------------------------|----------|-------------------------------|-------------------------------------------------------------------------------------------------------|
| Input          | ephemeral         | Temp             | [boolean]               |          |                               | Only visible to the user that invoked the interaction                                                 |
| Input          | edit              | Temp             | [boolean]               |          |                               | The message is to be edited (only possible for interactions)                                          |
| Input          | channel           | Temp             | [TextBasedChannel]      |          |                               | The channel in which the message is to be sent (interactions will be replied to if possible)          |
| Input          | title             | Temp             | [string]                | x        | `"❌ Fehler"`                | The title of the notice (will be inserted after `"❌ "`)                                              |
| Input          | description       | Temp             | [string]                |          |                               | The description of the notice                                                                         |
| Input          | color             | Temp             | [string]                | x        | `globalVars("default-color")` | The color of the embed                                                                                |
| Input          | image             | Temp             | [string]                | x        | *none*                        | An image to display (URL)                                                                             |
| Input          | thumbnail         | Temp             | [string]                | x        | *none*                        | A thumbnail to display (URL)                                                                          |


## Feiertage prüfen
Checks whether the current day is a German public holiday.

| Input / output | Variable          | Type of variable | Data type               | Optional | Default                       | Beschreibung                                                                                          |
|----------------|-------------------|------------------|-------------------------|----------|-------------------------------|-------------------------------------------------------------------------------------------------------|
| Output         | holiday           | Global           | [string]                | x        | `null`                        | The name of the public holiday                                                                        |


## Info Embed senden
Creates and sends an info embed based on the provided data.

| Input / output | Variable          | Type of variable | Data type               | Optional | Default                       | Beschreibung                                                                                          |
|----------------|-------------------|------------------|-------------------------|----------|-------------------------------|-------------------------------------------------------------------------------------------------------|
| Input          | ephemeral         | Temp             | [boolean]               |          |                               | Only visible to the user that invoked the interaction                                                 |
| Input          | edit              | Temp             | [boolean]               |          |                               | The message is to be edited (only possible for interactions)                                          |
| Input          | channel           | Temp             | [TextBasedChannel]      |          |                               | The channel in which the message is to be sent (interactions will be replied to if possible)          |
| Input          | title             | Temp             | [string]                | x        | `"ℹ Information"`             | The title of the notice (will be inserted after `"ℹ "`)                                                |
| Input          | description       | Temp             | [string]                |          |                               | The description of the notice                                                                         |
| Input          | color             | Temp             | [string]                | x        | `globalVars("default-color")` | The color of the embed                                                                                |
| Input          | image             | Temp             | [string]                | x        | *none*                        | An image to display (URL)                                                                             |
| Input          | thumbnail         | Temp             | [string]                | x        | *none*                        | A thumbnail to display (URL)                                                                          |


## Leveling System
Distributes levels and xp basend on sent messages.

| Input / output | Variable          | Type of variable | Data type               | Optional | Default                       | Beschreibung                                                                                          |
|----------------|-------------------|------------------|-------------------------|----------|-------------------------------|-------------------------------------------------------------------------------------------------------|
| Input          | message           | Temp             | [Message]               |          |                               | The message, which is to be accounted as XP                                                           |
| Input          | member            | Temp             | [GuildMember]           |          |                               | The server member who should receive the XP                                                           |


## Nickname prüfen
Checks whether a nickname violates the rules or contains unusual characters.

| Input / output | Variable          | Type of variable | Data type               | Optional | Default                       | Beschreibung                                                                                          |
|----------------|-------------------|------------------|-------------------------|----------|-------------------------------|-------------------------------------------------------------------------------------------------------|
| Input          | member            | Temp             | [GuildMember]           |          |                               | The server member to check                                                                            |


## Page Embed senden
Creates and sends a multi-page embed. Individual pages can be accessed via designated buttons.

| Input / output | Variable          | Type of variable | Data type               | Optional | Default                       | Beschreibung                                                                                          |
|----------------|-------------------|------------------|-------------------------|----------|-------------------------------|-------------------------------------------------------------------------------------------------------|
| Input          | embeds            | Temp             | [Array]<[MessageEmbed]> |          |                               | The embeds to display<sup>1</sup>                                                                     |
| Input          | index             | Temp             | [number]                | x        | `0`                           | The first page that should be displayed (starts at 0; will be changed during the process)             |
| Input          | channel           | Temp             | [TextBasedChannel]      |          |                               | The channel in which the message is to be sent (interactions will be replied to if possible)          |

<sup>1</sup> The following values are currently supported:
- title
- description
- color (optional)
- image (optional)
- thumbnail (optional)


## Server prüfen
Checks whether a command gets executed on the intented server and ends the action sequence if necessary.

| Input / output | Variable          | Type of variable | Data type               | Optional | Default                       | Beschreibung                                                                                          |
|----------------|-------------------|------------------|-------------------------|----------|-------------------------------|-------------------------------------------------------------------------------------------------------|
| Input          | check-team-server | Temp             | [boolean]               | x        | `false`                       | In addition the the main server, the team server should be checked too                                |


## Serveraustritt
Announces server members that left.

| Input / output | Variable          | Type of variable | Data type               | Optional | Default                       | Beschreibung                                                                                          |
|----------------|-------------------|------------------|-------------------------|----------|-------------------------------|-------------------------------------------------------------------------------------------------------|
| Input          | member            | Temp             | [GuildMember]           |          |                               | The server member that left                                                                           |


## Serverbeitritt
Announces server members that joined.

| Input / output | Variable          | Type of variable | Data type               | Optional | Default                       | Beschreibung                                                                                          |
|----------------|-------------------|------------------|-------------------------|----------|-------------------------------|-------------------------------------------------------------------------------------------------------|
| Input          | member            | Temp             | [GuildMember]           |          |                               | The server member that joined                                                                         |


## Success Embed senden
Creates and sends a success embed based on the provided data.

| Input / output | Variable          | Type of variable | Data type               | Optional | Default                       | Beschreibung                                                                                          |
|----------------|-------------------|------------------|-------------------------|----------|-------------------------------|-------------------------------------------------------------------------------------------------------|
| Input          | ephemeral         | Temp             | [boolean]               |          |                               | Only visible to the user that invoked the interaction                                                 |
| Input          | edit              | Temp             | [boolean]               |          |                               | The message is to be edited (only possible for interactions)                                          |
| Input          | channel           | Temp             | [TextBasedChannel]      |          |                               | The channel in which the message is to be sent (interactions will be replied to if possible)          |
| Input          | title             | Temp             | [string]                | x        | `"✅ Erfolg"`                | The title of the notice (will be inserted after `"✅ "`)                                              |
| Input          | description       | Temp             | [string]                |          |                               | The description of the notice                                                                         |
| Input          | color             | Temp             | [string]                | x        | `globalVars("default-color")` | The color of the embed                                                                                |
| Input          | image             | Temp             | [string]                | x        | *none*                        | An image to display (URL)                                                                             |
| Input          | thumbnail         | Temp             | [string]                | x        | *none*                        | A thumbnail to display (URL)                                                                          |


## Warning Embed senden
Creates and sends a warning embed based on the provided data.

| Input / output | Variable          | Type of variable | Data type               | Optional | Default                       | Beschreibung                                                                                          |
|----------------|-------------------|------------------|-------------------------|----------|-------------------------------|-------------------------------------------------------------------------------------------------------|
| Input          | ephemeral         | Temp             | [boolean]               |          |                               | Only visible to the user that invoked the interaction                                                 |
| Input          | edit              | Temp             | [boolean]               |          |                               | The message is to be edited (only possible for interactions)                                          |
| Input          | channel           | Temp             | [TextBasedChannel]      |          |                               | The channel in which the message is to be sent (interactions will be replied to if possible)          |
| Input          | title             | Temp             | [string]                | x        | `"⚠ Warnung"`                | The title of the notice (will be inserted after `"⚠ "`)                                               |
| Input          | description       | Temp             | [string]                |          |                               | The description of the notice                                                                         |
| Input          | color             | Temp             | [string]                | x        | `globalVars("default-color")` | The color of the embed                                                                                |
| Input          | image             | Temp             | [string]                | x        | *none*                        | An image to display (URL)                                                                             |
| Input          | thumbnail         | Temp             | [string]                | x        | *none*                        | A thumbnail to display (URL)                                                                          |


## Werbung prüfen
Checks whether a message or server member contains / displays advertisements.

| Input / output | Variable          | Type of variable | Data type               | Optional | Default                       | Beschreibung                                                                                          |
|----------------|-------------------|------------------|-------------------------|----------|-------------------------------|-------------------------------------------------------------------------------------------------------|
| Input          | message           | Temp             | [Message]               |          |                               | The message to check                                                                                  |
| Input          | member            | Temp             | [GuildMember]           |          |                               | The server member to check                                                                            |


[boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
[number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
[string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[Array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
[GuildMember]: https://old.discordjs.dev/#/docs/discord.js/v13/class/GuildMember
[Message]: https://old.discordjs.dev/#/docs/discord.js/v13/class/Message
[MessageEmbed]: https://old.discordjs.dev/#/docs/discord.js/v13/class/MessageEmbed
[TextBasedChannel]: https://old.discordjs.dev/#/docs/discord.js/v13/typedef/TextBasedChannels