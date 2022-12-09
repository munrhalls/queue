class Queue {
  constructor(name) {
    this.name = name;
    this.queue = [];
  }

  pushHead(element) {
    this.queue.unshift(element);
    this.saveQueue(this.name, this.queue);
  }

  saveQueue() {
    localforage
      .setItem(this.name, this.queue)
      .then(function (value) {})
      .catch(function (err) {
        console.log(err);
      });
  }

  getQueue() {
    localforage
      .getItem(this.name)
      .then(function (value) {
        console.log(value);
      })
      .catch(function (err) {
        console.log(err);
      });
  }
}

const fifo = new Queue("Jason");
fifo.pushHead("Pushed borzus");
fifo.getQueue();

// function saveQueue(name, queue) {
//   localforage
//     .setItem(name, queue)
//     .then(function (value) {})
//     .catch(function (err) {
//       console.log(err);
//     });
// }

// function getQueue() {
//   localforage
//     .getItem(fifo.toString())
//     .then(function (value) {
//       console.log(value);
//     })
//     .catch(function (err) {
//       console.log(err);
//     });
// }
