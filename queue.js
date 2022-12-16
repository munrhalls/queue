class Queue {
  #name;
  #lf_instance;
  constructor(name, lf_instance) {
    this.#name = name;
    this.#lf_instance = lf_instance;
  }

  generateId(length) {
    return `${this.#name}_ID-${length}`;
  }

  async get_queue() {
    const queue = this.#lf_instance
      .getItem(this.#name)
      .then((val) => val)
      .catch((err) => console.log(err));

    return queue;
  }

  async set_queue(queue) {
    this.#lf_instance
      .setItem(this.#name, queue)
      .then((val) => val)
      .catch((err) => console.log(err));
  }

  async setLastIndex(queue) {
    if (Array.isArray(queue) && queue.length) {
      this.#lf_instance
        .setItem(`${this.#name}LastIndex`, queue[queue.length - 1].id)
        .then((val) => val)
        .catch((err) => console.log(err));
    }
  }

  async update_queue(element) {
    const queue = await this.get_queue();
    const id = this.generateId(queue.length);
    const newHead = {
      id: id,
      next: "",
      value: element,
    };

    if (queue[0]) {
      queue[0].prev = newHead.id;
      newHead.next = queue[0].id;
    }

    this.setLastIndex(queue);
    queue.unshift(newHead);
    return queue;
  }

  async push_head(element) {
    const update = await this.update_queue(element);
    await this.set_queue(update);
  }

  async pop_tail() {
    const queue = await this.get_queue();
    queue.pop();
    if (queue.length) queue[queue.length - 1].next = "";
    this.set_queue(queue);
  }

  async head() {
    const queue = await this.get_queue();
    return queue.shift();
  }

  async tail() {
    const queue = await this.get_queue();
    return queue.pop();
  }
}

async function makeLocalForageInstance(name) {
  const lf_instance = new Promise(
    (resolve) => {
      resolve(
        localforage.createInstance({
          name: name,
        })
      );
    },
    (err) => console.log(err)
  );
  return lf_instance;
}

async function makeQueue(name) {
  const lf_instance = await makeLocalForageInstance(name);

  const queue = await new Promise((resolve) => {
    lf_instance.getItem(name).then((queue) => resolve(queue));
  }).catch((err) => console.log(err));

  if (!queue)
    await new Promise((resolve) =>
      lf_instance
        .setItem(name, [])
        .then((queue) => resolve(queue))
        .catch((err) => console.log(err))
    );

  const instance = new Queue(name, lf_instance);
  return instance;
};

onmessage = function(e) {
  const queueName = e.data;
  postMessage(queueName)
}