import React from 'react';

function Color(props) {
  const colorType = props.colorType;
  const hex = props.colorNames.hex.toString();
  const rgb = [props.colorNames.rgb.r.toString().padStart(3, " "),
    props.colorNames.rgb.g.toString().padStart(3, " "),
    props.colorNames.rgb.b.toString().padStart(3, " ")]
  var colorName;
  var classes = "color-name";
  if (colorType == "HEX") {
    colorName = <p className={classes}>{hex}</p>;
  } else if (colorType == "RGB") {
    classes += " rgb";
    colorName = <p className={classes}>
    <span style={{color:"rgb(125,0,0)"}}>{rgb[0]}&nbsp;</span>
    <span style={{color:"rgb(0,125,0)"}}>{rgb[1]}&nbsp;</span>
    <span style={{color:"rgb(0,0,175)"}}>{rgb[2]}</span>
    </p>;
  }
  return (
    <>
    <div className="color-item">
    <div className="color-chip" style={{backgroundColor:hex}}
    onClick={props.function}>
    </div>
      {colorName}
    </div>
    </>
  )
}
  export { Color };
