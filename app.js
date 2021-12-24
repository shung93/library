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

    let bookBtns = document.createElement("div");
    bookBtns.className = "bookBtns";

    let delBook = document.createElement("button");
    delBook.className = "delBtn";
    delBook.innerHTML = "Remove";

    let completeBtn = document.createElement("button");
    completeBtn.className = "completeBtn";
    completeBtn.innerHTML = "Complete";

    let incompleteBtn = document.createElement("button");
    incompleteBtn.className = "incompleteBtn";
    incompleteBtn.innerHTML = "Incomplete";

    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);
    bookCard.appendChild(bookStatus);
    bookCard.appendChild(bookBtns);
    bookBtns.appendChild(completeBtn);
    bookBtns.appendChild(incompleteBtn);
    bookBtns.appendChild(delBook);

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
        completeBook();
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
        // let title = document.getElementById("title").value;
        // let author = document.getElementById("author").value;
        // let pages = document.getElementById("pages").value;
        // let readStatus = document.getElementById("readStatus").value;

        // if (readStatus==="on") {
        //     readStatus = "Complete";
        // } else {
        //     readStatus = "Incomplete";
        // };

        // const newBook = new Book(title, author, pages, readStatus);
        // addBookToLibrary(newBook);

        // modal.style.display = "none";
        // clearModal();
        validateForm();
    };
};

function removeBook() {
    const delBtnArray = document.getElementsByClassName("delBtn");

    for (let i = 0; i < delBtnArray.length; i++) {
        delBtnArray[i].addEventListener("click", function(event) {
            const currIdx = this.parentElement.parentElement.getAttribute("data-value");
            myLibrary.splice(currIdx, 1);
            displayBooks();
        });
    }
};

function completeBook() {
    const completeBtnArray = document.getElementsByClassName("completeBtn");

    for (let i = 0; i < completeBtnArray.length; i++) {
        completeBtnArray[i].addEventListener("click", function(event) {
            const currIdx = this.parentElement.parentElement.getAttribute("data-value");
            myLibrary[currIdx].readStatus = "Complete";
            displayBooks();
        });
    };

    const incompleteBtnArray = document.getElementsByClassName("incompleteBtn");

    for (let i = 0; i < incompleteBtnArray.length; i++) {
        incompleteBtnArray[i].addEventListener("click", function(event) {
            const currIdx = this.parentElement.parentElement.getAttribute("data-value");
            myLibrary[currIdx].readStatus = "Incomplete";
            displayBooks();
        });
    };
};

function validateForm() {
    let title = document.forms["newBookForm"]["title"].value;
    let author = document.forms["newBookForm"]["author"].value;
    let pages = document.forms["newBookForm"]["pages"].value;
    let readStatus = document.forms["newBookForm"]["readStatus"].value;

    if (title !== "" && author !== "" && pages !== "" && title.length < 3800) {
        // && Number.isInteger(pages) && pages > 0 && Number.isInteger(title) === false && Number.isInteger(author) === false
        if (readStatus==="on") {
            readStatus = "Complete";
        } else {
            readStatus = "Incomplete";
        };
        
        const newBook = new Book(title, author, pages, readStatus);
        addBookToLibrary(newBook);

        modal.style.display = "none";
        clearModal();
    } else {
        alert("Please complete required fields.")
        return false;
    };

};

function clearModal() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("readStatus").value = "";
};

// const test1 = new Book('Lord of the Rings: The Return of the King', 'J.R.R. Tolkien', '789', 'Incomplete')
// const test2 = new Book('Lord of the Rings: The Fellowship of the Ring', 'J.R.R. Tolkien', '789', 'Incomplete')
// const test3 = new Book('Lord of the Rings: The Two Towers', 'J.R.R. Tolkien', '789', 'Incomplete')

// myLibrary.push(test1)
// myLibrary.push(test2)
// myLibrary.push(test3)

let myLibrary = [];
modalForm();
displayBooks();