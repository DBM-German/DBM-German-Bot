const { sep } = require("path");
const { NodeVM } = require("vm2");

// Get actual cwd from argv
const cwd = process.argv[1].split(sep).slice(0, -3).join(sep);
// Set vm cwd to "~/DBM-German-Bot"
const vmCwd = `~${sep}${process.argv[1].split(sep).at(-4)}`;


process.on("message", code => {
    const vm = new NodeVM({
        // Pass through console output to parent process
        console: "inherit",
        // Do not provide any additional outside objects
        sandbox: {},
        // Do not return the last value automatically
        wrapper: "none",
        // Imitate argv to display vm cwd
        argv: [ "/usr/bin/node", vmCwd ]
    });

    let result;
    try {
        // Evaluate user input in vm context
        result = vm.run(code);
    } catch(e) {
        // Replace file paths in stack trace with vm cwd
        e.stack = e.stack?.replaceAll(cwd, vmCwd);
        // Pass through error to parent process
        throw e;
    }

    let response;
    try {
        // Try to send the result as JSON to allow the parent process to fully recreate the output
        response = JSON.stringify(result);

        if(response === undefined) throw new Error("No JSON-friendly result.");
    } catch(e) {
        // Alternatively just send it as a simple string because of the Serialization API limitations
        // https://nodejs.org/api/v8.html#serialization-api
        response = String(result);
    }

    process.send(response);
    process.disconnect();
});