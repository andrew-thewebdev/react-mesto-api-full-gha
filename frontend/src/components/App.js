import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';

import { useEffect, useState } from 'react';
import api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth.js';
import InfoTooltip from './InfoTooltip';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isInfoToolTtipPopupOpened, setIsInfoToolTtipPopupOpened] =
    useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const [cards, setCards] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    tokenCheck();
  }, []);

  const tokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.getContent(jwt).then((res) => {
        // console.log(res);
        if (res.data) {
          setLoggedIn(true);
          setEmail(res.data.email);
          navigate('/');
        }
      });
    }
  };

  useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards()
        .then((cardsData) => {
          // console.log(cardsData);
          setCards(cardsData);
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        });
    }
  }, [loggedIn]);

  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((userData) => {
          // console.log('user data recieved:', userData);
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        });
    }
  }, [loggedIn]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    // console.log('card clicked', card);
    setSelectedCard({
      name: card.name,
      link: card.link,
    });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  function handleCardDelete(card) {
    // console.log('delete card:', card);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  function handleUpdateUser(newUserData) {
    // console.log('new user:', newUserData);
    const updatedUser = { ...currentUser };
    updatedUser['name'] = newUserData.name;
    updatedUser['about'] = newUserData.about;
    // console.log('updated user:', updatedUser);
    api
      .setUserInfo(newUserData)
      .then(() => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  function handleUpdateAvatar(newAvatar) {
    // console.log('new avatar link:', newAvatar);
    const updatedUser = { ...currentUser };
    updatedUser['avatar'] = newAvatar.avatar;
    api
      .updateAvatar(newAvatar)
      .then(() => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  function handleAddPlaceSubmit(newCardToAdd) {
    // console.log('new card added:', newCardToAdd);
    api
      .sendCard(newCardToAdd)
      .then((newCard) => {
        // console.log('cardAdded', newCard);
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  function closeAllPopups() {
    setIsInfoToolTtipPopupOpened(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsRegistered(false);
  }

  const handleRegister = ({ password, email }) => {
    return auth
      .register(password, email)
      .then((res) => {
        setIsInfoToolTtipPopupOpened(true);
        if (!res || res.statusCode === 400 || res.error)
          throw new Error('Что-то пошло не так');
        navigate('/sign-in');
        setIsRegistered(true);
        return res;
      })
      .catch((err) => {
        console.log(err);
        setIsRegistered(false);
        setIsInfoToolTtipPopupOpened(true);
      });
  };

  const handleLogin = ({ password, email }) => {
    return auth
      .authorize(password, email)
      .then((res) => {
        // console.log('authorize res', res);
        if (!res || res.statusCode === 400 || res.message)
          throw new Error('Неправильное имя пользователя или логин');
        setEmail(email);
        setLoggedIn(true);
        localStorage.setItem('jwt', res.token);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        setIsRegistered(false);
        setIsInfoToolTtipPopupOpened(true);
        setLoggedIn(false);
      });
  };

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    navigate('/sign-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} email={email} onSignOut={handleSignOut} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
                component={Main}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route
            path="*"
            element={
              loggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/sign-in" replace />
              )
            }
          />
        </Routes>

        {loggedIn && <Footer />}

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          submitBtnText="Да"
          title="Вы уверены?"
          name="delete-confirm"
        ></PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip
          isOpened={isInfoToolTtipPopupOpened}
          isRegistered={isRegistered}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
