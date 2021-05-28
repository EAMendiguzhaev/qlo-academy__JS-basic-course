let money = 42000;
let income = 42;
let addExpenses = "500, 1500, 4500";
let deposit = Boolean(200000);
let mission = "1000000";
let period = 5;

console.log("money: ", money);
console.log("income: ", income);
console.log("deposit: ", deposit);
console.log("addExpenses: ", addExpenses.length);
console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + mission + " долларов");
console.log(addExpenses.toLowerCase().split(", "));

let budgetDay = money / 30;
console.log("budgetDay: ", budgetDay);
