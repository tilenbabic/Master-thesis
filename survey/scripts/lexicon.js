const itemForm = document.getElementById('item-form');
const btnPrev = document.getElementById("btn-prev");
// const btnNext = document.getElementById("btn-next");



// function storeExpressions (){
//   const baseExpressions = [...document.getElementsByClassName('form-input')];
//   const expressions = {};
//   baseExpressions.forEach( expression => {
//     expressions[expression.id] = expression.value;
//   });

//   localStorage.setItem('baseExpressions', JSON.stringify(expressions));
// }



function storeExpressions(){
  // e.preventDefault();
  // get expressions
  const baseExpressions = [...document.getElementsByClassName('form-input')].map((expression) => expression.value);
  // check if expressions already in storage
  const surveyStatus = localStorage.getItem('surveyStatus');
  if (surveyStatus !== null) {
    const status = JSON.parse(surveyStatus);
    status['baseExpressions'] = baseExpressions;
    localStorage.setItem('surveyStatus', JSON.stringify(status));
  } else {
    localStorage.setItem('surveyStatus', JSON.stringify({'baseExpressions': baseExpressions}));
  }
  // redirectToPage('lexicon2.html');
}


// function displayExpressions() {
//   const value = localStorage.getItem('baseExpressions');
//   if (value !== null) {
//     Object.entries(JSON.parse(value)).forEach(([key, value]) => {
//       const expression = document.getElementById(key);
//       expression.value = value;
//     });
//   }
// }

function displayExpressions() {
  const value = localStorage.getItem('surveyStatus');
  const baseExpressions = document.getElementsByClassName('form-input');

  if (value !== null) {
    const parsedValue = JSON.parse(value);
    if ('baseExpressions' in parsedValue) {
      parsedValue['baseExpressions'].forEach((expression, i) => {
        baseExpressions[i].value = expression; 
      });
    }
  }
}


function redirectToPage(url){
  location.href = url;
}

function previousPage(){
  redirectToPage('index.html');
}



document.addEventListener('DOMContentLoaded', displayExpressions);
itemForm.addEventListener('submit', storeExpressions);
btnPrev.addEventListener('click', previousPage);


// document.getElementById("btn-prev").onclick = function () {
//   location.href = "index.html";
// };
// document.getElementById("btn-next").onclick = function () {
// location.href = 'lexicon2.html';
// };