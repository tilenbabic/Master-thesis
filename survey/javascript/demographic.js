const itemForm = document.getElementById('item-form');
const btnPrev = document.getElementById("btn-prev");
// const btnNext = document.getElementById("btn-next");


// function displayElement(elementID, storageKey) {
//   const element = document.getElementById(elementID);
//   const value = localStorage.getItem(storageKey);
//   if (value !== null) {
//     element.value = value;
//   }
// }

// function displayRadio(storageKey){
//   const value = localStorage.getItem(storageKey);

//   if (value !== null) {
//     document.getElementById(value).checked = true;
//   }
// }

function displayRadio(storageKey) {
  const value = localStorage.getItem('userData');

  if (value !== null) {
    const parsedValue = JSON.parse(value);
    if (storageKey in parsedValue) {
      document.getElementById(storageKey + '-dot-' + parsedValue[storageKey]).checked = true;
      // element.value = parsedValue[storageKey];
    }
  }
}

function displayElement(elementID, storageKey) {
  const value = localStorage.getItem('userData');
  const element = document.getElementById(elementID);

  if (value !== null) {
    const parsedValue = JSON.parse(value);
    if (storageKey in parsedValue) {
      element.value = parsedValue[storageKey];
    }
  }
}


// function storeElement(elementID, storageKey){
//   const element = document.getElementById(elementID);
//   localStorage.setItem(storageKey, element.value);
// }

// function storeRadio(selector, storageKey){
//   const gender = document.querySelector(selector);
//   localStorage.setItem(storageKey, gender.id);
// }


function storeElement (elementID, storageKey){
  const element = document.getElementById(elementID);
  const userData = localStorage.getItem('userData');
  if (userData !== null) {
    const user = JSON.parse(userData);
    user[storageKey] = element.value;
    localStorage.setItem('userData', JSON.stringify(user));
  } else {
    localStorage.setItem('userData', JSON.stringify({[storageKey]: element.value}));
  }
}


function storeRadio (selector, storageKey){
  const radio = document.querySelector(selector);
  const userData = localStorage.getItem('userData');
  if(radio == null) return;
  if (userData !== null) {
    const user = JSON.parse(userData);
    user[storageKey] = radio.id.replace(storageKey+'-dot-', '');
    localStorage.setItem('userData', JSON.stringify(user));
  } else {
    localStorage.setItem('userData', JSON.stringify({[storageKey]: radio.id.replace(storageKey+'-dot-', '')}));
  }
}


function loadYear (){
  // create drop-down year
  const yearDrop = document.querySelector('#year');
  let yearOutput = '<option disabled="disabled" selected></option>' + '<option value="none"> I prefer not to answer</option>';

  let year = (new Date()).getFullYear();
      for (let i = 0; i < 100; i++) {
          yearOutput += `<option value="${year - i}">${year - i}</option>`;
      }

  yearDrop.innerHTML = yearOutput;

  displayElement('year', 'year');
}


function loadCountry (){
  // create drop-down countries
  const countriesDrop = document.querySelector('#country');
  
  fetch('https://restcountries.com/v3.1/all').then(res => {
    return res.json();
  }).then(data => {
    let countriesOutput = '<option disabled="disabled" selected></option>' + '<option value="none"> I prefer not to answer</option>';
    data.map(country => country.name.common).sort().forEach(country => {
      countriesOutput += `<option value="${country}">${country}</option>`;
    })

    countriesDrop.innerHTML = countriesOutput;

    displayElement('country', 'country');

  }).catch(err => {
    console.log(err);
  })
}


function loadContent (){
  loadYear();
  loadCountry();
  displayElement('education', 'education');
  displayRadio('gender');
  displayRadio('english');
}

function storeContent(e){
  // e.preventDefault();
  storeElement('year', 'year');
  storeElement('country', 'country');
  storeElement('education', 'education');
  storeRadio('input[name="gender"]:checked', 'gender');
  storeRadio('input[name="english"]:checked', 'english');
  // redirect to next page
  // redirectToPage('final.html');

}

function redirectToPage(url){
  location.href = url;
}

function previousPage(){
  redirectToPage('membershipfunction.html');
}


document.addEventListener('DOMContentLoaded', loadContent);
itemForm.addEventListener('submit', storeContent);
// btnNext.addEventListener('click', storeContent);
btnPrev.addEventListener('click', previousPage);







