const expressions = [    
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
                      "Improbable", 
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
                      "Very unlikely", 
                      "Absolutely impossible"
                    ];



export function loadSuggestions(){
  const expressionList = document.querySelector('#expression-list');
  if (expressionList !== null){
    let output = '';
    expressions.forEach(expression => {
      output += `<li>${expression} </li>`;
    })
    expressionList.innerHTML = output;
  }
}
                    
// document.addEventListener('DOMContentLoaded', () => {
//   const expressionList = document.querySelector('#expression-list');
//   let output = '';
//   expressions.forEach(expression => {
//     output += `<li>${expression} </li>`;
//   })

//   expressionList.innerHTML = output;
  
// });