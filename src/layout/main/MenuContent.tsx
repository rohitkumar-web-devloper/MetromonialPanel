import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';

const mainListItems = [
    { text: 'Dasboard', icon: <HomeRoundedIcon />, path: '/' },
    { text: 'Customer list', icon: <AnalyticsRoundedIcon /> },
    { text: 'Packages', icon: <AssignmentRoundedIcon /> },
    { text: 'Category', icon: <AssignmentRoundedIcon /> },
];

export function MenuContent() {
    return (
        <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
            <List dense >
                {mainListItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ display: 'block', marginBottom: "4px" }}>
                        <ListItemButton selected={index === 0} sx={{ borderRadius: "6px" }}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

        </Stack>
    );
}