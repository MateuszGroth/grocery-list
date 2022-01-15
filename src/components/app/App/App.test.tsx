import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from 'store'
import App from './App'

test('renders learn react link', () => {
  const view = render(
    <Provider store={store}>
      <App />
    </Provider>,
  )

  const screen = view

  expect(screen.getByText(/learn/i)).toBeInTheDocument()
})
