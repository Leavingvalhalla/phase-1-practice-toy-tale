let addToy = false;

document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector('#new-toy-btn');
  const toyFormContainer = document.querySelector('.container');

  fetch('http://localhost:3000/toys')
    .then((res) => res.json())
    .then((data) => {
      data.forEach((toy) => {
        const card = document.createElement('div');
        card.className = 'card';
        const name = document.createElement('h2');
        name.innerText = toy.name;
        card.appendChild(name);

        const img = document.createElement('img');
        img.src = toy.image;
        img.className = 'toy-avatar';
        card.appendChild(img);

        const likes = document.createElement('p');
        // TO FIX
        likes.innerText = '0';
        likes.id = `likes-${toy.id}`;
        card.appendChild(likes);

        const button = document.createElement('button');
        button.innerText = 'Like ❤️';
        button.className = 'like-btn';
        button.id = toy.id;
        card.appendChild(button);
        document.getElementById('toy-collection').appendChild(card);
      });
    });

  addBtn.addEventListener('click', () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = 'block';
    } else {
      toyFormContainer.style.display = 'none';
    }

    const addToyFunc = document
      .querySelector('.add-toy-form')
      .addEventListener('submit', (e) => {
        e.preventDefault();
        const newToyName = document.getElementsByTagName('input')[0].value;
        const newToyImage = document.getElementsByTagName('input')[1].value;
        fetch('http://localhost:3000/toys', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: newToyName,
            image: newToyImage,
            likes: 0,
          }),
        });
        const card = document.createElement('div');
        card.className = 'card';
        card.name = newToyName;
        card.image = newToyImage;
        document.getElementById('toy-collection').appendChild(card);
      });
  });

  const cards = document.getElementsByClassName('card');
  console.log(cards);
  console.log(cards.length);
  for (let i = 0; i < cards.length; i++) {
    const likeButton = document.getElementById(i);
    const likeCount = likeButton.previousSibling;
    console.log(likeCount);
    likeButton.addEventListener('click', (e) => {
      likeCount.value += 1;
    });
  }
});
