import { Box, Chip, Grid2, Paper, Skeleton, Stack, Typography } from '@mui/material'
import { useQuery } from '@apollo/client';
import { CUSTOMERS_DETAILS_GET } from '@/GraphQl';
import { useParams } from 'react-router-dom';

export const CustomerDetails = () => {
    const { id } = useParams()
    const { data, loading } = useQuery(CUSTOMERS_DETAILS_GET, { variables: { createdById: +id } })
    return (
        <Box sx={{ marginTop: "20px" }}>
            <Stack direction='row' gap={2} justifyContent={{ xs: "space-between" }} alignContent="center" marginBottom="40px" flexWrap="wrap">
                <Stack direction='row' spacing={2} alignItems="center">
                    <Typography variant="h4" color="primary">Customers Details</Typography>
                </Stack>
            </Stack>

            {loading && <Grid2 container spacing={2}>
                <Grid2 size={12} >
                    <Skeleton variant="rectangular" width={'100%'} height={150} />
                </Grid2>
                <Grid2 size={12} >
                    <Skeleton variant="rectangular" width={'100%'} height={150} />
                </Grid2>
                <Grid2 size={12} >
                    <Skeleton variant="rectangular" width={'100%'} height={150} />
                </Grid2>
                <Grid2 size={12} >
                    <Skeleton variant="rectangular" width={'100%'} height={150} />
                </Grid2>
            </Grid2>}
            <Grid2 container spacing={2}>
                {
                    data && data?.ads.map((it, index) => {
                        return (
                            <Grid2 size={12} key={it?.id}>
                                <Paper sx={{ padding: "10px", }}>
                                    <Typography variant="h5" color='primary' >Ads {index + 1}</Typography>
                                    <Stack direction="row" gap={1} flexWrap="wrap" marginTop={1} justifyContent="center">
                                        {
                                            JSON.parse(it?.profile[0]).map((item) => {
                                                return (
                                                    <div style={{ width: "200px", height: "200px", borderRadius: "10px" }}>
                                                        <img src={item} style={{ width: "100%", height: "100%", overflow: "hidden" }} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </Stack>
                                    <Box marginTop="10px">
                                        <Typography variant="h6">
                                            Title : {it?.title}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            Description :  {it?.description}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            Type :  {it?.planType}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            Customer Name  :    {it?.createdByName}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            Email  :    {it?.email}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            Mobile Number  :    {it?.mobileNumber}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            Age :    {it?.age}
                                        </Typography>


                                        <Typography variant="subtitle2">
                                            Address  :    {it?.address}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            Body Type  :    {it?.bodyType}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            Nationality :    {it?.nationality}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            Breast  :    {it?.breast}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            State  :    {it?.state}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            City  :    {it?.city}
                                        </Typography>

                                        <Typography variant="subtitle2">
                                            Ethnicity  :    {it?.ethnicity}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            Hair  :    {it?.hair}
                                        </Typography>



                                        {/* <Typography variant="subtitle2">
                                            Slot Start Time  :    {dayjs(it?.startTime).format()}
                                        </Typography> */}
                                        <Typography variant="subtitle2">
                                            Price :    ₹ {it?.pricePerHour} Per hour
                                        </Typography>
                                        <Typography variant="h6" color='primary'>
                                            AttentionTo
                                        </Typography>
                                        <Stack direction="row" gap={1} flexWrap="wrap">

                                            {
                                                it.attentionTo.map((item) => {
                                                    return (
                                                        <Chip label={item?.name} key={item?.name} color="primary" />
                                                    )
                                                })
                                            }
                                        </Stack>
                                        <Typography variant="h6" color='primary'>
                                            Place Of Services
                                        </Typography>
                                        <Stack direction="row" gap={1} flexWrap="wrap">

                                            {
                                                it.placeOfServices.map((item) => {
                                                    return (
                                                        <Chip label={item?.name} key={item?.name} color="primary" />
                                                    )
                                                })
                                            }
                                        </Stack>
                                        <Typography variant="h6" color='primary'>
                                            Services
                                        </Typography>
                                        <Stack direction="row" gap={1} flexWrap="wrap">

                                            {
                                                it.services.map((item) => {
                                                    return (
                                                        <Chip label={item?.name} key={item?.name} color="primary" />
                                                    )
                                                })
                                            }
                                        </Stack>
                                        <Typography variant="h6" color='primary'>
                                            Payment Method
                                        </Typography>
                                        <Stack direction="row" gap={1} flexWrap="wrap">

                                            {
                                                JSON.parse(it.paymentMethod[0]).map((item) => {
                                                    return (
                                                        <Chip label={item} key={item} color="primary" />
                                                    )
                                                })
                                            }
                                        </Stack>
                                    </Box>

                                </Paper>

                            </Grid2>
                        )
                    })
                }


            </Grid2>
        </Box>
    )
}
