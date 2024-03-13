let inputName = null;

function turnActive(expression){
  const items = document.querySelectorAll('li');
  items.forEach(element => {
    if(element.innerHTML == expression ){
      element.classList.remove('not-active');
      element.classList.add('active');
    }
  });
}

function displayExpressions(){
  inputName = document.getElementsByClassName('form-input')[0].id;
  const value = localStorage.getItem('surveyStatus');
  const baseExpression = document.getElementById(inputName);

  if (value !== null) {
    const parsedValue = JSON.parse(value);
    if ('baseExpressions' in parsedValue) {
      baseExpression.value = parsedValue['baseExpressions'][getPositionInBaseExpressions()];
      turnActive(parsedValue['baseExpressions'][getPositionInBaseExpressions()]);
    }
  }


}

function previousPage(){
  switch (inputName) {
    case 'base-expression-0':
      location.href = 'lexiconIntro.html';
      break;
    case 'base-expression-50':
      location.href = 'lexicon0.html';
      break;
    case 'base-expression-100':
      location.href = 'lexicon50.html';
      break;
    default:
      console.log("Invalid input name: " + inputName);
  }
}

function getPositionInBaseExpressions(){
  switch (inputName) {
    case 'base-expression-0':
      return 0;
    case 'base-expression-50':
      return 1;
    case 'base-expression-100':
      return 2;
    default:
      console.log("Invalid input name: " + inputName);
  }
}

function storeExpressions(e){
  const baseExpression = document.getElementById(inputName).value;
  const surveyStatus = localStorage.getItem('surveyStatus');
  let status = null;
  let baseExpressions = [null, null, null];
  if(surveyStatus !== null){
    status = JSON.parse(surveyStatus);
    if('baseExpressions' in status){
      baseExpressions = status['baseExpressions'];
    }
  } else {
    status = {'baseExpressions': null}
  }
  baseExpressions[getPositionInBaseExpressions()] = baseExpression;
  status['baseExpressions'] = baseExpressions;
  localStorage.setItem('surveyStatus', JSON.stringify(status));
}

document.addEventListener('DOMContentLoaded', displayExpressions);
document.getElementById("btn-prev").addEventListener('click', previousPage);
document.getElementById("expression-list").addEventListener('click', chooseItem);
document.getElementById('item-form').addEventListener('submit', storeExpressions);