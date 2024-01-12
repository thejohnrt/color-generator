import './vite.css'
import './style.css'
import { generateColor } from './generate.js';
import { addToHistory } from './history.js';

const color = generateColor();

document.querySelector('#app').innerHTML = `
  <div>
      <button id="generate-color" type="button">Generate color</button>
      <output for="generate-color">
      <ul role="list" id="color-history"></ul>
      </output>
  </div>
`;

document.querySelector("#generate-color").addEventListener("click", function(event) {
  const color = generateColor();

  console.log(color);
  document.body.style.setProperty("background-color", color.to("srgb") + "");

  addToHistory(color);
});