class Queue {
  constructor(key) {
    this.store = localforage.createInstance({
      name: key,
    });
  }

  test() {
    console.log("test");
    return "test";
  }
}

Queue.prototype.queue = (function () {
  console.log("iife queue");
})();

const Test = new Queue("Test");
console.log(Test);
