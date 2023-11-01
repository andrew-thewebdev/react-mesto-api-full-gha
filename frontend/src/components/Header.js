import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

import logo from '../images/logo.svg';

function Header(props) {
  const location = useLocation();
  // const navigate = useNavigate();
  function signOut() {
    props.onSignOut();
  }

  let headerAuth = <div className="header__auth"></div>;

  if (props.loggedIn) {
    headerAuth = (
      <div className="header__auth">
        <div className="header__email">{props.email}</div>
        <button onClick={signOut} className="header__exit-btn">
          Выйти
        </button>
      </div>
    );
  }

  if (location.pathname === '/sign-up') {
    headerAuth = (
      <div className="header__auth">
        <Link to="sign-in" className="header__auth-btn">
          Войти
        </Link>
      </div>
    );
  }

  if (location.pathname === '/sign-in') {
    headerAuth = (
      <div className="header__auth">
        <Link to="/sign-up" className="header__auth-btn">
          Регистрация
        </Link>
      </div>
    );
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Проекта Место" />
      {headerAuth}
    </header>
  );
}

export default Header;
