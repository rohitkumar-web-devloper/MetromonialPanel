import { CustomInput, CustomModal, notify } from '@/components'
import { PACAKGE_POST, PACAKGE_PUT } from '@/GraphQl/Mutaion/Packages'
import { ModalControl } from '@/types'
import { useMutation } from '@apollo/client'
import { LoadingButton } from '@mui/lab'
import { Box, FormControl, FormControlLabel, FormLabel, Grid2, MenuItem, Radio, RadioGroup, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import * as Yup from 'yup';
const validationSchema = Yup.object({
    name: Yup.string()
        .required("Name is required")
        .min(3, "Name must be at least 3 characters long"),
    description: Yup.string()
        .required("Description is required")
        .min(10, "Description must be at least 10 characters long"),
    price: Yup.number()
        .required("Price is required")
        .positive("Price must be a positive number")
        .min(1, "Price must be at least 1"),
    credits: Yup.number()
        .required("Credits are required")
        .positive("Credits must be a positive number")
        .min(1, "Price must be at least 1"),
    // timeSlots: Yup.string()
    //     .required("Time slots are required"),
    type: Yup.string().required("Type is required"),
});

export const CreatePackage = ({ open, close, editData, refetch }: ModalControl) => {
    const [createPlan, { loading }] = useMutation(PACAKGE_POST)
    const [updatePlan, { loading: isUpdateLoading }] = useMutation(PACAKGE_PUT)
    const { values, handleBlur, handleChange, handleSubmit, setValues, touched, errors } = useFormik({
        initialValues: {
            name: "",
            description: "",
            price: "",
            credits: "",
            timeSlots: "[]",
            type: "normal",
            status: "true",
            id: ""
        },
        validationSchema,
        onSubmit: async (value) => {
            let newValue = { ...value, status: value.status == 'false' ? false : true }
            if (!editData) {
                delete newValue.id
                const { errors } = await createPlan({ variables: newValue });
                if (errors) {
                    return notify(errors.at(-1)?.message)
                }
            } else {
                const { errors } = await updatePlan({ variables: newValue });
                if (errors) {
                    return notify(errors.at(-1)?.message)
                }
            }

            refetch()
            notify("Create Successfully", "success")
            close()

        }
    })

    useEffect(() => {
        if (editData) {
            setValues({
                name: editData?.name,
                status: String(editData?.status),
                id: editData?.id,
                description: editData?.description,
                price: editData?.price,
                credits: editData?.credits,
                timeSlots: "[]",
                type: editData?.type,
            })
        }
    }, [editData])
    return (
        <CustomModal open={open} close={close} heading={editData ? "Update Package" : 'Create Package'} action={<LoadingButton loading={loading || isUpdateLoading} disabled={loading || isUpdateLoading}  form="package" type="submit" variant='contained'>
            {editData ? "Update" : "Create"}
        </LoadingButton>}>
            <Box component='form' onSubmit={handleSubmit} id="package">
                <Grid2 container spacing={2}>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <CustomInput label="Name"
                            input={
                                <TextField
                                    fullWidth
                                    placeholder='Enter Catergory Name.'
                                    value={values?.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="name"
                                    error={Boolean(touched.name && errors.name)}
                                    helperText={touched.name && errors.name}
                                />

                            }
                        />

                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <CustomInput label="Description"
                            input={
                                <TextField
                                    fullWidth
                                    placeholder='Enter Description.'
                                    value={values?.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="description"
                                    error={Boolean(touched.description && errors.description)}
                                    helperText={touched.description && errors.description}
                                />

                            }
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <CustomInput label="Price"
                            input={
                                <TextField
                                    fullWidth
                                    placeholder='Enter Price.'
                                    type='number'
                                    value={values?.price}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="price"
                                    error={Boolean(touched.price && errors.price)}
                                    helperText={touched.price && errors.price}
                                />

                            }
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <CustomInput label="Credits"
                            input={
                                <TextField
                                    fullWidth
                                    placeholder='Enter Credits.'
                                    type='number'
                                    value={values?.credits}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="credits"
                                    error={Boolean(touched.credits && errors.credits)}
                                    helperText={touched.credits && errors.credits}
                                />

                            }
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 12 }}>
                        <CustomInput label="Type"
                            input={
                                <TextField
                                    fullWidth
                                    placeholder='Enter Credits.'
                                    value={values?.type}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="type"
                                    error={Boolean(touched.type && errors.type)}
                                    helperText={touched.type && errors.type}
                                    select
                                >
                                    <MenuItem value="normal">Normal</MenuItem>
                                    <MenuItem value="premium">Premium</MenuItem>
                                </TextField>

                            }
                        />
                    </Grid2>

                    <Grid2 size={{ xs: 12 }}>
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

                    </Grid2>

                </Grid2>
            </Box>
        </CustomModal>
    )
}
