import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from 'components/app/App/App'
import ThemeProvider from 'components/app/ThemeProvider/ThemeProvider'
import { store } from 'store'
import { Provider } from 'react-redux'
import { onServiceWorkerUpdate } from 'helpers'
import * as serviceWorker from './serviceWorker'

import './index.scss'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

if (process.env.NODE_ENV === 'production') {
  const config = {
    onUpdate: onServiceWorkerUpdate,
  }
  serviceWorker.register(config)
} else {
  serviceWorker.unregister()
}
