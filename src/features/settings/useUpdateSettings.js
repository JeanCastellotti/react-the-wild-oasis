import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { updateSetting } from '../../services/apiSettings'

export function useUpdateSettings() {
  const queryClient = useQueryClient()

  const { isLoading, mutate } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success('Setting successfully updated')
      queryClient.invalidateQueries({
        queryKey: ['settings'],
      })
    },
    onError: (err) => toast.error(err.message),
  })

  return { isLoading, mutate }
}
