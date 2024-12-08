import { Box, Button, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useModalControl, usePagination } from "@/hooks";
import { CreatePackage } from "./modals";
import { PACKAGES_GET } from "@/GraphQl/Quaries/Packages";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { CustomPagination, CustomTable } from "@/components";
import { usePackage } from "./hook";
export const PackagesPage = () => {
  const { open, handleCloseModal, handleOpenModal } = useModalControl()
  const [search, setSearch] = useState(undefined)
  const [editData, setEditData] = useState()
  const { page, page_size: pageSize, setTotalPages, setTotal_records, handlePageSize, total_records, setPage, totalPages } = usePagination()
  const { data, loading, refetch } = useQuery(PACKAGES_GET, { variables: { page, pageSize, filter: { search } } })
  const { columns, handleSearch } = usePackage(setEditData, handleOpenModal, setSearch)
  useEffect(() => {
    if (data && data.plans) {
      setTotalPages(data.plans.totalPages);
      setTotal_records(data.plans.totalCount);
    }
  }, [data]);
  return (
    <Box sx={{ marginTop: "20px" }}>
      <Stack direction='row' gap={2} justifyContent={{ xs: "space-between" }} alignContent="center" marginBottom="40px" flexWrap="wrap">
        <Stack direction='row' spacing={2} alignItems="center">
          <Typography variant="h4" color="primary">Packages</Typography>
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
          <Button startIcon={<AddIcon />} variant="contained" onClick={handleOpenModal} >Add Package</Button>
        </Stack>
      </Stack>
      <CustomTable columns={columns} rows={data?.plans?.plans || []} loading={loading} />
      <CustomPagination page={page} page_size={pageSize} handlePageSize={handlePageSize} total_records={total_records} totalPages={totalPages} setPage={setPage} />

      {
        open && <CreatePackage open={open} close={() => { handleCloseModal(); setEditData() }} refetch={refetch} editData={editData} />
      }
    </Box>
  )
}
