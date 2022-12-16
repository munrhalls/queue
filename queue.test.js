import makeQueue from "./queue.js";

const JasonTesting = await makeQueue("Test");
JasonTesting.push_head("Some stuff");

// worker to main thread
// const myWorker = new Worker("./queue.js");
