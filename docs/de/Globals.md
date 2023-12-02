# Globale Variablen

Globale Variablen können in zwei Kategorien unterteilt werden:
- [Konstanten](#Konstanten)
- [Funktionen](#Funktionen)



## Konstanten

| Variable                        | Regulärer Wert                                  | Wert im Debug-Modus                             | Beschreibung                                                                                                                                     |
|---------------------------------|-------------------------------------------------|-------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| version                         | *aktuelle Version*                              | *regulärer Wert*                                | Die aktuelle Version des Bots als Text (Beispiele: "3.0.0", "3.0.0-beta")                                                                            |
| debug                           | `false`                                         | `true`                                          | Ein Boolean, welcher definiert, ob es der Beta-Bot ist oder nicht (bei der Client-ID "724335784798322833" ist es `false`, andernfalls `true`)    |
| github-link                     | `https://github.com/dbm-german/DBM-German-Bot`  | *regulärer Wert*                                | Link zum GitHub-Repository des DBM German Bots                                                                                                   |
| default-color                   | `#fff700`                                       | *regulärer Wert*                                | Standardfarbe des Bots                                                                                                                           |
| success-color                   | `#3fff3f`                                       | *regulärer Wert*                                | Erfolgsfarbe des Bots                                                                                                                            |
| failure-color                   | `#ff3f3f`                                       | *regulärer Wert*                                | Fehlschlagsfarbe des Bots                                                                                                                        |
| info-color                      | `#3f3fff`                                       | *regulärer Wert*                                | Informationsfarbe des Bots                                                                                                                       |
| warning-color                   | `#ffff3f`                                       | *regulärer Wert*                                | Warnungsfarbe des Bots                                                                                                                           |
| main-server-id                  | `488722832201613344` (DBM German)               | `724330774257729647` (DBM German Beta)          | Hauptserver                                                                                                                                      |
| team-server-id                  | `533618507699585035` (DBM German Team)          | `1160220945701670943`(DBM German Team Beta)     | Teamserver                                                                                                                                       |
| fake-server-id                  | `731837587836371024` (Fake DBM German Team)     | *regulärer Wert*                                | Fake Teamserver (Troll / Easter Egg)                                                                                                             |
| main-team-general-role-id       | `488731124248346644`                            | `724334624041600037`                            | DBM German Team-Rolle - Hauptserver                                                                                                              |
| team-team-general-role-id       | `559431217590697985`                            | `1160223241953087628`                           | DBM German Team-Rolle - Teamserver                                                                                                               |
| main-expert-role-id             | `552490611639582720`                            | `724334571751080149`                            | DBM Experte-Rolle - Hauptserver                                                                                                                  |
| team-expert-role-id             | `559431231029379075`                            | `1160223219631001760`                           | DBM Experte-Rolle - Teamserver                                                                                                                   |
| main-moderator-role-id          | `605757344365805568`                            | `724334554541981727`                            | Moderator-Rolle - Hauptserver                                                                                                                    |
| team-moderator-role-id          | `617796696549752852`                            | `1160223200865693818`                           | Moderator-Rolle - Teamserver                                                                                                                     |
| main-manager-role-id            | `512626729681027103`                            | `724334501614059632`                            | Servermanager-Rolle - Hauptserver                                                                                                                |
| team-manager-role-id            | `559420175439364100`                            | `1160223166011031562`                           | Servermanager-Rolle - Teamserver                                                                                                                 |
| main-welcome-goodbye-channel-id | `488736789092237322`                            | `724330774966435852`                            | Willkommen / Aufwiedersehen-Kanal                                                                                                                |
| team-welcome-goodbye-channel-id | `559419622667845633`                            | `1160222472893894757`                           | Team Willkommen / Aufwiedersehen-Kanal                                                                                                           |
| rule-channel-id                 | `514896934411042834`                            | `724331029359493120`                            | Regeln-Kanal                                                                                                                                     |
| serverlist-channel-id           | `488734739000328202`                            | `724331017401532446`                            | Serverliste-Kanal                                                                                                                                |
| faq-channel-id                  | `547530904453775390`                            | `724331079619706910`                            | FAQ-Kanal                                                                                                                                        |
| help-channel-id                 | `1047167552792563712`                           | `724331258351452251`                            | Hilfe-Kanal                                                                                                                                      |
| hidden-role-id                  | `663781677016809504`                            | `724335094281666642`                            | "Ausgeblendet"-Rolle                                                                                                                             |
| answered-tag-id                 | `1047539260724613140`                           | `null`                                          | "Beantwortet"-Tag                                                                                                                                |
| commands                        | [Array]<[Command](#Command)>                    | *regulärer Wert*                                | Liste aller geladenen Befehle und deren Parameter                                                                                                |
| commandTypes                    | [Command Types](#Command-Types)                 | *regulärer Wert*                                | Objekt mit allen DBM-Befehlsarten                                                                                                                |
| commandTypeNames                | [Command Type Names](#Command-Type-Names)       | *regulärer Wert*                                | Lesbaren Namen für alle Befehlsarten                                                                                                             |
| replacement-nicknames           | [Replacement Nicknames](#Replacement-Nicknames) | *regulärer Wert*                                | Liste von männlichen und weiblichen Ersatznamen für Benutzer, die Zeichen in ihrem Namen haben, welche nicht im QWERTZ-Tastaturlayout vorkommen  |
| advertisement-regex             | [RegExp]                                        | *regulärer Wert*                                | Der Reguläre Ausdruck (Regular Expression; RegEx), der verwendet wird, um Werbung (Links) in Profilen und Nachrichten zu erkennen                |
| advertisement-exceptions        | [RegExp]                                        | *regulärer Wert*                                | Ausnahmen für den Advertisement RegEx (Treffer sollten zuvor auf Discord-Einladungslinks geprüft werden, da Discord-Links generell erlaubt sind) |
| holiday                         | [string] / `null`                               | *regulärer Wert*                                | Sollte der aktuelle Tag ein deutscher Feiertag sein, dann ist dessen Name in der Variable, ansonsten `null` (wird täglich aktualisiert)          |


### Command

| Schlüssel             | Datentyp                      |
|-----------------------|-------------------------------|
| name                  | [string]                      |
| description           | [string]                      |
| parameters            | [ApplicationCommandOption]    |
| type                  | [ApplicationCommandType]      |


### Command Types

| Schlüssel             | Wert ([string])       |
|-----------------------|-----------------------|
| TEXT                  | 0                     |
| INCLUDES_WORD         | 1                     |
| REGEX                 | 2                     |
| ANY_MESSAGE           | 3                     |
| SLASH                 | 4                     |
| USER_MENU             | 5                     |
| MSG_MENU              | 6                     |


### Command Type Names

| Schlüssel             | Wert ([string])       |
|-----------------------|-----------------------|
| 0                     | Text Command          |
| 1                     | Includes Word         |
| 2                     | Regular Expression    |
| 3                     | Any Message           |
| 4                     | Slash Command         |
| 5                     | User Menu Command     |
| 6                     | Message Menu          |


### Replacement Nicknames

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

<sup>1</sup> Bei diesem Namen besteht im "Nicknamen prüfen"-Event eine 50-prozentige Chance, dass es stattdessen Mathilda Jonas sein wird.



## Funktionen


### Resolve Command Type | ${`globalVars("resolveCommandType")`}

Eine Funktion zum Auflösen der Befehlsarten zu lesbaren Namen. Beispiel:
```js
let internalType = "4";
let readableType = globalVars("resolveCommandType")(commandType);
console.log(readableType); // Slash Command
```


### Break Text | ${`globalVars("breakText")`}

Eine Funktion, um Texte falls nötig abzubrechen und das Ende mit Abbruchzeichen zu ersetzen. Beispiel:
```js
let text1 = "DBM German";
let text2 = "DBM German Bot";
console.log(globalVars("breakText")(text1, 10)); // DBM German
console.log(globalVars("breakText")(text2, 10)); // DBM Ger...
console.log(globalVars("breakText")(text2, 10, " [...]")); // DBM  [...]
```


### Is Nitro Booster | ${`globalVars("isNitroBooster")`}

Eine Funktion zum Prüfen, ob ein Mitglied ein Nitro Booster ist. Beispiel:
```js
let member = tempVars("member");
let status = globalVars("isNitroBooster")(member);
console.log(status); // true / false
```


### Is Bot Owner | ${`globalVars("isBotOwner")`}

Eine Funktion zum Prüfen, ob ein Mitglied der Bot-Eigentümer ist. Beispiel:
```js
let member = tempVars("member");
let status = globalVars("isBotOwner")(member);
console.log(status); // true / false
```


### Levenshtein | ${`globalVars("levenshtein")`}

Eine Funktion zum Berechnen der Levenshtein-Distanz zwischen zwischen zwei Zeichenfolgen. Beispiel:
```js
let a = "sample";
let b = "example";
let distance = globalVars("levenshtein")(a, b);
console.log(distance); // 2
```



[string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[Array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
[RegExp]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
[ApplicationCommandOption]: https://old.discordjs.dev/#/docs/discord.js/v13/typedef/ApplicationCommandOption
[ApplicationCommandType]: https://old.discordjs.dev/#/docs/discord.js/v13/typedef/ApplicationCommandType