class Queue {
  constructor(name) {
    this.store = localforage.createInstance({
      name: name,
    });
  }

  async test() {
    console.log(await this.getQueue());
  }

  getQueue() {
    return new Promise((resolve) => {
      return this.store.getItem("queue").then((queue) => resolve(queue));
    });
  }
}

const Test = new Queue("Test");
console.log(Test.test());
