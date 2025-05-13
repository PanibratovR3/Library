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

function showAllBooks() {
  const mainField = document.querySelector(".central-column");
  if (mainField.hasChildNodes()) {
    while (mainField.firstChild) {
      mainField.removeChild(mainField.firstChild);
    }
  }
  for (const book of myLibrary) {
    const bookCard = drawBook(book);
    mainField.appendChild(bookCard);
  }
}

function drawBook(book) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-item");
  bookCard.setAttribute("data-id", book.id);
  // Add author info
  const authorRow = document.createElement("div");
  authorRow.classList.add("book-item-row");
  const authorLabel = document.createElement("div");
  authorLabel.classList.add("label");
  authorLabel.textContent = "Author";
  authorRow.appendChild(authorLabel);
  const authorValue = document.createElement("div");
  authorValue.classList.add("book-author-value");
  authorValue.textContent = book.author;
  authorRow.appendChild(authorValue);
  bookCard.appendChild(authorRow);
  // Add title info
  const titleRow = document.createElement("div");
  titleRow.classList.add("book-item-row");
  const titleLabel = document.createElement("div");
  titleLabel.classList.add("label");
  titleLabel.textContent = "Title";
  titleRow.appendChild(titleLabel);
  const titleValue = document.createElement("div");
  titleValue.classList.add("book-title-value");
  titleValue.textContent = book.title;
  titleRow.appendChild(titleValue);
  bookCard.appendChild(titleRow);
  // Add number of pages info
  const numOfPagesRow = document.createElement("div");
  numOfPagesRow.classList.add("book-item-row");
  const numOfPagesLabel = document.createElement("div");
  numOfPagesLabel.classList.add("label");
  numOfPagesLabel.textContent = "Number of pages";
  numOfPagesRow.appendChild(numOfPagesLabel);
  const numOfPagesValue = document.createElement("div");
  numOfPagesValue.classList.add("book-numOfPages-value");
  numOfPagesValue.textContent = book.numberOfPages;
  numOfPagesRow.appendChild(numOfPagesValue);
  bookCard.appendChild(numOfPagesRow);
  // Add reading status info
  const isReadRow = document.createElement("div");
  isReadRow.classList.add("book-item-row");
  const isReadLabel = document.createElement("div");
  isReadLabel.classList.add("label");
  isReadLabel.textContent = "Has been read?";
  isReadRow.appendChild(isReadLabel);
  const isReadValue = document.createElement("div");
  isReadValue.classList.add("book-isRead-value");
  if (book.isRead) {
    isReadValue.textContent = "Yes";
    isReadValue.classList.add("yes");
  } else {
    isReadValue.textContent = "No";
    isReadValue.classList.add("no");
  }
  isReadRow.appendChild(isReadValue);
  bookCard.appendChild(isReadRow);
  // Add buttons
  const settingsRow = document.createElement("div");
  settingsRow.classList.add("book-item-settings");
  const buttonStatusToggle = document.createElement("button");
  buttonStatusToggle.classList.add("book-setting");
  buttonStatusToggle.classList.add("toggle");
  buttonStatusToggle.textContent = "Toggle read state";
  settingsRow.appendChild(buttonStatusToggle);
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("book-setting");
  deleteButton.classList.add("delete");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", deleteBook);
  settingsRow.appendChild(deleteButton);
  bookCard.appendChild(settingsRow);
  return bookCard;
}

function deleteBook(event) {
  const settings = event.target.parentNode;
  const bookCard = settings.parentNode;
  const bookCardID = bookCard.getAttribute("data-id");
  const bookIndex = myLibrary.findIndex((book) => book.id === bookCardID);
  myLibrary.splice(bookIndex, 1);
  showAllBooks();
}

const addBookButton = document.querySelector(".add-book-button-show-modal");
const dialog = document.querySelector("dialog");

addBookButton.addEventListener("click", () => {
  dialog.showModal();
});

const addBookDialogButton = document.querySelector("dialog button");
addBookDialogButton.addEventListener("click", () => {
  const inputAuthor = document.querySelector("#author").value;
  const inputTitle = document.querySelector("#title").value;
  const inputNumberOfPages = document.querySelector("#number-of-pages").value;
  const inputIsRead = document.querySelector("#is-read").checked;
  if (inputAuthor && inputTitle && inputNumberOfPages) {
    addBookToLibrary(inputAuthor, inputTitle, inputNumberOfPages, inputIsRead);
    showAllBooks();
    document.querySelector("form").reset();
    dialog.close();
  }
});

addBookToLibrary("Kurt Vonneghut", "Hocus Pocus", 302, true);
addBookToLibrary("Oscar Wilde", "The Pitcure of Dorian Gray", 287, true);
addBookToLibrary(
  "Hunther S. Thompson",
  "Fear and Loathing in Las Vegas",
  204,
  false
);

showAllBooks();
