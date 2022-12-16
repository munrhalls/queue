import seed from "./seed.js";

// test types
// 1 making new queue @queue.test.js === queue @queue.js
// 2. push to queue @queue.test.js === queue @queue.js
// 3. pop tail queue @queue.test.js === queue @queue.js
// 4. read head @queue.test.js === queue @queue.js
// 5. read tail @queue.test.js === queue @queue.js
// 6. random operations @queue.test.js === queue @queue.js


const queueWorker = new Worker('/queue.js')
queueWorker.postMessage('Message')
queueWorker.onmessage = function(e) {
    console.log(e.data)
}