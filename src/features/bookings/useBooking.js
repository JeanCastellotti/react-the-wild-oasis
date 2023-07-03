import { useQuery } from '@tanstack/react-query'
import { getBooking } from '../../services/apiBookings'
import { useParams } from 'react-router-dom'

export function useBooking() {
  const params = useParams()

  const { data, isLoading, error } = useQuery({
    queryKey: ['booking', params.id],
    queryFn: () => getBooking(params.id),
    retry: false,
  })

  return { data, isLoading, error }
}
