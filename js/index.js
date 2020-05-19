
// You can like a book by clicking on a button. 
// You are user 1 {"id":1, "username":"pouros"}, so to like a book send a PATCH request to http://localhost:3000/books/:id with an array of users who like the book. 
// This array should be equal to the existing array of users that like the book, plus your user. 
  //For example, if the previous array was "[{"id":2, "username":"auer"}, {"id":8, "username":"goodwin"}], you should send as the body of your PATCH request:
// This route will respond with the updated book json including the list of users who have liked the book.

// √ add else if statement for click event to assign event read button
  // "Patch" fetch reqest to books/:id
  // update <ul> to show added user


const booksUrl = "http://localhost:3000/books"
const userPouros = {
  id: 1, 
  username: "pouros"
}

document.addEventListener("DOMContentLoaded", function() {
  
  loadBooks()

});

document.addEventListener('click', (e) => {
  if(e.target.className === 'book'){
    loadBookShowPanel(e.target.dataset.bookId)
  } else if (e.target.dataset.id === 'read-button'){
    addUserToBook(e.target)
  }
});

let addUserToBook = (readButton) => {
  const bookDiv = readButton.parentNode
  const usersList = bookDiv.children[3] 
  const users = { 
    
  }
  for (const key in usersList) {
    
  }

};

// these populate show panel with book data

let loadBookShowPanel = (bookId) => {
  fetch(`${booksUrl}/${bookId}`)
  .then(resp => resp.json())
  .then(book => makeBookPanel(book))
};

let makeBookPanel = (book) => {
  const panelDiv = document.getElementById('show-panel')
  panelDiv.dataset.bookId = book.id
  panelDiv.innerHTML = `
    <h1>${book.title}</h1>
    <img src=${book.img_url}/>
    <p>${book.description}</p>
    <ul class='users'></ul>
    <button data-id='read-button'>Read Book</button>
  `
  const usersUl = document.getElementsByClassName('users')[0]
  book.users.forEach(user => {
    let userLi = document.createElement('li')
    userLi.dataset.userId = user.id
    userLi.textContent = user.username
    usersUl.appendChild(userLi)
  })

};

// these fetch, creat li's for, and load books to DOM from API
let loadBooks = () => {
  fetch(booksUrl)
  .then(resp => resp.json())
  .then(makeBookList)
}

let makeBookList = (books) => {
  books.forEach(book => makeNewBook(book))
}

let makeNewBook = (book) => {
  const bookList = document.getElementById('list')
  const newBookLi = document.createElement('li')
  newBookLi.className = 'book'
  newBookLi.dataset.bookId = book.id
  newBookLi.textContent = book.title
  bookList.appendChild(newBookLi)
}


