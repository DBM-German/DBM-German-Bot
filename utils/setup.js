import { exec as execCb } from "child_process";
import { constants } from "fs";
import { access, cp, readFile, rm, writeFile } from "fs/promises";
import { arch as osArch, type as osType } from "os";
import { promisify } from "util";
import { promisified as regedit } from "regedit";
import * as VDF from "vdf-parser";

const exec = promisify(execCb);


const RAW_DIR = "./raw";
const RAW_DATA_DIR = `${RAW_DIR}/data`;
const BOT_DIR = "./bot";
const BOT_DATA_DIR = `${BOT_DIR}/data`;
const BOT_ACTIONS_DIR = `${BOT_DIR}/actions`;
const STEAM_REG_KEY_32 = "HKLM\\SOFTWARE\\Valve\\Steam";
const STEAM_REG_KEY_64 = "HKLM\\SOFTWARE\\Wow6432Node\\Valve\\Steam";
const STEAM_REG_VAL_PATH = "InstallPath";
const STEAM_LIB_CONFIGS = [ "config/libraryfolders.vdf", "steamapps/libraryfolders.vdf" ];
const DBM_ID = "682130";
const DBM_FOLDER = "steamapps/common/Discord Bot Maker";
const DBM_TEMPLATE_FOLDER = "resources/app/bot";
const DBM_ACTIONS_FOLDER = "actions";
const FS_R = constants.F_OK | constants.R_OK;
const FS_RW = FS_R | constants.W_OK;


/**
 * @typedef DBMSettings
 * @type {{ token: string; client: string; tag: string; case: boolean | `${boolean}`; separator: string; commandsOrder: string[]; eventsOrder: string[]; modules: {[dependency: string]: [string, boolean]}; ownerId: string; invalidUserText: string; invalidSelectText: string; invalidButtonText: string; leaveVoiceTimeout: number; slashType: string; slashServers: string; autoResponseText: string; invalidPermissionsText: string; invalidCooldownText: string; noDescriptionText: string; [extension: string]: {customData: {[data: string]: any}} }}
 */

/**
 * @typedef DBMPackage
 * @type {{ name: string; author: string; main: string; version: string; dependencies: {[dependency: string]: string} }}
 */

/**
 * @typedef RegValue
 * @type {{ type: "REG_SZ"; value: string } | { type: "REG_DWORD" | "REG_QWORD"; value: number } | { type: "REG_MULTI_SZ"; value: string[] } | { type: "REG_BINARY"; value: number[] }}
 */

/**
 * @typedef SteamRegEntry
 * @type {{ exists: boolean; keys: string[]; values: { [name: string]: RegValue } }}
 */

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

// Check os type for Windows
if(osType() != "Windows_NT") {
    console.error("Discord Bot Maker wird nur für Windows unterstützt.");
    process.exit(1);
}

// Find Steam directory
let steamDir = await findSteamDir();

// Check permissions for Steam directory
try {
    await access(steamDir, FS_R);
} catch(e) {
    console.error(`Auf Steam-Verzeichnis kann nicht zugegriffen werden: ${e}`);
    process.exit(1);
}

// Find DBM directory
let dbmDir = await findDBM();

// Check permissions for DBM directory
try {
    await access(dbmDir, FS_R);
} catch(e) {
    console.error(`Auf Discord Bot Maker-Verzeichnis kann nicht zugegriffen werden: ${e}`);
    process.exit(1);
}

// Check permissions for DBM template folder
try {
    await access(`${dbmDir}/${DBM_TEMPLATE_FOLDER}`, FS_R);
} catch(e) {
    console.error(`Auf Discord Bot Maker-Template-Ordner kann nicht zugegriffen werden: ${e}`);
    process.exit(1);
}

// Check permissions for DBM actions folder
try {
    await access(`${dbmDir}/${DBM_ACTIONS_FOLDER}`, FS_R);
} catch(e) {
    console.error(`Auf Discord Bot Maker-Actions-Ordner kann nicht zugegriffen werden: ${e}`);
    process.exit(1);
}

// Check permissions for bot directory
let botDirExists;

try {
    await access(BOT_DIR, FS_RW);
    botDirExists = true;
} catch(e) {
    try {
        await access(BOT_DIR);
        botDirExists = true;
        console.error(`Auf Bot-Verzeichnis kann nicht zugegriffen werden: ${e}`);
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
        console.error(`Bot-Verzeichnis kann nicht gelöscht werden: ${e}`);
        process.exit(1);
    }
}

// Copy template and actions from DBM installation directory
try {
    console.log("Kopiere DBM-Template und -Actions...");
    await cp(`${dbmDir}/${DBM_TEMPLATE_FOLDER}`, BOT_DIR, { recursive: true });
    await cp(`${dbmDir}/${DBM_ACTIONS_FOLDER}`, BOT_ACTIONS_DIR, { recursive: true });
} catch (e) {
    console.error(`Template oder Actions können nicht kopiert werden: ${e}`);
    process.exit(1);
}

// Copy bot data
try {
    console.log("Kopiere Bot-Daten...");
    await cp(RAW_DATA_DIR, BOT_DATA_DIR, { recursive: true, filter: source => source.endsWith(".json") });
} catch(e) {
    console.error(`Bot-Daten können nicht kopiert werden: ${e}`);
    process.exit(1);
}

// Apply Module Manager settings
try {
    console.log("Wende Module Manager-Einstellungen an...");
    /**
     * @type {DBMSettings}
     */
    let settings = JSON.parse(await readFile(`${BOT_DATA_DIR}/settings.json`, { encoding: ENCODING }));
    /**
     * @type {DBMPackage}
     */
    let project = JSON.parse(await readFile(`${BOT_DIR}/package.json`, { encoding: ENCODING }));

    for(let [dependency, [version, installed]] of Object.entries(settings.modules)) {
        if(installed && version?.length > 0) project.dependencies[dependency] = version;
    }

    await writeFile(`${BOT_DIR}/package.json`, JSON.stringify(project, null, 4), { encoding: ENCODING });
} catch(e) {
    console.error("Module Manager-Einstellungen können nicht angewendet werden...");
    process.exit(1);
}

// Run NPM install
try {
    console.log("Installiere Node-Module...");
    await exec("npm i", { cwd: BOT_DIR, windowsHide: true, encoding: ENCODING });
} catch (e) {
    console.error(`Node-Module können nicht installiert werden: ${e}`);
    process.exit(1);
}

// Exit
console.log("Einrichtung abgeschlossen.");
process.exit(0);


/**
 * Find Steam installation directory
 * @returns {Promise<string>} Directory path
 */
async function findSteamDir() {
    /**
     * @type SteamRegEntry
     */
    let registryEntry;

    try {
        let is64 = osArch() == "x64";
        registryEntry = (await regedit.list(is64 ? STEAM_REG_KEY_64 : STEAM_REG_KEY_32))[is64 ? STEAM_REG_KEY_64 : STEAM_REG_KEY_32];
    } catch(e) {
        console.error(`Auf die Windows-Registry kann nicht zugegriffen werden: ${e}`);
        process.exit(1);
    }

    if(!registryEntry.exists) {
        console.error("Steam Registry-Eintrag kann nicht gefunden werden. Eventuell ist Steam nicht korrekt installiert.");
        process.exit(1);
    }

    return registryEntry.values[STEAM_REG_VAL_PATH].value.replace(/\\\\/g, "/");
}

/**
 * Find library folders config and extract library folders
 * @returns {Promise<SteamLibFolders>} Library info
 * @see findDBM Called by the findDBM function
 */
async function findSteamLibFolders() {
    /**
     * @type SteamLibFolders
     */
    let libraryfolders;
    let errors = [];

    for(let config of STEAM_LIB_CONFIGS) {
        try {
            await access(`${steamDir}/${config}`, FS_R);
            ({ libraryfolders } = VDF.parse(await readFile(`${steamDir}/${config}`, { encoding: ENCODING })));
            break;
        } catch(e) {
            errors.push(e);
        }
    }

    if(errors.length > 0 && !libraryfolders) {
        console.error(`Auf Steam Bibliotheken-Konfiguration kann nicht zugegriffen werden: ${errors.map(e => e?.toString())}`);
        process.exit(1);
    }

    return libraryfolders;
}

/**
 * Find Steam library in which DBM is installed and extract its installation directory
 * @returns {Promise<string>} Directory path
 */
async function findDBM() {
    let libraryfolders = await findSteamLibFolders();
    let dbmDir;

    for(let library of Object.values(libraryfolders)) {
        if(Object.keys(library.apps).includes(DBM_ID)) {
            dbmDir = `${library.path.replace(/\\\\/g, "/")}/${DBM_FOLDER}`;
            break;
        }
    }
    
    if(!dbmDir) {
        console.error("Discord Bot Maker-Verzeichnis kann nicht gefunden werden. Eventuell muss Steam neu gestartet werden.");
        process.exit(1);
    }

    return dbmDir;
}