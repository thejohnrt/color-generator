import Color from 'colorjs.io'

function addToHistory(color) {
  const colorElement = document.createElement("li");
  colorElement.textContent = color.to("srgb");
  document.querySelector("#color-history").appendChild(colorElement);
}

export {
  addToHistory
};