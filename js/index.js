document.addEventListener("DOMContentLoaded", function() {
    const bookList = document.getElementById("list")
    // const booksUrl = "http://localhost:3000/books"
    fetch("http://localhost:3000/books")
    .then(resp => resp.json())
    .then(json => {
        json.map( (book) =>{
            let li = document.createElement('li')
            li.id = book.id
            li.title = book.title
            li.className = 'book'
            li.innerHTML = `${book.title}`
            bookList.appendChild(li)
        })
        bookList.addEventListener('click', (e) => {
            if(e.target.className === "book"){
                const show = document.getElementById("show-panel")
                if(show.firstChild) show.removeChild(show.firstChild)
                fetch(`http://localhost:3000/books/${e.target.id}`)
                .then(resp => resp.json())
                .then(json =>{
                    let div = document.createElement('div')
                    div.innerHTML = `
                    <h2>${json.title}</h2>
                    <img src=${json.img_url}>
                    <p>${json.description}</p>
                    <button id=${json.id} class=like>Like this Book</button>`
                    let ul = document.createElement('ul')
                    ul.className ='usersLike'
                    div.appendChild(ul)
                    
                    json.users.map((user) =>{
                        let li = document.createElement('li')
                        li.id = user.id
                        li.innerHTML =`<strong>${user.username}</strong>`
                        ul.appendChild(li)
                    })
                    show.appendChild(div)
                })
            }
        })
        document.addEventListener('click', (e) =>{
            if(e.target.className === 'like'){
                fetch(`http://localhost:3000/books/${e.target.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    },
                    body: JSON.stringify({
                        users: [
                            {'id': 1, 'username': 'pouros'}]
                    })
                }).then(res => res.json())
                .then(name => {
                    const show = e.target.nextElementSibling
                    const listNewPerson = document.createElement('li')
                    listNewPerson.innerHTML = '<strong>pouros</stong>'
                    show.appendChild(listNewPerson)}
                )
            }
        })
    })
});
