import { TOGGLE_COLOR_TYPE, TOGGLE_HISTORY, TOGGLE_GRAYSCALE } from './colorTypes'

export const toggleColorType = () => {
  return {
    type: TOGGLE_COLOR_TYPE
  }
}

export const toggleHistory = () => {
  return {
    type: TOGGLE_HISTORY
  }
}

export const toggleGrayscale = () => {
  return {
    type: TOGGLE_GRAYSCALE
  }
}
