import React, { useState } from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import OutsideClickHandler from 'react-outside-click-handler'
import './ProfileMenu.css'
import { useNavigate } from 'react-router-dom'

const ProfileMenu = ({ user, logout }) => {
  const navigate = useNavigate()

  const [profileOpened, setProfileOpened] = useState(true)

  const getMenuStyle = (profileOpened) => {
    if (profileOpened) {
      return { display: 'none' }
    } else {
      return
    }
  }
  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setProfileOpened(true)
      }}
    >
      <div className="flexColCenter">
        <div
          className="flexCenter profile"
          onClick={() => setProfileOpened((prev) => !prev)}
        >
          <img src={user?.picture} alt="user" className="user-image" />
          <MdKeyboardArrowRight size={25} />
        </div>

        <div
          className="flexCenter profile-menu"
          style={getMenuStyle(profileOpened)}
        >
          <p onClick={() => navigate('./favourites', { replace: true })}>
            Favourites
          </p>
          <p onClick={() => navigate('./bookings', { replace: true })}>
            Bookings
          </p>
          <button
            onClick={() => {
              localStorage.clear()
              logout()
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </OutsideClickHandler>
  )
}

export default ProfileMenu
