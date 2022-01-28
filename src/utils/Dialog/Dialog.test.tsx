import { DialogProvider, useDialog } from '.'
import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react'

import { DEFAULT_TITLE, DEFAULT_ACTION_APPLY, DEFAULT_ACTION_CANCEL } from './constants'
import { TDialogContext } from './types'

const setupTestComponent = (callback: (context: TDialogContext) => void) => (props: any) => {
  const context = useDialog()
  return <button onClick={() => callback(context)}>Button</button>
}
const setup = (Component: any) => {
  const TestComponent = (props: any) => {
    return (
      <DialogProvider>
        <Component />
      </DialogProvider>
    )
  }
  render(<TestComponent />)
}
describe('Dialog', () => {
  describe('useDialog', () => {
    it('should throw when calling useDialog functions without the DialogProvider', () => {
      const cb = (context: TDialogContext) => {
        expect(() => {
          context.showConfirmationDialog(null, null, () => null)
        }).toThrow()
      }
      const Component = setupTestComponent(cb)
      render(<Component />)
      const button = screen.getByText('Button')
      fireEvent.click(button)
    })
    describe('showConfirmationDialog', () => {
      it('should display default title', async () => {
        const cb = (context: TDialogContext) => context.showConfirmationDialog(null, null, () => null)
        setup(setupTestComponent(cb))
        const button = screen.getByText('Button')
        fireEvent.click(button)
        await screen.findByText(DEFAULT_TITLE)
      })
      it('should display correct text title', async () => {
        const testTitle = 'Testing Dialog'
        const cb = (context: TDialogContext) => context.showConfirmationDialog(testTitle, null, () => null)
        setup(setupTestComponent(cb))
        const button = screen.getByText('Button')
        fireEvent.click(button)
        await screen.findByText(testTitle)
      })
      it('should display correct react node title', async () => {
        const testTitle = <div>Testing Title</div>
        const cb = (context: TDialogContext) => context.showConfirmationDialog(testTitle, null, () => null)
        setup(setupTestComponent(cb))
        const button = screen.getByText('Button')
        fireEvent.click(button)
        await screen.findByText('Testing Title')
      })
      it('should display correct content', async () => {
        const testContent = 'Testing Dialog Content'
        const cb = (context: TDialogContext) => context.showConfirmationDialog(null, testContent, () => null)
        setup(setupTestComponent(cb))
        const button = screen.getByText('Button')
        fireEvent.click(button)
        await screen.findByTestId('dialog-content')
        await screen.findByText(testContent)
      })
      it('should display correct react node content', async () => {
        const testContentTestId = 'test-content'
        const testContent = <div data-testid={testContentTestId}>Testing Content</div>
        const cb = (context: TDialogContext) => context.showConfirmationDialog(null, testContent, () => null)
        setup(setupTestComponent(cb))
        const button = screen.getByText('Button')
        fireEvent.click(button)
        await screen.findByTestId(testContentTestId)
      })
      it('should not display content', async () => {
        const cb = (context: TDialogContext) => context.showConfirmationDialog(null, null, () => null)
        setup(setupTestComponent(cb))
        const button = screen.getByText('Button')
        fireEvent.click(button)
        expect(screen.queryByTestId('dialog-content')).toBe(null)
      })
      it('should hide dialog on apply', async () => {
        const cb = (context: TDialogContext) => context.showConfirmationDialog(null, null, () => null)
        setup(setupTestComponent(cb))
        const button = screen.getByText('Button')
        fireEvent.click(button)
        expect(screen.queryByTestId('dialog')).not.toBe(null)
        const applyDialogButton = screen.getByText(DEFAULT_ACTION_APPLY)
        fireEvent.click(applyDialogButton)
        await waitForElementToBeRemoved(() => screen.queryByTestId('dialog'))
      })
      it('should call function on apply', async () => {
        const fn = jest.fn()
        const cb = (context: TDialogContext) => context.showConfirmationDialog(null, null, fn)
        setup(setupTestComponent(cb))
        const button = screen.getByText('Button')
        fireEvent.click(button)
        expect(screen.queryByTestId('dialog')).not.toBe(null)
        const applyDialogButton = screen.getByText(DEFAULT_ACTION_APPLY)
        fireEvent.click(applyDialogButton)
        expect(fn).toBeCalled()
      })
      it('should hide dialog on cancel', async () => {
        const cb = (context: TDialogContext) => context.showConfirmationDialog(null, null, () => null)
        setup(setupTestComponent(cb))
        const button = screen.getByText('Button')
        fireEvent.click(button)
        expect(screen.queryByTestId('dialog')).not.toBe(null)
        const cancelDialogButton = screen.getByText(DEFAULT_ACTION_CANCEL)
        fireEvent.click(cancelDialogButton)
        await waitForElementToBeRemoved(() => screen.queryByTestId('dialog'))
      })
      it('should call function on cancel', async () => {
        const fn = jest.fn()
        const cb = (context: TDialogContext) => context.showConfirmationDialog(null, null, () => null, fn)
        setup(setupTestComponent(cb))
        const button = screen.getByText('Button')
        fireEvent.click(button)
        expect(screen.queryByTestId('dialog')).not.toBe(null)
        const cancelDialogButton = screen.getByText(DEFAULT_ACTION_CANCEL)
        fireEvent.click(cancelDialogButton)
        expect(fn).toBeCalled()
      })
      it('should display second dialog and hide first while calling its onCancel', async () => {
        let first = true
        const onCancel = jest.fn()
        const cb = (context: TDialogContext) => {
          context.showConfirmationDialog(first ? 'First Title' : 'Second Title', null, () => null, onCancel)
          first = false
        }
        setup(setupTestComponent(cb))
        const button = screen.getByText('Button')
        fireEvent.click(button)
        await screen.findByText('First Title')
        fireEvent.click(button)
        expect(onCancel).toBeCalled()
        expect(screen.queryByText('First Title')).toBe(null)
        await screen.findByText('Second Title')
      })
      it('should not call first dialog onCancel on second dialog cancel', async () => {
        let first = true
        const onCancelFirst = jest.fn()
        const cb = (context: TDialogContext) => {
          context.showConfirmationDialog(
            first ? 'First Title' : 'Second Title',
            null,
            () => null,
            first ? onCancelFirst : () => null,
          )
          first = false
        }
        setup(setupTestComponent(cb))
        const button = screen.getByText('Button')
        fireEvent.click(button)
        await screen.findByText('First Title')
        fireEvent.click(button)
        expect(onCancelFirst).toBeCalledTimes(1)
        expect(screen.queryByText('First Title')).toBe(null)
        await screen.findByText('Second Title')
        const cancelDialogButton = screen.getByText(DEFAULT_ACTION_CANCEL)
        fireEvent.click(cancelDialogButton)
        expect(onCancelFirst).toBeCalledTimes(1)
      })
      it('should not call first dialog onApply on second dialog apply', async () => {
        let first = true
        const onApplyFirst = jest.fn()
        const cb = (context: TDialogContext) => {
          context.showConfirmationDialog(
            first ? 'First Title' : 'Second Title',
            null,
            first ? onApplyFirst : () => null,
          )
          first = false
        }
        setup(setupTestComponent(cb))
        const button = screen.getByText('Button')
        fireEvent.click(button)
        await screen.findByText('First Title')
        fireEvent.click(button)
        expect(onApplyFirst).toBeCalledTimes(0)
        expect(screen.queryByText('First Title')).toBe(null)
        await screen.findByText('Second Title')
        const applyDialogButton = screen.getByText(DEFAULT_ACTION_APPLY)
        fireEvent.click(applyDialogButton)
        expect(onApplyFirst).toBeCalledTimes(0)
      })
    })
    describe('closeDialog', () => {
      it('should close dialog when closeDialog called', async () => {
        let first = true
        const cb = (context: TDialogContext) => {
          if (first) {
            context.showConfirmationDialog(null, null, () => null)
          } else {
            context.closeDialog()
          }
          first = false
        }
        setup(setupTestComponent(cb))
        const button = screen.getByText('Button')
        fireEvent.click(button)
        expect(screen.queryByTestId('dialog')).not.toBe(null)
        fireEvent.click(button)
        await waitForElementToBeRemoved(() => screen.queryByTestId('dialog'))
      })
      it('should call onClose when closeDialog called', async () => {
        const onClose = jest.fn()
        let first = true
        const cb = (context: TDialogContext) => {
          if (first) {
            context.showCustomDialog({ onClose })
          } else {
            context.closeDialog()
          }
          first = false
        }
        setup(setupTestComponent(cb))
        const button = screen.getByText('Button')
        fireEvent.click(button)
        expect(screen.queryByTestId('dialog')).not.toBe(null)
        fireEvent.click(button)
        await waitForElementToBeRemoved(() => screen.queryByTestId('dialog'))
        expect(onClose).toBeCalled()
      })
    })
    describe('showCustomDialog', () => {
      it('should hide actions with hideActions set to true', async () => {
        const cb = (context: TDialogContext) => {
          context.showCustomDialog({ hideActions: true })
        }
        setup(setupTestComponent(cb))
        const button = screen.getByText('Button')
        fireEvent.click(button)
        expect(screen.queryByTestId('dialog-actions')).toBe(null)
        expect(screen.queryByText(DEFAULT_ACTION_CANCEL)).toBe(null)
        expect(screen.queryByText(DEFAULT_ACTION_APPLY)).toBe(null)
      })
      it('should display custom action', async () => {
        const customAction = { label: 'Custom Action', onClick: jest.fn() }
        const cb = (context: TDialogContext) => {
          context.showCustomDialog({ customActions: [customAction] })
        }
        setup(setupTestComponent(cb))
        const button = screen.getByText('Button')
        fireEvent.click(button)
        const customActionButton = await screen.findByText(customAction.label)
        fireEvent.click(customActionButton)
        expect(customAction.onClick).toBeCalled()
        await waitForElementToBeRemoved(() => screen.queryByTestId('dialog'))
      })
      it('should not hide dialog after custom action click with shouldHideDialog set to false', async () => {
        const customAction = { label: 'Custom Action', onClick: jest.fn(), shouldHideDialog: false }
        const cb = (context: TDialogContext) => {
          context.showCustomDialog({ customActions: [customAction] })
        }
        setup(setupTestComponent(cb))
        const button = screen.getByText('Button')
        fireEvent.click(button)
        const customActionButton = await screen.findByText(customAction.label)
        fireEvent.click(customActionButton)
        expect(customAction.onClick).toBeCalled()
        await new Promise((res) => setTimeout(res, 400))
        expect(screen.queryByTestId('dialog')).not.toBe(null)
      })
    })
  })
})
