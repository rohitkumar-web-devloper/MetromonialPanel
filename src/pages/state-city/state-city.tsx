import {
  Box,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { CustomPagination, CustomTable } from '@/components'
import { useEffect, useState } from 'react'
import { useColumns } from './hooks'
import { usePagination } from '@/hooks'
import { useQuery } from '@apollo/client'
import { STATES_GET } from '@/GraphQl'
const StateCityPage = () => {
  const {
    page,
    page_size: pageSize,
    setTotalPages,
    setTotal_records,
    handlePageSize,
    total_records,
    setPage,
    totalPages
  } = usePagination()
  const [search, setSearch] = useState(undefined)
  const { columns, handleSearch } = useColumns(setSearch)
  const { data, loading } = useQuery(STATES_GET, {
    variables: { page, pageSize, filter: { search } }
  })
  useEffect(() => {
    if (data && data.states) {
      setTotalPages(data.states.totalPages)
      setTotal_records(data.states.totalCount)
    }
  }, [data])

  return (
    <Box sx={{ marginTop: '20px' }}>
      <Stack
        direction='row'
        gap={2}
        justifyContent={{ xs: 'space-between' }}
        alignContent='center'
        marginBottom='40px'
        flexWrap='wrap'
      >
        <Stack direction='row' spacing={2} alignItems='center'>
          <Typography variant='h4' color='primary'>
            States
          </Typography>
          <TextField
            fullWidth
            placeholder='Search...'
            onChange={handleSearch}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                )
              }
            }}
            sx={{
              flex: '1'
            }}
          />
        </Stack>
      </Stack>

      <CustomTable
        columns={columns}
        rows={data?.states?.states || []}
        loading={loading}
      />
      <CustomPagination
        page={page}
        page_size={pageSize}
        handlePageSize={handlePageSize}
        total_records={total_records}
        totalPages={totalPages}
        setPage={setPage}
      />
    </Box>
  )
}

export { StateCityPage }
