## Основное задание

1. Реализуйте класс Mailbox

## Доп. задания:

1. Если считаете, что Mailbox не хватает еще каких-то технических функций для более готового к использованию API, добавьте их или напишите, что бы вы добавили. Если считаете, что данное API содержит какие-то проблемы с точки зрения проектирования, опишите их и предложите рефакторинг.

2. Какие части кода можно было бы концептуально абстрагировать из реализации Mailbox и сделать их переиспользуемыми? Попробуйте максимально разбить реализацию на переиспользуемые части.

- [Источник](https://csssr.com/ru/jobs/middle-js-developer)
- [JSFiddle](https://jsfiddle.net/CSSSR/4d06zs3t/)
- [Codesandbox](https://codesandbox.io/s/github/kaineer/trial-csssr-node)

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
