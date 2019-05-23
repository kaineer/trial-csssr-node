const mailboxes = {};

const createMailbox = () => {
  const subscriptions = [];
  const preconditions = [];

  const runSubscriptions = text => subscriptions.forEach(fn => fn(text));
  const runPreconditions = (text, index = 0) => {
    if (index >= preconditions.length) {
      runSubscriptions(text);
    } else {
      const precondition = preconditions[index];
      precondition(text, () => runPreconditions(text, index + 1));
    }
  };

  return {
    pre(fn) {
      preconditions.push(fn);
    },
    notify(fn) {
      subscriptions.push(fn);
    },
    sendMail(text) {
      runPreconditions(text);
    }
  };
};

export const Mailbox = name => {
  if (!mailboxes[name]) {
    mailboxes[name] = createMailbox();
  }

  return mailboxes[name];
};
