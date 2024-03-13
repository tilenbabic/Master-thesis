
const expressions = {
  'base-expression-0': [
                            "Impossible",
                            "Cannot occur",
                            "Zero chance",
                            "No possibility",
                            "Will never happen",
                            "Absolutely unlikely",
                            "No likelihood",
                            "No chance at all"
                        ],
  'base-expression-50': [
                            "Coin toss",
                            "Equal chance",
                            "Half likely",
                            "50-50 chance",
                            "Even odds",
                            "Balanced probability",
                            "Equally probable",
                            "As likely as not"
                        ],
  'base-expression-100': [
                              "Certain",
                              "Definitely",
                              "Absolutely",
                              "Sure thing",
                              "Guaranteed",
                              "Inevitable",
                              "Without fail",
                              "Always"
                          ],     
  'item-input': [    
                        "Absolutely certain", 
                        "Almost certain", 
                        "Highly likely", 
                        "Very probable", 
                        "Quite probable",    
                        "More probable than not", 
                        "Fairly likely", 
                        "Probable", 
                        "Possible", 
                        "Even chance",    
                        "Fifty-fifty",  
                        "Unlikely", 
                        "Doubtful", 
                        "Very unlikely", 
                        "Highly improbable",    
                        "Almost impossible", 
                        "Virtually impossible", 
                        "Impossible", 
                        "Absolutely impossible",    
                        "Almost certain", 
                        "Quite likely", 
                        "Fairly probable", 
                        "More likely than not", 
                        "Probable",    
                        "Even chance", 
                        "Unlikely", 
                        "Improbable", 
                        "Very unlikely"
                      ]    
}



// export function loadSuggestions(){
//   const expressionList = document.querySelector('#expression-list');
//   if (expressionList !== null){
//     let output = '';
//     expressions.forEach(expression => {
//       output += `<li>${expression} </li>`;
//     })
//     expressionList.innerHTML = output;
//   }
// }

 
let input_name = null;


function onLoad(){
  const expressionList = document.querySelector('#expression-list');
  input_name = document.getElementsByClassName('form-input')[0].id;
  let output = '';
  expressions[input_name].forEach(expression => {
    output += `<li class="not-active">${expression} </li>`;
  })

  expressionList.innerHTML = output;
}


function clearActive(){
  const items = document.querySelectorAll('.active');
  items.forEach(element => {
    element.classList.remove('active');
    element.classList.add('not-active');
  });
}



function chooseItem(e) {
  const inputBox = document.getElementById(input_name);
  if(e.target.tagName.toLowerCase() === 'li')
  {
    clearActive()
    e.target.classList.remove('not-active');
    e.target.classList.add('active');
    inputBox.value = e.target.textContent;//this is the url where the anchor tag points to.
  }
  // inputBox.value = e.target.textContent;
}

document.addEventListener('DOMContentLoaded', onLoad);
document.getElementById("expression-list").addEventListener('click', chooseItem);