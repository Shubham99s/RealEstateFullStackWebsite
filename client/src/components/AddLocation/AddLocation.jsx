import React from 'react'
import { useForm } from '@mantine/form'
import { validateString } from '../../utils/common'
import { Button, Group, Select, TextInput } from '@mantine/core'
import useCountries from '../../hooks/useCountries'
import '@mantine/core/styles.css'
import Map from '../Map/Map'

const AddLocation = ({ propertyDetails, setPropertyDetails, nextStep }) => {
  const { getAll } = useCountries()

  const form = useForm({
    initialValues: {
      country: propertyDetails?.country,
      city: propertyDetails?.city,
      address: propertyDetails?.address,
    },
    validate: {
      country: (value) => validateString(value),
      city: (value) => validateString(value),
      address: (value) => validateString(value),
    },
  })

  const { country, city, address } = form.values

  const handleSubmit = () => {
    const { hasErrors } = form.validate()
    if (!hasErrors) {
      setPropertyDetails((prev) => ({ ...prev, city, address, country }))
      nextStep()
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      <div
        className="flexCenter"
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          gap: '3rem',
          marginTop: '3rem',
        }}
      >
        {/* Left Side */}
        <div className="flexColStart" style={{ flex: 1 }}>
          {/* inputs */}
          <Select
            w={'100%'}
            withAsterisk
            label="Country"
            clearable
            searchable
            data={getAll()}
            {...form.getInputProps('country', { type: 'input' })}
          />
          <TextInput
            w={'100%'}
            withAsterisk
            label="City"
            {...form.getInputProps('city', { type: 'input' })}
          />
          <TextInput
            w={'100%'}
            withAsterisk
            label="Address"
            {...form.getInputProps('address', { type: 'input' })}
          />

          <Group mt={'2rem'}>
            <Button type="submit">Next Step</Button>
          </Group>
        </div>

        {/* Right SIde */}
        <div style={{ flex: 1 }}>
          <Map address={address} city={city} country={country} />
        </div>
      </div>
    </form>
  )
}

export default AddLocation
