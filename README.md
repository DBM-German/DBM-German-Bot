<h1 align="center">
   <img src="res/v3/dbm-german-bot.png" alt="DBM German Bot Logo" width="256em"><br>
   DBM German Bot
</h1>

<p align="center">The official bot of the DBM German Discord server.</p>

## License

This bot is licensed under a
[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License][Licence-CC-BY-NC-SA].

[![Creative Commons License](https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png)]

## EN | How to get started

The following explains how to setup and start the bot. Please note that neither a bot token nor client id are provided.
Should the used bot not be on the DBM German servers, the IDs in the initialization event have to be adjusted.

1. Create a fork of the repository (optional)
2. Clone the fork to your local machine
3. Make sure Steam and Discord Bot Maker 2.0 (without mods!) are installed
   - Steam Client – Download: <https://store.steampowered.com/about/>
   - Discord Bot Maker 2.0 – Steam Website: <https://s.team/a/682130> | Steam Client: <steam://store/682130>
4. Run the setup via `npm run setup`
5. Open the project in DBM
6. Set a bot token in the settings
7. Start the bot using `npm run start`

## DE | Wie man loslegt

Nachfolgend wird erklärt, wie man den Bot aufsetzt und startet. Bitte beachte, dass weder Bot-Token
noch Client-ID bereitgestellt werden. Sollte der verwendete Bot nicht auf den DBM German Servern sein,
müssen die IDs im Initialisierungsevent angepasst werden.

1. Erstelle einen Fork von dem Repository (optional)
2. Klone den Fork auf deine lokale Maschine
3. Stelle sicher, dass Steam und Discord Bot Maker 2.0 (ohne Mods!) installiert sind
   - Steam Client – Download: <https://store.steampowered.com/about/>
   - Discord Bot Maker 2.0 – Steam Website: <https://s.team/a/682130> | Steam Client: <steam://store/682130>
4. Führe das Setup aus via `npm run setup`
5. Öffne das Projekt in DBM
6. Lege einen Bot-Token in den Einstellungen fest
7. Starte den Bot mittels `npm run start`

## EN | How to edit the bot

Generally speaking, the bot should only be edited via DBM. Other changes can howevery be made manually in the `raw`
or `res` folder. For synchronization of all changes, there are the following scripts available.

| NPM script | Description                                                                                                       |
|------------|-------------------------------------------------------------------------------------------------------------------|
| setup      | Set up the bot for editing/debugging via DBM                                                                      |
| start      | Start the bot directly using the local Node.js installation                                                       |
| build      | Build the Docker image with your system architecture (should be x64/x86)                                          |
| build-arm  | Build the Docker image with the arm32v7 architecture (for use with systems like the Raspberry Pi)                 |
| to-dbm     | Raw data files in the folders `raw/commands` and `raw/events` get konverted to DBM files and saved in `bot/data`. |
| to-raw     | DBM files in the `bot/data` folder get konverted to raw data files and saved in `raw/commands` / `raw/events`.    |
| copy-code  | Additional code in the `raw/code` folder gets copied to `bot/code`.                                               |
| copy-res   | Resources in the `res` folder gets copied to `bot/resources`.                                                     |
| lint       | Run linters to check source file formatting (includes Markdown docs)                                              |

## DE | Wie man den Bot bearbeitet

Grundsätzlich sollte der Bot nur über DBM bearbeitet werden. Sonstige Änderungen können jedoch auch manuell im `raw`-
oder `res`-Ordner vorgenommen werden. Zur Synchronisation aller Änderungen stehen nachfolgende Skripte zur Verfügung.

| NPM-Skript | Beschreibung                                                                                                                     |
|------------|----------------------------------------------------------------------------------------------------------------------------------|
| setup      | Setze den Bot für Bearbeitung/Fehlersuche auf                                                                                    |
| start      | Starte den Bot direkt mittels der lokalen Node.js installation                                                                   |
| build      | Baue das Docker-Image mit deiner System-Architektur (sollte x64/x86 sein)                                                        |
| build-arm  | Baue das Docker-Image mit der arm32v7-Architektur (für Verwendung mit Systemen wie dem Raspberry Pi)                             |
| to-dbm     | Raw Data-Dateien in den Ordnern `raw/commands` und `raw/events` werden zu DBM-Dateien konvertiert und in `bot/data` gespeichert. |
| to-raw     | DBM-Dateien in dem `bot/data`-Ordner werden zu Raw Data-Dateien konvertiert und in `raw/commands` / `raw/events` gespeichert.    |
| copy-code  | Zusätzlicher Code in dem `raw/code`-Ordner wird nach `bot/code` kopiert.                                                         |
| copy-res   | Resourcen in dem `res`-Ordner werden nach `bot/resources` kopiert.                                                               |
| lint       | Führe Linter aus, um die Quelldatei-Formatierung zu prüfen (beinhaltet Markdown-Doku)                                            |

## EN | How to run the bot with Docker

1. Build the Docker image via `npm run build` / `npm run build-arm`
2. Create a data directory or Docker volume on your host machine and copy the DBM data files into it
3. Open the copied `settings.json` and insert the bot token and client id
4. Start a container using `docker run` and a mount to the data directory

Example to start the bot with a mount to the `dbm-data` folder:

`
docker run
--name dbm-german-bot
--mount "type=bind,source=$(pwd)/data,target=/mnt/dbm-data"
--env-file .env
dbm-german-bot:3.1.2
`

> Required environment variables: DBM_CLIENT_TOKEN, DBM_CLIENT_ID

The parameters `--detach` and `--restart always` can be used to run the container in the background
and restart it automatically.

Alternatively you can start the bot using Docker Compose. To do so, create a `.env` file,
add the environment variables for the bot's ID and token and then start it via `docker compose up`.

## DE | Wie man den Bot mit Docker laufen lässt

1. Baue das Docker-Image via `npm run build` / `npm run build-arm`
2. Erstelle ein Daten-Verzeichnis oder Docker-Volume auf deinem Host-Rechner und kopiere die DBM-Datendateien hinein
3. Öffne die kopierte `settings.json` und füge den Bot-Token und die Client-ID ein
4. Starte den Container mittels `docker run` und einem Mount zum Daten-Verzeichnis

Beispiel zum Starten des Bots mit einem Mount zum `dbm-data`-Ordner:

`
docker run
--name dbm-german-bot
--mount "type=bind,source=$(pwd)/data,target=/mnt/dbm-data"
--env-file .env
dbm-german-bot:3.1.2
`

> Benötigte Umgebungsvariablen: DBM_CLIENT_TOKEN, DBM_CLIENT_ID

Die Parameter `--detach` und `--restart always` können verwendet werden, um den Container im Hintergrund auszuführen
und ihn automatisch neu zu starten.

Alternativ kannst du den Bot mittels Docker Compose starten. Um das zu tun, erstelle eine `.env`-Datei,
füge die Umgebungsvariablen für die ID und den Token des Bots hinzu und starte ihn dann via `docker compose up`.

[Licence-CC-BY-NC-SA]: https://creativecommons.org/licenses/by-nc-sa/4.0/
