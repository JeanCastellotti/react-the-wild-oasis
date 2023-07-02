import { useQuery } from '@tanstack/react-query'
import { getBookings } from '../../services/apiBookings'
import { useSearchParams } from 'react-router-dom'

export function useBookings() {
  const [params] = useSearchParams()

  const filterValue = params.get('status')

  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue }

  const sortByParam = params.get('sortBy') || 'start_date-asc'
  const [field, direction] = sortByParam.split('-')
  const sortBy = { field, direction }

  const { data, isLoading, error } = useQuery({
    queryKey: ['bookings', filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  })
  return { data, isLoading, error }
}
