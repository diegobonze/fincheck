import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useBankAccounts } from "../../../../../../../app/hooks/useBankAccounts"
import { useCategories } from "../../../../../../../app/hooks/useCategories"
import { useMemo, useState } from "react"
import { Transaction } from "../../../../../../../entities/Transaction"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { transactionService } from "../../../../../../../app/services/transactions"
import toast from "react-hot-toast"

const schema = z.object({
  bankAccountId: z.string().nonempty('Informe a conta bancária.'),
  categoryId: z.string().nonempty('Informe a categoria.'),
  date: z.date(),
  value: z.union([
    z.string().nonempty('Informe o valor.'),
    z.number(),
  ]),
  name: z.string().nonempty('Informe o nome.'),
})

type FormData = z.infer<typeof schema>

export function useEditTransactionModalController(transaction: Transaction | null, onClose: () => void) {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
      name: transaction?.name,
      value: transaction?.value,
      date: transaction ? new Date(transaction.date) : new Date()
    }
  })

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (transaction: Transaction) => {
      return await transactionService.update(transaction)
    }
  })

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const queryClient = useQueryClient()

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        id: transaction!.id,
        type: transaction!.type,
        value: Number(data.value),
        date: data.date.toISOString(),
      })
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      toast.success(
        transaction!.type === 'EXPENSE'
        ? 'Despesa editada com sucesso!'
        : 'Receita editada com sucesso!'
      )
      onClose()
    }
    catch {
      toast.error(
        transaction!.type === 'EXPENSE'
        ? 'Erro ao editar despesa!'
        : 'Erro ao editar receita!'
      )
    }
  })

  const { mutateAsync: removeTransaction, isPending: isLoadingDelete } = useMutation({
    mutationFn: async (transactionId: string) => {
      return await transactionService.remove(transactionId)
    }
  })

  async function handleDeleteAccount() {
    try {
      await removeTransaction(transaction!.id)

      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })
      toast.success(
        transaction!.type === 'EXPENSE'
        ? 'Despesa deletada com sucesso!'
        : 'Receita deletada com sucesso!'
      )
      onClose()
    }catch {
      toast.success(
        transaction!.type === 'EXPENSE'
        ? 'Erro ao deletar despesa!'
        : 'Erro ao deletar receita!'
      )
    }
  }

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true)
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false)
  }

  const { categories: categoriesList } = useCategories()
  const { accounts } = useBankAccounts()

  const categories = useMemo(() => {
    return categoriesList.filter(category => category.type === transaction?.type)
  }, [categoriesList, transaction])

  return {
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isLoading: isPending,
    isDeleteModalOpen,
    isLoadingDelete,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount,
  }
}
