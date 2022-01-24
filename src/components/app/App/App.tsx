import { Routes, Route } from 'react-router-dom'

import MainPage from 'components/pages/Main/Main'

import styles from './App.module.scss'

function App() {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<MainPage />} />
      </Routes>
    </div>
  )
}

export default App
