import Spinner from '../../ui/Spinner'
import { useSettings } from './useSettings'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import { useUpdateSettings } from './useUpdateSettings'

function UpdateSettingsForm() {
  const {
    data: {
      min_booking_length,
      max_booking_length,
      max_guests_per_booking,
      breakfast_price,
    } = {},
    isLoading,
  } = useSettings()

  const { mutate: updateSetting, isLoading: isUpdating } = useUpdateSettings()

  if (isLoading) return <Spinner />

  function handleBlur(e, field) {
    const { value } = e.target

    if (!value) return
    updateSetting({ [field]: value })
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          defaultValue={min_booking_length}
          onBlur={(e) => handleBlur(e, 'min_booking_length')}
          disabled={isUpdating}
          id="min-nights"
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          defaultValue={max_booking_length}
          onBlur={(e) => handleBlur(e, 'max_booking_length')}
          disabled={isUpdating}
          id="max-nights"
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          defaultValue={max_guests_per_booking}
          onBlur={(e) => handleBlur(e, 'max_guests_per_booking')}
          disabled={isUpdating}
          id="max-guests"
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          defaultValue={breakfast_price}
          onBlur={(e) => handleBlur(e, 'breakfast_price')}
          disabled={isUpdating}
          id="breakfast-price"
        />
      </FormRow>
    </Form>
  )
}

export default UpdateSettingsForm
