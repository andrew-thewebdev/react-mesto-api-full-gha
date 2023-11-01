import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    onLogin({ password, email }).then(() => {
      // navigate('/', { replace: true });
    });
    // .catch((err) => {
    //   console.log(err.message);
    // });
  };
  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form onSubmit={handleSubmit} className="auth__form">
        <input
          id="email"
          required
          name="email"
          type="email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          placeholder="E-mail"
          className="auth__email"
        />
        <input
          id="password"
          required
          name="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          placeholder="Password"
          className="auth__password"
        />
        <button type="submit" className="auth__submit-btn">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
