import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  useValidation
}) {

const currentUser = React.useContext(CurrentUserContext)
const [formValid, setFormValid] = React.useState(true)
const [submitButtonText, setSubmitButtonText] = React.useState("Сохранить")

const [name, setName] = React.useState(currentUser.name);
const [description, setDescription] = React.useState(currentUser.about);

const {validationMessage: nameErrorMessage, isValid: nameValid, onChange: validateName , resetError: resetNameError} = useValidation({})
const {validationMessage: descriptionErrorMessage, isValid: descriptionValid, onChange: validateDescription, resetError: resetDescriptionError } = useValidation({})

function changeName(e) {
  setName(e.target.value);
  validateName(e)
}

function changeDescription(e) {
  setDescription(e.target.value);
  validateDescription(e)
}

function handleSubmit(e) {
  e.preventDefault()
  setSubmitButtonText("Сохранение...")
    onUpdateUser({
      name,
      about: description
    })
  .finally(() => {
    setSubmitButtonText("Сохранить")
    setName(currentUser.name)
    setDescription(currentUser.about)
    resetNameError()
    resetDescriptionError()
  })
}

React.useEffect(() => {
  !nameValid || !descriptionValid ? setFormValid(false) : setFormValid(true)
}, [nameValid, descriptionValid])

  return (
    <PopupWithForm
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        name="edit-profile"
        title="Редактировать профиль"
        buttonText={submitButtonText}
        isFormValid={formValid}
      >
        <input
          data-input="name-input"
          type="text"
          className={ `popup__input popup__input_type_username ${!nameValid && `popup__input_type_error`}` }
          name="popup__input_type_username"
          required
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          onChange={changeName}
          value={name ?? ''}
        />
        <span
          className={`popup__error ${!nameValid && `popup__error_visible`}`}
          data-input="name-input-error"
        >{nameErrorMessage}</span>
        <input
          data-input="description-input"
          type="text"
          className={`popup__input popup__input_type_description ${!descriptionValid && `popup__input_type_error`}`}
          name="popup__input_type_description"
          required
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          onChange={changeDescription}
          value={description ?? ''}
        />
        <span
          className={`popup__error ${!descriptionValid && `popup__error_visible`}`}
          data-input="description-input-error"
        >{descriptionErrorMessage}</span>
      </ PopupWithForm>
  );
}