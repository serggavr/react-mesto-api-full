import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  useValidation
}) {

  const [formValid, setFormValid] = React.useState(false)
  const [submitButtonText, setSubmitButtonText] = React.useState("Создать")
  const [userAvatarSrc, setUserAvatarSrc] = React.useState('')

  const {validationMessage: userAvatarSrcErrorMessage, isValid: userAvatarSrcValid, onChange: validateUserAvatarSrc , resetError: resetUserAvatarSrcError} = useValidation({})

  function changeAvatarSrc(e) {
    setUserAvatarSrc(e.target.value);
    validateUserAvatarSrc(e)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitButtonText("Сохранение...")
    onUpdateAvatar(userAvatarSrc)
    .finally(() => {
      setSubmitButtonText("Создать")
      setUserAvatarSrc('')
      resetUserAvatarSrcError()
    })
    
  }

  React.useEffect(() => {
    !userAvatarSrcValid || userAvatarSrc === '' ?  setFormValid(false) : setFormValid(true)
  }, [userAvatarSrcValid, validateUserAvatarSrc, userAvatarSrc])

  React.useEffect(() => {
    setFormValid(false)
  }, [isOpen])

  return (
    <PopupWithForm
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        name="update-avatar"
        title="Обновить аватар"
        buttonText={submitButtonText}
        isFormValid={formValid}
      >
        <input
          data-input="avatar-link-input"
          type="url"
          className={`popup__input popup__input_type_avatar-link ${!userAvatarSrcValid && `popup__input_type_error`}`}
          name="popup__input_type_avatar-link"
          required
          placeholder="Ссылка на новый аватар"
          onChange={changeAvatarSrc}
          value={userAvatarSrc ?? ''}
        />
        <span
          className={`popup__error ${!userAvatarSrcValid && `popup__error_visible`}`}
          data-input="avatar-link-input-error"
        >{userAvatarSrcErrorMessage}</span>
      </PopupWithForm>
  );
}