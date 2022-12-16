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

  function getRandomInt() {
    return Math.floor(Math.random() * 5);
  }

  function timeOut(interval) {
    const randomInt = getRandomInt();

    setTimeout(function () {
      Burzus.push_head(seed[randomInt * 25]);

      if (count < 10) {
        count++;
        timeOut();
      }
    }, randomInt * 1000);
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
