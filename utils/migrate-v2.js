import { constants } from "fs";
import { access, readFile, writeFile } from "fs/promises";


const V2_DIR = "./v2";
const V2_DATA_DIR = `${V2_DIR}/data`;
const V2_TEAM_DATA_DIR = `${V2_DATA_DIR}/team`;
const BOT_DIR = "./bot";
const BOT_DATA_DIR = `${BOT_DIR}/data`;
const FS_R = constants.F_OK | constants.R_OK;
const FS_RW = FS_R | constants.W_OK;


/**
 * File encoding
 * @type {BufferEncoding}
 */
const ENCODING = "utf8";


// Start
console.log("Migriere Daten von DBM German Bot v2 zu v3.");


// Check permissions for v2 directory
try {
    await access(V2_DIR, FS_R);
} catch(e) {
    console.error(`Auf V2-Verzeichnis kann nicht zugegriffen werden: ${e}`);
    process.exit(1);
}

// Check permissions for bot directory
try {
    await access(BOT_DIR, FS_RW);
} catch(e) {
    console.error(`Auf Bot-Verzeichnis kann nicht zugegriffen werden: ${e}`);
    process.exit(1);
}


// Migrate
try {
    let levels = JSON.parse(await readFile(`${V2_DATA_DIR}/levels.json`));
    let teamMetadata = JSON.parse(await readFile(`${V2_TEAM_DATA_DIR}/metadata.json`));// TODO New schema for team data is not final yet

    // Levels and xp can be passed through as the old schema matches the new one
    await writeFile(`${BOT_DATA_DIR}/players.json`, JSON.stringify(levels), { encoding: ENCODING });
} catch(e) {
    console.error(`Daten können nicht migriert werden: ${e}`);
    process.exit(1);
}


// Exit
console.log("Migration abgeschlossen.");
process.exit(0);