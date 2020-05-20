document.addEventListener("DOMContentLoaded", function() {
    const booksUrl = 'http://localhost:3000/books'
    fetch(booksUrl).then(res => res.json()).then(booksList => {



const listUl = document.querySelector('#list')


function displayBooks(array){
    array.forEach(book => {
       const bookLi = document.createElement('li')
       bookLi.innerHTML += `<h3 class='${book.id}'>Title: ${book.title}</h3>`
        listUl.appendChild(bookLi)
    })
}

displayBooks(booksList)
  document.addEventListener('click', function(e){
      const button = document.querySelector('button')
      const list = document.querySelector('#list')
      if (e.target === button){ 
          const bookToAddId = e.target.dataset.set
            fetch(`${booksUrl}/${bookToAddId}`, {
             method: 'PATCH',
             headers: {
                 "content-type": "application/json",
                 Accept: 'application/json'
             },
             body: JSON.stringify(
                 {users: [
                     {'id': 1, 'username': 'pouros'}]
                 })
            }).then(res => res.json()).then(name => {
                const show = e.target.parentElement
                const listNewPerson = document.createElement('p')
                listNewPerson.innerHTML = '<strong>pouros</stong>'
                 show.appendChild(listNewPerson)}
                )
        } else if (e.target.parentElement.parentElement === list)
        {const showPanel = document.querySelector('#show-panel')
      const id = e.target.className
      fetch(`${booksUrl}/${id}`).then(thing => thing.json()).then(book => {
         showPanel.innerHTML = `<h1>${book.title}</h1>
         <br><button data-set='${book.id}'>Like Book</button><br>
         <img src="${book.img_url}"> <h3>${book.description}</h3>`
         book.users.forEach(user => {
             console.log(user.username)
             const listPerson = document.createElement('p')
             listPerson.innerHTML = `<strong>${user.username}</stong>`
             showPanel.appendChild(listPerson)
            })
        }
      )}
  })

    })
});