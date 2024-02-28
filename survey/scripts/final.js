const itemForm = document.getElementById('item-form');

function storeComment (e){
  e.preventDefault();
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
itemForm.addEventListener('submit', storeComment);