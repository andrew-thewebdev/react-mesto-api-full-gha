import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  // console.log('current user from Card:', currentUser.name);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `card__like-icon ${
    isLiked && 'card__like-icon_active'
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  return (
    <article className="card">
      <img
        src={props.card.link}
        onClick={handleClick}
        alt={props.card.name}
        className="card__image"
      />
      {isOwn && <button className="card__delete" onClick={handleDeleteClick} />}
      <div className="card__footer">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__likes-wrapper">
          <button
            type="button"
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
          ></button>
          <p className="card__likes-num">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
