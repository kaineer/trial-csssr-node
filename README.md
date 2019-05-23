## Основное задание

1. Реализуйте класс Mailbox

## Доп. задания:

1. Если считаете, что Mailbox не хватает еще каких-то технических функций для более готового к использованию API, добавьте их или напишите, что бы вы добавили. Если считаете, что данное API содержит какие-то проблемы с точки зрения проектирования, опишите их и предложите рефакторинг.

2. Какие части кода можно было бы концептуально абстрагировать из реализации Mailbox и сделать их переиспользуемыми? Попробуйте максимально разбить реализацию на переиспользуемые части.

- [Источник](https://csssr.com/ru/jobs/middle-js-developer)
- [JSFiddle](https://jsfiddle.net/CSSSR/4d06zs3t/)
- [Codesandbox](https://codesandbox.io/s/github/kaineer/trial-csssr-node)
- [Исходная реализация Mailbox](https://github.com/kaineer/trial-csssr-node/blob/138738da4d093be9d9f66c695bda690e49cc49aa/src/mailbox.js)

## Доделки по первому доп заданию

1. Добавил возможность указывать, какую часть аргумента конструктора Mailbox нужно использовать для проверки — создан такой mailbox или ещё нет:

```javascript
const {createMailboxFactory} = require('./mailbox');
const Mailbox = createMailboxFactory((user) => user.email);

const firstMailbox = new Mailbox({name: 'Bob', email: 'common@mail.foo'});
const secondMailbox = new Mailbox({name: 'Alice', email: 'common@mail.foo'});

console.log(firstMailbox === secondMailbox); // => true
```

2. Добавил возможность использовать объект, используемый при создании Mailbox в pre-хуках:

```javascript
// Не показывать Бобу сообщения о его дне рождения
bobMailbox.pre(function(mail, user, send) {
  if (user.name !== 'Bob' || mail !== 'Bob\'s birthday') {
    send(mail);
  }
});
```

На мой взгляд, такая реализация Mailbox даёт больше возможностей пользователям этого класса.

## Доделки по второму доп заданию

1. Вынес в отдельный файл механизм подписок

```javascript
const subscriptions = createSubscriptions(); // Так создаётся список подписок
subscriptions.add(function (message) {...}); // Так добавляется новая подписка
subscriptions.run(message);                  // А вот так они все запускаются
```

2. Вынес в отдельный файл механизм предусловий

```javascript
const preconditions = createPreconditions(
  identity,           // Передаю объект, привязанный к мэйлбоксу
  (message) => ...    // Указываю, что делать с сообщением, если все предусловия прошли
);

preconditions.add(function (message, user, send) { ... }); // Добавляю новое предусловие
preconditions.run(message);                                // Запускаю проверку по всем предусловиям
```

Больше, вроде, выносить нечего :)
