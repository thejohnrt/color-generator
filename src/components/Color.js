import React from 'react';

function Color(props) {
  // console.log(`Key:${props.hex}`);
  return (
    <>
    <div className="color-item">
    <div className="color-chip" style={{backgroundColor:props.hex}}
    onClick={props.function}>
    </div>
      <p className="color-hex">{props.hex}</p>
    </div>
    </>
  )
}
  export { Color };
