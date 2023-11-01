import React from 'react';

function PopupWithForm(props) {
  return (
    <section
      className={`popup popup_type_${props.name} ${
        props.isOpen && 'popup_opened'
      }`}
    >
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form
          name={`${props.name}`}
          onSubmit={props.onSubmit}
          className={`popup__form popup__form_type_${props.name}`}
          // noValidate
        >
          {props.children}
          <button
            type="submit"
            className={`popup__save-button ${
              props.submitBtnText === 'Да' && 'popup__save-button_type_confirm'
            }`}
          >
            {props.submitBtnText}
          </button>
        </form>
        <button
          type="button"
          onClick={props.onClose}
          className={`popup__close-button popup__close-button_type_${props.name}`}
        ></button>
      </div>
    </section>
  );
}

export default PopupWithForm;
