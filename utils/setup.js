import { exec as execCb } from "child_process";
import { access, cp, readFile, rm, stat, writeFile } from "fs/promises";
import { promisify } from "util";

import {
    OS_TYPE,
    FS_R,
    FS_RW,
    RAW_DIR,
    RAW_DATA_DIR,
    RAW_CODE_DIR,
    RES_DIR,
    BOT_DIR,
    BOT_DATA_DIR,
    BOT_CODE_DIR,
    BOT_RES_DIR,
    BOT_ACTIONS_DIR,
    BOT_EVENTS_DIR,
    BOT_EXTENSIONS_DIR,
    DBM_TEMPLATE_FOLDER,
    DBM_ACTIONS_FOLDER,
    DBM_EVENTS_FOLDER,
    DBM_EXTENSIONS_FOLDER,
    ENCODING
} from "./support/constants.js";
import { findSteamDir, findSteamLibFolders, findDBM } from "./support/functions.js";

const exec = promisify(execCb);


/**
 * @typedef DBMSettings
 * @type {{ token: string; client: string; tag: string; case: boolean | `${boolean}`; separator: string; commandsOrder: string[]; eventsOrder: string[]; modules: {[dependency: string]: [string, boolean]}; ownerId: string; invalidUserText: string; invalidSelectText: string; invalidButtonText: string; leaveVoiceTimeout: number; slashType: string; slashServers: string; autoResponseText: string; invalidPermissionsText: string; invalidCooldownText: string; noDescriptionText: string; [extension: string]: {customData: {[data: string]: any}} }}
 */

/**
 * @typedef DBMPackage
 * @type {{ name: string; author: string; main: string; version: string; dependencies: {[dependency: string]: string} }}
 */


// Start
console.log("Richte DBM-Projekt ein...");

// Check os type for Windows
if(OS_TYPE != "Windows_NT") {
    console.error("Discord Bot Maker wird nur für Windows unterstützt.");
    process.exit(1);
}

// Find Steam directory
let steamDir;

try {
    steamDir = await findSteamDir();
} catch(e) {
    console.error(`Das Steam-Verzeichnis kann nicht gefunden werden: ${e}`);
    process.exit(1);
}

// Check permissions for Steam directory
try {
    await access(steamDir, FS_R);
} catch(e) {
    console.error(`Auf Steam-Verzeichnis kann nicht zugegriffen werden: ${e}`);
    process.exit(1);
}

// Find DBM directory
let dbmDir;

try {
    dbmDir = await findDBM(await findSteamLibFolders(steamDir));
} catch(e) {
    console.error(`Das DBM-Verzeichnis kann nicht gefunden werden: ${e}`);
    process.exit(1);
}

// Check permissions for DBM directory
try {
    await access(dbmDir, FS_R);
} catch(e) {
    console.error(`Auf DBM-Verzeichnis kann nicht zugegriffen werden: ${e}`);
    process.exit(1);
}

// Check permissions for DBM template folder
try {
    await access(`${dbmDir}/${DBM_TEMPLATE_FOLDER}`, FS_R);
} catch(e) {
    console.error(`Auf DBM-Template-Ordner kann nicht zugegriffen werden: ${e}`);
    process.exit(1);
}

// Check permissions for DBM actions folder
try {
    await access(`${dbmDir}/${DBM_ACTIONS_FOLDER}`, FS_R);
} catch(e) {
    console.error(`Auf DBM-Actions-Ordner kann nicht zugegriffen werden: ${e}`);
    process.exit(1);
}

// Check permissions for DBM events folder
try {
    await access(`${dbmDir}/${DBM_EVENTS_FOLDER}`, FS_R);
} catch(e) {
    console.error(`Auf DBM-Events-Ordner kann nicht zugegriffen werden: ${e}`);
    process.exit(1);
}

// Check permissions for DBM extensions folder
try {
    await access(`${dbmDir}/${DBM_EXTENSIONS_FOLDER}`, FS_R);
} catch(e) {
    console.error(`Auf DBM-Extensions-Ordner kann nicht zugegriffen werden: ${e}`);
    process.exit(1);
}

// Check permissions for raw directory
try {
    await access(RAW_DIR, FS_R);
} catch(e) {
    console.error(`Auf Raw Data-Verzeichnis kann nicht zugegriffen werden: ${e}`);
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
    console.log("Kopiere DBM-Template, -Actions, -Events und -Extensions...");
    await cp(`${dbmDir}/${DBM_TEMPLATE_FOLDER}`, BOT_DIR, { recursive: true });
    await Promise.all([
        cp(`${dbmDir}/${DBM_ACTIONS_FOLDER}`, BOT_ACTIONS_DIR, { recursive: true }),
        cp(`${dbmDir}/${DBM_EVENTS_FOLDER}`, BOT_EVENTS_DIR, { recursive: true }),
        cp(`${dbmDir}/${DBM_EXTENSIONS_FOLDER}`, BOT_EXTENSIONS_DIR, { recursive: true })
    ]);
} catch (e) {
    console.error(`DBM Template, -Actions, -Events oder -Extensions können nicht kopiert werden: ${e}`);
    process.exit(1);
}

// Copy bot data
try {
    console.log("Kopiere Bot-Daten...");
    await cp(RAW_DATA_DIR, BOT_DATA_DIR, { recursive: true, filter: async source => (await stat(source)).isDirectory() || source.endsWith(".json") });
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

// Copy additional code
try {
    console.log("Kopiere zusätzlichen Code...");
    await cp(RAW_CODE_DIR, BOT_CODE_DIR, {
        recursive: true,
        filter: async source => (await stat(source)).isDirectory() || source.endsWith(".js")
    });
} catch(e) {
    console.error(`Zusätzlicher Code kann nicht kopiert werden: ${e}`);
    process.exit(1);
}

// Copy resources
try {
    console.log("Kopiere Resourcen...");
    await cp(RES_DIR, BOT_RES_DIR, {
        recursive: true,
        filter: async source => (await stat(source)).isDirectory() || source.endsWith(".jpg") || source.endsWith(".png")
    });
} catch(e) {
    console.error(`Resourcen können nicht kopiert werden: ${e}`);
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
