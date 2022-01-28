import { useMemo } from 'react'

import MuiActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { DEFAULT_ACTION_APPLY, DEFAULT_ACTION_CANCEL } from './constants'
import { TDialogAction } from './types'

interface TProps {
  onApply?(): void
  onCancel?(): void
  applyActionLabel?: string
  cancelActionLabel?: string
  closeDialog(): void
  customActions?: TDialogAction[]
}

const getProcessedActions = (actions: TDialogAction[], closeDialog: () => void): TDialogAction[] =>
  actions
    .map((action: TDialogAction) => {
      const tmpAction = { ...action }

      if (tmpAction.shouldHideDialog !== false) {
        tmpAction.onClick = () => {
          action.onClick!()
          closeDialog()
        }
      }

      return tmpAction
    })
    .reverse()

const DialogActions = (props: TProps) => {
  const { customActions, onApply, onCancel, closeDialog, cancelActionLabel, applyActionLabel } = props

  const actions = useMemo<Array<any>>(() => {
    if (customActions) {
      return getProcessedActions(customActions, closeDialog)
    }

    const dialogActions = []

    const cancelAction = {
      label: cancelActionLabel || DEFAULT_ACTION_CANCEL,
      onClick: () => {
        onCancel?.()
        closeDialog()
      },
    }
    dialogActions.push(cancelAction)

    if (onApply) {
      const applyAction = {
        label: applyActionLabel || DEFAULT_ACTION_APPLY,
        onClick: () => {
          onApply()
          closeDialog()
        },
      }

      dialogActions.push(applyAction)
    }

    return dialogActions
  }, [customActions, closeDialog, onApply, onCancel, applyActionLabel, cancelActionLabel])

  return (
    <MuiActions data-testid="dialog-actions">
      {actions.map((action: TDialogAction, i: number) => (
        <Button key={action.label} onClick={action.onClick}>
          {action.label}
        </Button>
      ))}
    </MuiActions>
  )
}

export default DialogActions
