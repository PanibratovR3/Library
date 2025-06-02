const myLibrary = [];

class Book {
  #id;
  #author;
  #title;
  #numberOfPages;
  #isRead;
  constructor(author, title, numberOfPages, isRead) {
    this.#id = crypto.randomUUID();
    this.#author = author;
    this.#title = title;
    this.#numberOfPages = numberOfPages;
    this.#isRead = isRead;
  }

  toggleReadState() {
    this.#isRead = !this.#isRead;
  }

  get id() {
    return this.#id;
  }

  get author() {
    return this.#author;
  }

  get title() {
    return this.#title;
  }

  get numberOfPages() {
    return this.#numberOfPages;
  }

  get isRead() {
    return this.#isRead;
  }
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
  buttonStatusToggle.addEventListener("click", toggleReadState);
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
function toggleReadState(event) {
  const settingsRow = event.target.parentNode;
  const bookCard = settingsRow.parentNode;
  const bookID = bookCard.getAttribute("data-id");
  const bookIndex = myLibrary.findIndex((book) => book.id === bookID);
  myLibrary[bookIndex].toggleReadState();
  showAllBooks();
}

const addBookButton = document.querySelector(".add-book-button-show-modal");
const dialog = document.querySelector("dialog");

addBookButton.addEventListener("click", () => {
  dialog.showModal();
});

function isValidInput(input) {
  if (input.type === "number") {
    let isNotEmpty = input.value !== 0;
    let moreThanMin = input.value > input.min;
    return { isNotEmpty, moreThanMin };
  } else if (input.type === "text") {
    let isNotEmpty = input.value.length !== 0;
    return { isNotEmpty };
  }
}

function setInputClass(input, flags) {
  if (input.type === "number") {
    input.className =
      flags.isNotEmpty && flags.moreThanMin ? "valid" : "invalid";
  } else if (input.type === "text") {
    input.className = flags.isNotEmpty ? "valid" : "invalid";
  }
}

function updateError(input, flags) {
  const errorTag = document.querySelector("span.error." + input.id);
  if (input.type === "number") {
    if (flags.isNotEmpty && flags.moreThanMin) {
      errorTag.textContent = "";
      errorTag.classList.remove("active");
    } else {
      errorTag.textContent =
        "Number of pages must be not empty and more than " +
        input.min +
        " pages.";
      errorTag.classList.add("active");
    }
  } else if (input.type === "text") {
    if (flags.isNotEmpty) {
      errorTag.textContent = "";
      errorTag.classList.remove("active");
    } else {
      errorTag.textContent =
        input.id[0].toUpperCase() + input.id.slice(1) + " must not be empty.";
      errorTag.classList.add("active");
    }
  }
}

function handleInput(event) {
  const resultFlags = isValidInput(event.target);
  setInputClass(event.target, resultFlags);
  updateError(event.target, resultFlags);
}

function handleSubmit(event) {
  event.preventDefault();

  const inputs = Array.from(document.querySelectorAll("input")).slice(0, -1);

  inputs.forEach((input) => {
    const resultFlags = isValidInput(input);
    setInputClass(input, resultFlags);
    updateError(input, resultFlags);
  });

  const errorFields = Array.from(document.querySelectorAll("span.error"));
  const areAllErrorFieldsEmpty = errorFields.every(
    (field) => field.textContent === ""
  );
  if (areAllErrorFieldsEmpty) {
    const author = inputs[0].value;
    const title = inputs[1].value;
    const numberOfPages = inputs[2].value;
    const hasBeenRead = document.querySelector("#is-read").checked;
    addBookToLibrary(author, title, numberOfPages, hasBeenRead);
    showAllBooks();
    event.target.reset();
    dialog.close();
  }
}

const inputs = Array.from(document.querySelectorAll("input")).slice(0, -1);

const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);
inputs.forEach((input) => input.addEventListener("input", handleInput));
addBookToLibrary("Kurt Vonneghut", "Hocus Pocus", 302, true);
addBookToLibrary("Oscar Wilde", "The Pitcure of Dorian Gray", 287, true);
addBookToLibrary(
  "Hunther S. Thompson",
  "Fear and Loathing in Las Vegas",
  204,
  false
);

showAllBooks();
