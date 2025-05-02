import { Controller } from "react-hook-form";
import { DatePickerInput } from "../../../../../../components/DatePickerInput";
import { Input } from "../../../../../../components/Input";
import { InputCurrency } from "../../../../../../components/InputCurrency";
import { Modal } from "../../../../../../components/Modal";
import { Select } from "../../../../../../components/Select";
import { useNewTransactionModalController } from "./useNewTransactionModalController";
import { Button } from "../../../../../../components/Button";

export function NewTransactionModal() {
  const {
    newTransactionType,
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    errors,
    handleSubmit,
    register,
    control,
    accounts,
    categories,
    isPending,
  } = useNewTransactionModalController()

  const isExpense = newTransactionType === 'EXPENSE'

  return(
    <Modal
      title={isExpense ? 'Nova Despesa' : 'Novo Receita'}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
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

        <Button type="submit" className="w-full mt-6" isPending={isPending}>
          Criar
        </Button>
      </form>
    </Modal>
  )
}
