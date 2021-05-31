let money = +prompt("Ваш месячный доход?");
let income = "42";
let addExpenses = prompt(
  "Перечислите возможные расходы за рассчитываемый период через запятую?",
  "Квартплата, проездной, кредит"
);
let deposit = !!prompt(
  "Есть ли у вас депозит в банке?",
  'Нажмите "Ок", если "Да" / "Отмена", если "Нет"'
);
let mission = 1000000;
let costs = prompt(
  "Введите обязательную статью расходов?",
  "Квартплата, проездной, кредит"
);
let sum = +prompt(`Какую сумму Вы тратите на ${costs}?`);
let costs2 = prompt(
  "Введите обязательную статью расходов?",
  "Квартплата, проездной, кредит"
);
let sum2 = +prompt(`Какую сумму Вы тратите на ${costs2}?`);

let budgetMonth = money - (sum + sum2);
console.log(`Бюжет на месяц: ${budgetMonth}`);

let period = mission / budgetMonth;
console.log(`Цель будет достигнута за ${Math.ceil(period)} месяцев`);

let budgetDay = budgetMonth / 30;
console.log(`Бюджет на день: ${Math.floor(budgetDay)}`);

if (budgetDay >= 1200) {
  console.log("У вас высокий уровень дохода");
} else if (budgetDay >= 600 && budgetDay < 1200) {
  console.log("У вас средний уровень дохода");
} else if (budgetDay < 600 && budgetDay >= 0) {
  console.log("К сожалению у вас уровень дохода ниже среднего");
} else if (budgetDay < 0) {
  console.log("Что то пошло не так");
}

console.log("money: ", money);
console.log("income: ", income);
console.log("deposit: ", deposit);
console.log("addExpenses: ", addExpenses.length);
console.log(`Период равен ${Math.ceil(period)} месяцев`);
console.log("Цель заработать " + mission + " долларов");
console.log(addExpenses.toLowerCase().split(", "));
