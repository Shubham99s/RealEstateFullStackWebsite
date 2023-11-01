import React, { useContext, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useLocation } from 'react-router-dom'
import { getProperty, removeBooking } from '../../utils/api'
import { PuffLoader } from 'react-spinners'
import { AiFillHeart, AiTwotoneCar } from 'react-icons/ai'
import './Property.css'
import { MdLocationOn, MdMeetingRoom } from 'react-icons/md'
import { FaShower } from 'react-icons/fa'
import Map from '../../components/Map/Map'
import useAuthCheck from '../../hooks/useAuthCheck'
import { useAuth0 } from '@auth0/auth0-react'
import BookingModal from '../../components/BookingModal/BookingModal'
import UserDetailContext from '../../context/UserDetailContext'
import { toast } from 'react-toastify'
import Heart from '../../components/Heart/Heart'

const Property = () => {
  const { pathname } = useLocation()
  const id = pathname.split('/').slice(-1)[0]

  const { data, isLoading, isError } = useQuery(['resd', id], () =>
    getProperty(id)
  )

  const [modalOpened, setModalOpened] = useState(false)
  const { validateLogin } = useAuthCheck()
  const { user } = useAuth0()

  const {
    userDetails: { token, bookings },
    setUserDetails,
  } = useContext(UserDetailContext)

  const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
    mutationFn: () => removeBooking(id, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        bookings: prev.bookings.filter((bookings) => bookings?.id !== id),
      }))
      toast.success('Booking Cancelled', { position: 'bottom-right' })
    },
  })

  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error While Fetching Data</span>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: '60vh' }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    )
  }

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        <div className="like">
          <Heart id={id} />
        </div>

        <img src={data?.image} alt="home image" />

        <div className="flexCenter property-details">
          <div className="flexColStart left">
            <div className="flexStart head">
              <span className="primaryText">{data?.title}</span>
              <span className="orangeText" style={{ fontSize: '1.2rem' }}>
                ${data?.price}
              </span>
            </div>

            <div className="flexStart facilities">
              <div className="flexStart facility">
                <FaShower size={20} color="#1F3E72" />
                <span>{data?.facilities?.bathrooms} Bathrooms</span>
              </div>

              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1F3E72" />
                <span>{data?.facilities?.parking} Parking</span>
              </div>

              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1F3E72" />
                <span>{data?.facilities?.bedrooms} Room/s</span>
              </div>
            </div>

            <span
              className="secondaryText"
              style={{ textAlign: 'right', width: '100%' }}
            >
              {data?.description}
            </span>

            <div
              className="flexStart"
              style={{
                justifyContent: 'flex-end',
                gap: '5px',
                width: '100%',
              }}
            >
              <MdLocationOn size={25} />
              <span
                className="secondaryText"
                style={{
                  color: 'black',
                  fontWeight: '500',
                  fontSize: '15px',
                }}
              >
                {data?.address}, {data?.city}, {data?.country}
              </span>
            </div>

            {bookings?.map((bookings) => bookings.id).includes(id) ? (
              <>
                <button
                  className="cancel-booking"
                  onClick={() => cancelBooking()}
                  disabled={cancelling}
                >
                  Cancel Booking
                </button>
                <span style={{ textAlign: 'center', width: '100%' }}>
                  Your have already booked a visit for date{' : '}
                  {bookings?.filter((bookings) => bookings.id === id)[0].date}
                </span>
              </>
            ) : (
              <button
                className="button"
                onClick={() => {
                  validateLogin() && setModalOpened(true)
                }}
              >
                Book Your Visit
              </button>
            )}
          </div>

          <div className="map">
            <Map
              address={data?.address}
              city={data?.city}
              country={data?.country}
            />
          </div>
        </div>
        {modalOpened && (
          <BookingModal
            opened={modalOpened}
            setOpened={setModalOpened}
            propertyId={id}
            email={user?.email}
          />
        )}
      </div>
    </div>
  )
}

export default Property
