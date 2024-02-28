import {loadSuggestions} from "./helpers/expressions.js";

const itemForm = document.getElementById('item-form');
const btnPrev = document.getElementById("btn-prev");
// const btnNext = document.getElementById("btn-next");


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

  // load suggestions
  loadSuggestions();
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
