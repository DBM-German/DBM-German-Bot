import { access, cp, stat } from "fs/promises";

import { RAW_DIR, RAW_CODE_DIR, BOT_DIR, BOT_CODE_DIR, FS_R, FS_RW } from "./support/constants.js";


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

// Exit
console.log("Anpassung abgeschlossen.");
process.exit(0);
