// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'

// eslint-disable-next-line import/no-extraneous-dependencies
// import fetchMock, { enableFetchMocks } from 'jest-fetch-mock'

// import { navigate } from '@reach/router'

// enableFetchMocks()

beforeEach(() => {
  // clear url before every test because history is shared resource
  // navigate('/')
  // jest.clearAllMocks()
  // fetchMock.resetMocks()
})

// process.env.REACT_APP_OAUTH_CLIENT_ID = 'anything'

// jest.mock('store', () => ({
//   getStore: () => ({
//     getState: () => ({
//       env: {
//         NODE_ENV: process.env.NODE_ENV,
//       },
//     }),
//   }),
// }))
