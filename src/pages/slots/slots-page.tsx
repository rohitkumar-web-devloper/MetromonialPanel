import { Box, Button, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useModalControl, usePagination } from '@/hooks';
import { CustomPagination, CustomTable } from '@/components';
import { useSlots } from './hook';
import { CreateSlotModal } from './modals';
import { SLOT_GET } from '@/GraphQl/Quaries/Slots';
import { useQuery } from '@apollo/client';
export const SlotsPage = () => {
    const { open, handleCloseModal, handleOpenModal } = useModalControl()
    const { page, page_size: pageSize, setTotalPages, setTotal_records, handlePageSize, total_records, setPage, totalPages } = usePagination()
    const [editData, setEditData] = useState()
    const [search, setSearch] = useState(undefined)
    const { data, loading, refetch } = useQuery(SLOT_GET, { variables: { page, pageSize, filter: { search, pagination: true } } })
    const { columns, handleSearch } = useSlots(setEditData, handleOpenModal, setSearch)

    useEffect(() => {
        if (data && data.timeSlots) {
            setTotalPages(data.timeSlots.totalPages);
            setTotal_records(data.timeSlots.totalCount);
        }
    }, [data]);
    return (
        <Box sx={{ marginTop: "20px" }}>
            <Stack direction='row' gap={2} justifyContent={{ xs: "space-between" }} alignContent="center" marginBottom="40px" flexWrap="wrap">
                <Stack direction='row' spacing={2} alignItems="center">
                    <Typography variant="h4" color="primary">Slots</Typography>
                    <TextField fullWidth placeholder="Search..."
                        onChange={handleSearch}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        sx={{
                            flex: "1",
                        }}
                    />
                </Stack>
                <Stack direction="row" justifyContent="flex-end" sx={{ width: { xs: "100%", sm: "auto" } }}>
                    <Button startIcon={<AddIcon />} variant="contained" onClick={handleOpenModal} >Add Slot</Button>
                </Stack>
            </Stack>
            <CustomTable columns={columns} rows={data?.timeSlots?.timeSlot} loading={loading} />
            <CustomPagination page={page} page_size={pageSize} handlePageSize={handlePageSize} total_records={total_records} totalPages={totalPages} setPage={setPage} />
            {open && <CreateSlotModal open={open} close={() => { handleCloseModal(); setEditData() }} editData={editData} refetch={refetch} />}
        </Box>
    )
}
