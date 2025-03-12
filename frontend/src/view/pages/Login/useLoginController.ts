import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Insira um E-mail válido.').nonempty('E-mail é obrigatório.'),
  password: z.string().min(8, 'Senha deve conter pelo menos 8 dígitos.').nonempty('Senha é obrigatória.'),
})

type FormData = z.infer<typeof schema>

export function useLoginController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const handleSubmit = hookFormHandleSubmit((data) => {
    console.log('chama a api:', data)
  })

  return { handleSubmit, register, errors }
}
