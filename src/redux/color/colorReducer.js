import { TOGGLE_COLOR_TYPE, TOGGLE_HISTORY, TOGGLE_GRAYSCALE } from './colorTypes';
import $ from 'jquery';

const initialState = {
  colors: [],
  historyVisible: true,
  generateGrayscale: false,
  colorType: "HEX"
}

export const colorReducer = (state = initialState, action) => {
  switch(action.type) {
    case TOGGLE_COLOR_TYPE:
    if (state.colorType == "HEX") {
      return {
        ... state,
        colorType: "RGB"
      }
    } else if (state.colorType == "RGB") {
      return {
        ... state,
        colorType: "HEX"
      }
    }

    case TOGGLE_HISTORY:
    var heightToMove = $('#history-container').css("height");
    var controlsHeight = $('#buttons').css("height");
    controlsHeight =  parseInt(controlsHeight.substring(0,heightToMove.length-2),10);
    heightToMove = parseInt(heightToMove.substring(0,heightToMove.length-2),10);
    heightToMove = heightToMove - controlsHeight + 2;

    if (state.historyVisible) {
      $( "#history-container" ).animate({ bottom: "-" + heightToMove }, 500);
      $('#color-list').addClass("no-box-shadow");
      $('#history-arrow').html("&and;");
      $('#color-type').animate({opacity:"0"}, 400);
    return {
      ... state,
      historyVisible: false
    }
  } else {
    $( "#history-container" ).animate({ bottom:"0" }, 500);
    $('#color-list').removeClass("no-box-shadow");
    $('#history-arrow').html("&or;");
    $('#color-type').animate({opacity:".5"}, 400);
    return {
      ... state,
      historyVisible: true
    }
    }

    case TOGGLE_GRAYSCALE:
      if (state.generateGrayscale) {
        $('#grayscale').css("color","#FFFFFF");
        return {
          ... state,
          generateGrayscale: false
        }
      } else {
        $('#grayscale').css("color","#000000");
        return {
          ... state,
          generateGrayscale: true
        }
      }

    default: return state
  }
};
