import { Box, Button, InputAdornment, Stack, TextField, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { CreateCategory } from "./modals";
import { useModalControl, usePagination } from "@/hooks";
import { useQuery } from "@apollo/client";
import { Categorys } from "@/GraphQl/Quaries/Category";
import { CustomPagination, CustomTable } from "@/components";
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { useCategoryColumn } from "./hook";
export const CategoryPage = () => {
  const { open, handleCloseModal, handleOpenModal } = useModalControl()
  const [editData, setEditData] = useState()
  const [search, setSearch] = useState('')
  const { page, page_size: pageSize, setTotalPages, setTotal_records, handlePageSize, total_records, setPage, totalPages } = usePagination()
  const { data, loading, refetch } = useQuery(Categorys, { variables: { page, pageSize, filter: { name: search } } })
  const { columns, handleSearch } = useCategoryColumn(setEditData, handleOpenModal, setSearch)

  useEffect(() => {
    if (data && data.categories) {
      setTotalPages(data.categories.totalPages);
      setTotal_records(data.categories.totalCount);
    }
  }, [data]);

  return (
    <Box sx={{ marginTop: "20px" }}>
      <Stack direction='row' gap={2} justifyContent={{ xs: "space-between" }} alignContent="center" marginBottom="40px" flexWrap="wrap">
        <Stack direction='row' spacing={2} alignItems="center">
          <Typography variant="h4" color="primary">Categorys</Typography>
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
          <Button startIcon={<AddIcon />} variant="contained" onClick={handleOpenModal} >Add Category</Button>
        </Stack>
      </Stack>
      <CustomTable columns={columns} rows={data?.categories?.categories || []} loading={loading} />
      <CustomPagination page={page} page_size={pageSize} handlePageSize={handlePageSize} total_records={total_records} totalPages={totalPages} setPage={setPage} />
      {open && <CreateCategory open={open} close={() => { handleCloseModal(); setEditData() }} refetch={refetch} editData={editData} />}
    </Box>
  )
}
