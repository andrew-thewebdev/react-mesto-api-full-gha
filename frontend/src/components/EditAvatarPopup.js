import React from 'react';
import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const newAvatarRef = useRef();

  useEffect(() => {
    newAvatarRef.current.value = '';
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: newAvatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      title="Обновить аватар"
      name="avatar-update"
      submitBtnText="Сохранить"
    >
      <input
        id="avatar-update-input"
        type="url"
        name="avatar"
        placeholder="Ссылка на новый аватар"
        ref={newAvatarRef}
        className="popup__input popup__input_type_avatar-update"
        required
      />
      <span className="popup__input-error avatar-update-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
