import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function ConfirmationPopup({
  onClose,
  isOpen,
  onConfirmDeleteCard
}) {

  const [submitButtonText, setSubmitButtonText] = React.useState("Дa")

  function handleConfirmationDeleteCard(e) {
    e.preventDefault()
    setSubmitButtonText("Удаление...")
    onConfirmDeleteCard()
    .finally(() => {
      setSubmitButtonText("Да")
    })
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="confirm"
      title="Вы уверены?"
      isFormValid={true}
    >
      <input
        type="submit"
        className="popup__button popup__button_placed_submit-form"
        value={submitButtonText}
        onClick={handleConfirmationDeleteCard}
      />
    </PopupWithForm>
  );
}

