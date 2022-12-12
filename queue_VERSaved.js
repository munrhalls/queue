var store = localforage.createInstance({
  name: "nameHere",
});

class Queue {
  #name;
  #queue;
  constructor(name, queue) {
    this.#name = name;
    this.#queue = queue;
  }

  pushHead(...elements) {
    for (let el of elements.reverse()) {
      this.#queue.unshift(el);
    }
    this.saveQueue(this.#name, this.#queue);
  }

  popTail() {
    this.#queue.pop();
    this.saveQueue(this.#name, this.#queue);
    console.log(this);
  }

  showTail() {
    console.log(this.#queue[this.#queue.length - 1]);
    return this.#queue[this.#queue.length - 1];
  }

  showHead() {
    console.log(this.#queue[0]);
    return this.#queue[0];
  }

  saveQueue() {
    localforage
      .setItem(this.#name, this.#queue)
      .then(function (value) {
        return "Saved";
      })
      .catch(function (err) {
        throw new Error("Queue not saved to localForage.");
      });
  }
}

async function createQueue(name) {
  let queue;

  await localforage
    .getItem(name)
    .then(function (value) {
      queue = value;
    })
    .catch(function (err) {});

  if (!queue) queue = [];

  return new Queue(name, queue);
}

async function useQueues() {
  const Bulldog = await createQueue("Bulldog");
  Bulldog.pushHead("I AM BULLDOG!!!");
  Bulldog.popTail();
}

useQueues();
console.log(Bulldog);
