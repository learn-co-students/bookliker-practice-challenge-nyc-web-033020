// Be able to click on a book, you should see the book's thumbnail and description and a list of users who have liked the book.
  // add click event to book li
    // add book data to show panel div
      // title
      // thumbnal
      // description
      // likers/readers
      // read button

const booksUrl = "http://localhost:3000/books"

document.addEventListener("DOMContentLoaded", function() {

  loadBooks()

});

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
  newBookLi.textContent = book.title
  bookList.appendChild(newBookLi)
}