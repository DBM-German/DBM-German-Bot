import { exec as execCb } from "child_process";
import { constants } from "fs";
import { access, cp, readFile, rm } from "fs/promises";
import { promisify } from "util";
import * as VDF from "vdf-parser";

const exec = promisify(execCb);


const RAW_DIR = "./raw";
const RAW_DATA_DIR = `${RAW_DIR}/data`;
const BOT_DIR = "./bot";
const BOT_DATA_DIR = `${BOT_DIR}/data`;
const BOT_ACTIONS_DIR = `${BOT_DIR}/actions`;
const STEAM_DIR = "C:/Program Files (x86)/Steam";
const STEAM_LIB_CONFIGS = [
    `${STEAM_DIR}/config/libraryfolders.vdf`,
    `${STEAM_DIR}/steamapps/libraryfolders.vdf`
];
const DBM_ID = "682130";
const DBM_TEMPLATE_FOLDER = "resources/app/bot";
const DBM_ACTIONS_FOLDER = "actions";


/**
 * @typedef SteamLibApps
 * @type {{ [appid: string]: string }}
 */

/**
 * @typedef SteamLibFolder
 * @type {{ path: string; label: string; contentid: number; totalsize: number; update_clean_bytes_tally: number; time_last_update_corruption: number; apps: SteamLibApps }}
 */

/**
 * @typedef SteamLibFolders
 * @type {{ [index: string]: SteamLibFolder }}
 */

/**
 * File encoding
 * @type {BufferEncoding}
 */
const ENCODING = "utf8";


// Start
console.log("Richte DBM-Projekt ein...");

// Check permissions for Steam directory
try {
    await access(STEAM_DIR, constants.F_OK | constants.R_OK);
} catch(e) {
    console.log(`Auf Steam-Verzeichnis kann nicht zugegriffen werden: ${e}`);
    process.exit(1);
}

// Find library folders config and extract library folders

/**
 * Steam library folders
 * @type SteamLibFolders
 */
let libraryfolders;
let errors = [];

for(let config of STEAM_LIB_CONFIGS) {
    try {
        await access(config, constants.F_OK | constants.R_OK);
        ({ libraryfolders } = VDF.parse(await readFile(config, { encoding: ENCODING })));
        break;
    } catch(e) {
        errors.push(e);
    }
}

if(errors.length > 0 && !libraryfolders) {
    console.log(`Auf Steam Bibliotheken-Konfiguration kann nicht zugegriffen werden: ${errors.map(e => e?.toString())}`);
    process.exit(1);
}

// Find Steam library in which DBM is installed
let dbmDir;

for(let library of Object.values(libraryfolders)) {
    if(Object.keys(library.apps).includes(DBM_ID)) {
        dbmDir = `${library.path.replace(/\\\\/g, "/")}/steamapps/common/Discord Bot Maker`;
        break;
    }
}

if(!dbmDir) {
    console.log("Discord Bot Maker-Verzeichnis kann nicht gefunden werden. Eventuell muss Steam neu gestartet werden.");
    process.exit(1);
}

// Check permissions for DBM template folder
try {
    await access(`${dbmDir}/${DBM_TEMPLATE_FOLDER}`, constants.F_OK | constants.R_OK);
} catch(e) {
    console.log(`Auf Discord Bot Maker-Template-Ordner kann nicht zugegriffen werden: ${e}`);
    process.exit(1);
}

// Check permissions for DBM actions folder
try {
    await access(`${dbmDir}/${DBM_ACTIONS_FOLDER}`, constants.F_OK | constants.R_OK);
} catch(e) {
    console.log(`Auf Discord Bot Maker-Actions-Ordner kann nicht zugegriffen werden: ${e}`);
    process.exit(1);
}

// Check permissions for bot directory
let botDirExists;

try {
    await access(BOT_DIR, constants.F_OK | constants.R_OK | constants.W_OK);
    botDirExists = true;
} catch(e) {
    try {
        await access(BOT_DIR);
        botDirExists = true;
        console.log(`Auf Bot-Verzeichnis kann nicht zugegriffen werden: ${e}`);
        process.exit(1);
    } catch {
        botDirExists = false;
    }
}

// Remove current bot directory if it exists
if(botDirExists) {
    try {
        console.log("Lösche Bot-Verzeichnis...");
        await rm(BOT_DIR, { recursive: true });
    } catch(e) {
        console.log(`Bot-Verzeichnis kann nicht gelöscht werden: ${e}`);
        process.exit(1);
    }
}

// Copy template and actions from DBM installation directory
try {
    console.log("Kopiere DBM-Template und -Actions...");
    await cp(`${dbmDir}/${DBM_TEMPLATE_FOLDER}`, BOT_DIR, { recursive: true });
    await cp(`${dbmDir}/${DBM_ACTIONS_FOLDER}`, BOT_ACTIONS_DIR, { recursive: true });
} catch (e) {
    console.log(`Template oder Actions können nicht kopiert werden: ${e}`);
    process.exit(1);
}

// Copy bot data
try {
    console.log("Kopiere Bot-Daten...");
    await cp(RAW_DATA_DIR, BOT_DATA_DIR, { recursive: true });
} catch(e) {
    console.log(`Bot-Daten können nicht kopiert werden: ${e}`);
    process.exit(1);
}

// Run NPM install
try {
    console.log("Installiere Node-Module...");
    await exec("npm i", { cwd: BOT_DIR, windowsHide: true, encoding: ENCODING });
} catch (e) {
    console.log(`Node-Module können nicht installiert werden: ${e}`);
    process.exit(1);
}

// Exit
console.log("Einrichtung abgeschlossen.");
process.exit(0);