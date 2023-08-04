# Global variables

Global variables can be divided in two categories:
- [Constants](#Constants)
- [Functions](#Functions)



## Constants

| Variable                        | Regulärer Wert                                  | Wert im Debug-Modus                             | Beschreibung                                                                                                                                     |
|---------------------------------|-------------------------------------------------|-------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| version                         | *aktuelle Version*                              | *regulärer Wert*                                | The current version of the bot as text (Examples: "3.0", "3.0-beta")                                                                             |
| debug                           | `false`                                         | `true`                                          | A boolean that defines whether this is the beta bot or not (for the client id "724335784798322833" it is `false`, otherwise `true`)              |
| github-link                     | `https://github.com/dbm-german/DBM-German-Bot`  | *regulärer Wert*                                | Link to the GitHub repository of the DBM German Bot                                                                                              |
| default-color                   | `#fff700`                                       | *regulärer Wert*                                | Default color of the bot                                                                                                                         |
| success-color                   | `#3fff3f`                                       | *regulärer Wert*                                | Success color of the bot                                                                                                                         |
| failure-color                   | `#ff3f3f`                                       | *regulärer Wert*                                | Failure color of the bot                                                                                                                         |
| info-color                      | `#3f3fff`                                       | *regulärer Wert*                                | Information color of the bot                                                                                                                     |
| warning-color                   | `#ffff3f`                                       | *regulärer Wert*                                | Warning color of the bot                                                                                                                         |
| main-server-id                  | `488722832201613344` (DBM German)               | 724330774257729647 (DBM German Beta)            | Main server                                                                                                                                      |
| team-server-id                  | `533618507699585035` (DBM German Team)          | *regulärer Wert*                                | Team server                                                                                                                                      |
| fake-server-id                  | `731837587836371024` (Fake DBM German Team)     | *regulärer Wert*                                | Fake team server (troll / easter egg)                                                                                                            |
| main-welcome-goodbye-channel-id | `488736789092237322`                            | `724330774966435852`                            | Welcome / goodbye channel                                                                                                                        |
| team-welcome-goodbye-channel-id | `559419622667845633`                            | `756233531356610580`                            | Team welcome / goodbye channel                                                                                                                   |
| rule-channel-id                 | `514896934411042834`                            | `724331029359493120`                            | Rules channel                                                                                                                                    |
| serverlist-channel-id           | `488734739000328202`                            | `724331017401532446`                            | Serverlist channel                                                                                                                               |
| faq-channel-id                  | `547530904453775390`                            | `724331079619706910`                            | FAQ channel                                                                                                                                      |
| help-channel-id                 | `1047167552792563712`                           | `724331258351452251`                            | Help channel                                                                                                                                     |
| hidden-role-id                  | `663781677016809504`                            | `724335094281666642`                            | "Hidden" role                                                                                                                                    |
| answered-tag-id                 | `1047539260724613140`                           | `null`                                          | "Beantwortet" tag                                                                                                                                |
| commands                        | [Array]<[Command](#Command)>                    | *regulärer Wert*                                | List of all loaded commands and their parameters                                                                                                 |
| commandTypes                    | [Command Types](#Command-Types)                 | *regulärer Wert*                                | Object with all DBM command types                                                                                                                |
| commandTypeNames                | [Command Type Names](#Command-Type-Names)       | *regulärer Wert*                                | Readable names for all command types                                                                                                             |
| replacement-nicknames           | [Replacement Nicknames](#Replacement-Nicknames) | *regulärer Wert*                                | List of male and female replacement names for users that have characters in their names that do not exist on the QWERTZ keyboard layout          |
| advertisement-regex             | [RegExp]                                        | *regulärer Wert*                                | The Regular Expression (RegEx) that is used to detect advertisements (links) in profiles and messages                                            |
| advertisement-exceptions        | [RegExp]                                        | *regulärer Wert*                                | Exceptions for the Advertisement RegEx (hits should be checked for Discord invite links in advance because Discord generally are allowed)        |
| holiday                         | [string] / `null`                               | *regulärer Wert*                                | Should the current day be a German public holiday then its name is in the variable, otherwise `null` (gets updated daily)                        |


### Commands

| Key                   | Type of value                 |
|-----------------------|-------------------------------|
| name                  | [string]                      |
| description           | [string]                      |
| parameters            | [ApplicationCommandOption]    |
| type                  | [ApplicationCommandType]      |


### Command Types

| Key                   | Value ([string])      |
|-----------------------|-----------------------|
| TEXT                  | 0                     |
| INCLUDES_WORD         | 1                     |
| REGEX                 | 2                     |
| ANY_MESSAGE           | 3                     |
| SLASH                 | 4                     |
| USER_MENU             | 5                     |
| MSG_MENU              | 6                     |


### Command Type Names

| Key                   | Value ([string])      |
|-----------------------|-----------------------|
| 0                     | Text Command          |
| 1                     | Includes Word         |
| 2                     | Regular Expression    |
| 3                     | Any Message           |
| 4                     | Slash Command         |
| 5                     | User Menu Command     |
| 6                     | Message Menu          |


### Replacement Nicknames

| Male (11)             | Female (11)           |
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

<sup>1</sup> With this name, there's a 50 percent chance in the "Nicknamen prüfen" (check nickname) event that it'll be Mathilda Jonas instead.



## Functions


### Resolve Command Type | ${`globalVars("resolveCommandType")`}

A function to resolve command types to readable names. Example:
```js
let internalType = "4";
let readableType = globalVars("resolveCommandType")(commandType);
console.log(readableType); // Slash Command
```


### Break Text | ${`globalVars("breakText")`}

A function to break texts if needed and replace the end with break characters. Example:
```js
let text1 = "DBM German";
let text2 = "DBM German Bot";
console.log(globalVars("breakText")(text1, 10)); // DBM German
console.log(globalVars("breakText")(text2, 10)); // DBM Ger...
console.log(globalVars("breakText")(text2, 10, " [...]")); // DBM  [...]
```


### Is Nitro Booster | ${`globalVars("isNitroBooster")`}

A function to check if a member is a Nitro booster. Example:
```js
let member = tempVars("member");
let status = globalVars("isNitroBooster")(member);
console.log(status); // true / false
```


### Is Bot Owner | ${`globalVars("isBotOwner")`}

A function to check if a member is the bot owner. Example:
```js
let member = tempVars("member");
let status = globalVars("isBotOwner")(member);
console.log(status); // true / false
```


### Levenshtein | ${`globalVars("levenshtein")`}

A function to calculate the levenshtein distance between to strings. Example:
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