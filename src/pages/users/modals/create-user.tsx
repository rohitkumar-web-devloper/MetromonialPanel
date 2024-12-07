import { CustomInput, CustomModal, notify } from '@/components'
import { CATEGORY_POST, CATEGORY_PUT } from '@/GraphQl/Mutaion/Category';
import { ModalControl } from '@/types'
import { useMutation } from '@apollo/client';
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField } from '@mui/material'
import Grid from '@mui/material/Grid2';
import LoadingButton from '@mui/lab/LoadingButton';
import { useFormik } from 'formik'
import * as Yup from 'yup'; // Import Yup for validation
import { useEffect, useState } from 'react';
import Profile from '../../../assets/profile.png'
interface CreateCategoryTypes extends ModalControl {
    refetch: () => void
    editData: {
        name: string;
        status: string | boolean | null;
        id: string | number | null | never
    }
}
interface InputValues { name: string, status: string | boolean | null, id?: string, mobile: string, email: string, password: string }
export const CreateUsersModal = ({ open, close, refetch, editData }: CreateCategoryTypes) => {
    const [prevImage, setPrevImage] = useState('')
    const [prevImageFile, setPrevImageFile] = useState('')
    const [createCategories, { loading }] = useMutation(CATEGORY_POST)
    const [updateCategories, { loading: isUpdateLoading }] = useMutation(CATEGORY_PUT)
    const handleImageUpload = (event) => {

        const files = event.target.files;

        if (files && files.length > 0) {
            const file = files[0]; // Select the first file
            const reader = new FileReader();
            setPrevImageFile(file)
            reader.onload = (e) => {
                const imageData = e.target.result; // Base64 string of the image
                console.log('Image Data:', imageData); // You can log or use it as needed

                setPrevImage(imageData);
            };

            reader.readAsDataURL(file); // Read the file as a base64 encoded string
        } else {
            console.log('No file selected');
        }

    }
    const { values, handleChange, handleSubmit, errors, touched, handleBlur, setValues } = useFormik({
        initialValues: {
            name: "",
            status: "true",
            mobile: "",
            email: "",
            password: "",
            id: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Name is required')
                .min(3, 'Name must be at least 3 characters long')
                .max(50, 'Name must be less than 50 characters'),
            status: Yup.string()
                .required('Status is required')
                .oneOf(['true', 'false'], 'Status must be either true or false'),
            mobile: Yup.string()
                .required('Mobile number is required')
                .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits'),
            email: Yup.string()
                .required('Email is required')
                .email('Invalid email format'),
            password: Yup.string()
                .required('Password is required')
                .min(8, 'Password must be at least 8 characters long')
                .max(20, 'Password must be less than 20 characters')
                .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
                .matches(/\d/, 'Password must contain at least one number')
                .matches(/[@$!%*?&#]/, 'Password must contain at least one special character (@, $, !, %, *, ?, &, #)'),
        }),
        onSubmit: async (value: InputValues) => {
            let newValue: InputValues = { ...value, status: value.status == 'false' ? false : true }
            if (!editData) {
                const { errors } = await createCategories({ variables: newValue });
                if (errors) {
                    return notify(errors.at(-1)?.message)
                }
            } else {
                newValue = {
                    ...newValue,
                    id: +editData?.id
                }
                const { errors } = await updateCategories({ variables: newValue });
                if (errors) {
                    return notify(errors.at(-1)?.message)
                }
            }
            refetch()
            notify("Create Successfully", "success")
            close()

        }
    })
    // useEffect(() => {
    //     if (editData) {
    //         setValues({
    //             name: editData?.name,
    //             status: String(editData?.status)
    //         })
    //     }
    // }, [editData])
    return (
        <div>
            <CustomModal open={open} close={close} heading={editData ? "Update User" : 'Create User'} action={<LoadingButton loading={loading || isUpdateLoading} disabled={loading || isUpdateLoading} form="category" type="submit" variant='contained'>
                {editData ? "Update" : "Create"}
            </LoadingButton>}>
                <Box component="form" onSubmit={handleSubmit} id='category'>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 6 }}>
                            <Box sx={{ border: "1px dotted lightGrey", padding: "10px", borderRadius: "8px", display: "flex", justifyContent: "center" }}>
                                <Box sx={{ width: "150px", height: "150px", position: "relative" }}>
                                    {
                                        prevImage ?
                                            <img src={prevImage} style={{ width: "100%", height: "100%" }} />
                                            :
                                            <img src={Profile} style={{ width: "100%", height: "100%" }} />

                                    }
                                    <input type='file' onChange={handleImageUpload} style={{ position: "absolute", top: "0px", left: "0", width: "150px", height: "150px", opacity: "0" }} />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Stack spacing={2}>
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
                                <CustomInput label="Mobile"
                                    input={
                                        <TextField
                                            fullWidth
                                            placeholder='Enter Mobile.'
                                            value={values?.mobile}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="mobile"
                                            error={Boolean(touched.mobile && errors.mobile)}
                                            helperText={touched.mobile && errors.mobile} />}
                                />
                            </Stack>

                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <CustomInput label="Email"
                                input={
                                    <TextField
                                        fullWidth
                                        placeholder='Enter Email.'
                                        value={values?.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="email"
                                        error={Boolean(touched.email && errors.email)}
                                        helperText={touched.email && errors.email} />}
                            />

                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <CustomInput label="Password"
                                input={
                                    <TextField
                                        fullWidth
                                        placeholder='Enter Password.'
                                        value={values?.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="password"
                                        error={Boolean(touched.password && errors.password)}
                                        helperText={touched.password && errors.password} />}
                            />

                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
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
