import { Avatar, Box, Chip, IconButton } from '@mui/material';
import dayjs from 'dayjs';
import { debounce } from 'lodash'
import EditIcon from '@mui/icons-material/Edit';
export function useUser(setEditData, handleOpenModal,setSearch) {
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
            label: "Profile",
            renderCell: (rowData) => {
                return <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Avatar
                        sizes="small"
                        alt={rowData?.name}
                        src="/static/images/avatar/7.jpg"
                        sx={{ width: 36, height: 36 }}
                    />
                </Box>
            },
        },
        {
            id: "Name",
            label: "Name",
            renderCell: (rowData) => {
                return rowData?.name
            },
        },
        {
            id: "Email",
            label: "Email",
            renderCell: (rowData) => {
                return rowData?.email
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
    const handleSearch = debounce((e) => {
        setSearch(e.target.value)
      }, 800)
    return { columns ,handleSearch}
}
