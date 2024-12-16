import { Avatar, Box, Chip, IconButton } from '@mui/material';
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';
import { debounce } from 'lodash'
export function useCategoryColumn(setEditData, handleOpenModal, setSearch) {
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
            renderCell: (rowData: { name: string, image: string }) => {
                return <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Avatar
                        sizes="small"
                        alt={rowData?.name}
                        src={rowData?.image}
                        sx={{ width: 36, height: 36 }}
                    />
                </Box>
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
            id: "Created by",
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
            label: "Created At",
            width: 250,
            renderCell: (rowData) => dayjs(rowData?.createdAt).format('DD/MM/YYYY hh:mm A'),
        },
        {
            id: "Edited at",
            label: "Edited At",
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
    return { columns, handleSearch }
}
