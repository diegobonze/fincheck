import { Controller } from "react-hook-form";
import { DatePickerInput } from "../../../../../../components/DatePickerInput";
import { Input } from "../../../../../../components/Input";
import { InputCurrency } from "../../../../../../components/InputCurrency";
import { Modal } from "../../../../../../components/Modal";
import { Select } from "../../../../../../components/Select";
import { useEditTransactionModalController } from "./useEditTransactionModalController";
import { Button } from "../../../../../../components/Button";
import { Transaction } from "../../../../../../../entities/Transaction";
import { ConfirmDeleteModal } from "../../../../../../components/ConfirmDeleteModal";
import { TrashIcon } from "../../../../../../components/icons/TrashIcon";

interface EditTransactionModalProps {
  transaction: Transaction | null
  open: boolean
  onClose(): void
}

export function EditTransactionModal({ transaction, open, onClose }: EditTransactionModalProps) {
  console.log(transaction)
  const {
    control,
    errors,
    handleSubmit,
    register,
    accounts,
    categories,
    isLoading,
    isDeleteModalOpen,
    isLoadingDelete,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
    handleDeleteAccount,
  } = useEditTransactionModalController(transaction, onClose)

  const isExpense = transaction?.type === 'EXPENSE'

  if(isDeleteModalOpen) {
      return (
        <ConfirmDeleteModal
          isLoading={isLoadingDelete}
          onConfirm={handleDeleteAccount}
          onClose={handleCloseDeleteModal}
          title={`Tem certeza que deseja excluir esta ${isExpense ? 'despesa' : 'receita'}?`}
        />
      )
    }

  return(
    <Modal
      title={isExpense ? 'Editar Despesa' : 'Editar Receita'}
      open={open}
      onClose={onClose}
      rightAction={(
        <button onClick={handleOpenDeleteModal}>
          <TrashIcon className="h-6 w-6 text-red-900" />
        </button>
      )}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">
            Valor {isExpense ? 'da despesa' : 'da receita'}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <Controller
              control={control}
              name="value"
              defaultValue="0"
              render={({ field: { value, onChange } }) => (
                <InputCurrency
                  error={errors.value?.message}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder={isExpense ? 'Nome da Despesa' : 'Nome da Receita'}
            {...register('name')}
            error={errors.name?.message}
          />

          <Controller
            control={control}
            name="categoryId"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Categoria"
                error={errors.categoryId?.message}
                onChange={onChange}
                value={value}
                options={categories.map(category => (
                  {
                    value: category.id,
                    label: category.name,
                  }
                ))}
              />
            )}
          />

          <Controller
            control={control}
            name="bankAccountId"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder={isExpense ? 'Pagar com' : 'Receber com'}
                error={errors.bankAccountId?.message}
                onChange={onChange}
                value={value}
                options={accounts.map(account => (
                  {
                    value: account.id,
                    label: account.name,
                  }
                ))}
              />
            )}
          />

          <Controller
            control={control}
            name="date"
            defaultValue={new Date()}
            render={({ field: { value, onChange } }) => (
              <DatePickerInput
                value={value}
                onChange={onChange}
                error={errors.date?.message}
              />
            )}
          />
        </div>

        <Button type="submit" className="w-full mt-6" isPending={isLoading}>
          Salvar
        </Button>
      </form>
    </Modal>
  )
}
