import React from 'react';

export default function ImagePopup({
  card,
  onClose
}) {

 return (
    <div className={`popup popup_type_element-overview ${card.link && `popup_opened`}`}>
      <div className="popup__container popup__container_placed_element-overview">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <figure className="overview">
          <img
            className="overview__image"
            src={card.link}
            alt={card.name}/>
          <figcaption className="overview__caption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
 );
};

