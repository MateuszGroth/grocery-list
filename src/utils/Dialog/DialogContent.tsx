import MuiContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'

import { TDialogContent } from './types'

interface TProps {
  content?: TDialogContent
}

const DialogContent = (props: TProps) => {
  const { content } = props

  if (content == null) return <></> // no content

  if (typeof content !== 'string') return <>{content}</> // custom jsx component

  return (
    <MuiContent data-testid="dialog-content">
      <DialogContentText sx={{ whiteSpace: 'pre-wrap' }}>{content}</DialogContentText>
    </MuiContent>
  )
}

export default DialogContent
