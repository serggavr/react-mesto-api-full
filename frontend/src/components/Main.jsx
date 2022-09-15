import React from 'react';
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDeleteWithConfirmation,
}) {

  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main className="content">
      <section className="profile section">
        <div className="profile__avatar-wrapper">
          <img
            src={currentUser.avatar}
            alt="Аватар пользователя"
            className="profile__avatar"/>
          <button
            className="profile__avatar-change-button"
            onClick={onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__title-block">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              className="profile__change-button"
              type="button"
              aria-label="Редактировать профиль"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить карточку"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements section">
        <ul className="elements__list">

          {cards.map((card) => {
            return (
                <Card card={card} key={card._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDeleteWithConfirmation={onCardDeleteWithConfirmation}/>
            )
          })}

        </ul>
      </section>
    </main>
  );
};