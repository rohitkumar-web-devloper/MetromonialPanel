
import { Box, Typography } from '@mui/material';
import Logo2 from '../../assets/logo-2.png'

export function SelectContent() {
    return (
        <Box sx={{ width: "100%", textAlign: "center" }}>
            <Box sx={{ height: "80px", width: "100%" }}>
                <img src={Logo2} alt="" style={{ width: "100%", height: '100%' }} />
            </Box>
        </Box>
    );
}