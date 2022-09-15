import React from 'react';
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children, loggedIn}) {
  if (!loggedIn) {
    return <Navigate replace to="/sign-in" />
  }

  return children
}