import React from 'react';
import AuthForm from './AuthForm';

function Register({
  onSignUp,
  useValidation
}) {

  const [formValid, setFormValid] = React.useState(true)
  const [submitButtonText, setSubmitButtonText] = React.useState("Зарегистрироваться")

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const {validationMessage: emailErrorMessage, isValid: emailValid, onChange: validateEmail , resetError: resetEmailError} = useValidation({})
  const {validationMessage: passwordErrorMessage, isValid: passwordValid, onChange: validatePassword, resetError: resetPasswordError } = useValidation({})

  function changeEmail(e) {
    setEmail(e.target.value);
    // validateEmail(e)
  }
  
  function changePassword(e) {
    setPassword(e.target.value);
    // validatePassword(e)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitButtonText("Регистрация...")
    onSignUp({
      email: email,
      password: password
    })
    .finally(() => {
      resetEmailError()
      resetPasswordError()
      setSubmitButtonText("Зарегистрироваться")
    })
  }

  React.useEffect(() => {
    setTimeout(() => {
      
    }, 500)
}, [onSignUp])

  React.useEffect(() => {
    !emailValid || !passwordValid ? setFormValid(false) : setFormValid(true)
  }, [emailValid, passwordValid])

  return (
      <AuthForm
        onSubmit={handleSubmit}
        name="registration"
        title="Регистрация"
        buttonText={submitButtonText}
        isFormValid={formValid}
      >
        <input
          data-input="email-input"
          type="email"
          className={ `auth__input auth__input_type_email ${!emailValid && `auth__input_type_error`}` }
          name="auth__input_type_email"
          required
          placeholder="Email"
          minLength="6"
          maxLength="40"
          onChange={changeEmail}
          value={email ?? ''}
        />
        <span
          className={`auth__error ${!emailValid && `auth__error_visible`}` }
          data-input="email-input-error"
        >{emailErrorMessage}</span>
        <input
          data-input="password-input"
          type="password"
          className={`auth__input auth__input_type_password ${!passwordValid && `auth__input_type_error`}`}
          name="auth__input_type_password"
          required
          placeholder="Пароль"
          minLength="5"
          maxLength="20"
          onChange={changePassword}
          value={password ?? ''}
        />
        <span
          className={`auth__error ${!passwordValid && `auth__error_visible`}`}
          data-input="password-input-error"
        >{passwordErrorMessage}</span>
      </AuthForm>
  );
}

export default Register;