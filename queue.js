class Queue {
  constructor(name) {
    this.name = name;
    this.queue = [];
  }

  pushHead(...elements) {
    for (let el of elements.reverse()) {
      this.queue.unshift(el);
    }
    this.saveQueue(this.name, this.queue);
  }

  popTail() {
    this.queue.pop();
    this.saveQueue(this.name, this.queue);
  }

  showTail() {
    console.log(this.queue[this.queue.length - 1]);
    return this.queue[this.queue.length - 1];
  }

  showHead() {
    console.log(this.queue[0]);
    return this.queue[0];
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
fifo.showTail();
fifo.showHead();
fifo.popTail();
fifo.getQueue();
