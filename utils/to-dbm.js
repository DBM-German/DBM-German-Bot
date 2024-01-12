import { access, readdir, readFile, stat, writeFile } from "fs/promises";

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
console.log("Konvertiere Raw Datas zu DBM-Dateien...");

// Check permissions for raw directory
try {
    await access(RAW_DIR, FS_R);
} catch(e) {
    console.error(`Auf Raw Data-Verzeichnis kann nicht zugegriffen werden: ${e}`);
    process.exit(1);
}

// Check permissions for bot directory
try {
    await access(BOT_DIR, FS_RW);
} catch(e) {
    console.error(`Auf Bot-Verzeichnis kann nicht zugegriffen werden: ${e}`);
    process.exit(1);
}

// Convert

/**
 * @type {RawDataContainer}
 */
let container = new Map();

try {
    for(let entry of await readdir(RAW_DIR)) {
        let path = `${RAW_DIR}/${entry}`;
        let info = await stat(path);
    
        if(!info.isDirectory() || !RAW_DATA_TYPES.includes(entry)) continue;
    
        container.set(entry, await readRaws(path));
    }
    
    for(let [type, raws] of container) {
        await writeDBM(`${BOT_DIR}/data/${type}.json`, raws);
    }
} catch(e) {
    console.error(`Daten können nicht konvertiert werden: ${e}`);
    process.exit(1);
}

// Exit
console.log("Konvertierung abgeschlossen.");
process.exit(0);


/**
 * Read raw data files
 * @param {string} dir Directory path
 * @returns {Promise<RawData[]>} Bundled raw datas of one type
 */
async function readRaws(dir) {
    let data = [];

    for(let entry of await readdir(dir)) {
        let path = `${dir}/${entry}`;
        let info = await stat(path);

        if(!info.isFile() || !entry.endsWith(".json")) continue;

        data.push(JSON.parse(await readFile(path, { encoding: ENCODING })));
    }

    return data;
}

/**
 * Write DBM data file
 * @param {string} file File path
 * @param {RawData[]} data Bundled raw datas of one type
 */
async function writeDBM(file, data) {
    await writeFile(file, JSON.stringify([ null, ...data ]), { encoding: ENCODING });
}
