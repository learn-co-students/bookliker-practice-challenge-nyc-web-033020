document.addEventListener("DOMContentLoaded", function() {

    const containerDiv = document.querySelector('#list')
    const showPanelDiv = document.querySelector('#show-panel')
    const url = 'http://localhost:3000/books'
    let userlist = []

    let getBooks = () => {
        fetch(url)
            .then(resp => resp.json())
            .then(json => renderBookList(json))
    }
    getBooks()

    //Render list to DOM
    let renderBookList = (data) => {
        for(const element of data) {
            containerDiv.innerHTML += `
                <li data-id="${element.id}">${element.title}</li>
            `
        }
    }

    //listener on book list to show book details
    containerDiv.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            const id = e.target.dataset.id
            showPanelDiv.innerHTML = ''

            //fetch request for "show" action
            fetch(`${url}/${id}`)
                .then(resp => resp.json())
                .then(json => renderBookShow(json))

            //create book details, append it to the DOM
            let renderBookShow = (book) => {

                showPanelDiv.innerHTML += `
                    <h2>${book.title}</h2>
                    <img src="${book.img_url}" alt="${book.title}'s cover" />
                    <p>${book.description}</p>
                    <p>${userlist.join(", ")}</p>
                    <button data-id="${book.id}"data-btn="btn">Read Book</button>
                `
                //get book like list
                for (let i = 0; i < book.users.length; i++) {
                    const spanElement = document.createElement('span')
                    spanElement.dataset.id = book.users[i].id
                    spanElement.textContent = book.users[i].username
                    showPanelDiv.appendChild(spanElement)
                    spanElement.style.display = 'block'
                    // userlist.push(book.users[i].username)
                }
            }
        }
    })

    //event listener for read/like button
    showPanelDiv.addEventListener('click', (e) => {


        if (e.target.dataset.btn === "btn") {
            const id = e.target.dataset.id
            
            const users = [{"id":1, "username":"pouros"}]
            const spanElements = showPanelDiv.querySelectorAll('span')
            const spanArray = Array.from(spanElements)
            
            for (let i=0; i < spanArray.length; i++) {
                users.push({id: spanArray[i].dataset.id, username: spanArray[i].textContent})
            }

            console.log(users)

            //get existing users from DOM and their ID
            //add them to users array to include in PATCH body
            
            // fetch(`${url}/${id}`)
            //     .then(resp => resp.json())
            //     // .then(book => console.log(book.users))

            fetch(`${url}/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    users: users
                  })
              
            })
                .then(resp => resp.json())
                .then(console.log)

            //Now create a function with the returned data and update the show view div

        }
    })

});


// h2 --> img --> p