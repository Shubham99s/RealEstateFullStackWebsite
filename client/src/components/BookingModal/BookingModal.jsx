import React, { useContext, useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import { useMutation } from 'react-query'
import UserDetailContext from '../../context/UserDetailContext'
import { bookVisit } from '../../utils/api'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'

const BookingModal = ({ setOpened, email, propertyId }) => {
  const [value, setValue] = useState(null)

  const {
    userDetails: { token },
    setUserDetails,
  } = useContext(UserDetailContext)

  const handleBookingSuccess = () => {
    toast.success('You have booked your visit', { position: 'bottom-right' })
    setUserDetails((prev) => ({
      ...prev,
      bookings: [
        ...prev.bookings,
        { id: propertyId, date: dayjs(value).format('DD/MM/YYYY') },
      ],
    }))
  }

  const { mutate } = useMutation({
    mutationFn: () => bookVisit(value, propertyId, email, token),
    onSuccess: () => handleBookingSuccess(),
    onError: ({ response }) => toast.error(response.data.message),
    onSettled: () => setOpened(false),
  })

  const orientation =
    document.documentElement.clientWidth >= 490 ? 'landscape' : 'portrait'

  return (
    <div
      className="flexCenter"
      style={{ width: '100%', border: '1px solid red' }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          orientation={orientation}
          disablePast={true}
          value={value}
          onChange={setValue}
          onAccept={() => mutate()}
          onClose={() => setOpened(false)}
        />
      </LocalizationProvider>
    </div>
  )
}

export default BookingModal
