/* eslint-disable react/prop-types */
import { FormHelperText, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
interface CustomInputTyes {
    label: string
    helperText?: string
    input: React.ReactNode
    required?: boolean
    textSx?: { [key: string]: string }
    helperColor?: string
    textAlign?: string


}
const CustomInput = ({ label, input, required, textSx = {}, helperText, textAlign, helperColor }: CustomInputTyes) => (
    <Grid container spacing={.8}>
        <Grid size={12}>
            <Typography variant="subtitle2" sx={{ display: "flex", marginBottom: "2px", ...textSx }}>{label}  {required && <Typography variant="subtitle2" color='error'>*</Typography>}</Typography>
        </Grid>
        <Grid size={12}>
            {input}
            {helperText && <FormHelperText sx={{ fontSize: "14px", fontWeight: 400, textAlign: textAlign || "start", color: helperColor || '' }}>{helperText}</FormHelperText>}
        </Grid>
    </Grid >
);

export { CustomInput }