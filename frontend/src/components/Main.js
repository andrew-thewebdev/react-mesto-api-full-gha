import React, { useEffect, useState } from 'react';
import api from '../utils/Api.js';
import avatarEditBtn from '../images/Vector.svg';
import { queryAllByAltText } from '@testing-library/react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="page__section">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            src={currentUser.avatar}
            alt="Аватар пользователя"
            className="profile__avatar"
          />
          <div className="profile__avatar-overlay" onClick={props.onEditAvatar}>
            <img src={avatarEditBtn} alt="Иконка редактирования аватара" />
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__text-wrapper">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__description">{currentUser.about}</p>
          </div>
          <button
            type="button"
            onClick={props.onEditProfile}
            className="profile__edit-button"
          ></button>
        </div>
        <button
          type="button"
          onClick={props.onAddPlace}
          className="profile__add-button"
        ></button>
      </section>

      <div className="cards">
        {props.cards.map((card, i) => (
          <Card
            onCardLike={props.onCardLike}
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </div>
    </main>
  );
}

export default Main;
