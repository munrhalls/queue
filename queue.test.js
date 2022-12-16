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
  const Branzyum = await makeQueue("Branzyum");

  let count = 0;
  let timeScore = 0;

  function getRndMax(max) {
    max = max || 5;
    return Math.floor(Math.random() * max);
  }

  function timeOut(interval) {
    setTimeout(function () {
      const rndSeed = seed[getRndMax(399)];
      rndSeed.time = `Hey, I showed myself after ${timeScore}`;

      Branzyum.push_head(rndSeed);
      console.log(count);
      if (count < 10) {
        count++;
        const rndTiming = getRndMax(2500);
        timeScore += rndTiming / 1000;
        timeOut(rndTiming);
      }
    }, interval);
  }
  timeOut(1000);

  const BranzyumQueue = await Branzyum.get_queue();

  const DOMshowMeThatQueue = document.getElementById("show-me-that-queue");
  for (let el of BranzyumQueue) {
    const queueDiv = document.createElement("div");
    const li = document.createElement("li");
    const queueInstance = el?.value;
    li.innerText = `${queueInstance.name}, I am from the ${Branzyum.name} queue`;
    queueDiv.appendChild(li);
    const timeLi = document.createElement("li");
    timeLi.innerText =
      el?.value?.time + " seconds, due to rnd timeout being set so.";
    queueDiv.appendChild(timeLi);
    DOMshowMeThatQueue.appendChild(queueDiv);
  }
};

// mv to worker

// const queueWorker = new Worker("/queue.js");
// queueWorker.postMessage({ name: "Burzan" });

// onmessage = function (e) {
//   console.log("main thread");
//   console.log(e.data.queue);
// };
