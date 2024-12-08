
import { Box, Typography } from '@mui/material';
import Logo from '../../assets/logo-1.svg'

export function SelectContent() {
    return (
        <Box sx={{ width: "100%", textAlign: "center" }}>
            {/* <Typography variant="h4" color='primary' >Admin Panel</Typography> */}
            <Box sx={{ height: "80px", width: "100%" }}>
                <img src={Logo} alt="" style={{ width: "100%", height: '100%' }} />
            </Box>
        </Box>
    );
}