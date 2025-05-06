import { z } from "zod"
import { useDashboard } from "../../useDashboard"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useBankAccounts } from "../../../../../../../app/hooks/useBankAccounts"
import { useCategories } from "../../../../../../../app/hooks/useCategories"
import { useMemo } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateTransactionParams } from "../../../../../../../app/services/transactions/create"
import { transactionService } from "../../../../../../../app/services/transactions"
import toast from "react-hot-toast"

const schema = z.object({
  bankAccountId: z.string().nonempty('Informe a conta bancária.'),
  categoryId: z.string().nonempty('Informe a categoria.'),
  date: z.date(),
  value: z.string().nonempty('Informe o valor.'),
  name: z.string().nonempty('Informe o nome.'),
})

type FormData = z.infer<typeof schema>

export function useNewTransactionModalController() {
  const {
    newTransactionType,
    isNewTransactionModalOpen,
    closeNewTransactionModal,
  } = useDashboard()

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: CreateTransactionParams) => {
      return await transactionService.create(data)
    }
  })

  const queryClient = useQueryClient()
  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        value: Number(data.value),
        type: newTransactionType!,
        date: data.date.toISOString(),
      })
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })
      toast.success(
        newTransactionType === 'EXPENSE'
        ? 'Despesa cadastrada com sucesso!'
        : 'Receita cadastrada com sucesso!'
      )
      closeNewTransactionModal()
      reset()
    }
    catch {
      toast.error(
        newTransactionType === 'EXPENSE'
        ? 'Erro ao cadastrar despesa!'
        : 'Erro ao cadastrar receita!'
      )
    }
  })

  const { categories: categoriesList } = useCategories()
  const { accounts } = useBankAccounts()

  const categories = useMemo(() => {
    return categoriesList.filter(category => category.type === newTransactionType)
  }, [categoriesList, newTransactionType])

  return {
    newTransactionType,
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isPending,
  }
}
