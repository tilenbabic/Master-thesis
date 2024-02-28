import {createIcon} from "./elements.js";


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


export function showWarning(warningText, containerID){
  const warning = (containerID == "warning-container-add")? createWarningAdd(warningText) : createWarningNext(warningText);
  const warningContainer = document.getElementById(containerID);
  warningContainer.appendChild(warning);
}

export function clearWarning(containerID){
  const warningContainer = document.getElementById(containerID);
  warningContainer.innerHTML = '';
}