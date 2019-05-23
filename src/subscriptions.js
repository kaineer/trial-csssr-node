export const createSubscriptions = () => {
  const subscriptions = [];

  return {
    add(fn) {
      subscriptions.push(fn);
    },
    run(message) {
      subscriptions.forEach((fn) => fn(message));
    }
  };
};
