import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from 'react-hot-toast'

import { SignupParams } from "../../../app/services/authService/signup";
import { authService } from "../../../app/services/authService";

const schema = z.object({
  name: z.string().nonempty('Nome é obrigatório.'),
  email: z.string().email('Insira um E-mail válido.').nonempty('E-mail é obrigatório.'),
  password: z.string().min(8, 'Senha deve conter pelo menos 8 dígitos.').nonempty('Senha é obrigatória.'),
})

type FormData = z.infer<typeof schema>

export function useRegisterController() {
  const {
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    register,
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: SignupParams) => {
      return authService.signup(data)
    },
  })

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync(data)
    } catch {
      toast.error('Erro ao criar conta')
    }
  })

  return { handleSubmit, register, errors, isPending }
}
