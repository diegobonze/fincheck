import * as Dialog from '@radix-ui/react-dialog'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { cn } from '../../app/utils/cn'
import { Cross2Icon } from '@radix-ui/react-icons'

interface ModalProps {
  open: boolean
  title: string
  rightAction?: React.ReactNode
  children: React.ReactNode
  onClose?(): void
}

export function Modal({ open, title, rightAction, onClose, children }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className={cn(
          'fixed inset-0 bg-black/80 backdrop-blur-sm z-50',
          'data-[state=open]:animate-overlay-show',
        )} />

        <Dialog.Content
          aria-describedby={undefined}
          className={cn(
          'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-6 space-y-10 bg-white rounded-2xl z-[51] shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]',
          'w-full max-w-[400px] outline-none',
          'data-[state=open]:animate-content-show'
        )}>
          <VisuallyHidden.Root>
            <Dialog.Title>Modal de Filtros</Dialog.Title>
          </VisuallyHidden.Root>

          <header className='h-12 flex items-center justify-between text-gray-800'>
            <button
              onClick={onClose}
              className='w-12 h-12 flex items-center justify-center outline-none'
            >
              <Cross2Icon className='h-6 w-6' />
            </button>

            <span className='text-lg tracking-[-1px] font-bold'>
              {title}
            </span>

            <div className='w-12 h-12 flex items-center justify-center'>
              {rightAction}
            </div>
          </header>

          <div>
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
