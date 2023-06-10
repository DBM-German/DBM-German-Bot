const { NodeVM } = require("vm2");
const { sep } = require("path");

process.on("message", code => {
    const vm = new NodeVM({
        console: "inherit",
        sandbox: {},
        wrapper: "none",
        // Imitate argv to display "~/DBM-German-Bot" as cwd
        argv: [ "/usr/bin/node", `~/${process.argv[1].split(sep).at(-3)}` ]
    });

    // Evaluate without catching errors - the parent process needs to receive them
    let result = vm.run(code);

    let response;
    try {
        response = JSON.stringify(result);

        if(response === undefined) throw new Error("No JSON-friendly result.");
    } catch(e) {
        response = String(result);
    }

    process.send(response);
});