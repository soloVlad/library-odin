// Data structures

function Library(books = []) {
  this.books = books;
}

Library.prototype.add = function addBookToLibrary(book) {
  this.books.push(book);
};

Library.prototype.remove = function removeBookFromLibrary(index) {
  this.books.splice(index, 1);
};

function Book(title, author, numberOfPages, isRead) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.isRead = isRead;
}

Book.prototype.info = function getBookInfo() {
  return `${this.title} by ${this.author}, ${this.numberOfPages} pages, ${this.isRead ? '' : 'not'} read.`;
};

// Interface interactions

const addButtonMain = document.querySelector('#add-book-main');
const modalWindow = document.querySelector('#modal');
const closeModalButton = document.querySelector('#close-modal-button');
const addBookForm = document.querySelector('#add-book-form');

const library = new Library();

function changeVisibility(object) {
  object.classList.toggle('hide');
}

function changeModalVisibility() {
  changeVisibility(modalWindow);
}

function getDataFromInput() {
  const data = new FormData(addBookForm);
  const dataObj = {};
  data.forEach((value, key) => { dataObj[key] = value; });
  return dataObj;
}

function createBookFromData(bookData) {
  return new Book(bookData.title, bookData.author, bookData.numberOfPages, bookData.isRead);
}

function handleBookInput(event) {
  const bookData = getDataFromInput();
  const book = createBookFromData(bookData);
  library.add(book);

  changeModalVisibility();
  event.preventDefault();
}

addBookForm.addEventListener('submit', handleBookInput);

addButtonMain.addEventListener('click', changeModalVisibility);
closeModalButton.addEventListener('click', changeModalVisibility);
