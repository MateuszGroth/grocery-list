import { useContext } from 'react'

import { DialogContext } from './DialogProvider'
import type { TDialogContext } from './types'

const useDialog = () => {
  const context = useContext(DialogContext)

  if (!context) {
    const errorCallback = (...arg: any[]) => {
      throw new Error('useDialog actions have to be used within a DialogProvider')
    }
    const fakeContext: TDialogContext = {
      closeDialog: errorCallback,
      showConfirmationDialog: errorCallback,
      showCustomDialog: errorCallback,
    }

    return fakeContext
  }

  return context
}

export default useDialog
