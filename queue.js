import { v4 as uuidv4 } from "uuid.js";

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
      const newHead = {
        id: uuidv4(),
        next: queue[1].id || "",
        value: element,
      };
      queue[0].prev = newHead.id;
      queue.unshift(newHead);
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

  const Blubarzus = await makeQueue("Blubarzus");
  Blubarzus.push_head("Alright bro, zanzaghia!!!");
  const queue = await Blubarzus.get_queue();

  const tail = await Blubarzus.tail();
  console.log(queue);
})();
