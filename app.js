// pre-load display for existing books in the library
// if there are new books, then we load-display those new books

function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
};

Book.prototype.info = function() {
    return this.title + " by " + this.author + ", " + this.pages + ", " + this.readStatus
};

Book.prototype.cardDiv = function() {    
    let bookCard = document.createElement("div");
    bookCard.className = "bookCard";
    // bookCard.setAttribute("data-value", );

    let bookTitle = document.createElement("div");
    bookTitle.className = "bookTitle";
    bookTitle.innerHTML = this.title;
    
    let bookAuthor = document.createElement("div");
    bookAuthor.className = "bookAuthor";
    bookAuthor.innerHTML = this.author;

    let bookPages = document.createElement("div");
    bookPages.className = "bookPages";
    bookPages.innerHTML = this.pages;

    let bookStatus = document.createElement("div");
    bookStatus.className = "bookStatus";
    bookStatus.innerHTML = this.readStatus;

    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);
    bookCard.appendChild(bookStatus);

    return bookCard;
};

function addBookToLibrary(userBook) {
    // after submitting a form > push the new book to library
    myLibrary.push(userBook)

    displayBooks();
};

function displayBooks() {
    for (let i = 0; i < myLibrary.length; i++) {
        document.getElementById("userLibrary").append(myLibrary[i].cardDiv());
    };
};

let myLibrary = [];

const test1 = new Book('test1', 'author1', '123 pages', 'not read yet')
const test2 = new Book('test2', 'author2', '456 pages', 'not read yet')
const test3 = new Book('test3', 'author3', '789 pages', 'not read yet')

myLibrary.push(test1)
myLibrary.push(test2)
myLibrary.push(test3)

displayBooks();
//console.log(myLibrary[0].cardDiv())