# Global variables


## Version | ${`globalVars("version")`}

The current version of the bot as text. Examples:
- "3.0"
- "3.0-beta"


## Debug | ${`globalVars("debug")`}

A boolean that defines whether this is a debug instance or not. If the client id is "724335784798322833", then the variable will be 'false', otherwise it's 'true'.


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