const { basename } = require("path");
const { Isolate } = require("isolated-vm");

// Create isolation context with memory limited to ~ 128 MB
const isolate = new Isolate({ memoryLimit: 128, onCatastrophicError: _ => process.abort() });
const context = isolate.createContextSync();


process.on("message", code => {
    let response = { result: null, error: null };

    // Eval code in isolation context with a 5 second timeout and assuming that it returns a promise
    context.eval("(async () => {\n" + code + "\n})();", { timeout: 5e3, promise: true, filename: basename(__filename) })
        .then(result => {
            try {
                // Try to convert the result to JSON to allow the parent process to fully recreate it
                response.result = JSON.stringify(result);

                if(!response.result) throw new Error("No JSON-friendly result.");
            } catch(e) {
                // Alternatively just store it as a simple string because of the Serialization API limitations
                // https://nodejs.org/api/v8.html#serialization-api
                response.result = String(result);
            }
        })
        .catch(error => {
            // Errors can be processed by the Serialization API without any problems
            response.error = error;
        })
        .finally(() => {
            // Send the response as plain object, assuming that the parent uses the advanced serialization mode
            process.send(response);
            // Destroy the isolation context and end the sub-process
            isolate.dispose();
            process.disconnect();
        });
});