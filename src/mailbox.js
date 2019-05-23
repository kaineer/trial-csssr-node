const mailboxes = {};

import {createSubscriptions} from './subscriptions';
import {createPreconditions} from './preconditions';

const createIdentifiedMailbox = (identity) => {
  const subscriptions = createSubscriptions();
  const preconditions = createPreconditions(
    identity,
    (message) => subscriptions.run(message)
  );

  const runPreconditions = (message, index = 0) => {
    if (index >= preconditions.length) {
      subscriptions.run(message);
    } else {
      const precondition = preconditions[index];
      precondition(message, identity, () => runPreconditions(message, index + 1));
    }
  };

  return {
    pre(fn) {
      preconditions.add(fn);
    },
    notify(fn) {
      subscriptions.add(fn);
    },
    sendMail(text) {
      preconditions.run(text);
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
