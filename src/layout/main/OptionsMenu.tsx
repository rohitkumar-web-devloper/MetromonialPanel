import * as React from 'react';
import { styled } from '@mui/material/styles';
import { dividerClasses } from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MuiMenuItem from '@mui/material/MenuItem';
import { paperClasses } from '@mui/material/Paper';
import { listClasses } from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon, { listItemIconClasses } from '@mui/material/ListItemIcon';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { MenuButton } from './MenuButton';
import { useModalControl } from '@/hooks';
import { CustomModal, notify } from '@/components';
import { Button, Typography } from '@mui/material';
import { useMutation } from '@apollo/client';
import { LOGOUT_POST } from '@/GraphQl';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { useAuthValidator } from '@/store';
const MenuItem = styled(MuiMenuItem)({
    margin: '2px 0',
});

export function OptionsMenu() {
    const { handleAuthenticate } = useAuthValidator((state: { isAuthenticate: boolean, handleAuthenticate: (value: boolean) => void, handleUserDetails: (value: { [key: string]: string }) => void }) => state)
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const { open: isOpen, handleCloseModal, handleOpenModal } = useModalControl()
    const [logoutUser, { loading }] = useMutation(LOGOUT_POST)
    const handleConfirm = async () => {
        const { errors } = await logoutUser();
        if (errors) {
            return notify(errors.at(-1)?.message)
        }
        handleCloseModal()
        navigate('/login')
        handleAuthenticate(false)
    }
    return (
        <React.Fragment>
            <MenuButton
                aria-label="Open menu"
                onClick={handleClick}
                sx={{ borderColor: 'transparent' }}
            >
                <MoreVertRoundedIcon />
            </MenuButton>
            <Menu
                anchorEl={anchorEl}
                id="menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                sx={{
                    [`& .${listClasses.root}`]: {
                        padding: '4px',
                    },
                    [`& .${paperClasses.root}`]: {
                        padding: 0,
                    },
                    [`& .${dividerClasses.root}`]: {
                        margin: '4px -4px',
                    },
                }}
            >

                <MenuItem
                    // onClick={handleClose}
                    onClick={() => { handleOpenModal(); handleClose() }}
                    sx={{
                        [`& .${listItemIconClasses.root}`]: {
                            ml: 'auto',
                            minWidth: 0,

                        },
                        display: "flex",
                        gap: "10px"
                    }}
                >
                    <ListItemText >Logout</ListItemText>
                    <ListItemIcon>
                        <LogoutRoundedIcon fontSize="small" />
                    </ListItemIcon>
                </MenuItem>
            </Menu>
            {isOpen && <CustomModal open={isOpen} close={handleCloseModal} heading='Logout' size='xs' action={
                <LoadingButton loading={loading} onClick={handleConfirm} disabled={loading} variant="contained" color='error'>Confirm</LoadingButton>
            } >
                <Typography>Are you sure you want to log out?</Typography>
            </CustomModal>}
        </React.Fragment>
    );
}