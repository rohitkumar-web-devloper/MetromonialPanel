import { CustomInput, CustomModal, notify } from '@/components'
import { ModalControl } from '@/types'
import { useMutation } from '@apollo/client';
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField } from '@mui/material'
import Grid from '@mui/material/Grid2';
import LoadingButton from '@mui/lab/LoadingButton';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import Profile from '../../../assets/profile.png'
import { USER_POST, USER_PUT } from '@/GraphQl';
import { useAuthValidator } from '@/store';

interface InputValues { name: string, status: string | boolean | null, id?: string | number, mobile: string | null, email: string, password?: string, profile: string }
interface CreateCategoryTypes extends ModalControl, InputValues {
    refetch: () => void
    isProfile: boolean;
    editData: {
        profile?: string;
        mobile: string | null;
        email: string;
        name: string;
        status: string | boolean | null;
        id: string | number | never
    }
}
export const CreateUsersModal = ({ open, close, refetch, editData, isProfile }: CreateCategoryTypes) => {
    const { handleUserDetails } = useAuthValidator((state: { isAuthenticate: boolean, handleAuthenticate: (value: boolean) => void, handleUserDetails: (value: { [key: string]: string }) => void }) => state)
    const [prevImage, setPrevImage] = useState('')
    const [prevImageFile, setPrevImageFile] = useState<File | null | string>('')
    const [createUser, { loading }] = useMutation(USER_POST)
    const [updateUser, { loading: isUpdateLoading }] = useMutation(USER_PUT)
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            setPrevImageFile(file)
            reader.onload = (e) => {
                if (e.target && e.target.result) {
                    const imageData = e.target.result as string
                    setPrevImage(imageData);
                }
            };
            reader.readAsDataURL(file);
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
            profile: ""
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
        }),
        onSubmit: async (value: InputValues) => {
            try {
                let newValue: InputValues = { ...value, status: value.status == 'false' ? false : true }
                if (!editData) {

                    delete newValue.id

                    const { errors } = await createUser({
                        variables: {
                            ...newValue,
                            profile: prevImageFile
                        }
                    });
                    if (errors) {
                        return notify(errors.at(-1)?.message)
                    }
                    notify("Update Successfully", "success")
                } else {
                    newValue = {
                        ...newValue,
                        id: +editData?.id
                    }
                    const { data, errors } = await updateUser({
                        variables: {
                            ...newValue,
                            profile: prevImageFile || undefined
                        }
                    });
                    if (errors) {
                        return notify(errors.at(-1)?.message)
                    }
                    if (isProfile) {
                        handleUserDetails(data?.updateUser)
                    }

                    notify("Create Successfully", "success")
                }
                if (refetch) {
                    refetch()
                }
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
                mobile: editData?.mobile,
                email: editData?.email,
                password: '',
                id: editData?.id,
            })
            setPrevImage(editData?.profile)
        }
    }, [editData])
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
