import { Button } from "./Button";
import { TrashIcon } from "./icons/TrashIcon";
import { Modal } from "./Modal";

interface ConfirmDeleteModalProps {
  isLoading: boolean
  onConfirm: () => void
  onClose: () => void
  title: string
  description?: string
}

export function ConfirmDeleteModal({ onClose, title, description, onConfirm, isLoading }: ConfirmDeleteModalProps) {
  return (
    <Modal open title="Excluir" onClose={onClose}>
      <div className="flex flex-col items-center text-center gap-6">
        <div className="h-[52px] w-[52px] bg-red-0 rounded-full flex items-center justify-center">
          <TrashIcon className="h-6 w-6 text-red-900" />
        </div>
        <p className="w-[180px] text-gray-800 tracking-[-0.5px] font-bold">
          {title}
        </p>
        {description && (
          <p className="tracking-[-0.5px] text-gray-800">
            {description}
          </p>
        )}
      </div>

      <div className="mt-10 space-y-4">
        <Button
          className="w-full"
          variant='danger'
          onClick={onConfirm}
          isPending={isLoading}
        >
          Sim, desejo excluir
        </Button>

        <Button
          className="w-full"
          variant='ghost'
          onClick={onClose}
          disabled={isLoading}
        >
          Cancelar
        </Button>
      </div>
    </Modal>
  )
}
