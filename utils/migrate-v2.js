import { access, readFile, writeFile } from "fs/promises";

import { BOT_DIR, BOT_DATA_DIR, FS_R, FS_RW, ENCODING } from "./support/constants.js";


const V2_DIR = "./v2";
const V2_DATA_DIR = `${V2_DIR}/data`;


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

    // Levels and xp can be passed through as the old schema matches the new one
    await writeFile(`${BOT_DATA_DIR}/players.json`, JSON.stringify(levels), { encoding: ENCODING });
} catch(e) {
    console.error(`Daten können nicht migriert werden: ${e}`);
    process.exit(1);
}


// Exit
console.log("Migration abgeschlossen.");
process.exit(0);