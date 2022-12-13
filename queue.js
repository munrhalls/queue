(async function () {
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

    async update_queue(element) {
      const queue = await this.get_queue();
      const id = this.generateId(queue.length);
      const nextId = queue[1] ? queue[1].id : "";

      const newHead = {
        id: id,
        next: nextId,
        value: element,
      };

      if (queue[0]) queue[0].prev = newHead.id;
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

  const Blubarzus = await makeQueue("Blubarzus");
  Blubarzus.push_head("Alright bro, zanzaghia!!!");
  const queue = await Blubarzus.get_queue();

  const tail = await Blubarzus.tail();
  console.log(queue);
})();
