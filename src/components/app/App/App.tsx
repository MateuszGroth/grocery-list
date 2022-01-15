import { useCallback } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Login from 'components/Login/Login'
import Header from 'components/Header/Header'
import { useAuthService } from 'hooks'

import styles from './App.module.scss'

const Prywatne = () => {
  return <div>udalo sie zalogowac</div>
}

function App() {
  const user = useAuthService()

  const getPrivateElement = useCallback(
    (element) => (user ? element : <Navigate to="/login" state={{ usePreviousLocation: true }} />),
    [user],
  )

  return (
    <div className={styles.app}>
      <Header />
      <Routes>
        <Route path="/" element={<div>Test</div>} />
        <Route path="/login" element={<Login user={user} />} />
        <Route path="/priv" element={getPrivateElement(<Prywatne />)} />
      </Routes>
    </div>
  )
}

export default App
