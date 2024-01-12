import './vite.css'
import './style.css'
import { generateColor } from './generate.js';
import { addToHistory } from './history.js';
import toolbar from './toolbar.js';

const color = generateColor();
const colorHistory = [];
const optionsForm = document.forms.options;

document.querySelector('#app').innerHTML = `
      <button id="generate-color" type="button" form="options">Generate color</button>
      <form id="options">
      ${toolbar}
      <output for="color-space grayscale">
      <ul role="list" id="color-history"></ul>
      </output>
      </form>
`;

document.querySelector("#generate-color").addEventListener("click", function(event) {
  const color = generateColor({
    grayscale: options.grayscale.checked
  });

  colorHistory.push(color);

  document.body.style.setProperty("background-color", color.display());
  addToHistory(color);
});