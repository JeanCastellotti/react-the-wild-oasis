import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login } from '../../services/apiAuth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

export function useLogin() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user)
      toast.success('You have been logged in')
      navigate('/dashboard', { replace: true })
    },
    onError: (err) => {
      toast.error('Provided email or password are incorrect')
    },
  })

  return { mutate, isLoading }
}
