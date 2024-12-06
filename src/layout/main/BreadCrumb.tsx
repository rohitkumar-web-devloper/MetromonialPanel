import { Breadcrumbs, Typography } from '@mui/material';
import { useLocation, useMatches, useNavigate } from 'react-router-dom';

export function BreadCrumbCom() {
    const matches = useMatches();
    const navigate = useNavigate()
    const location = useLocation()

    const breadcrumbs = matches
        .filter(match => match.handle?.crumb) // Filter routes with the `crumb` property
        .map(match => ({
            label: match.handle.crumb(match.data)?.label, // Generate breadcrumb label
            path: match.pathname, // Path for the breadcrumb link
        }));
    return (
        <div>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                {
                    breadcrumbs.map((item) => {
                        return (
                            <Typography color={location.pathname == item?.path ? 'primary' : "textPrimary"} key={item?.label} sx={{ cursor: "pointer", '&:hover': { textDecoration: "underline", color: "lightBlue" } }} onClick={() => navigate(item?.path)}>
                                {item?.label}
                            </Typography>
                        )
                    })
                }
            </Breadcrumbs>
        </div>
    )
}
