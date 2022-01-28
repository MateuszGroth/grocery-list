import { useState } from 'react'
import ReactDOM from 'react-dom'

import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt'

export const onServiceWorkerUpdate = (registration: ServiceWorkerRegistration) => {
  const rootEl = document.createElement('div')
  ReactDOM.render(
    <UpdateAvailableAlert rootEl={rootEl} registration={registration} />,
    document.body.appendChild(rootEl),
  )
}

type TProps = {
  rootEl: HTMLDivElement
  registration: ServiceWorkerRegistration
}

const UpdateAvailableAlert = ({ rootEl, registration }: TProps) => {
  const [open, setOpen] = useState(true)

  const handleClose = (event?: any, reason?: string) => {
    if (reason === 'clickaway') {
      // do not the alert close on window click
      return
    }

    setOpen(false)
  }

  const handleExited = () => {
    rootEl.remove()
  }

  const handleUpdate = () => {
    if (registration?.waiting) {
      // let waiting Service Worker know it should became active
      registration.waiting.postMessage('SKIP_WAITING')
    }
    setOpen(false)
  }

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      TransitionProps={{
        onExited: handleExited,
      }}
      ContentProps={{ sx: { bgcolor: 'info.main' } }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      message={
        <Box display="flex" gap={2}>
          <SystemUpdateAltIcon />
          <Typography sx={{ pr: 2 }} variant="body1">
            New version of the Application is available!
          </Typography>
        </Box>
      }
      action={
        <>
          <Button sx={{ color: 'primary.contrastText' }} onClick={handleClose}>
            Skip
          </Button>
          <Button sx={{ color: 'primary.contrastText' }} onClick={handleUpdate}>
            Update Now
          </Button>
        </>
      }
    />
  )
}
