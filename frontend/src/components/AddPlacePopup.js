import React from 'react';
import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      title="Новое место"
      name="add-card"
      submitBtnText="Сохранить"
    >
      <input
        id="card-title-input"
        type="text"
        name="name"
        placeholder="Название"
        value={name}
        onChange={handleChangeName}
        className="popup__input popup__input_type_card-title"
        required
        minLength="2"
        maxLength="30"
      />
      <span className="popup__input-error card-title-input-error"></span>
      <input
        id="card-descr-input"
        type="url"
        name="link"
        placeholder="Ссылка на карточку"
        value={link}
        onChange={handleChangeLink}
        className="popup__input popup__input_type_card-img"
        required
      />
      <span className="popup__input-error card-descr-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
