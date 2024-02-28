const sliders = document.querySelectorAll("#range")

function updateSlider (event) {
    const progress = (event.target.value / event.target.max) * 100;
    event.target.style.background = `linear-gradient(to right, var(--color-two) ${progress}%, #ccc ${progress}%)`;
}

sliders.forEach( slider => {
  slider.addEventListener("input", updateSlider);
  const progress = (slider.value / slider.max) * 100;
  slider.style.background = `linear-gradient(to right, var(--color-two) ${progress}%, #ccc ${progress}%)`;
})




// document.addEventListener('DOMContentLoaded', updateSlider);