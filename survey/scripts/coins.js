import {showWarning, clearWarning} from "./helpers/warnings.js";

const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const cointContainer = document.getElementById('coin-container');


const rows = 20;
const cols = 11;
let coinsCounter = 0;
let curExpression;
let nextPageURL = 'ranking.html';



function createLabelRow(cols){
  const step = 100/(cols-1);
  let output = `<td class="label"> 0 </td>`
  for (let i=1; i < cols; i++){
    output += `<td class="label">${Math.round(i * step)}</td>`;
  }
  return output;
}


function createTable(){
  const table = document.getElementById('coin-container');

  let output = '';

  for(let i=0; i < rows; i++){
    let col = ''
    for(let j=0; j < cols; j++){
      if(i == rows - 1){
        col += `<td><div class="coin valid-add" id="${rows-1-i},${j}"></div></td>`;
      }else{
        col += `<td><div class="coin prohibited" id="${rows-1-i},${j}"></div></td>`;
      }
    }
    output += `<tr>` + col + '</tr>';
  }
  
  output += `<tr>` + createLabelRow(cols) + `</tr>`;
  table.innerHTML = '<table id="coin-field">' + output + '</table>';    
  
}

function removeCoin(pos){
  const [row,col] = pos.split(',').map(Number);
  if(rows-1 == row) return true;

  const coinBelow = document.getElementById(`${row+1},${col}`);
  if(!coinBelow.classList.contains("selected")){
    return true;
  }
  return false;
}


function addCoin(pos){
  const [row,col] = pos.split(',').map(Number);
  if(row == 0) return true;

  const coinBelow = document.getElementById(`${row-1},${col}`);
  if(coinBelow.classList.contains("selected")){
    return true;
  }
  return false;
}


function addClass(id, className){
  const element = document.getElementById(id);
  element.classList.add(className);
}

function removeClass(id, className){
  const element = document.getElementById(id);
  element.classList.remove(className);
}

function resolveClassesAdd(pos){
  addClass(pos, "selected");
  removeClass(pos, "valid-add");
  addClass(pos, "valid-remove");
  const [row,col] = pos.split(',').map(Number);
  if(row < rows-1){
    removeClass(`${row+1},${col}`, "prohibited");
    addClass(`${row+1},${col}`, "valid-add");
  }
  if(row > 0){
    removeClass(`${row-1},${col}`, "valid-remove");
  }
}
function resolveClassesRemove(pos){
  removeClass(pos, "selected");
  removeClass(pos, "valid-remove");
  addClass(pos, "valid-add");
  const [row,col] = pos.split(',').map(Number);
  if(row < rows-1){
    removeClass(`${row+1},${col}`, "valid-add");
    addClass(`${row+1},${col}`, "prohibited");
  }
  if(row > 0){
    addClass(`${row-1},${col}`, "valid-remove");
  }
}

function updateCounter(){
  const counter = document.getElementById("coins-counter");
  counter.innerHTML = coinsCounter;
}

function coinAddRemove(e){
  const td = e.target
  
  if (!td.classList.contains("coin")) {
    return;
  }

  if(td.classList.contains("label")){
    return;
  }

  clearWarning("warning-container-next");

  if(td.classList.contains("selected")){
    if(removeCoin(td.id)) {
      coinsCounter -= 1;
      updateCounter();
      resolveClassesRemove(td.id)
    }
  }else{
    if(addCoin(td.id)) {
      coinsCounter += 1;
      updateCounter();
      resolveClassesAdd(td.id);
    }
  }
}


function updateNextPageURL (url){
  nextPageURL = url;
}

function updateExpressionPosition(dir){
  const statusValue = localStorage.getItem('surveyStatus');
  const direction = {'next': 1, 'prev': -1};
  // const expressionElement = document.getElementById('expression');

  if (statusValue !== null) {
    const status = JSON.parse(statusValue);
    if ('currPositionCoins' in status && 'expressionOrder' in status) {
      let position = status['currPositionCoins'] + direction[dir];
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
        updateNextPageURL('coins.html');
      }
      status['currPositionCoins'] = position;
      localStorage.setItem('surveyStatus', JSON.stringify(status));
    }
  }
}

function getCoinsValues(){
  let output = [];
  for(let i=0; i < cols; i++){
    let coinsNum = 0;
    for(let j=0; j < rows; j++){
      const coin = document.getElementById(`${j},${i}`);
      console.log(coin);
      if(!coin.classList.contains("selected")) break;
      coinsNum++;
    }
    output.push(coinsNum);
  }
  return output;
}




function displayCoins() {
  const userExpressions = localStorage.getItem('userExpressions');
  if (userExpressions !== null) {
    const expressions = JSON.parse(userExpressions);
    if ('functionsCoins' in expressions) {
      if (curExpression in expressions['functionsCoins']) {
        expressions['functionsCoins'][curExpression].forEach((value,i) => {
          for(let j = 0; j < value; j++){
            resolveClassesAdd(`${j},${i}`);
          }
        });
        coinsCounter = expressions['functionsCoins'][curExpression].reduce((x, y) => {return x + y}, 0);
      }
    }
  }
}





function storeCoins(){
  const values = getCoinsValues();

  const userExpressions = localStorage.getItem('userExpressions');
  if (userExpressions !== null) {
    const expressions = JSON.parse(userExpressions);
    if ('functionsCoins' in expressions) {
      expressions['functionsCoins'][curExpression] = values;
    } else {
      expressions['functionsCoins'] = {[curExpression]: values};
    }
    localStorage.setItem('userExpressions', JSON.stringify(expressions));
  } else {
    localStorage.setItem('userExpressions', JSON.stringify({'functionsCoins': {[curExpression]: values}}));
  }
  return values;
}

function getCurrentExpression(){
  const statusValue = localStorage.getItem('surveyStatus');

  if (statusValue !== null) {
    const status = JSON.parse(statusValue);
    if ('currPositionCoins' in status && 'expressionOrder' in status) {
      const position = status['currPositionCoins'];
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


function redirectToPage(url){
  location.href = url;
}

function nextPage() {
  // store coins
  const values = storeCoins();
  clearWarning("warning-container-next");
  if(values.reduce((x,y) => x+y, 0) < 20){
    showWarning('Please place at least 20 coins to proceed to the next page!', "warning-container-next");
    return
  }

  // update currPosition and redirect to next page
  updateExpressionPosition('next');
  redirectToPage(nextPageURL);

}

function previousPage(){
  storeCoins();
  updateExpressionPosition('prev');
  redirectToPage(nextPageURL);
}


function onLoad() {
  // prepareSliders();
  createTable();
  // load expression to instructions
  curExpression = getCurrentExpression();
  if(curExpression !== null) {
    loadExpressionInstructions(curExpression);
  }else{
    redirectToPage('ranking.html');
  }
  // load sliders if values in storage
  displayCoins();
  updateCounter();
}


document.addEventListener('DOMContentLoaded', onLoad);
cointContainer.addEventListener('click', coinAddRemove);
btnNext.addEventListener('click', nextPage);
btnPrev.addEventListener('click', previousPage);