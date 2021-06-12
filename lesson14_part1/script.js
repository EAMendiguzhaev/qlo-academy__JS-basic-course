'use strict';

const DomElement = function (selector, options) {
  this.selector = selector;
  options = options || {};
  this.height = options.height;
  this.width = options.width;
  this.bg = options.bg;
  this.fontSize = options.fontSize;
};

DomElement.prototype.render = function () {
  if (this.selector[0] === '.') {
    let div = document.createElement('div');
    div.classList.add(this.selector);

    div.style.cssText = `height: ${this.height};
                   width: ${this.width};
                   background-color:  ${this.bg};
                   font-size: ${this.fontSize};`;
    div.innerHTML = 'Я элемент "div"';
    document.body.insertAdjacentElement('beforeEnd', div);
  } else if (this.selector[0] === '#') {
    let paragraph = document.createElement('p');

    paragraph.classList.add(this.selector);

    paragraph.style.cssText = `height: ${this.height};
                   width: ${this.width};
                   background-color:  ${this.bg};
                   font-size: ${this.fontSize};`;
    paragraph.innerHTML = 'Я элемент "paragraph"';
    document.body.insertAdjacentElement('beforeEnd', paragraph);
  }
};

const element = new DomElement('.element', { height: '300px', width: '300px', bg: '#b3ffda', fontSize: '30px' });
element.render();
const element2 = new DomElement('#element2', { height: '300px', width: '300px', bg: '#ff00ff', fontSize: '30px' });
element2.render();
