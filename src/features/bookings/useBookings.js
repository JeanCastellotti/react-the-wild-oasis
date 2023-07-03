import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getBookings } from '../../services/apiBookings'
import { useSearchParams } from 'react-router-dom'
import { RESULTS_PER_PAGE } from '../../utils/constants'

export function useBookings() {
  const queryClient = useQueryClient()
  const [params] = useSearchParams()

  const filterValue = params.get('status')

  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue }

  const sortByParam = params.get('sortBy') || 'start_date-asc'
  const [field, direction] = sortByParam.split('-')
  const sortBy = { field, direction }

  const page = !params.get('page') ? 1 : Number(params.get('page'))

  const {
    data: { data: bookings, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  })

  if (page < Math.ceil(count / RESULTS_PER_PAGE)) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    })
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    })
  }

  return { isLoading, error, bookings, count }
}
