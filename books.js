const myLibrary = []

function Book(title, author, pages){
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = true
}

Book.prototype.toggleReadStatus = function(){
    this.isRead = !this.isRead
} //each object of type 'Book' will have access to this method ('toggleReadStatus)

let infoDialog = document.getElementById("infoDialog")
let addBooksButton = document.getElementById("addBooksButton")
let cancelButton = document.getElementById("cancelButton")
let inputTitle = document.getElementById('ititle')
let inputAuthor = document.getElementById('iauthor')
let inputPages = document.getElementById('ipages')
let readButton = document.getElementById('readButton')
let resultCards = document.getElementById("resultCards")

addBooksButton.addEventListener("click", function(){ //Open a Dialog
    infoDialog.showModal() 
})

cancelButton.addEventListener("click", function(){ //Close a Dialog
    infoDialog.close() 
})

infoDialog.addEventListener("submit", function(event){ //SEND INFO ABOUT BOOKS
    event.preventDefault()
    addBookToLibrary()
    infoDialog.close()
})

function addBookToLibrary(){ //ADD INFO BOOKS
    let title = inputTitle.value
    let author = inputAuthor.value
    let pages = inputPages.value
   
    let newBook = new Book(title, author, pages)

    myLibrary.push(newBook)

    let card = document.createElement('div') //create cards
    card.className = 'card'
    
    card.innerHTML += `
    <div class="container-removeButton">
        <button class="removeButton">X</button>
    </div> 
    <div class="spaceTitle">Title <div class="resultTitle"> ${title} </div></div>
    <div class="spaceAuthor">Author <div class="resultAuthor"> ${author} </div></div>
    <div class="spacePages">Pages <div class="resultPages"> ${pages} </div></div>
    <div class="container-readButton">
        <button class="readButton">Read</button>
        </div>
    </div> 
    `
    let readButton = card.querySelector('.readButton') 
    readButton.addEventListener("click", function(){  
        newBook.toggleReadStatus()
        readButton.textContent = newBook.isRead? 'Read' : 'Not Read'
    })

    let removeButton = card.querySelector('.removeButton') // create Remove Button
    removeButton.addEventListener('click', function(){
        resultCards.removeChild(card)

    let bookIndex = myLibrary.indexOf(newBook) //find index 
    if(bookIndex > -1){
        myLibrary.splice(bookIndex, 1) //remove book from array
    }
})

resultCards.appendChild(card)
console.log(myLibrary)

inputTitle.value = ' '
inputAuthor.value = ' '
inputPages.value = ' '
}

