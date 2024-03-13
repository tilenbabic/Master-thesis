
function inputValidation(event) {
  var key = event.keyCode;
  console.log(key);
  console.log((key >= 65 && key <= 90) || key == 8 || key==32);
  return ((key >= 65 && key <= 90) || key == 8 || key==32);
};