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
    if (state.colorType === "HEX") {
      $('#color-type').attr('aria-label', "View Hex");
      return {
        ...state,
        colorType: "RGB"
      }
    } else if (state.colorType === "RGB") {
      $('#color-type').attr('aria-label', "View RGB");
      return {
        ...state,
        colorType: "HEX"
      }
    }
    break;

    case TOGGLE_HISTORY:
    var heightToMove = $('#control-panel').css("height");
    var controlsHeight = $('#buttons').css("height");
    controlsHeight =  parseInt(controlsHeight.substring(0,heightToMove.length-2),10);
    heightToMove = parseInt(heightToMove.substring(0,heightToMove.length-2),10);
    heightToMove = heightToMove - controlsHeight + 2;

    if (state.historyVisible) {
      $( "#control-panel" ).animate({ bottom: "-" + heightToMove }, 500);
      $('#color-list').addClass("no-box-shadow");
      $('#history-arrow').html("&and;");
      $('#history-arrow').attr("aria-pressed", "false");
      $('#color-type').animate({opacity:"0"}, 400);
    return {
      ...state,
      historyVisible: false
    }
  } else {
    $( "#control-panel" ).animate({ bottom:"0" }, 500);
    $('#color-list').removeClass("no-box-shadow");
    $('#history-arrow').html("&or;");
    $('#history-arrow').attr("aria-pressed", "true");
    $('#color-type').animate({opacity:".5"}, 400);
    return {
      ...state,
      historyVisible: true
    }
    }

    case TOGGLE_GRAYSCALE:
      if (state.generateGrayscale) {
        $('#grayscale').attr("aria-pressed", "false");
        $('#grayscale').html("☀");
        $('#grayscale').css("scale", "");

        return {
          ...state,
          generateGrayscale: false
        }
      } else {
        $('#grayscale').attr("aria-pressed", "true");
        $('#grayscale').html("•");
        $('#grayscale').css("scale", "1.75");

        return {
          ...state,
          generateGrayscale: true
        }
      }

    default:
      return state;
  }
};
