import { constants } from "fs";
import { access, cp, stat } from "fs/promises";


const RES_DIR = "./res";
const BOT_DIR = "./bot";
const BOT_RES_DIR = `${BOT_DIR}/resources`;
const FS_R = constants.F_OK | constants.R_OK;
const FS_RW = FS_R | constants.W_OK;

// Start
console.log("Passe Projekt-Resourcen an...");

// Check permissions for raw directory
try {
    await access(RES_DIR, FS_R);
} catch(e) {
    console.error(`Auf Resourcen-Verzeichnis kann nicht zugegriffen werden: ${e}`);
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
    console.log("Kopiere Resourcen...");
    await cp(RES_DIR, BOT_RES_DIR, {
        recursive: true,
        filter: async source => (await stat(source)).isDirectory() || source.endsWith(".jpg") || source.endsWith(".png")
    });
} catch(e) {
    console.error(`Resourcen können nicht kopiert werden: ${e}`);
    process.exit(1);
}

// Exit
console.log("Anpassung abgeschlossen.");
process.exit(0);