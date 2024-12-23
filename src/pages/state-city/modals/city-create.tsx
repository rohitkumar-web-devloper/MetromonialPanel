import { CustomInput, CustomModal, notify } from '@/components'
import { CITY_POST, CITY_PUT } from '@/GraphQl'
import { ModalControl } from '@/types'
import { useMutation } from '@apollo/client'
import { LoadingButton } from '@mui/lab'
import { Grid2, TextField } from '@mui/material'
import { useEffect, useState } from 'react'

interface CityModal extends ModalControl {
  stateId: string
  refetch: () => void
  editData: { [key: string]: string }
}
export function CityCreateModal ({
  open,
  close,
  stateId,
  refetch,
  editData
}: CityModal) {
  const [createCity, { loading }] = useMutation(CITY_POST)
  const [updateCity, { loading: updateLoading }] = useMutation(CITY_PUT)
  const [name, setName] = useState('')
  const handleSubmit = async () => {
    const data = {
      name: name,
      createCityStateId2: stateId
    }
    if (editData) {
      const { errors } = await updateCity({
        variables: { id: +editData?.id, stateId: stateId, name: name }
      })
      if (errors) {
        return notify(errors.at(-1)?.message)
      }
      refetch()
      close()
      notify('Update Successfully', 'success')
      return
    }

    const { errors } = await createCity({
      variables: data
    })
    if (errors) {
      return notify(errors.at(-1)?.message)
    }
    refetch()
    close()
    notify('Create Successfully', 'success')
  }
  useEffect(() => {
    if (editData) {
      setName(editData?.name)
    }
  }, [editData])
  return (
    <div>
      <CustomModal
        open={open}
        heading={editData ? 'Update City' : 'Create City'}
        action={
          <LoadingButton
            variant='contained'
            disabled={loading || updateLoading}
            loading={loading || updateLoading}
            onClick={handleSubmit}
          >
            {editData ? 'Update' : 'Create'}
          </LoadingButton>
        }
        close={close}
      >
        <Grid2 container spacing={1}>
          <Grid2 size={12}>
            <CustomInput
              label='City Name'
              input={
                <TextField
                  fullWidth
                  placeholder='Enter city name'
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              }
            />
          </Grid2>
        </Grid2>
      </CustomModal>
    </div>
  )
}
