import { Box, Button, InputAdornment, Stack, TextField, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { CreateUsersModal } from "./modals";
import { useModalControl, usePagination } from "@/hooks";
import { useQuery } from "@apollo/client";
import { CustomPagination, CustomTable } from "@/components";
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { USERS_GET } from "@/GraphQl";
import { useUser } from "./hook";
export const UsersPage = () => {
    const { open, handleCloseModal, handleOpenModal } = useModalControl()
    const [editData, setEditData] = useState()
    const [search, setSearch] = useState('')
    const { page, page_size: pageSize, setTotalPages, setTotal_records, handlePageSize, total_records, setPage, totalPages } = usePagination()
    const { data, loading, refetch } = useQuery(USERS_GET, { variables: { page, pageSize, filter: { } } })
    const { columns, handleSearch } = useUser(setEditData, handleOpenModal, setSearch)
    useEffect(() => {
        if (data && data.users) {
            setTotalPages(data.users.totalPages);
            setTotal_records(data.users.totalCount);
        }
    }, [data]);
    return (
        <Box sx={{ marginTop: "20px" }}>
            <Stack direction='row' gap={2} justifyContent={{ xs: "space-between" }} alignContent="center" marginBottom="40px" flexWrap="wrap">
                <Stack direction='row' spacing={2} alignItems="center">
                    <Typography variant="h4" color="primary">Users</Typography>
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
                    <Button startIcon={<AddIcon />} variant="contained" onClick={handleOpenModal} >Add User</Button>
                </Stack>
            </Stack>

            <CustomTable columns={columns} rows={data?.users?.users || []} loading={loading} />
            <CustomPagination page={page} page_size={pageSize} handlePageSize={handlePageSize} total_records={total_records} totalPages={totalPages} setPage={setPage} />
            {open && <CreateUsersModal open={open} close={() => { handleCloseModal(); setEditData() }} refetch={refetch} editData={editData} />}
        </Box>
    )
}
