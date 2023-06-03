<div align="center">
    <img src="res/v3/dbm-german-bot.png" alt="DBM German Bot Logo" width="256em">
    <h1><b>DBM German Bot</b></h1>
    The official bot of the DBM German Discord server.
</div>

## License
This bot is licensed unter a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-nc-sa/4.0/).

[![Creative Commons License](https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png)]


## EN | How to get started

1. Create a fork of the repository
2. Clone the fork to your local machine
3. Make sure Steam and Discord Bot Maker 2.0 (unmodded!) are installed
   - Steam Client – Download: https://store.steampowered.com/about/
   - Discord Bot Maker 2.0 – Steam Website: https://s.team/a/682130 | Steam Client: steam://store/682130
4. Run the setup via `npm run setup`
5. Open the project in DBM
6. Set a bot token in the settings
7. Start the bot using `npm run start`


## DE | Wie man loslegt

1. Erstelle einen Fork von dem Repository
2. Klone den Fork auf deine lokale Maschine
3. Stelle sicher, dass Steam und Discord Bot Maker 2.0 (ungemodded!) installiert sind
   - Steam Client – Download: https://store.steampowered.com/about/
   - Discord Bot Maker 2.0 – Steam Website: https://s.team/a/682130 | Steam Client: steam://store/682130
4. Führe das Setup aus via `npm run setup`
5. Öffne das Projekt in DBM
6. Lege einen Bot-Token in den Einstellungen fest
7. Starte den Bot mittels `npm run start`


## EN | How to edit the bot

Generally speaking, the bot should only be edited via DBM. Other changes can howevery be made manually in the `raw` or `res` folder.
For synchronization of all changes, there are the following scripts available.

### to-dbm
Raw data files in the folders `raw/commands` and `raw/events` get konverted to DBM files and saved in `bot/data`.

### to-raw
DBM files in the `bot/data` folder get konverted to raw data files and saved in `raw/commands` / `raw/events`.

### copy-code
Additional code in the `raw/code` folder gets copied to `bot/code`.

### copy-res
Resources in the `res` folder gets copied to `bot/resources`.


## DE | Wie man den Bot bearbeitet

Grundsätzlich sollte der Bot nur über DBM bearbeitet werden. Sonstige Änderungen können jedoch auch manuell im `raw`- oder `res`-Ordner vorgenommen werden.
Zur Synchronisation aller Änderungen stehen nachfolgende Skripte zur Verfügung.

### to-dbm
Raw Data-Dateien in den Ordnern `raw/commands` und `raw/events` werden zu DBM-Dateien konvertiert und in `bot/data` gespeichert.

### to-raw
DBM-Dateien in dem `bot/data`-Ordner werden zu Raw Data-Dateien konvertiert und in `raw/commands` / `raw/events` gespeichert.

### copy-code
Zusätzlicher Code in dem `raw/code`-Ordner wird nach `bot/code` kopiert.

### copy-res
Resourcen in dem `res`-Ordner werden nach `bot/resources` kopiert.
