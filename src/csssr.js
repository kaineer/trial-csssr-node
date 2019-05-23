const { Mailbox } = require("./mailbox");
const { createConsole } = require("./console");

const console = createConsole();

// 1. Реализуйте класс Mailbox
// Доп. задания:
// 2. Если считаете, что Mailbox не хватает еще каких-то технических функций для более готового к использованию API, добавьте их или напишите, что бы вы добавили. Если считаете, что данное API содержит какие-то проблемы с точки зрения проектирования, опишите их и предложите рефакторинг.
// 3. Какие части кода можно было бы концептуально абстрагировать из реализации Mailbox и сделать их переиспользуемыми? Попробуйте максимально разбить реализацию на переиспользуемые части.

export const runTests = () => {
  const mailbox = new Mailbox("name");

  mailbox.pre(function(mail, send) {
    // pre-хуков может быть несколько или не быть совсем. Если хуков несколько, то необходимо чтобы все подтвердили отправку.
    if (mail !== "spam") {
      // если письмо удовлетворяет условию, то только тогда подтверждаем его отправку
      send(mail);
    }
  });

  mailbox.notify(function(mail) {
    // notify-хуков может быть несколько или не быть совсем
    console.log("Новое сообщение: " + mail);
  });

  mailbox.sendMail("asdf"); // в консоли ‘Новое сообщение: asdf’. один вызов sendMail должен триггерить один notify-хук строго не больше одного раза

  mailbox.sendMail("spam"); // ничего не выводит в консоль, так как pre-hook не допускает отправку такого письма

  const sameMailbox = new Mailbox("name"); // если имя создаваемого mailbox совпадает с уже созданным, то надо вернуть тот же экземпляр
  console.log(mailbox === sameMailbox); // true

  const newMailbox = new Mailbox("newName");
  console.log(newMailbox !== mailbox); // true
};