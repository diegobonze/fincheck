import { z } from "zod";
import { useDashboard } from "../../useDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountService } from "../../../../../../../app/services/bankAccountsService";
import toast from 'react-hot-toast';
import { UpdateBankAccountParams } from "../../../../../../../app/services/bankAccountsService/update";
import { useState } from "react";

const schema = z.object({
  initialBalance: z.union([
    z.string().nonempty('Valor inicial é obrigatório'),
    z.number(),
  ]),
  name: z.string().nonempty('Nome da conta é obrigatório'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
  color: z.string().nonempty('Cor é obrigatória'),
})

type FormData = z.infer<typeof schema>

export function useEditAccountModalController() {
  const {
    closeEditAccountModal,
    isEditAccountModalOpen,
    accountBeingEdited,
  } = useDashboard()

  const queryClient = useQueryClient()

  const {
      register,
      handleSubmit: hookFormHandleSubmit,
      formState: { errors },
      control,
    } = useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: {
        initialBalance: accountBeingEdited?.initialBalance,
        name: accountBeingEdited?.name,
        type: accountBeingEdited?.type,
        color: accountBeingEdited?.color,
      }
    })

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const {
      isPending,
      mutateAsync: updateAccount,
    } = useMutation({
      mutationFn: async (data: UpdateBankAccountParams) => {
        return await bankAccountService.update(data)
      }
    })

    const {
      isPending: isLoadingDelete,
      mutateAsync: removeAccount,
    } = useMutation({
      mutationFn: async (bankAccountId: string) => {
        return await bankAccountService.remove(bankAccountId)
      }
    })

    const handleSubmit = hookFormHandleSubmit(async (data) => {
      try {
        await updateAccount({
          ...data,
          initialBalance: Number(data.initialBalance),
          id: accountBeingEdited!.id,
        })

        queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })
        toast.success('A conta foi editada com sucesso!')
        closeEditAccountModal()
      } catch {
        toast.error('Erro ao salvar as alterações!')
      }
    })

    function handleOpenDeleteModal() {
      setIsDeleteModalOpen(true)
    }

    function handleCloseDeleteModal() {
      setIsDeleteModalOpen(false)
    }

    async function handleDeleteAccount() {
      try {
        await removeAccount(accountBeingEdited!.id)

        queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })
        toast.success('A conta foi deletada com sucesso!')
        closeEditAccountModal()
      } catch {
        toast.error('Erro ao deletar a conta!')
      }
    }

  return {
    closeEditAccountModal,
    isEditAccountModalOpen,
    register,
    errors,
    handleSubmit,
    control,
    isPending,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount,
    isLoadingDelete,
  }
}
