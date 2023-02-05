const { NodeVM } = require("vm2");

process.on("message", code => {
    const vm = new NodeVM({
        console: "inherit",
        sandbox: {},
        wrapper: "none"
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