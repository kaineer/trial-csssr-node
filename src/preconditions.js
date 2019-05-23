export const createPreconditions = (context, next) => {
  const preconditions = [];

  return {
    add(fn) {
      preconditions.push(fn);
    },
    run(message, index = 0) {
      if (index >= preconditions.length) {
        next(message);
      } else {
        const precondition = preconditions[index];
        precondition(
          message,
          context,
          () => this.run(message, index + 1)
        );
      }
    }
  };
};
