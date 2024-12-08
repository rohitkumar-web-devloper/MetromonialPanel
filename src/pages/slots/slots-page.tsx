import { Box, Button, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useModalControl, usePagination } from '@/hooks';
import { CustomPagination, CustomTable } from '@/components';
import { useSlots } from './hook';
export const SlotsPage = () => {
    const { open, handleCloseModal, handleOpenModal } = useModalControl()
    const { page, page_size: pageSize, setTotalPages, setTotal_records, handlePageSize, total_records, setPage, totalPages } = usePagination()
    const [editData, setEditData] = useState()
    const [search, setSearch] = useState(undefined)
    const { columns, handleSearch } = useSlots(setEditData, handleOpenModal, setSearch)
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
            <CustomTable columns={columns} rows={ []}  />
            <CustomPagination page={page} page_size={pageSize} handlePageSize={handlePageSize} total_records={total_records} totalPages={totalPages} setPage={setPage} />
        </Box>
    )
}
