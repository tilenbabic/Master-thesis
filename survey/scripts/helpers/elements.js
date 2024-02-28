

// create deault icon element
export function createIcon(classes) {
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
function createText(newExpression, className) {
  const span = document.createElement('span');
  const text = document.createTextNode(newExpression);
  span.className = className;
  span.appendChild(text);
  return span;
}

// puzzle together text, dots-icon and remove-icon/button to create draggable element
export function createDraggable(newExpression) {
  const p = document.createElement('p'); 
  const dots = createDots(); // 
  const remove = createRemove('remove-item btn-link text-red');
  const text = createText(newExpression, "draggable-text");
  
  p.appendChild(dots);
  p.appendChild(text);
  p.appendChild(remove);
  
  p.classList.add('draggable');
  p.setAttribute('draggable',true);
  return p;
}

// blank
export function createBlank(){
  const p = document.createElement('p'); 
  p.classList.add('blank');
  return p
}