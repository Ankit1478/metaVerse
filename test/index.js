const { WebSocket } = require('ws');
const wsURL = "ws://167.71.249.231:3202";
const ws = new WebSocket(wsURL);

async function add() {
    await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject(new Error("Connection timed out after 5 seconds"));
        }, 5000);

        ws.onopen = () => { // Use = instead of ()
            clearTimeout(timeout);
            resolve();
            console.log("Connected...");
        };

        ws.onerror = (error) => { // Handle errors
            clearTimeout(timeout);
            reject(error); // Reject the promise on error
        };
    });
}

add().catch((error) => {
    console.error("Failed to connect:", error.message);
});
