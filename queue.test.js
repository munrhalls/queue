import seed from "./seed.js";
import makeQueue from "./queue.js";

console.log(seed);
const JasonTesting = await makeQueue("Test");
JasonTesting.push_head("Some stuff");
JasonTesting.pop_tail();
console.log(JasonTesting);
