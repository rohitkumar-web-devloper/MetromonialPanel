import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import { CustomPagination, CustomTable } from '@/components'
import { useEffect, useState } from 'react'
import { useColumns } from './hooks'
import { useModalControl, usePagination } from '@/hooks'
import { useQuery } from '@apollo/client'
import { CITIES_GET } from '@/GraphQl'
import { useParams } from 'react-router-dom'
import { CityCreateModal } from './modals'
const CityPage = () => {
  const { open, handleCloseModal, handleOpenModal } = useModalControl()
  const { id } = useParams()
  const [editData, setEditData] = useState()
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
  const { Cities: columns, handleSearch } = useColumns(setSearch,setEditData,handleOpenModal)
  const { data, loading ,refetch} = useQuery(CITIES_GET, {
    variables: { page, pageSize, filter: { search }, stateId: id }
  })
  useEffect(() => {
    if (data && data.cities) {
      setTotalPages(data.cities.totalPages)
      setTotal_records(data.cities.totalCount)
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
            Cities
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
        <Stack
          direction='row'
          justifyContent='flex-end'
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          <Button
            startIcon={<AddIcon />}
            variant='contained'
            onClick={handleOpenModal}
          >
            Add City
          </Button>
        </Stack>
      </Stack>

      <CustomTable
        columns={columns}
        rows={data?.cities?.cities || []}
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
      {open && <CityCreateModal open={open} close={handleCloseModal} stateId={id} refetch={refetch} editData={editData} />}
    </Box>
  )
}

export { CityPage }
