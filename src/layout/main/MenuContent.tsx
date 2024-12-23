import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import {  useNavigate } from 'react-router-dom';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import CategoryIcon from '@mui/icons-material/Category';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import FlagIcon from '@mui/icons-material/Flag';
const mainListItems = [
    { text: 'Dasboard', icon: <HomeRoundedIcon />, path: '/' },
    { text: 'Customer list', icon: <InterpreterModeIcon />, path: "customers" },
    { text: 'Packages', icon: <AssignmentRoundedIcon />, path: "packages" },
    { text: 'Category', icon: <CategoryIcon />, path: "category" },
    { text: 'Users', icon: <ManageAccountsIcon />, path: "users" },
    { text: 'Slots', icon: <EventAvailableIcon />, path: "slots" },
    { text: 'State', icon: <FlagIcon />, path: "state" },
];

export function MenuContent() {
    const navigate = useNavigate()
    return (
        <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
            <List dense >
                {mainListItems.map((item, index) => (
                    <ListItem key={index} sx={{ display: 'block', marginBottom: "4px" }} onClick={() => {
                        navigate(item.path);
                        localStorage.setItem('current-path', item?.path)
                    }}>
                        <ListItemButton selected={localStorage.getItem('current-path') === item.path} sx={{ borderRadius: "6px" }}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

        </Stack>
    );
}