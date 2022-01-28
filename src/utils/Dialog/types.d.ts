import { ReactNode } from 'react'

export type TDialogTitle = string | ReactNode

export type TDialogContent = string | ReactNode

export interface TDialogAction {
  label: string
  shouldHideDialog?: boolean // true by default
  onClick?(): void
}

export interface TDialogData {
  onClose?(): void
  onCancel?(): void
  onApply?(): void
  title?: TDialogTitle
  content?: TDialogContent
  customActions?: TDialogAction[]
  cancelActionLabel?: string
  applyActionLabel?: string
  hideActions?: boolean
}

export interface TDialogContext {
  closeDialog(): voud
  showCustomDialog(arg?: TDialogData): void
  showConfirmationDialog(title: TDialogTitle, content: TDialogContent, onApply: () => void, onCancel?: () => void): void
}
