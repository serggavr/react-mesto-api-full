import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card({
                card,
                onCardClick,
                onCardLike,
                onCardDeleteWithConfirmation,
              })
{

  const currentUser = React.useContext(CurrentUserContext);
  const isOwner = card.owner._id === currentUser._id;
  const [isLiked, setIsLiked] = React.useState(card.likes.some(like => like._id === currentUser._id))

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeCard() {
    onCardLike(card)
  }

  function handleDeleteCardWithConfirmation() {
    onCardDeleteWithConfirmation(card)
  }

  React.useEffect(() => {
    setIsLiked(card.likes.some(like => like._id === currentUser._id))
  }, [card, currentUser._id])

  return (
    <li className="element">
      <img
        src={card.link}
        alt={card.name}
        className="element__photo"
        onClick={handleClick}
      />
      {isOwner ? (<button onClick={handleDeleteCardWithConfirmation} className="element__delete-btn"></button>) : (null)}
      <div className="element__title-block">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__likes-wrapper">
          <button
            className={`element__like ${isLiked && `element__like_active`}`}
            type="button"
            aria-label="Нравится"
            onClick={handleLikeCard}
          ></button>
          <span className="element__likes-counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
};