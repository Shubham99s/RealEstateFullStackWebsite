import React, { useState } from 'react'
import { BiMenuAltRight } from 'react-icons/bi'
import OutsideClickHandler from 'react-outside-click-handler'
import './Header.css'
import { Link, NavLink } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import ProfileMenu from '../ProfileMenu/ProfileMenu'
import AddPropertyModal from '../AddPropertyModal/AddPropertyModal'
import useAuthCheck from '../../hooks/useAuthCheck'
import Button from '@mui/material/Button'

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(true)

  const [modalOpened, setModalOpened] = useState(false)

  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0()

  const { validateLogin } = useAuthCheck()

  const handleAddPropertyClick = () => {
    if (validateLogin()) {
      setModalOpened(true)
    }
  }

  const getMenuStyle = (menuOpened) => {
    if (document.documentElement.clientWidth <= 768) {
      return { right: menuOpened && '-100%' }
    }
  }

  return (
    <section className="h-wrapper">
      <div className="flexCenter h-container innerWidth paddings">
        <Link to="/">
          <img src="./logo.png" alt="logo" width={100} />
        </Link>
        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(true)
          }}
        >
          <div className="h-menu flexCenter" style={getMenuStyle(menuOpened)}>
            <NavLink
              to="/properties"
              onClick={() => setMenuOpened((prev) => !prev)}
            >
              Properties
            </NavLink>
            <a
              href="mailto:shubhamsonkusale99s@gmail.com"
              onClick={() => setMenuOpened((prev) => !prev)}
            >
              Contact
            </a>

            {/* Add Property */}
            <Button onClick={handleAddPropertyClick}>Add Property</Button>
            <AddPropertyModal opened={modalOpened} setOpened={setModalOpened} />

            {/* Login Button */}

            {!isAuthenticated ? (
              <button className="button" onClick={loginWithRedirect}>
                Login
              </button>
            ) : (
              <ProfileMenu user={user} logout={logout} />
            )}
          </div>
        </OutsideClickHandler>
        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  )
}

export default Header
