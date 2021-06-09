// Восстановил порядок книг.
const books = document.querySelectorAll('.book');
const wrap = document.querySelector('.books');
wrap.append(books[1], books[0], books[4], books[3], books[5], books[2]);

// Заменил фон на главной странице
const bodyImg = document.querySelector('body');
bodyImg.style.background = "url('./image/you-dont-know-js.jpg')";

// Исправил заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")
const titleBooks3 = books[4].querySelector('a');
titleBooks3.textContent = 'Книга 3. this и Прототипы Объектов';

// Удалил рекламу со страницы
const deleteAdvertising = document.querySelector('.adv');
deleteAdvertising.remove();

// Восстановил порядок во 2 книге
const itemsBooks3 = books[0].querySelectorAll('li');
itemsBooks3[9].append(itemsBooks3[2]);
itemsBooks3[3].append(itemsBooks3[6]);
itemsBooks3[3].append(itemsBooks3[8]);

// Восстановил порядок во 5 книге
const itemsBooks5 = books[5].querySelectorAll('li');
itemsBooks5[1].append(itemsBooks5[9]);
itemsBooks5[3].append(itemsBooks5[2]);
itemsBooks5[4].append(itemsBooks5[2]);
itemsBooks5[7].append(itemsBooks5[5]);

// В шестой книге добавил главу “Глава 8: За пределами ES6” и поставить её в правильное место
const itemsBooks6 = books[2].querySelectorAll('li')[9];
itemsBooks6.insertAdjacentHTML('beforebegin', '<li>Глава 8: За пределами ES6</li>');
