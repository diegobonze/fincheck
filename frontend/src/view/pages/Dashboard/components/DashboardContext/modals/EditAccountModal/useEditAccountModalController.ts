import { z } from "zod";
import { useDashboard } from "../../useDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountService } from "../../../../../../../app/services/bankAccountService";
import { BankAccountParams } from "../../../../../../../app/services/bankAccountService/create";
import toast from 'react-hot-toast';

const schema = z.object({
  initialBalance: z.string().nonempty('Saldo inicial é obrigatório'),
  name: z.string().nonempty('Nome da conta é obrigatório'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
  color: z.string().nonempty('Cor é obrigatória'),
})

type FormData = z.infer<typeof schema>

export function useEditAccountModalController() {
  const {
    closeEditAccountModal,
    isEditAccountModalOpen,
  } = useDashboard()

  const queryClient = useQueryClient()

  const {
      register,
      handleSubmit: hookFormHandleSubmit,
      formState: { errors },
      control,
      reset,
    } = useForm<FormData>({
      resolver: zodResolver(schema)
    })

    const { isPending, mutateAsync } = useMutation({
      mutationFn: async (data: BankAccountParams) => {
        return await bankAccountService.create(data)
      }
    })

    const handleSubmit = hookFormHandleSubmit(async (data) => {
      try {
        await mutateAsync({
          ...data,
          initialBalance: Number(data.initialBalance),
        })

        queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })
        toast.success('Conta cadastrada com sucesso!')
        closeEditAccountModal()
        reset()
      } catch {
        toast.error('Erro ao cadastrar a conta!')
      }
    })

  return {
    closeEditAccountModal,
    isEditAccountModalOpen,
    register,
    errors,
    handleSubmit,
    control,
    isPending,
  }
}
