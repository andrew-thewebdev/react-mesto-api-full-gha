import React from 'react';
import defaultImage from '../images/photo-карачаево-черкессия.jpg';

function ImagePopup(props) {
  return (
    <section
      className={`popup popup_type_photo ${props.card && 'popup_opened'}`}
    >
      {props.card && (
        <div className="popup__photo-wrapper">
          <img
            src={props.card.link}
            alt={props.card.name}
            className="popup__photo"
          />
          <p className="popup__photo-title">{props.card.name}</p>
          <button
            type="button"
            onClick={props.onClose}
            className="popup__close-button popup__close-button_type_photo"
          ></button>
        </div>
      )}
    </section>
  );
}

export default ImagePopup;
