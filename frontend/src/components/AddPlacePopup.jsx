import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  useValidation
}) {

  const [formValid, setFormValid] = React.useState(false)
  const [submitButtonText, setSubmitButtonText] = React.useState("Создать")

  const [newPlaceName, setNewPlaceName] = React.useState(null);
  const [newPlaceImageSrc, setNewPlaceImageSrc] = React.useState(null);

  const {validationMessage: newPlaceNameErrorMessage, isValid: newPlaceNameValid, onChange: validateNewPlaceName , resetError: resetNewPlaceNameError} = useValidation({})
  const {validationMessage: newPlaceImageSrcErrorMessage, isValid: newPlaceImageSrcValid, onChange: validateNewPlaceImageSrc, resetError: resetNewPlaceImageSrcError } = useValidation({})

  function changeNewPlaceName(e) {
    setNewPlaceName(e.target.value)
    validateNewPlaceName(e)
  }

  function changeNewPlaceImageSrc(e) {
    setNewPlaceImageSrc(e.target.value)
    validateNewPlaceImageSrc(e)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitButtonText("Сохранение...")
    onAddPlace({cardName: newPlaceName, cardLink: newPlaceImageSrc})
    .finally(() => {
      setSubmitButtonText("Создать")
      setFormValid(false)
      setNewPlaceName('')
      setNewPlaceImageSrc('')
      resetNewPlaceNameError()
      resetNewPlaceImageSrcError()
    })
  }

  React.useEffect(() => {
    !newPlaceNameValid || !newPlaceImageSrcValid || newPlaceName === '' || newPlaceImageSrc === '' ? setFormValid(false) : setFormValid(true)
  }, [newPlaceNameValid, newPlaceImageSrcValid, newPlaceName, newPlaceImageSrc])

  React.useEffect(() => {
    setNewPlaceName('')
    setNewPlaceImageSrc('')
    resetNewPlaceNameError()
      resetNewPlaceImageSrcError()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  return (
    <PopupWithForm
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    name="add-element-card"
    title="Новое место"
    buttonText={submitButtonText}
    isFormValid={formValid}
  >
    <input
      data-input="card-name-input"
      type="text"
      className={`popup__input popup__input_type_card-name ${!newPlaceNameValid && `popup__input_type_error`}`}
      name="popup__input_type_card-name"
      required
      placeholder="Название"
      minLength="2"
      maxLength="30"
      onChange={changeNewPlaceName}
      value={newPlaceName ?? ''}
    />
    <span
      className={`popup__error ${!newPlaceNameValid && `popup__error_visible`}`}
      data-input="card-name-input-error"
    >{newPlaceNameErrorMessage}</span>
    <input
      data-input="image-link-input"
      type="url"
      className={`popup__input popup__input_type_image-link ${!newPlaceImageSrcValid && `popup__input_type_error`}`}
      name="popup__input_type_image-link"
      required
      placeholder="Ссылка на картинку"
      onChange={changeNewPlaceImageSrc}
      value={newPlaceImageSrc ?? ''}
    />
    <span
      className={`popup__error ${!newPlaceImageSrcValid && `popup__error_visible`}`}
      data-input="image-link-input-error"
    >{newPlaceImageSrcErrorMessage}</span>
  </PopupWithForm>
  );
}