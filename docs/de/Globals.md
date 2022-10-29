# Globale Variablen


## Version | ${`globalVars("version")`}

Die aktuelle Version des Bots als Text. Beispiele:
- "3.0"
- "3.0-beta"


## Debug | ${`globalVars("debug")`}

Ein Boolean, welcher definiert, ob dies eine Instanz zum Suchen von Fehlern ist oder nicht. Wenn die Client-ID "724335784798322833" ist, dann wird die Variable 'false' sein, andernfalls ist sie 'true'.


## Main Server ID | ${`globalVars("main-server-id")`}

Basierend darauf, ob `globalVars("version")` 'true' ist, die ID unseres DBM German Beta ("724330774257729647") oder DBM German-Servers ("488722832201613344").


## Team Server ID | ${`globalVars("team-server-id")`}

Die ID unseres DBM German Team-Servers ("533618507699585035").


## Fake Server ID | ${`globalVars("fake-server-id")`}

Die ID unseres gefälschten DBM German Team-Servers ("731837587836371024"). Dieser Server ist ein Troll / Easter Egg in der Serverliste.


## Commands | ${`globalVars("commands")`}

Eine Liste von allen verfügbaren Befehlen und deren Parametern. Aufbau der Befehle:

| Schlüssel             | Typ des Werts                 |
|-----------------------|-------------------------------|
| name                  | String                        |
| description           | String                        |
| parameters            | [ApplicationCommandOptionData](https://discord.js.org/#/docs/discord.js/main/typedef/ApplicationCommandOptionData)  |
| type                  | [ApplicationCommandType](https://discord-api-types.dev/api/discord-api-types-v10/enum/ApplicationCommandType)        |


## Command Types | ${`globalVars("commandTypes")`}

Ein Objekt mit allen von DBMs internen Befehlsarten. Aufbau des Objekts:

| Schlüssel             | Wert (String)         |
|-----------------------|-----------------------|
| TEXT                  | 0                     |
| INCLUDES_WORD         | 1                     |
| REGEX                 | 2                     |
| ANY_MESSAGE           | 3                     |
| SLASH                 | 4                     |
| USER_MENU             | 5                     |
| MSG_MENU              | 6                     |


## Command Type Names | ${`globalVars("commandTypeNames")`}

Ein Objekt mit lesbaren Namen für DBMs interne Befehlsarten. Aufbau des Objekts:

| Schlüssel             | Wert (String)         |
|-----------------------|-----------------------|
| 0                     | Text Command          |
| 1                     | Includes Word         |
| 2                     | Regular Expression    |
| 3                     | Any Message           |
| 4                     | Slash Command         |
| 5                     | User Menu Command     |
| 6                     | Message Menu          |


## Resolve Command Type | ${`globalVars("resolveCommandType")`}

Eine Funktion zum Auflösen der Befehlsarten zu lesbaren Namen. Beispiel:
```js
let internalType = "4";
let readableType = globalVars("resolveCommandType")(commandType);
console.log(readableType); // Slash Command
```


## Replacement Nicknames | ${`globalVars("replacement-nicknames")`}

Eine Liste von männlichen und weiblichen Ersatznamen für Benutzer, die Nicknamen mit Zeichen haben, die nicht auf einer Tastatur mit QWERTZ-Layout verfügbar sind.

| Männlich (11)         | Weiblich (11)         |
|-----------------------|-----------------------|
| Hans-Peter            | Chantal               |
| Kevin                 | Xanthippe             |
| Frederik              | Mathilda<sup>1</sup>  |
| Pascal                | Tiffany               |
| Detlef                | Frieda                |
| Jürgen                | Greta                 |
| Horst                 | Cheyenne              |
| Günter                | Klothilde             |
| Konstantin            | Jacqueline            |
| Valentin              | Theresa               |
| Rüdiger               | Carlotta              |

<sup>1</sup> Bei diesem Namen besteht eine 50-prozentige Chance, dass es stattdessen Mathilda Jonas sein wird.