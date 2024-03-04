const itemForm = document.getElementById('item-form');

function serverPost(){
  const url = 'http://127.0.0.1:5000/';
  const userData = localStorage.getItem('userData');
  const userExpressions = localStorage.getItem('userExpressions');
  // console.log(JSON.parse(userData));
  // console.log(JSON.parse(userExpressions));
  const data = JSON.stringify({'userData': JSON.parse(userData), 'userExpressions': JSON.parse(userExpressions)});
  console.log(data);
  
  fetch(url, {
      method: 'POST',
      mode: 'cors', 
      headers: {
          'Content-Type': 'application/json',
      },
      body: data, 
  })
  .then(data => console.log(data))
  .catch((error) => {
      console.error('Error:', error);
  });
}

function storeComment (){
  const userComment = document.getElementById('user-comment');
  const userData = localStorage.getItem('userData');
  if (userData !== null) {
    const user = JSON.parse(userData);
    user['comment'] = userComment.value;
    localStorage.setItem('userData', JSON.stringify(user));
  } else {
    localStorage.setItem('userData', JSON.stringify({'comment': userComment.value}));
  }
}


function completeSurvey(e){
  // e.preventDefault();
  storeComment();
  console.log("send data");
  serverPost();
}

function displayComment () {
  const value = localStorage.getItem('userData');
  const userComment = document.getElementById('user-comment');

  if (value !== null) {
    const parsedValue = JSON.parse(value);
    if ('comment' in parsedValue) {
      userComment.value = parsedValue['comment'];
    }
  }
}


document.addEventListener('DOMContentLoaded', displayComment);
itemForm.addEventListener('submit', completeSurvey);