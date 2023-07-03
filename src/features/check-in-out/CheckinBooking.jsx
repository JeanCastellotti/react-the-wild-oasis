import styled from 'styled-components'
import BookingDataBox from '../../features/bookings/BookingDataBox'

import Row from '../../ui/Row'
import Heading from '../../ui/Heading'
import ButtonGroup from '../../ui/ButtonGroup'
import Button from '../../ui/Button'
import ButtonText from '../../ui/ButtonText'

import { useMoveBack } from '../../hooks/useMoveBack'
import { useBooking } from '../bookings/useBooking'
import Spinner from '../../ui/Spinner'
import { useEffect, useState } from 'react'
import Checkbox from '../../ui/Checkbox'
import { formatCurrency } from '../../utils/helpers'
import { useCheckin } from './useCheckin'
import { useSettings } from '../settings/useSettings'

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false)
  const [addBreakfast, setAddBreakfast] = useState(false)
  const { data: settings, isLoading: isLoadingSettings } = useSettings()
  const { data: booking, isLoading, error } = useBooking()

  const moveBack = useMoveBack()
  const { mutate: checking, isLoading: isCheckingIn } = useCheckin()

  useEffect(() => {
    setConfirmPaid(booking?.is_paid ?? false)
  }, [booking])

  if (isLoading || isLoadingSettings) return <Spinner />

  const {
    id: bookingId,
    guest,
    guests,
    total_price,
    has_breakfast,
    nights,
  } = booking

  const optionalBreakfastPrice = settings.breakfast_price * nights * guests

  function handleCheckin() {
    if (!confirmPaid) return
    addBreakfast
      ? checking({
          id: bookingId,
          breakfast: {
            has_breakfast: true,
            extras_price: optionalBreakfastPrice,
            total_price: total_price + optionalBreakfastPrice,
          },
        })
      : checking({ id: bookingId, breakfast: {} })
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!has_breakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((b) => !b)
              setConfirmPaid(false)
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)} ?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((c) => !c)}
          disabled={confirmPaid || isCheckingIn}
          id={bookingId}
        >
          I confirm that {guest.fullname} has paid the total amount of{' '}
          {!addBreakfast
            ? formatCurrency(total_price)
            : `${formatCurrency(
                total_price + optionalBreakfastPrice
              )} (${formatCurrency(total_price)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  )
}

export default CheckinBooking
