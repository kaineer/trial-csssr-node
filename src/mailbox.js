const mailboxes = {};

const createSubscriptions = () => {
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

const createIdentifiedMailbox = (identity) => {
  const subscriptions = createSubscriptions();
  const preconditions = [];

  const runSubscriptions = message => subscriptions.run(message);
  const runPreconditions = (message, index = 0) => {
    if (index >= preconditions.length) {
      runSubscriptions(message);
    } else {
      const precondition = preconditions[index];
      precondition(message, identity, () => runPreconditions(message, index + 1));
    }
  };

  return {
    pre(fn) {
      preconditions.push(fn);
    },
    notify(fn) {
      subscriptions.add(fn);
    },
    sendMail(text) {
      runPreconditions(text);
    }
  };
};

export const createMailBoxFactory = (keyFn = (k) => k) => (identity) => {
  const key = keyFn(identity);

  if (!mailboxes[key]) {
    mailboxes[key] = createIdentifiedMailbox(identity);
  }

  return mailboxes[key];
};
