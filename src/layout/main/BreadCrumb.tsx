import { Breadcrumbs, Typography } from '@mui/material';
import { useMatches } from 'react-router-dom';

export function BreadCrumbCom() {
    const matches = useMatches();

    const breadcrumbs = matches
        .filter(match => match.handle?.crumb) // Filter routes with the `crumb` property
        .map(match => ({
            label: match.handle.crumb(match.data)?.label, // Generate breadcrumb label
            path: match.pathname, // Path for the breadcrumb link
        }));
console.log(breadcrumbs,"breadcrumbs");


    return (
        <div>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                <Typography sx={{ cursor: "pointer", '&:hover': { textDecoration: "underline", color: "lightBlue" } }} >
                    Home
                </Typography>
                <Typography color='primary' >
                    About
                </Typography>
            </Breadcrumbs>
        </div>
    )
}
