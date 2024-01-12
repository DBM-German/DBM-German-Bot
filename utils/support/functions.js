import { access, readFile } from "fs/promises";
import { promisified as regedit } from "regedit";
import * as VDF from "vdf-parser";

import {
    OS_ARCH,
    FS_R,
    STEAM_REG_KEY_32,
    STEAM_REG_KEY_64,
    STEAM_REG_VAL_PATH,
    STEAM_LIB_CONFIGS,
    DBM_ID,
    DBM_FOLDER,
    ENCODING
} from "./constants.js";


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
 * Find Steam installation directory
 * @returns {Promise<string>} Directory path
 * @throws Cannot access Windows Registry
 * @throws Registry key not found
 */
export async function findSteamDir() {
    /**
     * @type SteamRegEntry
     */
    let registryEntry;

    let is64 = OS_ARCH == "x64";
    let registryKey = is64 ? STEAM_REG_KEY_64 : STEAM_REG_KEY_32;

    registryEntry = (await regedit.list(registryKey))[registryKey];

    if(!registryEntry.exists) throw new Error(`Registry key '${registryKey}' not found`);

    return registryEntry.values[STEAM_REG_VAL_PATH].value.replace(/\\\\/g, "/");
}

/**
 * Find library folders config and extract library folders
 * @param {string} steamDir Steam directory path
 * @returns {Promise<SteamLibFolders>} Library info
 * @see findDBM Called by the findDBM function
 */
export async function findSteamLibFolders(steamDir) {
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
 * @param {SteamLibFolders} libraryfolders Steam library info
 * @returns {Promise<string>} Directory path
 */
export async function findDBM(libraryfolders) {
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
