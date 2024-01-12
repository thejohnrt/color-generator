import Color from 'colorjs.io'

function addToHistory(color) {
  const colorElement = document.createElement("li");
  colorElement.textContent = color.to(options["color-space"].value);

  document.querySelector("#color-history").appendChild(colorElement);
}

export {
  addToHistory
};