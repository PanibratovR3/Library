const myLibrary = [];

function Book(author, title, numberOfPages, isRead) {
  this.id = crypto.randomUUID();
  this.author = author;
  this.title = title;
  this.numberOfPages = numberOfPages;
  this.isRead = isRead;
}

function addBookToLibrary(author, title, numberOfPages, isRead) {
  const newBook = new Book(author, title, numberOfPages, isRead);
  myLibrary.push(newBook);
}

addBookToLibrary("Kurt Vonneghut", "Hocus Pocus", 302, false);
addBookToLibrary("Oscar Wilde", "The Pitcure of Dorian Gray", 287, true);
