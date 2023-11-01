import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      title="Редактировать профиль"
      name="profile"
      submitBtnText="Сохранить"
    >
      <input
        id="name-input"
        type="text"
        name="name"
        placeholder="Имя"
        defaultValue={name}
        onChange={handleChangeName}
        className="popup__input popup__input_type_name"
        required
        minLength="2"
        maxLength="40"
      />
      <span className="popup__input-error name-input-error"></span>
      <input
        id="descr-input"
        type="text"
        name="about"
        placeholder="О себе"
        defaultValue={description}
        onChange={handleChangeDescription}
        className="popup__input popup__input_type_descr"
        required
        minLength="2"
        maxLength="200"
      />
      <span className="popup__input-error descr-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
