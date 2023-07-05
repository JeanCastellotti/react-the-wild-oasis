import Button from '../../ui/Button'
import { useCheckOut } from './useCheckout'

function CheckoutButton({ bookingId }) {
  const { mutate, isLoading } = useCheckOut()

  return (
    <Button
      variation="primary"
      size="small"
      disabled={isLoading}
      onClick={() => mutate(bookingId)}
    >
      Check out
    </Button>
  )
}

export default CheckoutButton
