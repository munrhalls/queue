class Queue {
  constructor(name) {
    this.name = name;
    this.queue = [];
  }

  pushHead(...elements) {
    for (let el of elements) {
      this.queue.unshift(el);
    }
    this.saveQueue(this.name, this.queue);
  }

  popTail() {
    this.queue.pop();
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
fifo.pushHead("Pushed borzus", "Blubazaurus");
fifo.getQueue();
