import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { Stepper, Button, Group } from '@mantine/core'
import '@mantine/core/styles.css'
import AddLocation from '../AddLocation/AddLocation'
import { useAuth0 } from '@auth0/auth0-react'
import UploadImage from '../UploadImage/UploadImage'
import BasicDetails from '../BasicDetails/BasicDetails'
import Facilities from '../Facilities/Facilities'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '50rem',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 7,
}

const AddPropertyModal = ({ opened, setOpened }) => {
  const [active, setActive] = useState(0)

  const { user } = useAuth0

  const [propertyDetails, setPropertyDetails] = useState({
    title: '',
    description: '',
    price: 0,
    country: '',
    city: '',
    address: '',
    image: null,
    facilities: { bedrooms: 0, parkings: 0, bathrooms: 0 },
    userEmail: user?.email,
  })

  const nextStep = () => {
    setActive((current) => (current < 4 ? current + 1 : current))
  }

  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current))
  }

  return (
    <Modal
      open={opened}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <button
          onClick={() => setOpened(false)}
          style={{
            position: 'absolute',
            top: '.5rem',
            right: '.8rem',
            background: 'transparent',
            border: '0',
            fontSize: '20px',
            cursor: 'pointer',
          }}
        >
          x
        </button>
        <Stepper
          active={active}
          onStepClick={setActive}
          allowNextStepsSelect={false}
          breakpoint="sm"
        >
          <Stepper.Step label="Select Location" description="Address">
            <AddLocation
              nextStep={nextStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
            />
          </Stepper.Step>
          <Stepper.Step label="Upload Image" description="Picture">
            <UploadImage
              prevStep={prevStep}
              nextStep={nextStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
            />
          </Stepper.Step>
          <Stepper.Step label="Property Details" description="Basic Details">
            <BasicDetails
              prevStep={prevStep}
              nextStep={nextStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
            />
          </Stepper.Step>
          <Stepper.Step label="Property Details" description="Basic Details">
            <Facilities
              prevStep={prevStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
              setOpened={setOpened}
              setActiveStep={setActive}
            />
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>
      </Box>
    </Modal>
  )
}

export default AddPropertyModal
