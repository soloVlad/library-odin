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
