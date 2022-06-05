let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//GET request and create card for all toy objects
document.addEventListener('DOMContentLoaded', e => {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(data => {
    data.forEach(toy => createCard(toy))
    })
})

//POST request to add new toy 
let form = document.querySelector('.add-toy-form')
form.addEventListener('submit', e => {
  e.preventDefault();

  let input = document.querySelectorAll('.input-text')
  let inputName = input[0];
  let inputUrl = input[1];

  const newToy = {
    name: inputName.value,
    image: inputUrl.value,
    likes: "0"
  }

  const configureObj = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newToy)
  }

  fetch('http://localhost:3000/toys', configureObj)
  .then(res => res.json())
  .then(data => createCard(data))
})

function createCard(toy) {
  let card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes} Likes</p>
    <button class="like-btn" id="[toy_id]">Like ❤️</button>
    `
  document.querySelector('#toy-collection').appendChild(card)

  card.querySelector('.like-btn').addEventListener('click', e => {
      e.preventDefault()
      toy.likes++
      card.querySelector('p').textContent = `${toy.likes} Likes`;
      updateLikes(toy)
      })
} 
//Patch request for likes

function updateLikes (card) {
  fetch(`http://localhost:3000/toys/${card.id}`, {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(card)
        })
        .then(res => res.json())
        .then(toy => console.log(toy))
  }












