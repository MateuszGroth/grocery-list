import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
//MaterialUI
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

import { useAppDispatch } from 'hooks'
import { logIn } from 'features'
import type { User } from 'types'

const initialFormData = Object.freeze({
  email: '',
  password: '',
})

type LoginProps = {
  user: User | null
}

export default function Login({ user }: LoginProps) {
  const location: any = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [formData, updateFormData] = useState(initialFormData)

  useEffect(() => {
    if (!user) {
      return
    }

    // redirect to different location if user is logged in
    if (location?.state?.usePreviousLocation) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }, [user, location, navigate])

  if (user) {
    return <></>
  }

  const handleChange = (e: any) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    dispatch(logIn({ userName: formData.email, password: formData.password }))
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar
          sx={{
            margin: 1,
            backgroundColor: 'secondary.main',
          }}
        ></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component={'form'}
          sx={{
            marginTop: 1,
          }}
          noValidate
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              marginTop: 3,
              marginBottom: 2,
            }}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
