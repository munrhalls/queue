(async function () {
  class Queue {
    #name;
    #lf_instance;
    constructor(name, lf_instance) {
      this.#name = name;
      this.#lf_instance = lf_instance;
    }

    async showQueue() {
      const queue = await this.#lf_instance.getItem("queue").then((val) => val);
      console.log(queue);
    }
  }

  async function queueFactory(name) {
    const lf_instance = localforage.createInstance({
      name: name,
    });

    const queue = await new Promise((resolve) => {
      lf_instance.getItem("queue").then((val) => resolve(val));
    });

    if (!queue)
      await new Promise((resolve) =>
        lf_instance.setItem("queue", []).then((queue) => resolve(queue))
      );

    const instance = new Queue(name, lf_instance);
    return instance;
  }

  const Test = await new Promise((resolve) => {
    queueFactory("Test").then((queue) => resolve(queue));
  });
  console.log(Test);
})();
