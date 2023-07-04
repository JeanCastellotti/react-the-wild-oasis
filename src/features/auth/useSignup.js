import { useMutation } from '@tanstack/react-query'
import { signup } from '../../services/apiAuth'
import { toast } from 'react-hot-toast'

export function useSignup() {
  const { mutate, isLoading } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      toast.success('Account successfully created! Please check your emails.')
    },
  })

  return { mutate, isLoading }
}
