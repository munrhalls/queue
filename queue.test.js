import seed from "./seed.js";
import makeQueue from "./queue.js";

// test types
// 1 making new queue @queue.test.js === queue @queue.js
// 2. push to queue @queue.test.js === queue @queue.js
// 3. pop tail queue @queue.test.js === queue @queue.js
// 4. read head @queue.test.js === queue @queue.js
// 5. read tail @queue.test.js === queue @queue.js
// 6. random operations @queue.test.js === queue @queue.js

window.onload = async function () {
  const Burzus = await makeQueue("Burzus");

  let count = 0;

  function getRndMax(max) {
    max = max || 5;
    return Math.floor(Math.random() * max);
  }

  function timeOut(interval) {
    setTimeout(function () {
      Burzus.push_head(seed[getRndMax(399)]);

      if (count < 10) {
        count++;
        timeOut(getRndMax(3));
      }
    }, getRndMax(4) * 1000);
  }
  timeOut(1000);

  const BurzusQueue = await Burzus.get_queue();
  console.log(BurzusQueue);
};

// mv to worker

// const queueWorker = new Worker("/queue.js");
// queueWorker.postMessage({ name: "Burzan" });

// onmessage = function (e) {
//   console.log("main thread");
//   console.log(e.data.queue);
// };
