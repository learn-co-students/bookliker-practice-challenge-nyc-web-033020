document.addEventListener("DOMContentLoaded", function() {
    const booksUrl = 'http://localhost:3000/books'
    fetch(booksUrl).then(res => res.json()).then(booksList => {

  

const listUl = document.querySelector('#list')


function displayBooks(array){
    array.forEach(book => {
       const newB = document.createElement('li')
       newB.innerHTML += `<h3 class='${book.id}'>Title: ${book.title}</h3>`
        listUl.appendChild(newB)
    })
}

displayBooks(booksList)
  document.addEventListener('click', function(e){
      const but = document.querySelector('button')
      const lit = document.querySelector('#list')
      if (e.target === but){ 
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
        } else if (e.target.parentElement.parentElement == lit)
        {const showPannel = document.querySelector('#show-panel')
      const id = e.target.className
      fetch(`${booksUrl}/${id}`).then(thing => thing.json()).then(boke => {
         showPannel.innerHTML = `<h1>${boke.title}</h1>
         <br><button data-set='${boke.id}'>Like Book</button><br>
         <img src="${boke.img_url}"> <h3>${boke.description}</h3>`
         boke.users.forEach(user => {
             console.log(user.username)
             const listPerson = document.createElement('p')
             listPerson.innerHTML = `<strong>${user.username}</stong>`
             showPannel.appendChild(listPerson)
            })
        }
      )}
  })
    
    })
});
