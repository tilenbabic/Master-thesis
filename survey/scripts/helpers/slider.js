
export function updateSlider (slider){
  const progress = (slider.value / slider.max) * 100;
  slider.style.background = `linear-gradient(to right, var(--color-two) ${progress}%, #ccc ${progress}%)`;
}

function sliderEvent (e) {
  updateSlider (e.target);
}

export function prepareSliders () {
  const sliders = document.querySelectorAll(".range-slider");
  if (sliders !== null) {
    sliders.forEach( slider => {
      slider.addEventListener("input", sliderEvent);
    })
  }
}
