import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { MenuContent } from './MenuContent';
import { useAuthValidator } from '@/store';
import { CustomModal, notify } from '@/components';
import { LoadingButton } from '@mui/lab';
import { useModalControl } from '@/hooks';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGOUT_POST } from '@/GraphQl';
import { CreateUsersModal } from '@/pages/users/modals';

interface SideMenuMobileProps {
    open: boolean | undefined;
    toggleDrawer: (newOpen: boolean) => () => void;
}

export function SideMenuMobile({ open, toggleDrawer }: SideMenuMobileProps) {
    const navigate = useNavigate()
    const { handleAuthenticate, user } = useAuthValidator((state: { isAuthenticate: boolean, handleAuthenticate: (value: boolean) => void, handleUserDetails: (value: { [key: string]: string }) => void }) => state)
    const { open: isOpen, handleCloseModal, handleOpenModal } = useModalControl()
    const { open: isOpenProfile, handleCloseModal: handleCloseProfileModal, handleOpenModal: handleOpenProfileModal } = useModalControl()
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
        <Drawer
            anchor="right"
            open={open}
            onClose={toggleDrawer(false)}
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                [`& .${drawerClasses.paper}`]: {
                    backgroundImage: 'none',
                    backgroundColor: 'background.paper',
                },
            }}
        >
            <Stack
                sx={{
                    maxWidth: '100dvw',
                    height: '100%',
                }}
            >
                <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1, width: "250px" }}>
                    <Stack
                        direction="row"
                        sx={{ gap: 1, alignItems: 'center', flexGrow: 1, p: 1 ,cursor:"pointer"}}
                        onClick={handleOpenProfileModal}
                    >
                        <Avatar
                            sizes="small"
                            alt={user?.name}
                            src={user.profile}
                            sx={{ width: 24, height: 24 }}
                        />
                        <Typography component="p" variant="h6">
                            {user?.name}
                        </Typography>
                    </Stack>
                </Stack>
                <Divider />
                <Stack sx={{ flexGrow: 1 }}>
                    <MenuContent />
                    <Divider />
                </Stack>
                <Stack sx={{ p: 2 }}>
                    <Button variant="outlined" fullWidth startIcon={<LogoutRoundedIcon />}
                        onClick={() => { handleOpenModal(); }}
                    >
                        Logout
                    </Button>
                </Stack>
            </Stack>
            {isOpen && <CustomModal open={isOpen} close={handleCloseModal} heading='Logout' size='xs' action={
                <LoadingButton loading={loading} onClick={handleConfirm} disabled={loading} variant="contained" color='error'>Confirm</LoadingButton>
            } >
                <Typography>Are you sure you want to log out?</Typography>
            </CustomModal>}
            {isOpenProfile && <CreateUsersModal open={isOpenProfile} close={() => { handleCloseProfileModal(); }} editData={user} isProfile={true} />}
        </Drawer>
    );
}