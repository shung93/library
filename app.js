// pre-load display for existing books in the library
// if there are new books, then we load-display those new books

function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.id = myLibrary.length;
};

Book.prototype.info = function() {
    return this.title + " by " + this.author + ", " + this.pages + ", " + this.readStatus
};

Book.prototype.cardDiv = function() { 

    let bookCard = document.createElement("div");
    bookCard.className = "bookCard";
    bookCard.setAttribute("data-value", this.id);

    let bookTitle = document.createElement("h2");
    bookTitle.className = "bookTitle";
    bookTitle.innerHTML = this.title;
    
    let bookAuthor = document.createElement("h3");
    bookAuthor.className = "bookAuthor";
    bookAuthor.innerHTML = this.author;

    let bookPages = document.createElement("p");
    bookPages.className = "bookPages";
    bookPages.innerHTML = this.pages;

    let bookStatus = document.createElement("p");
    bookStatus.className = "bookStatus";
    bookStatus.innerHTML = this.readStatus;

    let delBook = document.createElement("button")
    delBook.className = "delBtn"
    delBook.innerHTML = "Remove"

    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);
    bookCard.appendChild(bookStatus);
    bookCard.appendChild(delBook);

    return bookCard;
};

function addBookToLibrary(userBook) {
    myLibrary.push(userBook)

    displayBooks();
};

function displayBooks() {
    document.getElementById("userLibrary").innerHTML = "";

    for (let i = 0; i < myLibrary.length; i++) {
        document.getElementById("userLibrary").append(myLibrary[i].cardDiv());
        removeBook();
    };
};

function modalForm(){
    let modal = document.getElementById("bookModal");
    let modalBtn = document.getElementById("modalBtn");
    let submitBtn = document.getElementById("submitBtn");
    let span = document.getElementsByClassName("close")[0];

    modalBtn.onclick = function() { 
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
        clearModal();
    }

    submitBtn.onclick = function() {
        let title = document.getElementById("title").value;
        let author = document.getElementById("author").value;
        let pages = document.getElementById("pages").value;
        let readStatus = document.getElementById("readStatus").value;

        if (readStatus==="on") {
            readStatus = "Complete";
        } else {
            readStatus = "Incomplete";
        };

        const newBook = new Book(title, author, pages, readStatus);
        addBookToLibrary(newBook);

        modal.style.display = "none";
        clearModal();
    };
};

function removeBook() {
    const delBtnArray = document.getElementsByClassName("delBtn");

    for (let i = 0; i < delBtnArray.length; i++) {
        delBtnArray[i].addEventListener("click", function(event) {
            console.log(this.parentElement.getAttribute("data-value"));
        });
    }

    // myLibrary.splice(idx, 1)
}

function clearModal() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("readStatus").value = "";
};


let myLibrary = [];

// const test1 = new Book('Lord of the Rings: The Return of the King', 'J.R.R. Tolkien', '789', 'Incomplete')
// const test2 = new Book('Lord of the Rings: The Fellowship of the Ring', 'J.R.R. Tolkien', '789', 'Incomplete')
// const test3 = new Book('Lord of the Rings: The Two Towers', 'J.R.R. Tolkien', '789', 'Incomplete')

// myLibrary.push(test1)
// myLibrary.push(test2)
// myLibrary.push(test3)

modalForm();
displayBooks();