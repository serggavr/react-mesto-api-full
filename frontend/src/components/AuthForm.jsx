import React from 'react';
import { Link } from 'react-router-dom';

function AuthForm({
  name,
  title,
  onSubmit,
  children,
  buttonText,
  isFormValid
}) {
  return (
    <div className={`auth auth_type_${name}`}>
        <div className="auth__container">
          <form
            action="#"
            className="auth__form"
            name={name}
            onSubmit={onSubmit}
            // noValidate
          >
            <h2 className="auth__title">{title}</h2>

            {children}

          <input
            type="submit" 
            value={buttonText}
            className={`auth__button ${!isFormValid && `auth__button_disabled`}`}
            disabled={!isFormValid}
          />
          {name === "registration" && 
          (<div className="auth__footer">
            <p className="auth__footer-text">Уже зарегистрированы? <Link className="auth__footer-link" to='/sign-in'>Войти</Link></p>
          </div>)}
          </form>
        </div>
      </div>
);
}

export default AuthForm;