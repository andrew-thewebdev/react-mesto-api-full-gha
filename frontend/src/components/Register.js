import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ password, email }).then(() => {
      // navigate('/sign-in', { replace: true });
    });
    // .catch((err) => {
    //   console.log(err.message);
    // });
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form onSubmit={handleSubmit} className="auth__form">
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          placeholder="E-mail"
          className="auth__email"
        />
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          placeholder="Password"
          className="auth__password"
        />
        <button type="submit" className="auth__submit-btn">
          Зарегистрироваться
        </button>
      </form>
      <div className="auth__footer">
        <p>Уже зарегистрированы?</p>
        <Link to="/sign-in" className="auth__footer-link">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
