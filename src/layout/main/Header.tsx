import Stack from '@mui/material/Stack';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import { BreadCrumbCom } from './BreadCrumb';
import { IconButton } from '@mui/material';
export function Header() {
    return (
        <Stack
            direction="row"
            sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                maxWidth: { sm: '100%', md: '1700px' },
                // pt: 1.5,
                // px: 1,
            }}
        >
            <BreadCrumbCom />
            <Stack direction="row" sx={{ gap: 1 }}>
                <IconButton>
                    <NotificationsRoundedIcon />
                </IconButton>
            </Stack>
        </Stack>
    );
}