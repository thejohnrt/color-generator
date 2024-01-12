import Color from "colorjs.io";

let colorSpaceOptions = "";

Object.values(Color.spaces).forEach((value) =>{
  colorSpaceOptions += `<option value="${value.id}" ${(value.id === "srgb") ? "selected" : ""}>${value.name}</option>`;
});
export default `
  <fieldset>
    <legend>Options</legend>
    <div>
    <label for="color-space">Color space</label>
    <select id="color-space">
      ${colorSpaceOptions}
    </select>
    </div>
    <div>
      <input type="checkbox" id="grayscale" value="1"/>
      <label for="grayscale">Grayscale</label>
    </div>
    </fieldset>
`;