let money = 42000;
let income = "42";
let addExpenses = "Квартплата, Проездной, Кредит";
let deposit = Boolean(200000);
let mission = 1000000;
let period = 5;

console.log("money: ", money);
console.log("income: ", income);
console.log("deposit: ", deposit);
console.log("addExpenses: ", addExpenses.length);
console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + mission + " долларов");
console.log(addExpenses.toLowerCase().split(", "));

// Пункты 2-3-4 домашнего задания
money = +prompt("Ваш месячный доход?");

addExpenses = prompt(
  "Перечислите возможные расходы за рассчитываемый период через запятую?",
  "Квартплата, проездной, кредит"
);

deposit = !!prompt(
  "Есть ли у вас депозит в банке?",
  'Нажмите "Ок", если "Да" / "Отмена", если "Нет"'
);

let costs = prompt(
  "Введите обязательную статью расходов?",
  "Квартплата, проездной, кредит"
);

// Пункт 5 домашнего задания

let sum = +prompt(`Какую сумму Вы тратите на ${costs}?`);
let costs2 = prompt(
  "Введите обязательную статью расходов?",
  "Квартплата, проездной, кредит"
);
let sum2 = +prompt(`Какую сумму Вы тратите на ${costs2}?`);

// Пункт 6-7-8 домашнего задания

let budgetMonth = money - sum - sum2;
console.log(`Бюжет на месяц: ${budgetMonth}`);

period = mission / budgetMonth;
console.log(`Цель будет достигнута за ${Math.ceil(period)} месяцев`);

let budgetDay = budgetMonth / 30;
console.log(`Бюджет на день: ${Math.floor(budgetDay)}`);

// Пункт 9 домашнего задания - конструкция

if (budgetDay >= 1200) {
  console.log("У вас высокий уровень дохода");
}

if (budgetDay >= 600 && budgetDay < 1200) {
  console.log("У вас средний уровень дохода");
}

if (budgetDay < 600 && budgetDay >= 0) {
  console.log("К сожалению у вас уровень дохода ниже среднего");
}

if (budgetDay < 0) {
  console.log("Что то пошло не так");
}
