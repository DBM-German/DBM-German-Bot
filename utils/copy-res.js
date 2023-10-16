import { access, cp, stat } from "fs/promises";

import { RES_DIR, BOT_DIR, BOT_RES_DIR, FS_R, FS_RW } from "./support/constants.js";


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

// Exit
console.log("Anpassung abgeschlossen.");
process.exit(0);