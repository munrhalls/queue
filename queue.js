(async function () {
  class Queue {
    #name;
    #lf_instance;
    constructor(name, lf_instance) {
      this.#name = name;
      this.#lf_instance = lf_instance;
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

    async push_head(element) {
      const queue = await this.get_queue();
      queue.push(element);
      await this.set_queue(queue);
    }

    async pop_tail() {
      const queue = await this.get_queue();
      queue.pop();
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
  }

  const Test2 = await makeQueue("Blubarzus");
  const head = await Test2.head();
  const tail = await Test2.tail();
  console.log(head, "...", tail);
})();
