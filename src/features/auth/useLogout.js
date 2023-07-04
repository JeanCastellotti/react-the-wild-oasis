import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logout } from '../../services/apiAuth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

export function useLogout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries()
      toast.success('You have been logged out')
      navigate('/login', { replace: true })
    },
  })

  return { mutate, isLoading }
}
