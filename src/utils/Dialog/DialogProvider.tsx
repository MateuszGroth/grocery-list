import { useState, createContext, useCallback, useMemo, useRef, useEffect } from 'react'

import { TDialogContext, TDialogData, TDialogTitle, TDialogContent } from './types'

import Dialog from './Dialog'

export const DialogContext = createContext<TDialogContext | null>(null)

type TProps = {
  children: unknown
}

const DialogProvider = (props: TProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [dialogData, setDialogData] = useState<TDialogData>({})
  const showCustomDialogRef = useRef<any>(null) // keep as ref so it has always access to the most recent state

  const closeDialog = useCallback(() => {
    setIsOpen(false)
    dialogData.onClose?.()
  }, [dialogData])

  useEffect(() => {
    showCustomDialogRef.current = (arg: TDialogData = {}): { close(): void } => {
      if (isOpen) {
        // call closing functions if previous dialog was open and next dialog is being shown
        dialogData.onCancel?.()
        dialogData.onClose?.()
      }

      setIsOpen(true)
      setDialogData(arg)

      return {
        close: closeDialog,
      }
    }
  }, [closeDialog, isOpen, dialogData])

  const showConfirmationDialog = useCallback(
    (title: TDialogTitle, content: TDialogContent, onApply: () => void, onCancel?: () => void): { close(): void } =>
      showCustomDialogRef.current({ onApply, onCancel, title, content }),
    [],
  )

  const contextValue: TDialogContext = useMemo(() => {
    return { closeDialog, showCustomDialog: (arg) => showCustomDialogRef.current(arg), showConfirmationDialog }
  }, [closeDialog, showConfirmationDialog])

  return (
    <DialogContext.Provider value={contextValue}>
      {props.children}
      <Dialog dialogData={dialogData} isOpen={isOpen} closeDialog={closeDialog} />
    </DialogContext.Provider>
  )
}

export default DialogProvider
