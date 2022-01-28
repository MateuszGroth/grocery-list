import MuiDialog from '@mui/material/Dialog'

import { TDialogData } from './types'

import DialogTitle from './DialogTitle'
import DialogContent from './DialogContent'
import DialogActions from './DialogActions'

interface TProps {
  isOpen: boolean
  dialogData: TDialogData
  closeDialog(): void
}

const Dialog = (props: TProps) => {
  const { isOpen, dialogData, closeDialog } = props

  return (
    <MuiDialog
      open={isOpen}
      onClose={() => closeDialog()}
      aria-labelledby="dialog-dialog-title"
      aria-describedby="dialog-dialog-description"
      BackdropProps={{ sx: { bgColor: 'hsl(0 0% 0% / 10%)' } }}
      data-testid="dialog"
    >
      <DialogTitle title={dialogData.title} />
      <DialogContent content={dialogData.content} />
      {!dialogData.hideActions && (
        <DialogActions
          onApply={dialogData.onApply}
          onCancel={dialogData.onCancel}
          applyActionLabel={dialogData.applyActionLabel}
          cancelActionLabel={dialogData.cancelActionLabel}
          customActions={dialogData.customActions}
          closeDialog={closeDialog}
        />
      )}
    </MuiDialog>
  )
}

export default Dialog
