import { CustomInput, CustomModal, notify } from '@/components'
import { CATEGORY_POST, CATEGORY_PUT } from '@/GraphQl/Mutaion/Category';
import { ModalControl } from '@/types'
import { useMutation } from '@apollo/client';
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import Grid from '@mui/material/Grid2';
import LoadingButton from '@mui/lab/LoadingButton';
import { useFormik } from 'formik'
import * as Yup from 'yup'; // Import Yup for validation
import { useEffect } from 'react';
interface CreateCategoryTypes extends ModalControl {
    refetch: () => void
    editData: {
        name: string;
        status: string | boolean | null;
        id: string | number | null | never
    }
}
interface InputValues { name: string, status: string | boolean | null, id?: string }
export const CreateCategory = ({ open, close, refetch, editData }: CreateCategoryTypes) => {
    const [createCategories, { loading }] = useMutation(CATEGORY_POST)
    const [updateCategories, { loading: isUpdateLoading }] = useMutation(CATEGORY_PUT)
    const { values, handleChange, handleSubmit, errors, touched, handleBlur, setValues } = useFormik({
        initialValues: {
            name: "",
            status: "true",
            id: ""
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Name is required')
                .min(3, 'Name must be at least 3 characters long')
                .max(50, 'Name must be less than 50 characters'),
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
    useEffect(() => {
        if (editData) {
            setValues({
                name: editData?.name,
                status: String(editData?.status)
            })
        }
    }, [editData])
    return (
        <div>
            <CustomModal open={open} close={close} heading={editData ? "Update Category" : 'Create Category'} action={<LoadingButton loading={loading || isUpdateLoading} disabled={loading || isUpdateLoading} form="category" type="submit" variant='contained'>
                {editData ? "Update" : "Create"}
            </LoadingButton>}>
                <Box component="form" onSubmit={handleSubmit} id='category'>
                    <Grid container spacing={2}>
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
