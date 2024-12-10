import { CustomInput, CustomModal, notify } from '@/components'
import { ModalControl } from '@/types'
import { useMutation } from '@apollo/client';
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField } from '@mui/material'
import Grid from '@mui/material/Grid2';
import LoadingButton from '@mui/lab/LoadingButton';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useEffect } from 'react';
import { TimePicker } from '@mui/x-date-pickers';
import { SLOT_POST, SLOT_PUT } from '@/GraphQl/Mutaion/Slots';
import dayjs from 'dayjs';

interface InputValues { name: string, status: string | boolean | null, id?: string | number, startTime: string, endTime: string }
interface CreateSLotsTypes extends ModalControl {
    refetch?: () => void
    editData?: {
        name: string;
        status: string | boolean | null;
        id?: string | number | never,
        startTime: string
        endTime: string

    }
}
export const CreateSlotModal = ({ open, close, refetch, editData }: CreateSLotsTypes) => {
    const [createTimeSlot, { loading }] = useMutation(SLOT_POST)
    const [updateTimeSlot, { loading: isUpdateLoading }] = useMutation(SLOT_PUT)

    const { values, handleChange, handleSubmit, errors, touched, handleBlur, setValues, setFieldValue } = useFormik({
        initialValues: {
            name: "",
            status: "true",
            id: "",
            startTime: "",
            endTime: ""

        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Name is required')
                .min(3, 'Name must be at least 3 characters long')
                .max(50, 'Name must be less than 50 characters'),
            status: Yup.string()
                .required('Status is required')
                .oneOf(['true', 'false'], 'Status must be either true or false'),

        }),
        onSubmit: async (value: InputValues) => {
            try {
                let newValue: InputValues = { ...value, status: value.status == 'false' ? false : true }
                if (!editData) {

                    delete newValue.id

                    const { errors } = await createTimeSlot({
                        variables: {
                            ...newValue,
                        }
                    });
                    if (errors) {
                        return notify(errors.at(-1)?.message)
                    }
                } else {
                    newValue = {
                        ...newValue,
                        id: +editData?.id
                    }
                    const { errors } = await updateTimeSlot({ variables: newValue });
                    if (errors) {
                        return notify(errors.at(-1)?.message)
                    }
                }
                if (refetch) {
                    refetch()
                }
                notify("Create Successfully", "success")
                close()
            } catch (err) {
                console.log(err);
                notify(err?.message, "error")
            }

        }
    })
    useEffect(() => {
        if (editData) {
            setValues({
                name: editData?.name,
                status: String(editData?.status),
                id: editData?.id,
                startTime: editData?.startTime,
                endTime: editData?.endTime
            })
        }
    }, [editData])
    return (
        <div>
            <CustomModal open={open} close={close} heading={editData ? "Update Slot" : 'Create Slot'} action={<LoadingButton loading={loading || isUpdateLoading} disabled={loading || isUpdateLoading} form="category" type="submit" variant='contained'>
                {editData ? "Update" : "Create"}
            </LoadingButton>}>
                <Box component="form" onSubmit={handleSubmit} id='category'>
                    <Grid container spacing={2}>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <CustomInput label="Name"
                                input={
                                    <TextField
                                        fullWidth
                                        placeholder='Enter Name.'
                                        value={values?.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="name"
                                        error={Boolean(touched.name && errors.name)}
                                        helperText={touched.name && errors.name} />}
                            />


                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <CustomInput label="Start Time"
                                input={
                                    <TimePicker
                                        value={values.startTime ? dayjs(values.startTime) : null}
                                        onChange={(e) => {
                                            setFieldValue('startTime', dayjs(e).format())
                                        }}
                                    />
                                }
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <CustomInput label="End Time"
                                input={
                                    <TimePicker
                                        value={values.endTime ? dayjs(values.endTime) : null}
                                        onChange={(e) => {
                                            setFieldValue('endTime', dayjs(e).format())
                                        }}
                                    />
                                }
                            />
                        </Grid>


                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
                                <RadioGroup
                                    row
                                    onChange={handleChange}
                                    value={values.status}
                                    name="status"
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                >
                                    <FormControlLabel value={String(true)} control={<Radio />} label="Active" />
                                    <FormControlLabel value={String(false)} control={<Radio />} label="Disable" />
                                </RadioGroup>
                            </FormControl>

                        </Grid>

                    </Grid>
                </Box>
            </CustomModal>
        </div>
    )
}
