import { CustomInput, CustomModal, notify } from '@/components'
import { PACAKGE_POST, PACAKGE_PUT } from '@/GraphQl/Mutaion/Packages'
import { SLOT_GET } from '@/GraphQl/Quaries/Slots'
import { ModalControl } from '@/types'
import { useMutation, useQuery } from '@apollo/client'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid2,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  TextField
} from '@mui/material'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import Profile from '../../../assets/profile.png'
const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters long'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters long'),
  price: Yup.number()
    .required('Price is required')
    .positive('Price must be a positive number')
    .min(0, 'Price must be at least 0'),
  credits: Yup.number()
    .required('Credits are required')
    .positive('Credits must be a positive number')
    .min(1, 'Price must be at least 1'),
  // timeSlots: Yup.string()
  //     .required("Time slots are required"),
  type: Yup.string().required('Type is required')
})

export const CreatePackage = ({
  open,
  close,
  editData,
  refetch
}: ModalControl) => {
  const [prevImage, setPrevImage] = useState('')
  const [prevImageFile, setPrevImageFile] = useState<File | null | string>('')
  const [selectSlots, setSelectSlots] = useState([])

  const [createPlan, { loading }] = useMutation(PACAKGE_POST)
  const [updatePlan, { loading: isUpdateLoading }] = useMutation(PACAKGE_PUT)
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
    touched,
    errors
  } = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      credits: '',
      timeSlots: [],
      type: 'normal',
      status: 'true',
      id: ''
    },
    validationSchema,
    onSubmit: async value => {
      let newValue = {
        ...value,
        status: value.status == 'false' ? false : true,
        timeSlots: selectSlots,
        price:+value?.price
      }
      if (!editData) {
        delete newValue.id
        const { errors } = await createPlan({
          variables: { ...newValue, image: prevImageFile  }
        })
        if (errors) {
          return notify(errors.at(-1)?.message)
        }
      } else {
        const { errors } = await updatePlan({
          variables: { ...newValue, image: prevImageFile || undefined }
        })
        if (errors) {
          return notify(errors.at(-1)?.message)
        }
      }

      refetch()
      if(!editData){

        notify('Create Successfully', 'success')
      }else{
        notify('Update Successfully', 'success')

      }
      close()
    }
  })

  useEffect(() => {
    if (editData) {
      setValues({
        name: editData?.name,
        status: String(editData?.status),
        id: +editData?.id,
        description: editData?.description,
        price: editData?.price,
        credits: editData?.credits,
        timeSlots: [],
        type: editData?.type
      })
      setSelectSlots(editData?.timeSlots.map(it => +it?.timeSlotId))
      setPrevImage(editData?.image)
    }
  }, [editData])
  const { data } = useQuery(SLOT_GET)

  const handleStoreData = (checked, data) => {
    setSelectSlots(prev => {
      let update = [...prev]
      if (!checked) {
        update = update.filter(it => it != data?.id)
      } else {
        update = [...update, +data?.id]
      }
      return update
    })
  }
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      const file = files[0]
      const reader = new FileReader()
      setPrevImageFile(file)
      reader.onload = e => {
        if (e.target && e.target.result) {
          const imageData = e.target.result as string
          console.log('Image Data:', imageData)
          setPrevImage(imageData)
        }
      }
      reader.readAsDataURL(file)
    }
  }
  return (
    <CustomModal
      open={open}
      close={close}
      heading={editData ? 'Update Package' : 'Create Package'}
      action={
        <LoadingButton
          loading={loading || isUpdateLoading}
          disabled={loading || isUpdateLoading}
          form='package'
          type='submit'
          variant='contained'
        >
          {editData ? 'Update' : 'Create'}
        </LoadingButton>
      }
    >
      <Box component='form' onSubmit={handleSubmit} id='package'>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 6 }}>
            <Box
              sx={{
                border: '1px dotted lightGrey',
                padding: '10px',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Box
                sx={{ width: '150px', height: '150px', position: 'relative' }}
              >
                {prevImage ? (
                  <img
                    src={prevImage}
                    style={{ width: '100%', height: '100%' }}
                  />
                ) : (
                  <img
                    src={Profile}
                    style={{ width: '100%', height: '100%' }}
                  />
                )}
                <input
                  type='file'
                  onChange={handleImageUpload}
                  style={{
                    position: 'absolute',
                    top: '0px',
                    left: '0',
                    width: '150px',
                    height: '150px',
                    opacity: '0'
                  }}
                />
              </Box>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Stack spacing={2}>
              <CustomInput
                label='Name'
                input={
                  <TextField
                    fullWidth
                    placeholder='Enter Catergory Name.'
                    value={values?.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name='name'
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                }
              />

              <CustomInput
                label='Description'
                input={
                  <TextField
                    fullWidth
                    placeholder='Enter Description.'
                    value={values?.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name='description'
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                  />
                }
              />
            </Stack>
          </Grid2>

          <Grid2 size={{ xs: 12, md: 6 }}>
            <CustomInput
              label='Price'
              input={
                <TextField
                  fullWidth
                  placeholder='Enter Price.'
                  type='number'
                  value={values?.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name='price'
                  error={Boolean(touched.price && errors.price)}
                  helperText={touched.price && errors.price}
                />
              }
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <CustomInput
              label='Credits'
              input={
                <TextField
                  fullWidth
                  placeholder='Enter Credits.'
                  type='number'
                  value={values?.credits}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name='credits'
                  error={Boolean(touched.credits && errors.credits)}
                  helperText={touched.credits && errors.credits}
                />
              }
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 12 }}>
            <CustomInput
              label='Type'
              input={
                <TextField
                  fullWidth
                  placeholder='Enter Credits.'
                  value={values?.type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name='type'
                  error={Boolean(touched.type && errors.type)}
                  helperText={touched.type && errors.type}
                  select
                >
                  <MenuItem value='normal'>Normal</MenuItem>
                  <MenuItem value='premium'>Premium</MenuItem>
                </TextField>
              }
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 12 }}>
            <CustomInput
              label='Choose Slots'
              input={
                <Grid2 container spacing={1}>
                  {data?.timeSlots?.timeSlot?.map(it => {
                    return (
                      <Grid2 size={{ xs: 6, md: 6, lg: 6 }} key={it?.id}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectSlots.includes(+it?.id)}
                              onChange={e =>
                                handleStoreData(e.target.checked, it)
                              }
                            />
                          }
                          label={`${dayjs(it?.startTime).format(
                            'hh:mm A'
                          )}-${dayjs(it?.endTime).format('hh:mm A')}`}
                        />
                      </Grid2>
                    )
                  })}
                </Grid2>
              }
            />
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <FormControl>
              <FormLabel id='demo-row-radio-buttons-group-label'>
                Status
              </FormLabel>
              <RadioGroup
                row
                onChange={handleChange}
                value={values.status}
                name='status'
                aria-labelledby='demo-row-radio-buttons-group-label'
              >
                <FormControlLabel
                  value={String(true)}
                  control={<Radio />}
                  label='Active'
                />
                <FormControlLabel
                  value={String(false)}
                  control={<Radio />}
                  label='Disable'
                />
              </RadioGroup>
            </FormControl>
          </Grid2>
        </Grid2>
      </Box>
    </CustomModal>
  )
}
