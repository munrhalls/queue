async function getQueue(name) {
  const instance = await localforage.createInstance({
    name: name,
  });
  const queue = await new Promise((resolve) => {
    return instance.getItem("queue").then((queue) => resolve(queue));
  });
  console.log(queue);
  return queue;
}

function makeQueue() {

}

class Queue {
  #name;
  #store;
  #queue;

  constructor(name, queue) {
    this.#name = name;
    this.#queue = queue
  }

  test() {
    console.log("test");
  }
}

const Test = new Queue("Test");
console.log(Test);
