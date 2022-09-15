import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import logo from "../images/header/logo_theme_dark.svg";

export default function Header({
  email,
  onLogout
}) {

  const [burgerMenuActive, setBurgerMenuActive] = React.useState(false)

  function handleOpenBurgerMenu() {
    setBurgerMenuActive(!burgerMenuActive)
  }
  
  return (
    <header className="header">
      <img
        src={logo}
        alt="Место Россия"
        className="header__logo"
      />
      <Routes>
        <Route path='/' element={
          <>
          <button className={`header__burger-menu-open-button ${burgerMenuActive && `header__burger-menu-open-button_active` }`} onClick={handleOpenBurgerMenu}>
              <span className="header__burger-menu-open-button-line"></span>
              <span className="header__burger-menu-open-button-line"></span>
              <span className="header__burger-menu-open-button-line"></span>
          </button>
          <div className={`header__auth-container burger-menu ${burgerMenuActive && `burger-menu_visible` }`}>
            <p className="header__auth-email">{email ?? ''}</p>
            <Link to='/' className="header__auth-link" onClick={onLogout}>Выйти</Link>
          </div>
          <div className={`header__auth-container`}>
            <p className="header__auth-email">{email ?? ''}</p>
            <Link to='/' className="header__auth-link" onClick={onLogout}>Выйти</Link>
          </div>
          </>
        } />
        <Route path='/sign-up' element={
          <div className="header__auth-container header__auth-container_visible">
            <Link to='/sign-in' className="header__auth-link">Войти</Link>
          </div>
        } />
        <Route path='/sign-in' element={
          <div className="header__auth-container header__auth-container_visible">
            <Link to='/sign-up' className="header__auth-link">Регистрация</Link>
          </div>
        } />
      </Routes>
    </header>
  );
}