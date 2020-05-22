import React, { PureComponent } from 'react';
import './styles.css';
import { Color } from './components/Color'
import { disableBodyScroll } from 'body-scroll-lock';
import $ from 'jquery';

class ColorGenerator extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      colors: [],
      isVisible: true
    };
    this.anotherColor = this.anotherColor.bind(this);
    this.colorRollback = this.colorRollback.bind(this);
    this.generateHex = this.generateHex.bind(this);
    this.toggleColorPanel = this.toggleColorPanel.bind(this);
  }

  anotherColor(clickedObject) {
    if (clickedObject.target.id === "color-generator"
    || clickedObject.target.id === "howto-text") {
      $("#howto-text").remove();
      $("#history-text").remove();
      var colorHex = this.generateHex();
      this.setState({
        colors: this.state.colors.concat(
              {
                hex:colorHex
              }) // end concat()
            }); //end setState
        } // end if
    } // end anotherColor

    generateHex() {
      var generatedColor = Math.floor(Math.random()*16777215).toString(16).toUpperCase();
      while (generatedColor.length < 6) {
        generatedColor = Math.floor(Math.random()*16777215).toString(16).toUpperCase();
      }
      /* alert(this.hexToRgb("#" + generatedColor).r + "\n" +
            this.hexToRgb("#" + generatedColor).g + "\n" +
            this.hexToRgb("#" + generatedColor).b); */
      return "#" + generatedColor;
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

  toggleColorPanel() {
    var heightToMove = $('#history-container').css("height");
    heightToMove = parseInt(heightToMove.substring(0,heightToMove.length-2),10);
    heightToMove = heightToMove - 23 - 11;

    if (this.state.isVisible) {
      $( "#history-container" ).animate({ bottom: "-" + heightToMove }, 1000);
      $('#color-list').addClass("no-box-shadow");
      $('#toggle-arrow').html("&and;");
      this.setState({ isVisible: false });
    } else {
      $( "#history-container" ).animate({ bottom:"0" }, 1000);
      $('#color-list').removeClass("no-box-shadow");
      $('#toggle-arrow').html("&or;");
      this.setState({ isVisible: true });
    }
  }

  render() {
    if(this.state.colors.length > 0) {
      var bgColor = this.state.colors[this.state.colors.length - 1].hex;
  }
    const colorList = this.state.colors.map( (color, index) =>
    <Color key={index} hex={color.hex} function={this.colorRollback}/>)
    return (
    <div id="color-generator" style={{backgroundColor:bgColor}} onClick={this.anotherColor}>
      <p id="howto-text" onClick={this.anotherColor}>Click, Tap, or Press <code>space</code></p>
      <div id="history-container">
        <p id="toggle-arrow" onClick={this.toggleColorPanel}>&or;</p>
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

export { ColorGenerator };
