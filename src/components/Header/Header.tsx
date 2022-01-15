import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import type { Theme } from '@mui/material/styles'
import { NavLink } from 'react-router-dom'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from 'hooks'
import { logOut, selectCurrentUser } from 'features'

const linkStyle = { margin: (theme: Theme) => theme.spacing(1, 1.5, 1, 3) }

function Header() {
  const user = useAppSelector(selectCurrentUser)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          <Link component={NavLink} to="/app" underline="none" color="textPrimary">
            Mui setup
          </Link>
        </Typography>
        {user ? (
          <Button
            sx={linkStyle}
            href="#"
            color="primary"
            variant="outlined"
            onClick={() => {
              navigate('/')
              dispatch(logOut())
            }}
          >
            Logout
          </Button>
        ) : (
          <Button sx={linkStyle} href="#" color="primary" variant="outlined" component={NavLink} to="/login">
            Login
          </Button>
        )}
        <Button sx={linkStyle} href="#" color="primary" variant="outlined" component={NavLink} to="/priv">
          Priv
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header
