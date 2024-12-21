import { CustomInput, CustomModal, notify } from '@/components'
import { CATEGORY_POST, CATEGORY_PUT } from '@/GraphQl/Mutaion/Category';
import { ModalControl } from '@/types'
import { useMutation } from '@apollo/client';
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
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
interface InputValues { name: string, status: string | boolean | null, id?: string, description: string }
export const CreateCategory = ({ open, close, refetch, editData }: CreateCategoryTypes) => {
    const [prevImage, setPrevImage] = useState('')
    const [prevImageFile, setPrevImageFile] = useState<File | null | string>('')
    const [createCategories, { loading }] = useMutation(CATEGORY_POST)
    const [updateCategories, { loading: isUpdateLoading }] = useMutation(CATEGORY_PUT)
    const { values, handleChange, handleSubmit, errors, touched, handleBlur, setValues } = useFormik({
        initialValues: {
            name: "",
            status: "true",
            id: "",
            description: ""
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Name is required')
                .min(3, 'Name must be at least 3 characters long')
                .max(50, 'Name must be less than 50 characters'),
            description: Yup.string()
                .required('Name is required')
                .min(3, 'Description must be at least 3 characters long')
                .max(500, 'Description must be less than 500 characters'),
        }),
        onSubmit: async (value: InputValues) => {
            let newValue: InputValues = { ...value, status: value.status == 'false' ? false : true }
            if (!editData) {
                const { errors } = await createCategories({ variables: { ...newValue, image: prevImageFile} });
                if (errors) {
                    return notify(errors.at(-1)?.message)
                }
            } else {
                newValue = {
                    ...newValue,
                    id: +editData?.id
                }
                const { errors } = await updateCategories({ variables: { ...newValue, image: prevImageFile || undefined  } });
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
                description: editData?.description
            })
            setPrevImage(editData?.image)
        }
    }, [editData])
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

    return (
        <div>
            <CustomModal open={open} close={close} heading={editData ? "Update Category" : 'Create Category'} action={<LoadingButton loading={loading || isUpdateLoading} disabled={loading || isUpdateLoading} form="category" type="submit" variant='contained'>
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
                        <Grid size={{ xs: 12 }}>
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
                                        helperText={touched.name && errors.name} />}
                            />

                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <CustomInput label="Description"
                                input={
                                    <TextField
                                        fullWidth
                                        placeholder='Enter Catergory Name.'
                                        value={values?.description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="description"
                                        error={Boolean(touched.description && errors.description)}
                                        helperText={touched.description && errors.description} />}
                            />

                        </Grid>
                        <Grid size={{ xs: 12 }}>
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
