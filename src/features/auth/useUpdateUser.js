import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { updateCurrentUser } from '../../services/apiAuth'

export function useUpdateUser() {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (data) => {
      toast.success('Account successfully updated')
      // queryClient.setQueryData('user', data)
      queryClient.invalidateQueries({
        queryKey: ['user'],
      })
    },
    onError: (err) => toast.error(err.message),
  })

  return { mutate, isLoading }
}
