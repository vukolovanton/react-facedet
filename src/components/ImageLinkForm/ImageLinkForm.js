import React from "react";
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
  return (
    <div>
      <p className="f3">
        {"This Magic App Will Detect faces in your pictures"}
      </p>

      <div className="center">
        <div className="pa4 br3 shadow-5 form center">
          <input className="f4 pa2 w-70 bg-transparent center" type="text" onChange={onInputChange}/>
          <button className="w-30 grow f4 link ph3 pv2 dib white bg-black-80" onClick={onButtonSubmit}>
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
