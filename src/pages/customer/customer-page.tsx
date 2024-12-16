import { CustomPagination, CustomTable } from '@/components'
import { Box, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { usePagination } from '@/hooks';
import { useCustomer } from './hook';
import { useQuery } from '@apollo/client';
import { CUSTOMERS_GET } from '@/GraphQl';

export const CustomerPage = () => {
  const { page, page_size: pageSize, setTotalPages, setTotal_records, handlePageSize, total_records, setPage, totalPages } = usePagination()
  const [search, setSearch] = useState(undefined)
  const { columns, handleSearch } = useCustomer(setSearch)
  const { data, loading, refetch } = useQuery(CUSTOMERS_GET, { variables: { page, pageSize, filter: { search } } })
  // CUSTOMERS_GET
  useEffect(() => {
    if (data && data.customers) {
      setTotalPages(data.customers.totalPages);
      setTotal_records(data.customers.totalCount);
    }
  }, [data]);
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
      <CustomTable columns={columns} rows={data?.customers?.customers || []} />
      <CustomPagination page={page} page_size={pageSize} handlePageSize={handlePageSize} total_records={total_records} totalPages={totalPages} setPage={setPage} />
    </Box>
  )
}
