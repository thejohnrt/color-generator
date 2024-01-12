import Color from 'colorjs.io'

function generateColor() {
  const red = Math.random();
  const green = Math.random();
  const blue = Math.random();

  return new Color("srgb", [red,green,blue]);
}

export {
  generateColor
};