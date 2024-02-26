const itemForm = document.getElementById('item-form');
// const btnNext = document.getElementById("btn-next");

// function storeID (){
//   const userID = document.getElementById('user-id');
//   // console.log(userID);
//   localStorage.setItem('userID', userID.value);
// }

function redirectToPage(url){
  location.href = url;
}

function storeID (){
  const userID = document.getElementById('user-id');
  // console.log(userID);
  const userData = localStorage.getItem('userData');
  if (userData !== null) {
    const user = JSON.parse(userData);
    user['id'] = userID.value;
    localStorage.setItem('userData', JSON.stringify(user));
  } else {
    localStorage.setItem('userData', JSON.stringify({'id': userID.value}));
  }
  // redirectToPage('lexicon1.html');
}


// function displayID () {
//   const userID = document.getElementById('user-id');
//   const value = localStorage.getItem('userID');
//   if (value !== null) {
//     userID.value = value;
//   }
// }


function displayID () {
  const value = localStorage.getItem('userData');
  const userID = document.getElementById('user-id');

  if (value !== null) {
    const parsedValue = JSON.parse(value);
    if ('id' in parsedValue) {
      userID.value = parsedValue['id'];
    }
  }
}


document.addEventListener('DOMContentLoaded', displayID);
// btnNext.addEventListener('click', storeID);
itemForm.addEventListener('submit', storeID);










