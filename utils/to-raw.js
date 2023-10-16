import { access, readdir, readFile, rm, stat, writeFile } from "fs/promises";

import { RAW_DIR, BOT_DIR, FS_R, FS_RW, RAW_DATA_TYPES, ENCODING } from "./support/constants.js";


/**
 * @typedef RawData
 * @type {{ name: string; _id: string; actions: any[] }}
 */

/**
 * @typedef RawDataContainer
 * @type { Map<string, RawData[]> }
 */


// Start
console.log("Konvertiere DBM-Dateien zu Raw Datas...");

// Check permissions for bot directory
try {
    await access(BOT_DIR, FS_R);
} catch(e) {
    console.error(`Auf Bot-Verzeichnis kann nicht zugegriffen werden: ${e}`);
    process.exit(1);
}

// Check permissions for raw directory
try {
    await access(RAW_DIR, FS_RW);
} catch(e) {
    console.error(`Auf Raw Data-Verzeichnis kann nicht zugegriffen werden: ${e}`);
    process.exit(1);
}

// Convert

/**
 * @type {RawDataContainer}
 */
let container = new Map();

try {
    for(let entry of await readdir(`${BOT_DIR}/data`)) {
        let path = `${BOT_DIR}/data/${entry}`;
        let info = await stat(path);

        if(!info.isFile() || !entry.endsWith(".json") || !RAW_DATA_TYPES.includes(entry.substring(0, entry.length - 5))) continue;

        container.set(entry.substring(0, entry.length - 5), await readDBM(path));
    }

    for(let [type, raws] of container) {
        await writeRaws(`${RAW_DIR}/${type}`, raws);
    }
} catch(e) {
    console.error(`Daten können nicht konvertiert werden: ${e}`);
    process.exit(1);
}

// Exit
console.log("Konvertierung abgeschlossen.");
process.exit(0);


/**
 * Read DBM data file
 * @param {string} file File path
 * @returns {Promise<RawData[]>} Bundled raw datas of one type
 */
async function readDBM(file) {
    return JSON.parse(await readFile(file, { encoding: ENCODING })).slice(1);
}

/**
 * Write raw data files
 * @param {string} dir Directory path
 * @param {RawData[]} data Bundled raw datas of one type
 */
async function writeRaws(dir, data) {
    let filesToRemove = (await readdir(dir)).filter(file => {
        if(!file.endsWith(".json")) return false;

        return !data.some(raw => raw.name == file.substring(0, file.length - 5));
    });

    await Promise.all(filesToRemove.map(file => rm(`${dir}/${file}`)));

    for(let raw of data) {
        let path = `${dir}/${raw.name}.json`;

        await writeFile(path, JSON.stringify(raw, null, 4), { encoding: ENCODING });
    }
}