// Создание (create, POST)
/*const postToAdd = {
  author: 'Mango',
  content: 'CRUD is awesome',
};

fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify(postToAdd),
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
})
  .then(response => response.json())
  .then(post => console.log(post))
    .catch(error => console.log(error));
  
    // Чтение (read, GET)

    fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(posts => console.log(posts))
    .catch(error => console.log(error));
  
    //const postId = 1;

fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
  .then(response => response.json())
  .then(post => console.log(post))
    .catch(error => console.log(error));
  

    //Обновление (update, PUT и PATCH)

 const postId = 1;
const postToUpdate = {
    content: 'CRUD is really awesome',
    
};

fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
  method: 'PATCH',
  body: JSON.stringify(postToUpdate),
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
})
  .then(response => response.json())
  .then(post => console.log(post))
    .catch(error => console.log('ERROR' + error));
  
    //Удаление (delete, DELETE)

    const postIdToDelete = 1;

fetch(`https://jsonplaceholder.typicode.com/posts/${postIdToDelete}`, {
  method: 'DELETE',
})
  .then(() => console.log('success'))
    .catch(error => console.log('ERROR' + error));
  
    //Асинхронные функции

   const getUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = response.json();

  return users;
};

getUsers().then(users => console.log(users));

const getUsers1 = async () => {
  try {
    const result = await fetch('https://jsonplaceholder.typicode.com/users');
    console.log(result);
  } catch (err) {
    throw err;
  }
};

getUsers()
  .then(users => console.log(users))
    .catch(error => console.log(error));
  
    const getUserFriends = async () => {
  const user = await fetch('/user-profile');
  const idList = await fetch(`/users/${user.id}/friends`);
  const promises = idList.map(id => fetch(`/users/${id}`));
  const friends = await Promise.all(promises);

  return friends;
};

// Асинхронная функция всегда вернет промис
const promise = getUserFriends();
promise.then(friends => console.log(friends));*/


function getFruit(name) {
  const fruits = {
    strawberry: '🍓',
    kiwi: '🥝 ',
    apple: '🍎',
  };
  return Promise.resolve(fruits[name]);
}
function makeSmoothie() {
  getFruit('apple').then(apple => {
    console.log(apple);

    getFruit('kiwi').then(kiwi => console.log(kiwi));
  });
}

makeSmoothie();