import {createSubscriptions} from './subscriptions';
import {createPreconditions} from './preconditions';

const createIdentifiedMailbox = (identity) => {
  const subscriptions = createSubscriptions();
  const preconditions = createPreconditions(
    identity,
    (message) => subscriptions.run(message)
  );

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

export const createMailBoxFactory = (keyFn = (k) => k) => {
  const mailboxes = {};

  return (identity) => {
    const key = keyFn(identity);

    if (!mailboxes[key]) {
      mailboxes[key] = createIdentifiedMailbox(identity);
    }

    return mailboxes[key];
  };
};
