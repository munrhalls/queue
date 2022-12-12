(async function () {
  class Queue {
    constructor(name, getQueue) {
      this.store = localforage.createInstance({
        name: name,
      });
      this.getQueue = getQueue.bind(this);
    }

    async test() {
      const queue = await this.getQueue();
      console.log(queue);
    }
  }

  function getQueue() {
    return new Promise((resolve) => {
      return this.store.getItem("queue").then((queue) => resolve(queue));
    });
  }

  function makeQueue(name) {
    return new Queue(name, getQueue);
  }

  const Test = makeQueue("Test");
  const queue = await Test.getQueue();
  console.log(queue);
})();
