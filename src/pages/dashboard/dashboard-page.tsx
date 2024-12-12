import { DASHBAORD_GET } from '@/GraphQl'
import { useQuery } from '@apollo/client'
import { Card, Grid2, IconButton, Stack, Typography } from '@mui/material'
import FastForwardIcon from '@mui/icons-material/FastForward';
const DashboardPage = () => {
    const { data } = useQuery(DASHBAORD_GET)
    console.log(data?.dashboard);

    return (
        <div>
            <Stack direction='row' gap={2} justifyContent={{ xs: "space-between" }} alignContent="center" marginBottom="40px" flexWrap="wrap">
                <Stack direction='row' spacing={2} alignItems="center">
                    <Typography variant="h4" color="primary">Dashboard Page</Typography>

                </Stack>

            </Stack>
            <Grid2 container spacing={2}>
                {
                    data?.dashboard && Object.keys(data?.dashboard).map((it) => {
                        if (it == '__typename') {
                            return
                        }
                        return (
                            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={it}>
                                <Card variant="outlined" sx={{ height: "140px", padding: "10px", display: "flex", flexDirection: "column", gap: "30px" }} >
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <IconButton color='primary'>
                                            <FastForwardIcon />
                                        </IconButton>
                                        <Typography variant="h2" color="primary" sx={{ fontSize: "22px" }}>{it}</Typography>
                                    </Stack>
                                    <Typography variant="h3" >{[data?.dashboard?.[it]]}</Typography>
                                </Card>

                            </Grid2>
                        )
                    })
                }

            </Grid2>
        </div>
    )
}

export { DashboardPage } 
