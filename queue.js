class Queue {
  constructor() {
    this.queue = [];
  }

  pushHead(element) {
    this.queue.unshift(element);
  }
}

const fifo = new Queue("Jason");
fifo.pushHead("Pushed borzus");

function saveQueue() {
  localforage
    .setItem(fifo.toString(), fifo.queue)
    .then(function (value) {})
    .catch(function (err) {
      console.log(err);
    });
}

function getQueue() {
  localforage
    .getItem(fifo.toString())
    .then(function (value) {
      console.log(value);
    })
    .catch(function (err) {
      console.log(err);
    });
}
getQueue();
saveQueue();
