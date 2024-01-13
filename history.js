import Color from 'colorjs.io'

// TODO: utilise <template>

function addToHistory(color) {
  const historyItem = document.createElement("tr");
  const swatch = document.createElement("td");
  const info = document.createElement("td");
  const actions = document.createElement("td");

  const buttons = {
    fill: document.createElement("button"),
  };

  swatch.classList.add("swatch");
  swatch.style.setProperty("background-color", color.display());

  info.textContent = color.to(options["color-space"].value);

  buttons.fill.textContent = "Fill " + color.toString({ format: "hex" });
  buttons.fill.setAttribute("data-action", "fill");
  buttons.fill.setAttribute("type", "button");
  buttons.fill.addEventListener("click", function (event) {
    document.body.style.setProperty("background-color", color.display());
  });

  actions.appendChild(buttons.fill);

  historyItem.appendChild(swatch);
  historyItem.appendChild(info);
  historyItem.appendChild(actions);

  document.querySelector("#color-history tbody").appendChild(historyItem);
  historyItem.scrollIntoView();
}

export {
  addToHistory
};