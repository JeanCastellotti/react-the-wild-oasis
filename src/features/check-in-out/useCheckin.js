import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query'
import { updateBooking } from '../../services/apiBookings'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export function useCheckin() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ id, breakfast }) =>
      updateBooking(id, {
        status: 'checked-in',
        is_paid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`)
      queryClient.invalidateQueries({ active: true })
      navigate('/')
    },

    onError: () => toast.error('There was an error while checking in'),
  })

  return { mutate, isLoading }
}
