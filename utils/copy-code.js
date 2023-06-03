import { constants } from "fs";
import { access, cp, stat } from "fs/promises";


const RAW_DIR = "./raw";
const RAW_CODE_DIR = `${RAW_DIR}/code`;
const BOT_DIR = "./bot";
const BOT_CODE_DIR = `${BOT_DIR}/code`;
const FS_R = constants.F_OK | constants.R_OK;
const FS_RW = FS_R | constants.W_OK;

// Start
console.log("Passe Projekt-Code an...");

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

// Copy
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

// Exit
console.log("Anpassung abgeschlossen.");
process.exit(0);