import MuiTitle from '@mui/material/DialogTitle'

import { DEFAULT_TITLE } from './constants'
import { TDialogTitle } from './types'

interface TProps {
  title?: TDialogTitle
}

const DialogTitle = (props: TProps) => {
  const { title } = props

  if (title && typeof title !== 'string') return <>{title}</> // custom jsx component

  return <MuiTitle>{title || DEFAULT_TITLE}</MuiTitle>
}

export default DialogTitle
