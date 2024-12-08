import { CustomPagination, CustomTable } from '@/components'
import { Box, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { usePagination } from '@/hooks';
import { useCustomer } from './hook';

export const CustomerPage = () => {
  const { page, page_size: pageSize, setTotalPages, setTotal_records, handlePageSize, total_records, setPage, totalPages } = usePagination()
  const [search, setSearch] = useState(undefined)
  const { columns, handleSearch } = useCustomer(setSearch)
  return (
    <Box sx={{ marginTop: "20px" }}>
      <Stack direction='row' gap={2} justifyContent={{ xs: "space-between" }} alignContent="center" marginBottom="40px" flexWrap="wrap">
        <Stack direction='row' spacing={2} alignItems="center">
          <Typography variant="h4" color="primary">Customers</Typography>
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
      </Stack>
      <CustomTable columns={columns} rows={[]} />
      <CustomPagination page={page} page_size={pageSize} handlePageSize={handlePageSize} total_records={total_records} totalPages={totalPages} setPage={setPage} />
    </Box>
  )
}
