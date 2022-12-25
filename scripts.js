// Interface elements

const addButtonMain = document.querySelector('#add-book-main');
const modalWindow = document.querySelector('#modal');
const closeModalButton = document.querySelector('#close-modal-button');
const addBookForm = document.querySelector('#add-book-form');
const libraryContainer = document.querySelector('#library');

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

Library.prototype.displayBook = function displayBookOnPage(book, index) {
  const bookDisplayable = createDisplayableBook(book, index);
  libraryContainer.appendChild(bookDisplayable);
};

Library.prototype.displayAll = function displayAllBooksOnPage() {
  this.books.forEach((book, index) => this.displayBook(book, index));
};

Library.prototype.clearDisplayedBooks = function clearDisplayedBooksOnPage() {
  libraryContainer.innerHTML = '';
};

Library.prototype.updateDisplayedBooks = function updateDisplayedBooksOnPage() {
  this.clearDisplayedBooks();
  this.displayAll();
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

function createDisplayableBook(book, index) {
  const bookDisplayable = document.createElement('div');
  const bookTitle = document.createElement('h2');
  const bookAuthor = document.createElement('h3');
  const bookPagesNumber = document.createElement('p');
  const bookState = document.createElement('p');
  const bookDeleteButton = document.createElement('button');

  bookDeleteButton.addEventListener('click', handleBookDeletion);

  // for connection between library array and books on page
  bookDisplayable.setAttribute('data-index', index);

  bookDisplayable.classList.add('book-card');
  bookTitle.classList.add('book-title');
  bookAuthor.classList.add('book-author');
  bookPagesNumber.classList.add('book-pages-number');
  bookState.classList.add('book-state');
  bookDeleteButton.classList.add('book-delete-button');

  bookTitle.textContent = book.title;
  bookAuthor.textContent = book.author;
  bookPagesNumber.textContent = book.numberOfPages;
  bookState.textContent = book.isRead === 'true' ? 'read' : 'not read';
  bookDeleteButton.textContent = 'Delete';

  bookDisplayable.appendChild(bookTitle);
  bookDisplayable.appendChild(bookAuthor);
  bookDisplayable.appendChild(bookPagesNumber);
  bookDisplayable.appendChild(bookState);
  bookDisplayable.appendChild(bookDeleteButton);

  return bookDisplayable;
}

function handleBookDeletion(event) {
  const bookIndex = event.target.parentElement.getAttribute('data-index');
  library.remove(bookIndex);
  library.updateDisplayedBooks();
}

function handleBookInput(event) {
  const bookData = getDataFromInput();
  const book = createBookFromData(bookData);
  library.add(book);
  library.updateDisplayedBooks();

  changeModalVisibility();
  event.preventDefault();
  addBookForm.reset();
}

addBookForm.addEventListener('submit', handleBookInput);

addButtonMain.addEventListener('click', changeModalVisibility);
closeModalButton.addEventListener('click', changeModalVisibility);
