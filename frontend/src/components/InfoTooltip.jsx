import React from 'react';
import PopupWithForm from './PopupWithForm';
import successfullyImg from '../images/infoTooltip/successfully.svg'
import unsuccessfullyImg from '../images/infoTooltip/unsuccessfully.svg'

function InfoTooltip({
  isOpen,
  onClose,
  isSuccessful
}) {
  
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="infoTooltip"
    >
      {isSuccessful ?
        (<>
          <img className='popup__image' src={successfullyImg} alt='successfully'/>
          <h2 className="popup__title popup__title_placed_info-tooltip">Вы успешно зарегистрировались!</h2>
        </> )
        : 
        (<>
          <img className='popup__image' src={unsuccessfullyImg} alt='unsuccessfully'/>
          <h2 className="popup__title popup__title_placed_info-tooltip">Что-то пошло не так! Попробуйте ещё раз.</h2>
        </>)
      }
    </PopupWithForm>
  );
}

export default InfoTooltip;