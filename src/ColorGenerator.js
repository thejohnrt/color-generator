import React, { PureComponent } from 'react';
import './styles.css';
import { Color } from './components/Color'
import { disableBodyScroll } from 'body-scroll-lock';
import $ from 'jquery';
import { connect } from 'react-redux';
import { toggleColorType, toggleHistory, toggleGrayscale } from './redux';

/* React-Redux Connect */
const mapStateToProps = (state) => {
  return {
    colorType: state.colorType,
    historyVisible: state.historyVisible,
    generateGrayscale: state.generateGrayscale
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleColorType: () => dispatch( toggleColorType() ),
    toggleHistory: () => dispatch( toggleHistory() ),
    toggleGrayscale: () => dispatch( toggleGrayscale() )
  }
}

class ColorGenerator extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      colors: []
    };
    this.anotherColor = this.anotherColor.bind(this);
    this.colorRollback = this.colorRollback.bind(this);
  }

  anotherColor(clickedObject) {
    if (clickedObject.target.id === "color-generator"
    || clickedObject.target.id === "howto-text") {
      $("#howto-text").remove();
      $("#history-text").remove();
      var colorHex = this.generateColor();
      this.setState({
        colors: this.state.colors.concat(
              {
                hex:colorHex,
                rgb: this.hexToRgb(colorHex)
              }) // end concat()
            }); //end setState
        } // end if
    } // end anotherColor

    generateColor() {
      var generatedColor = "";
      if (this.props.generateGrayscale) {
        generatedColor = Math.floor(Math.random()*16).toString(16).toUpperCase();
        generatedColor = generatedColor + Math.floor(Math.random()*16).toString(16).toUpperCase();
        generatedColor = generatedColor.repeat(3);
        return "#" + generatedColor;
      } else {
      generatedColor = Math.floor(Math.random()*16777215).toString(16).toUpperCase();
      while (generatedColor.length < 6) {
        generatedColor = Math.floor(Math.random()*16777215).toString(16).toUpperCase();
      }
      /* alert(this.hexToRgb("#" + generatedColor).r + "\n" +
            this.hexToRgb("#" + generatedColor).g + "\n" +
            this.hexToRgb("#" + generatedColor).b); */
      return "#" + generatedColor;
    }
    }

/* Tim Down: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb */

    hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

componentDidMount() {
  disableBodyScroll(document.body);
  /* Register the Space (32) key as a click */
      $(window).keyup(function(event) {
          if (event.keyCode === 32) {
              $("#color-generator").click();
          } // end if
      }); // end $(tabs).keyup
}

  componentDidUpdate() {
    var colorPanel = document.getElementById("color-list");
    colorPanel.scrollTo(0,colorPanel.scrollHeight);
  }

  colorRollback(clickedObject) {
    var bgRollbackColor = $(clickedObject.target).css("backgroundColor");
    $('#color-generator').css("background-color", bgRollbackColor);
  }

  render(props) {
    const { toggleHistory, toggleColorType, colorType, toggleGrayscale } = this.props;
    if(this.state.colors.length > 0) {
      var bgColor = this.state.colors[this.state.colors.length - 1].hex;
  }
    const colorList = this.state.colors.map( (color, index) =>
    <Color key={index} colorNames={color} colorType={colorType} function={this.colorRollback}/>);
    return (
    <div id="color-generator" style={{backgroundColor:bgColor}} onClick={this.anotherColor}>
      <p id="howto-text" onClick={this.anotherColor}>Click, Tap, or Press <code>space</code></p>
      <div id="history-container">
        <div id="buttons">
        <p id="history-arrow" onClick={toggleHistory}>&or;</p>
        <p id="grayscale" onClick={toggleGrayscale}>&#9728;</p>
        <p id="color-type" onClick={toggleColorType}>{colorType}</p>
        </div>  { /* end buttons */ }
      <div id="color-list">
        <div id="history-text">
          <p>Your color history will appear here.</p>
          <p>Click on a color to return to it.</p>
        </div>
        {colorList}
        </div> { /* end color-list */ }
        </div> { /* end color-container && end color-generator on line below */ }
    </div>
  )
}
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorGenerator);
