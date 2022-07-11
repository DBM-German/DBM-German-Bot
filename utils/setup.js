import { exec as execCb } from "child_process";
import { constants } from "fs";
import { access, cp, rm } from "fs/promises";
import { promisify } from "util";

const exec = promisify(execCb);


const RAW_DIR = "./raw";
const RAW_DATA_DIR = `${RAW_DIR}/data`;
const BOT_DIR = "./bot";
const BOT_DATA_DIR = `${BOT_DIR}/data`;
const DBM_DIR = "C:/Program Files (x86)/Steam/steamapps/common/Discord Bot Maker/";
const DBM_TEMPLATE_DIR = `${DBM_DIR}/resources/app/bot`;
const DBM_ACTIONS_DIR = `${DBM_DIR}/actions`;


/**
 * File encoding
 * @type {BufferEncoding}
 */
const ENCODING = "utf8";


// Start
console.log("Richte DBM-Projekt ein...");

// Check permissions for DBM template directory
try {
    await access(DBM_TEMPLATE_DIR, constants.F_OK | constants.R_OK);
} catch(e) {
    console.log(`Auf Discord Bot Maker-Template-Verzeichnis kann nicht zugegriffen werden: ${e}`);
    process.exit(1);
}

// Check permissions for DBM actions directory
try {
    await access(DBM_ACTIONS_DIR, constants.F_OK | constants.R_OK);
} catch(e) {
    console.log(`Auf Discord Bot Maker-Actions-Verzeichnis kann nicht zugegriffen werden: ${e}`);
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
    await cp(DBM_TEMPLATE_DIR, BOT_DIR, { recursive: true });
    await cp(DBM_ACTIONS_DIR, `${BOT_DIR}/actions`, { recursive: true });
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