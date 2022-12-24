const addButtonMain = document.querySelector('#add-book-main');
const modalWindow = document.querySelector('#modal');
const closeModalButton = document.querySelector('#close-modal-button');

function changeVisibility(object) {
  object.classList.toggle('hide');
}

function changeModalVisibility() {
  changeVisibility(modalWindow);
}

addButtonMain.addEventListener('click', changeModalVisibility);
closeModalButton.addEventListener('click', changeModalVisibility);

const myLibrary = [];

function Book(title, author, numberOfPages, isRead) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.isRead = isRead;
}

Book.prototype.info = function getBookInfo() {
  return `${this.title} by ${this.author}, ${this.numberOfPages} pages, ${this.isRead ? '' : 'not'} read.`;
};

function addBookToLibrary(book) {
  myLibrary.push(book);
}
