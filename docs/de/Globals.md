# Globale Variablen


## Version | ${`globalVars("version")`}

Die aktuelle Version des Bots als Text. Beispiele:
- "3.0"
- "3.0-beta"


## Debug | ${`globalVars("debug")`}

Ein Boolean, welcher definiert, ob dies eine Instanz zum Suchen von Fehlern ist oder nicht. Wenn die Client-ID "724335784798322833" ist, dann wird die Variable 'false' sein, andernfalls ist sie 'true'.


## Default Color | ${`globalVars("default-color")`}

Die Standardfarbe des Bots (#fff700).


## Success Color | ${`globalVars("success-color")`}

Die Erfolgsfarbe des Bots (#3fff3f).


## Failure Color | ${`globalVars("failure-color")`}

Die Fehlschlagsfarbe des Bots (#ff3f3f).


## Info Color | ${`globalVars("info-color")`}

Die Informationsfarbe des Bots (#3f3fff).


## Warning Color | ${`globalVars("warning-color")`}
Die Warnungsfarbe des Bots (ffff3f).


## Main Server ID | ${`globalVars("main-server-id")`}

Basierend darauf, ob `globalVars("version")` 'true' ist, die ID unseres DBM German Beta ("724330774257729647") oder DBM German-Servers ("488722832201613344").


## Team Server ID | ${`globalVars("team-server-id")`}

Die ID unseres DBM German Team-Servers ("533618507699585035").


## Fake Server ID | ${`globalVars("fake-server-id")`}

Die ID unseres gefälschten DBM German Team-Servers ("731837587836371024"). Dieser Server ist ein Troll / Easter Egg in der Serverliste.


## Main Welcome / Goodbye Channel ID | ${`globalVars("main-welcome-goodbye-channel-id")`}

Basierend darauf, ob `globalVars("version")` 'true' ist, die ID unseres DBM German Beta ("724330774966435852") oder DBM German Willkommen / Aufwiedersehen-Kanals ("488736789092237322").


## Team Welcome / Goodbye Channel ID | ${`globalVars("team-welcome-goodbye-channel-id")`}

Basierend darauf, ob `globalVars("version")` 'true' ist, die ID unseres DBM German Beta ("756233531356610580") oder DBM German Team Willkommen / Aufwiedersehen-Kanals ("559419622667845633").


## Rule Channel ID | ${`globalVars("rule-channel-id")`}

Basierend darauf, ob `globalVars("version")` 'true' ist, die ID unseres DBM German Beta ("724331029359493120") oder DBM German Regeln-Kanals ("514896934411042834").


## Serverlist Channel ID | ${`globalVars("serverlist-channel-id")`}

Basierend darauf, ob `globalVars("version")` 'true' ist, die ID unseres DBM German Beta ("724331017401532446") oder DBM German Regeln-Kanals ("488734739000328202").


## FAQ Channel ID | ${`globalVars("faq-channel-id")`}

Basierend darauf, ob `globalVars("version")` 'true' ist, die ID unseres DBM German Beta ("724331079619706910") oder DBM German FAQ-Kanals ("547530904453775390").


## Hidden Role ID | ${`globalVars("hidden-role-id")`}

Basierend darauf, ob `globalVars("version")` 'true' ist, die ID unserer DBM German Beta ("724335094281666642") oder DBM German Ausgeblendet-Rolle ("663781677016809504").


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


## Break Text | ${`globalVars("breakText")`}

Eine Funktion, um Texte falls nötig abzubrechen und das Ende mit Abbruchzeichen zu ersetzen. Beispiel:
```js
let text1 = "DBM German";
let text2 = "DBM German Bot";
console.log(globalVars("breakText")(text1, 10)); // DBM German
console.log(globalVars("breakText")(text2, 10)); // DBM Ger...
console.log(globalVars("breakText")(text2, 10, " [...]")); // DBM  [...]
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


## Advertisement RegEx | ${`globalVars("advertisement-regex")`}

Der reguläre Ausdruck, der verwendet wird, um Werbung in den Namen und Personalisierten Status zu erkennen.