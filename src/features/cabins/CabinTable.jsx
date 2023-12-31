import { useSearchParams } from 'react-router-dom'

import CabinRow from './CabinRow'
import { useCabins } from './useCabins'

import Spinner from '../../ui/Spinner'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'

function CabinTable() {
  const { data: cabins, isLoading } = useCabins()
  const [params] = useSearchParams()

  if (isLoading) return <Spinner />

  const filter = params.get('discount') || 'all'

  let filteredCabins

  if (filter === 'all') filteredCabins = cabins
  if (filter === 'no-discount')
    filteredCabins = cabins.filter((c) => c.discount === 0)
  if (filter === 'with-discount')
    filteredCabins = cabins.filter((c) => c.discount > 0)

  const sortBy = params.get('sortBy') || 'asc'
  const [field, direction] = sortBy.split('-')
  const modifier = direction === 'asc' ? 1 : -1

  let sortedCabins

  if (field === 'name')
    sortedCabins = filteredCabins.sort((a, b) => {
      if (a.name < b.name) return -1 * modifier
      if (a.name > b.name) return 1 * modifier
      return 0
    })
  else {
    sortedCabins = filteredCabins.sort(
      (a, b) => (a[field] - b[field]) * modifier
    )
  }

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          items={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  )
}

export default CabinTable
