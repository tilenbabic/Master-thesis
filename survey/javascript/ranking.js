const formBtn = document.getElementById('btn-add');
const itemInput = document.getElementById('item-input');
// const itemForm = document.getElementById('item-form');
const containers = document.querySelectorAll('.dragging-container')

const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");



// put eventlistener on dragging elements
// function updateDraggables() {
//   const draggables = document.querySelectorAll('.draggable');
//   draggables.forEach(draggable => {
//     draggable.addEventListener('dragstart', () => {
//       draggable.classList.add('dragging')
//     })
  
//     draggable.addEventListener('dragend', () => {
//       draggable.classList.remove('dragging')
//     })
//   })
// }

// create deault icon element
function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

// create remove icon/button element
function createRemove(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

// create 3 dots icon element
function createDots() {
  const span = document.createElement('span');
  span.className = "align-middle";
  const icon = createIcon('fa-solid fa-ellipsis-vertical fa-lg');
  span.appendChild(icon);
  return span;
}

// create text element
function createText(newExpression){
  const span = document.createElement('span');
  const text = document.createTextNode(newExpression);
  span.className = "draggable-text";
  span.appendChild(text);
  return span;
}


// puzzle together text, dots-icon and remove-icon/button to create draggable element
function createDraggable(newExpression) {
  const p = document.createElement('p'); 
  const dots = createDots(); // 
  const remove = createRemove('remove-item btn-link text-red');
  const text = createText(newExpression);
  
  p.appendChild(dots);
  p.appendChild(text);
  p.appendChild(remove);
  
  p.classList.add('draggable')
  p.setAttribute('draggable',true);
  return p;
}

// blank
function createBlank(){
  const p = document.createElement('p'); 
  p.classList.add('blank');
  return p
}

function randomBlank(){
  const nodes = document.querySelectorAll('.blank');
  if (nodes.length < 1) {
    return null;
  }
  return nodes[Math.floor(Math.random() * nodes.length)]
}

// add draggable element to ranking container on user input
function addItem(){
  const newExpression = itemInput.value;
  // Validate Input
  if (newExpression === '') {
    alert('Please add an item');
    return;
  }

  const replacemenNode = randomBlank();
  if (replacemenNode == null){
    alert('You entered too many expressions');
    return;
  }

  // add expressions on a random empty spot
  const element = createDraggable(newExpression);
  setDraggingEventListener(element);
  const container = document.getElementById(replacemenNode.parentElement.id);
  container.replaceChild(element,replacemenNode);

  itemInput.value = '';
}

// put dragstart and dragend listeners on element
function setDraggingEventListener(element) {
  element.addEventListener('dragstart', () => {
    element.classList.add('dragging')
  })
  element.addEventListener('dragend', () => {
    element.classList.remove('dragging')
  })
}




function addExpression(newExpression, containerID, n) {
  // create draggable element
  const element = createDraggable(newExpression);
  // put dragstart and dragend listeners on element
  setDraggingEventListener(element);
  // Append Element to container
  const container = document.getElementById(containerID);
  // container.appendChild(element);

  container.replaceChild(element,container.querySelectorAll('.draggable,.blank')[n]);
  // container.querySelectorAll('.draggable,.blank')[0] = element;
  // console.log();
  
  // updateDraggables();

  itemInput.value = '';
}

// function addExpression(newExpression, replacemenNode) {
//   // create draggable element
//   const element = createDraggable(newExpression);
//   // put dragstart and dragend listeners on element
//   setDraggingEventListener(element);
//   // Append Element to container
//   const container = document.getElementById(replacemenNode.parentElement.id);
//   // container.appendChild(element);

//   // container.replaceChild(element,container.querySelectorAll('.draggable,.blank')[n]);
//   container.replaceChild(element, replacemenNode);
//   // container.querySelectorAll('.draggable,.blank')[0] = element;
//   // console.log();
  
//   // updateDraggables();

//   itemInput.value = '';
// }



// blank
function addBlank (containerID){
  const element = createBlank();
  const container = document.getElementById(containerID);
  container.appendChild(element);
}



function removeItem(e) {
  // if (e.target.parentElement.classList.contains('remove-item')) {
  //   e.target.parentElement.parentElement.remove();
  // }

  if (e.target.parentElement.classList.contains('remove-item')) {
    const container = e.target.parentElement.parentElement.parentElement;
    const element = createBlank();
    container.replaceChild(element, e.target.parentElement.parentElement);
  }


}

// function displayBaseExpressions() {
//   const baseExpressions = localStorage.getItem('baseExpressions');

//   if (baseExpressions !== null) {
//     Object.entries(JSON.parse(baseExpressions)).forEach(([key, value]) => {
//       const expression = document.getElementById(key);
//       expression.innerText = value;
//     });
//   }
// }

function displayBaseExpressions() {
  const value = localStorage.getItem('surveyStatus');
  const baseExpressions = document.getElementsByClassName('non-draggable')
  
  if (value !== null) {
    const parsedValue = JSON.parse(value);
    if ('baseExpressions' in parsedValue) {
      parsedValue['baseExpressions'].forEach((expression, i) => {
        baseExpressions[2-i].innerText = expression; 
      });
    }
  }
}




// function displayContainerExpressions(storageKey, containerID) {
//   const containerExpressions = localStorage.getItem(storageKey);

//   if (containerExpressions !== null) {
//     JSON.parse(containerExpressions).forEach(expression => {
//       addExpression(expression, containerID);
//     });
//   }
// }


function displayContainerExpressions(storageKey, containerID) {
  const value = localStorage.getItem('surveyStatus');
  // const containerExpressions = localStorage.getItem(storageKey);

  if (value !== null) {
    const parsedValue = JSON.parse(value);
    if (storageKey in parsedValue) {
      parsedValue[storageKey].forEach((expression, i) => {
        if(expression !== null){
          addExpression(expression, containerID, i);
        }
      });
    }
  }

  // addBlank(containerID);
  // addBlank(containerID);
  // addBlank(containerID);
  // addBlank(containerID);


}

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging),.blank')]
  // console.log(draggableElements);

  return draggableElements.reduce((closest, child) => {
    // console.log("closest", closest);
    // console.log("child", child);
    const box = child.getBoundingClientRect()
    // console.log(box);
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}

function moveBetweenContainers(elementContainer, targetContainer){
  const curr = document.getElementById(elementContainer);
  const target = document.getElementById(targetContainer);
  const currChildren = curr.querySelectorAll('.draggable,.blank');
  const targetChildren = target.querySelectorAll('.draggable,.blank');


  // console.log('target',target.querySelectorAll('.draggable,.blank')[3]);
  // console.log('curr',curr.querySelectorAll('.draggable,.blank'));

  if(targetContainer == "upper-container" && elementContainer == "lower-container"){
    // console.log(target.childNodes);
    curr.insertBefore(targetChildren[3],currChildren[0]);
    // curr.appendChild(target.querySelectorAll('.draggable,.blank')[3]);
  } else if (elementContainer == "upper-container" && targetContainer == "lower-container"){
    curr.appendChild(targetChildren[0] );
    // curr.insertBefore(targetChildren[0],currChildren[3] );
  }
  
}


function displayExpressions() {
  // load 0,50,100 expressions
  displayBaseExpressions();
  // load other expressions in container
  displayContainerExpressions('upperContainer', 'upper-container');
  displayContainerExpressions('lowerContainer', 'lower-container');

  containers.forEach(container => {
    container.addEventListener('dragover', e => {
      e.preventDefault()
      // console.log(container.id);
      // console.log(e);
      
      const draggable = document.querySelector('.dragging')
      // console.log(draggable.parentElement.id);
      if(draggable == null) return;

      if(draggable.parentElement.id !== container.id){
        // console.log(draggable.parentElement.id, container.id)
        moveBetweenContainers(draggable.parentElement.id, container.id)
      }
      
      const afterElement = getDragAfterElement(container, e.clientY);

      if (afterElement == null) {
        container.appendChild(draggable);
      } else {
        // console.log(draggable)
        
        container.insertBefore(draggable, afterElement);
      }
      
      


    })
  })
}

function getContainerExpressions(id){
  const container = document.getElementById(id);
  console.log(container.querySelectorAll('.draggable,.blank'));
  return [...container.querySelectorAll('.draggable,.blank')].map((expression) => {
    // blank
    // console.log(expression.className);
    if(expression.className == 'blank'){
      // console.log("tuki");
      return null;
    } else {
      return expression.innerText;
    }});
}


function storeContainerExpressions(storageKey, containerExpressions) {
  const surveyStatus = localStorage.getItem('surveyStatus');
  if (surveyStatus !== null) {
    const status = JSON.parse(surveyStatus);
    status[storageKey] = containerExpressions;
    localStorage.setItem('surveyStatus', JSON.stringify(status));
  } else {
    localStorage.setItem('surveyStatus', JSON.stringify({[storageKey]: containerExpressions}));
  }
}


// function prepareForMembershipFunction (){
//   const surveyStatus = localStorage.getItem('surveyStatus');
  
//   if (surveyStatus !== null) {
//     const status = JSON.parse(surveyStatus);
//     let order = [];
    
//     if('baseExpressions' in status){
//       order.push(...status['baseExpressions']);
//     }
//     if('lowerContainer' in status){
//       order.push(...status['lowerContainer']);
//     }
//     if('upperContainer' in status){
//       order.push(...status['upperContainer']);
//     }

//     if(order.length == 0){
//       status['membershipFunction'] = {'order': order};
//     }else{
//       status['membershipFunction'] = {'order': order, 'nextExpression': order[0]};
//     }
    

//     localStorage.setItem('surveyStatus', JSON.stringify(status));
//   }
// }

// filter out exprtessions that the user changed
function filterExpressions(expressions, rankArray){
  if('functions' in expressions) {
    Object.keys(expressions['functions']).forEach( key => {
      if(!rankArray.includes(key)){
          delete expressions['functions'][key];
      }
    });
  }
  return expressions
}

function prepareForMembershipFunction (base, lower, upper){
  const surveyStatus = localStorage.getItem('surveyStatus');
  const userExpressions = localStorage.getItem('userExpressions');
  const rank = [base[2], ...upper, base[1], ...lower, base[0]];
  
  if (surveyStatus !== null) {
    const status = JSON.parse(surveyStatus);
    status['expressionOrder'] = rank;
    status['currPosition'] = 0;
    status['currPositionCoins'] = 0;
    localStorage.setItem('surveyStatus', JSON.stringify(status));
  } else {
    localStorage.setItem('surveyStatus', JSON.stringify({'expressionOrder': rank, 'currPosition': 0, 'currPositionCoins': 0}));
  }

  if (userExpressions !== null) {
    const expressions = JSON.parse(userExpressions);
    expressions['rank'] = rank;
    filterExpressions(expressions, rank);
    localStorage.setItem('userExpressions', JSON.stringify(expressions));
  } else {
    localStorage.setItem('userExpressions', JSON.stringify({'rank': rank}));
  }
}


function getBaseExpressions(){
  const surveyStatus = localStorage.getItem('surveyStatus');
  let expressions = [];
  if (surveyStatus !== null) {
    const status = JSON.parse(surveyStatus);
    if('baseExpressions' in status){
      expressions.push(...status['baseExpressions']);
    }
  }
  return expressions;
}


function alertUser(base, lower, upper){
  // console.log(base.length, upper.length, lower.length);
  if(base.length !== 3){
    alert("You need to enter 3 base expressions");
    return true;
  }else if(upper.length < 2){
    alert("Upper container containes less then 2 expressions");
    return true;
  }else if(lower.length < 2){
    alert("Lower container containes less then 2 expressions");
    return true;
  }
  return false;
}

function redirectToPage(url){
  location.href = url;
}



function getNextPage(){
  const surveyStatus = localStorage.getItem('surveyStatus');
  let status;
  if (surveyStatus !== null) {
    status = JSON.parse(surveyStatus);
    if('membershipFunctionStatus' in status){
      status['membershipFunctionStatus'] = (status['membershipFunctionStatus'] == 'membershipfunction.html') ? 'coins.html' : 'membershipfunction.html';
    } else {
      status['membershipFunctionStatus'] = 'membershipfunction.html';
    }
  }else{
    status = {'membershipFunctionStatus': 'membershipfunction.html'};
  }
  localStorage.setItem('surveyStatus', JSON.stringify(status));
  return status['membershipFunctionStatus'];
}

function storeExpressions(e){
  e.preventDefault();
  const baseExpressions = getBaseExpressions();
  const lowerExpressions = getContainerExpressions('lower-container');
  const upperExpressions = getContainerExpressions('upper-container');
  console.log("storeExpressions",lowerExpressions);
  
  // store upper container in order
  // localStorage.setItem('upperContainer', JSON.stringify(getContainerExpressions('upper-container')));
  storeContainerExpressions('upperContainer', upperExpressions);
  // store lower container in order
  // localStorage.setItem('lowerContainer', JSON.stringify(getContainerExpressions('lower-container')));
  storeContainerExpressions('lowerContainer', lowerExpressions);

  const filteredLower = lowerExpressions.filter(x => x !== null);
  const filteredUpper = upperExpressions.filter(x => x !== null);

  if(alertUser(baseExpressions, filteredLower, filteredUpper)){
    e.preventDefault();
  }else{
    // prepare expression order for membership function
    console.log(lowerExpressions);
    prepareForMembershipFunction(baseExpressions, filteredLower, filteredUpper);
    // redirect to next page
    // console.log(getNextPage());
    redirectToPage(getNextPage());
  }
}



function previousPage(){
  const lowerExpressions = getContainerExpressions('lower-container');
  const upperExpressions = getContainerExpressions('upper-container');
  storeContainerExpressions('upperContainer', upperExpressions);
  storeContainerExpressions('lowerContainer', lowerExpressions);
  redirectToPage('lexicon.html');
}

function init() {
  // Event Listeners
  formBtn.addEventListener('click', addItem);
  containers.forEach(container => container.addEventListener('click', removeItem));
  document.addEventListener('DOMContentLoaded', displayExpressions);
  // itemForm.addEventListener('submit', storeExpressions);
  btnNext.addEventListener('click', storeExpressions);
  btnPrev.addEventListener('click', previousPage);
}

init();






