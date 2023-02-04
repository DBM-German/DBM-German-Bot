# Global variables


## Version | ${`globalVars("version")`}

The current version of the bot as text. Examples:
- "3.0"
- "3.0-beta"


## Debug | ${`globalVars("debug")`}

A boolean that defines whether this is a debug instance or not. If the client id is "724335784798322833", then the variable will be 'false', otherwise it's 'true'.


## Default Color | ${`globalVars("default-color")`}

The default color of the bot (#fff700).


## Success Color | ${`globalVars("success-color")`}

The success color of the bot (#3fff3f).


## Failure Color | ${`globalVars("failure-color")`}

The failure color of the bot (#ff3f3f).


## Info Color | ${`globalVars("info-color")`}

The information color of the bot (#3f3fff).


## Warning Color | ${`globalVars("warning-color")`}
The warning color of the bot (ffff3f).


## Main Server ID | ${`globalVars("main-server-id")`}

Depending on whether `globalVars("version")` is 'true', the ID of our DBM German Beta ("724330774257729647") or DBM German server ("488722832201613344").


## Team Server ID | ${`globalVars("team-server-id")`}

The ID of our DBM German Team server ("533618507699585035").


## Fake Server ID | ${`globalVars("fake-server-id")`}

The ID of our fake DBM German Team server ("731837587836371024"). This server is a troll / easter egg in the server list.


## Main Welcome / Goodbye Channel ID | ${`globalVars("main-welcome-goodbye-channel-id")`}

Depending on whether `globalVars("version")` is 'true', the ID of our DBM German Beta ("724330774966435852") or DBM German welcome / goodbye channel ("488736789092237322").


## Team Welcome / Goodbye Channel ID | ${`globalVars("team-welcome-goodbye-channel-id")`}

Depending on whether `globalVars("version")` is 'true', the ID of our DBM German Beta ("756233531356610580") or DBM German Team welcome / goodbye channel ("559419622667845633").


## Rule Channel ID | ${`globalVars("rule-channel-id")`}

Depending on whether `globalVars("version")` is 'true', the ID of our DBM German Beta ("724331029359493120") or DBM German rules channel ("514896934411042834").


## Serverlist Channel ID | ${`globalVars("serverlist-channel-id")`}

Depending on whether `globalVars("version")` is 'true', the ID of our DBM German Beta ("724331017401532446") or DBM German serverlist channel ("488734739000328202").


## FAQ Channel ID | ${`globalVars("faq-channel-id")`}

Depending on whether `globalVars("version")` is 'true', the ID of our DBM German Beta ("724331079619706910") or DBM German faq channel ("547530904453775390").


## Hidden Role ID | ${`globalVars("hidden-role-id")`}

Depending on whether `globalVars("version")` is 'true', the ID of our DBM German Beta ("724335094281666642") or DBM German hidden role ("663781677016809504").


## Commands | ${`globalVars("commands")`}

A list of all available commands and their parameters. Structure of the commands:

| Key                   | Type of value                 |
|-----------------------|-------------------------------|
| name                  | String                        |
| description           | String                        |
| parameters            | [ApplicationCommandOptionData](https://discord.js.org/#/docs/discord.js/main/typedef/ApplicationCommandOptionData)  |
| type                  | [ApplicationCommandType](https://discord-api-types.dev/api/discord-api-types-v10/enum/ApplicationCommandType)        |


## Command Types | ${`globalVars("commandTypes")`}

An object with all of DBM's internal command types. Structure of the object:

| Key                   | Value (String)        |
|-----------------------|-----------------------|
| TEXT                  | 0                     |
| INCLUDES_WORD         | 1                     |
| REGEX                 | 2                     |
| ANY_MESSAGE           | 3                     |
| SLASH                 | 4                     |
| USER_MENU             | 5                     |
| MSG_MENU              | 6                     |


## Command Type Names | ${`globalVars("commandTypeNames")`}

An object with readable names for DBM's command types. Structure of the object:

| Key                   | Value (String)        |
|-----------------------|-----------------------|
| 0                     | Text Command          |
| 1                     | Includes Word         |
| 2                     | Regular Expression    |
| 3                     | Any Message           |
| 4                     | Slash Command         |
| 5                     | User Menu Command     |
| 6                     | Message Menu          |


## Resolve Command Type | ${`globalVars("resolveCommandType")`}

A function to resolve command types to readable names. Example:
```js
let internalType = "4";
let readableType = globalVars("resolveCommandType")(commandType);
console.log(readableType); // Slash Command
```


## Replacement Nicknames | ${`globalVars("replacement-nicknames")`}

A list of male and female nickname replacements for users who have nicknames with characters that aren't available on a keyboard with QWERTZ layout.

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

<sup>1</sup> With this name, there's a 50 percent chance that it'll be Mathilda Jonas instead.


## Advertisement RegEx | ${`globalVars("advertisement-regex")`}

The regular expression used to detect ads in the names and custom status of users.