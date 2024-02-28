import {prepareSliders, updateSlider} from "./helpers/slider.js";
import {showWarning, clearWarning} from "./helpers/warnings.js";

// const itemForm = document.getElementById('item-form');
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");

let curExpression;
let nextPageURL = 'ranking.html';

function updateNextPageURL (url){
  nextPageURL = url;
}

function redirectToPage(url){
  location.href = url;
}

function getCurrentExpression(){
  const statusValue = localStorage.getItem('surveyStatus');

  if (statusValue !== null) {
    const status = JSON.parse(statusValue);
    if ('currPosition' in status && 'expressionOrder' in status) {
      const position = status['currPosition'];
      const order = status['expressionOrder'];
      return order[position];
    }
  }
  return null;
}

function loadExpressionInstructions(expression){
  const expressionElement = document.getElementById('expression');
  expressionElement.innerText = expression;
}


function updateExpressionPosition(dir){
  const statusValue = localStorage.getItem('surveyStatus');
  const direction = {'next': 1, 'prev': -1};
  // const expressionElement = document.getElementById('expression');

  if (statusValue !== null) {
    const status = JSON.parse(statusValue);
    if ('currPosition' in status && 'expressionOrder' in status) {
      let position = status['currPosition'] + direction[dir];
      const orderLen = status['expressionOrder'].length;
      if(position < 0){
        position = 0;
        // redirect to ranking.html
        updateNextPageURL('ranking.html');
      } else if (position >= orderLen){
        position = orderLen - 1;
        // redirect to final.html
        updateNextPageURL('demographic.html');
      } else {
        updateNextPageURL('membershipfunction.html');
      }
      status['currPosition'] = position;
      localStorage.setItem('surveyStatus', JSON.stringify(status));
    }
  }
}

function storeSliderValues(){
  const values = [...document.getElementsByClassName('range-slider')].map(slider => slider.value);
  const userExpressions = localStorage.getItem('userExpressions');
  if (userExpressions !== null) {
    const expressions = JSON.parse(userExpressions);
    if ('functions' in expressions) {
      expressions['functions'][curExpression] = values;
    } else {
      expressions['functions'] = {[curExpression]: values};
    }
    localStorage.setItem('userExpressions', JSON.stringify(expressions));
  } else {
    localStorage.setItem('userExpressions', JSON.stringify({'functions': {[curExpression]: values}}));
  }
  return values.map(Number);
}

function displaySliderValues() {
  const sliders = document.getElementsByClassName('range-slider')
  const userExpressions = localStorage.getItem('userExpressions');
  if (userExpressions !== null) {
    const expressions = JSON.parse(userExpressions);
    if ('functions' in expressions) {
      if (curExpression in expressions['functions']) {
        expressions['functions'][curExpression].forEach((value, i) => {
          sliders[i].value = value;
          updateSlider(sliders[i]);
        });
      }
    }
  }
}

function onLoad() {
  // slider init
  prepareSliders();
  // load expression to instructions
  curExpression = getCurrentExpression();
  if(curExpression !== null) {
    loadExpressionInstructions(curExpression);
  }else{
    redirectToPage('ranking.html');
  }
  // load sliders if values in storage
  displaySliderValues();
}


function nextPage() {
  // store slider values
  const values = storeSliderValues();
  clearWarning("warning-container-next");
  if(values.reduce((x,y) => x+y, 0) == 0){
    showWarning('Please move at least one slider to proceed to the next page!', "warning-container-next");
    return
  }
  // update currPosition and redirect to next page
  updateExpressionPosition('next');
  redirectToPage(nextPageURL); 
}

function previousPage(){
  storeSliderValues();
  updateExpressionPosition('prev');
  redirectToPage(nextPageURL);
}


document.addEventListener('DOMContentLoaded', onLoad);
btnNext.addEventListener('click', nextPage);
btnPrev.addEventListener('click', previousPage);