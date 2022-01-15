import React from 'react'

import { Navigate, Route, PathRouteProps, LayoutRouteProps, IndexRouteProps } from 'react-router-dom'
import { selectCurrentUser } from 'features'
import { useAppSelector } from 'hooks'

const PrivateRoute = ({ element, ...rest }: PathRouteProps | LayoutRouteProps | IndexRouteProps) => {
  const user = useAppSelector(selectCurrentUser)

  return (
    <React.Fragment>
      <Route {...rest} element={user ? element : <Navigate to="/login" />} />
    </React.Fragment>
  )
}

export default PrivateRoute
