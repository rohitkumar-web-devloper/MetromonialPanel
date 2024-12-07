import { Box, Button, Chip, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { CreateCategory } from "./modals";
import { useModalControl } from "@/hooks";
import { useQuery } from "@apollo/client";
import { Categorys } from "@/GraphQl/Quaries/Category";
import { CustomTable } from "@/components";
import dayjs from "dayjs";
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
export const CategoryPage = () => {
  const { open, handleCloseModal, handleOpenModal } = useModalControl()
  const [editData, setEditData] = useState()
  const { data, loading, refetch } = useQuery(Categorys)
  const columns = [
    {
      id: "SI No",
      label: "SI No",
      renderCell: (_, index) => {
        return index + 1;
      },
    },
    {
      id: "session",
      label: "Name",
      renderCell: (rowData) => {
        return rowData?.name
      },
    },
    {
      id: "Status",
      label: "Created By",
      renderCell: (rowData) => {
        return rowData?.createdByName
      },
    },
    {
      id: "Status",
      label: "Status",
      renderCell: (rowData) => {
        return rowData?.status ? <Chip label="Active" color="success" variant="filled" /> : <Chip label="Disabled" color="error" variant="filled" />
      },
    },
    {
      id: "Created",
      label: "Created",
      width: 250,
      renderCell: (rowData) => dayjs(rowData?.createdAt).format('DD/MM/YYYY hh:mm A'),
    },
    {
      id: "Edited at",
      label: "Edited at",
      renderCell: (rowData) => dayjs(rowData?.updatedAt).format('DD/MM/YYYY hh:mm A'),
    },
    {
      id: "Actions",
      label: "Actions",
      renderCell: (rowData) => {
        return (
          <>
            <IconButton onClick={() => {
              setEditData(rowData);
              handleOpenModal()
            }}>
              <EditIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <Box sx={{ marginTop: "20px" }}>
      <Stack direction='row' gap={2} justifyContent={{ xs: "space-between" }} alignContent="center" marginBottom="40px" flexWrap="wrap">
        <Stack direction='row' spacing={2} alignItems="center">
          <Typography variant="h4" color="primary">Categorys</Typography>
          <TextField fullWidth placeholder="Search..."
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
              // minWidth: "200px", // Ensure the TextField doesn't shrink too much
              flex: "1",         // Allow it to stretch in the row
            }}
          />
        </Stack>
        <Stack direction="row" justifyContent="flex-end" sx={{ width: { xs: "100%", sm: "auto" } }}>
          <Button startIcon={<AddIcon />} variant="contained" onClick={handleOpenModal} >Add Category</Button>
        </Stack>
      </Stack>

      <CustomTable columns={columns} rows={data?.categories || []} loading={loading} />


      {open && <CreateCategory open={open} close={() => { handleCloseModal(); setEditData() }} refetch={refetch} editData={editData} />}
    </Box>
  )
}
