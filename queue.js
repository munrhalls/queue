(async function () {
  class Queue {
    #name;
    #lf_instance;
    constructor(name, lf_instance) {
      this.#name = name;
      this.#lf_instance = lf_instance;
    }

    async getAll() {
      const queue = await this.#lf_instance
        .getItem("queue")
        .then((val) => val)
        .catch((err) => console.log(err));

      console.log(queue);
      return queue;
    }
  }

  async function makeLFInstance() {
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
    const lf_instance = await makeLFInstance();

    console.log(lf_instance);

    const queue = await new Promise((resolve) => {
      lf_instance.getItem("queue").then((val) => resolve(val));
    }).catch((err) => console.log(err));

    if (!queue)
      await new Promise((resolve) =>
        lf_instance.setItem("queue", []).then((queue) => resolve(queue))
      );

    const instance = new Queue(name, lf_instance);
    return instance;
  }

  const Test = await new Promise((resolve) => {
    makeQueue("Test").then((queue) => resolve(queue));
  });

  const Test2 = await makeQueue("Second test");
  Test2.getAll();
  Test.getAll();
})();
