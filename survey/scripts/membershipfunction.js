// import {prepareSliders, updateSlider} from "./helpers/slider.js";
// import {showWarning, clearWarning} from "./helpers/warnings.js";

// const itemForm = document.getElementById('item-form');
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");

let curExpression;
let nextPageURL = 'ranking.html';

// functions from imports
// functions from -> import {showWarning, clearWarning} from "./helpers/warnings.js"
// create deault icon element
function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
} 

function createTextWarning(warningText, idName) {
  const span = document.createElement('span');
  const text = document.createTextNode(warningText);
  span.setAttribute("id", idName);
  // span.id = idName;
  span.appendChild(text);
  return span;
}

function createWarningAdd(warningText){
  const div = document.createElement('div'); 
  const icon = createIcon("fa fa-exclamation-triangle fa-2x");
  const text = createTextWarning(warningText, "warning-text");

  div.appendChild(icon);
  div.appendChild(text);

  div.classList.add("warning-add");
  return div;
}

function createWarningNext(warningText){
  const div = document.createElement('div'); 
  const icon = createIcon("fa fa-exclamation-triangle");
  const text = createTextWarning(warningText, "warning-text");

  div.appendChild(text);
  div.appendChild(icon);
  
  div.classList.add("warning-next");
  return div;
}


function showWarning(warningText, containerID){
  const warning = (containerID == "warning-container-add")? createWarningAdd(warningText) : createWarningNext(warningText);
  const warningContainer = document.getElementById(containerID);
  warningContainer.appendChild(warning);
}

function clearWarning(containerID){
  const warningContainer = document.getElementById(containerID);
  warningContainer.innerHTML = '';
}

// functions from -> import {prepareSliders, updateSlider} from "./helpers/slider.js"
function updateSlider (slider){
  const progress = (slider.value / slider.max) * 100;
  slider.style.background = `linear-gradient(to right, var(--main-color) ${progress}%, #ccc ${progress}%)`;
}

function updateSliderNull (slider){
  const progress = (50 / slider.max) * 100;
  slider.style.background = `linear-gradient(to right, #888 ${progress}%, #ccc ${progress}%)`;
}

function sliderEvent (e) {
  updateSlider (e.target);
}

function enableEvent (e){
  sliderEnable (e.target);
  updateSlider (e.target);
}

function sliderEnable (slider){
  slider.classList.remove('slider-disabled');
  slider.classList.add('slider-enabled');
}

function prepareSliders () {
  const sliders = document.querySelectorAll(".range-slider");
  if (sliders !== null) {
    sliders.forEach( slider => {
      slider.addEventListener("mousedown", enableEvent);
      slider.addEventListener("input", sliderEvent);
    })
  }
}

// end of functions from imports


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
        updateNextPageURL('year.html');
      } else {
        updateNextPageURL('sliders.html');
      }
      status['currPosition'] = position;
      localStorage.setItem('surveyStatus', JSON.stringify(status));
    }
  }
}

function storeSliderValues(){
  const values = [...document.getElementsByClassName('range-slider')].map((slider) => (slider.classList.contains('slider-disabled'))? null : slider.value);
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
  return values.map(x => (x != null) ? Number(x) : x );
}

function displaySliderValues() {
  const sliders = document.getElementsByClassName('range-slider')
  const userExpressions = localStorage.getItem('userExpressions');
  if (userExpressions !== null) {
    const expressions = JSON.parse(userExpressions);
    if ('functions' in expressions) {
      if (curExpression in expressions['functions']) {
        expressions['functions'][curExpression].forEach((value, i) => {
          if(value != null){
            sliderEnable (sliders[i]);
            sliders[i].value = value;
            updateSlider(sliders[i]);
          }else {
            updateSliderNull(sliders[i]);
          }
        });
        return;
      }
    }
  }
  [...sliders].forEach((slider) => updateSliderNull(slider));
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
  console.log(values);
  clearWarning("warning-container-next");
  // if(values.reduce((x,y) => x+y, 0) == 0){
  //   showWarning('Please move at least one slider to proceed to the next page!', "warning-container-next");
  //   return
  // }
  if(values.includes(null)){
    showWarning('Please move all sliders to proceed to the next page!', "warning-container-next");
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