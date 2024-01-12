import Color from 'colorjs.io'

function generateColor(options = {}) {
  options.grayscale = typeof options?.grayscale !== 'undefined' ? options.grayscale : false;
  console.log(options);
  
  const red = Math.random();
  const green = (options.grayscale) ? red : Math.random();
  const blue = (options.grayscale) ? red : Math.random();

  return new Color("srgb", [red,green,blue]);
}

export {
  generateColor
};