// import logo from '../logo.svg';
import React from "react";
import '../App.css';
import Header from './Header'
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import Footer from "./Footer"
import Api from '../utils/Api'
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import InfoTooltip from "./InfoTooltip";
import { Routes, Route, Navigate, useNavigate} from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import Auth from '../utils/Auth'

export default function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false)
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''})
  const [deletedCard, setDeletedCard] = React.useState({})
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])
  const [formSubmittedSuccessfully, setFormSubmittedSuccessfully] = React.useState(true)
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const navigate = useNavigate()

function getDataFromApi() {
  Promise.all([Api.getUser(), Api.getCards()])
  .then(([info, cards]) => {
    setCurrentUser(info)
    setCards(cards)
  })
  .catch(err => console.log(err))
}

function handleCardLike(card) {
  const isLiked = card.likes.some(like => like === currentUser._id);
  if (isLiked) {
    Api.dislikeCard(card._id)
    .then(res => {
      setCards((state) => state.map((c) => c._id === card._id ? res: c))
    })
    .catch(err => console.log(err))
  } else {
    Api.likeCard(card._id)
    .then(res => {
      setCards((state) => state.map((c) => c._id === card._id ? res: c))
    })
    .catch(err => console.log(err))
  }
}

function handleDeleteConfirmation(card) {
  return new Promise((response) => {
  Api.deleteCard(card._id)
  .then(res => {
    setCards((state) => state.filter((c) => c._id !== card._id))
  })
  .then(res => {
    closeAllPopups()
  })
  .catch(err => console.log(err))
  .finally(() => {
    response()
  })
})
}

  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  const handleDeleteConfirmationPopup = (card) => {
    setIsConfirmationPopupOpen(!isConfirmationPopupOpen)
    setDeletedCard(card)
  }

  const handleInfoTooltipOpen = () => {
    setIsInfoTooltipOpen(!isInfoTooltipOpen)
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsConfirmationPopupOpen(false)
    setIsInfoTooltipOpen(false)
    setSelectedCard({name: '', link: ''})
    setDeletedCard({})
  }

  const handleCloseWithPushEscButton = React.useCallback((event) => {
    if (event.key === 'Escape') {
      closeAllPopups()
    }
  }, [])

  const handleCloseWithClickOnOverlay = React.useCallback((event) => {
    if (event.target.className.includes('popup_opened')) {
      closeAllPopups()
    }
  }, [])

  function handleUpdateUser(newUserData) {
    return new Promise((resolve) => {
      Api.setUser({newName: newUserData.name, newAbout: newUserData.about})
        .then(res => {
          setCurrentUser(res)
          closeAllPopups()
    })
    .catch(err => console.log(err))
    .finally(() => {
      resolve()
    })
  })
  }

  const handleUpdateAvatar = (userAvatarSrc) => {
    return new Promise((resolve) => {
      Api.setUserAvatar(userAvatarSrc)
      .then(res => {
        setCurrentUser(res)
    })
      .then(res => closeAllPopups())
      .catch(err => console.log(err))
      .finally(() => {
        resolve()
    })
  })
  }

  const handleAddPlaceSubmit = (newCard) => {
    return new Promise((resolve) => {
      Api.setCard(newCard)
      .then(res => {
        setCards([res, ...cards])
    })
      .then(res => closeAllPopups())
      .catch(err => console.log(err))
      .finally(() => {
        resolve()
      })
    })
  }
  
  const useValidation = () => {
    const [validationMessage, setValidationMessage] = React.useState('')
    const [isValid, setIsValid] = React.useState(true)
    const onChange = (e) => {
      if (e.target.validationMessage) {
        setValidationMessage(e.target.validationMessage)
        setIsValid(false)
      } else {
        setValidationMessage('')
        setIsValid(true)
      }
    }
    const resetError = () => {
      setValidationMessage('')
      setIsValid(true)
    }
    return {
      validationMessage,
      isValid,
      onChange,
      resetError
    }
  }

  React.useEffect(() => {
    if (isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isConfirmationPopupOpen || isInfoTooltipOpen || selectedCard.link) {
      document.addEventListener('keydown', handleCloseWithPushEscButton)
      document.addEventListener('click', handleCloseWithClickOnOverlay)
      return () => {
        document.removeEventListener('keydown', handleCloseWithPushEscButton)
        document.removeEventListener('click', handleCloseWithClickOnOverlay)
      }
    }
  }, [isEditProfilePopupOpen,
      isAddPlacePopupOpen,
      isEditAvatarPopupOpen,
      isConfirmationPopupOpen,
      isInfoTooltipOpen,
      selectedCard.link,
      handleCloseWithClickOnOverlay,
      handleCloseWithPushEscButton,
    ])

    const handleSignUp = ({email, password}) => {
      return new Promise((resolve) => {
        Auth.signUp({email, password})
        .then(res => {
            setFormSubmittedSuccessfully(true)
            handleInfoTooltipOpen()
            navigate('/sign-in', { push: true })
          }
        )
        .catch(err => {
          setFormSubmittedSuccessfully(false)
          handleInfoTooltipOpen()
        })
        .finally(() => {
          resolve()
        })
      })
    }
    
    const handleSignIn = ({email, password}) => {
      return new Promise((resolve) => {
        Auth.signIn({email, password})
        .then((data) => {
              setEmail(email)
              setLoggedIn(true)
            })
        .then(() => {
          getDataFromApi()
        })
        .then(() => {
          navigate('/', { push: true })
        })
        .catch(err => {
          setFormSubmittedSuccessfully(false)
          handleInfoTooltipOpen()
        })
        .finally(() => {
          resolve()
        })
      })
    }

    const handleAuthWithToken = () => {
      Auth.AuthWithToken()
      .then((data) => {
        setEmail(data.email)
        setLoggedIn(true)
      })
      .then(() => {
        getDataFromApi()
      })
      .then(() => {
        navigate('/', { push: true })
      })
      .catch((err) => {
        // if (err.status === '401') {
        //   console.log('401')
        // }
        console.log(err.toString())
        console.log(err)
        console.log(JSON.stringify(err))
      })
    }

    const handleLogout = () => {
      Api.logout()
      .then((res) => {
        setLoggedIn(false)
      })
      .catch(err => console.log(err))
    }

    React.useEffect(() =>{
        handleAuthWithToken()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="page">
        <Header 
        email={email}
        onLogout={handleLogout}
        />
        <Routes>
          <Route path='/' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDeleteWithConfirmation={handleDeleteConfirmationPopup}/>
            </ProtectedRoute>
          } />
          <Route path='/sign-up' element={
            <Register
            onSignUp={handleSignUp}
            useValidation={useValidation}
            />
          }/>
          <Route path='/sign-in' element={
            <Login
            onSignIn={handleSignIn}
            useValidation={useValidation}
            />
          }/>
          <Route path='/*' element={<Navigate to='/' />}/>
        </Routes>
        <Footer />
      </div>
        
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        useValidation={useValidation}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        useValidation={useValidation}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        useValidation={useValidation}
      />

      <ConfirmationPopup
        isOpen={isConfirmationPopupOpen}
        onClose={closeAllPopups}
        onConfirmDeleteCard={() => handleDeleteConfirmation(deletedCard)}
      />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />

      <InfoTooltip 
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        isSuccessful={formSubmittedSuccessfully}
      />

    </CurrentUserContext.Provider>
  );
}
