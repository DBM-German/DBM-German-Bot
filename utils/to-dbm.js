import { constants } from "fs";
import { access, readdir, readFile, stat, writeFile } from "fs/promises";


const RAW_DIR = "./raw";
const BOT_DIR = "./bot";
const FS_R = constants.F_OK | constants.R_OK;
const FS_RW = FS_R | constants.W_OK;


/**
 * @typedef RawData
 * @type {{ name: string; _id: string; actions: any[] }}
 */

/**
 * @typedef RawDataContainer
 * @type { Map<string, RawData[]> }
 */

/**
 * File encoding
 * @type {BufferEncoding}
 */
const ENCODING = "utf8";

/**
 * Raw data types
 * @type {string[]}
 */
const TYPES = JSON.parse(await readFile("./utils/types.json"), { encoding: ENCODING });


// Start
console.log("Konvertiere Raw Datas zu DBM-Dateien...");

// Check permissions for raw directory
try {
    await access(RAW_DIR, FS_R);
} catch(e) {
    console.log(`Auf Raw Data-Verzeichnis kann nicht zugegriffen werden: ${e}`);
    process.exit(1);
}

// Check permissions for bot directory
try {
    await access(BOT_DIR, FS_RW);
} catch(e) {
    console.log(`Auf Bot-Verzeichnis kann nicht zugegriffen werden: ${e}`);
    process.exit(1);
}

// Convert

/**
 * @type {RawDataContainer}
 */
let container = new Map();

for(let entry of await readdir(RAW_DIR)) {
    let path = `${RAW_DIR}/${entry}`;
    let info = await stat(path);

    if(!info.isDirectory() || !TYPES.includes(entry)) continue;

    container.set(entry, await readRaws(path));
}

for(let [type, raws] of container) {
    await writeDBM(`${BOT_DIR}/data/${type}.json`, raws);
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