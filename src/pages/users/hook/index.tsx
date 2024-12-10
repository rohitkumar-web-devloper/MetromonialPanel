import { Avatar, Box, Chip, IconButton } from '@mui/material';
import dayjs from 'dayjs';
import { debounce } from 'lodash'
import EditIcon from '@mui/icons-material/Edit';
export function useUser(setEditData, handleOpenModal, setSearch) {
    const columns = [
        {
            id: "SI No",
            label: "SI No",
            renderCell: (_, index: number) => {
                return index + 1;
            },
        },
        {
            id: "session",
            label: "Profile",
            renderCell: (rowData: { name: string,profile:string }) => {
                return <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Avatar
                        sizes="small"
                        alt={rowData?.name}
                        src={rowData?.profile}
                        sx={{ width: 36, height: 36 }}
                    />
                </Box>
            },
        },
        {
            id: "Name",
            label: "Name",
            renderCell: (rowData: { name: string }) => {
                return rowData?.name
            },
        },
        {
            id: "Email",
            label: "Email",
            renderCell: (rowData: { email: string }) => {
                return rowData?.email
            },
        },
        {
            id: "Mobile",
            label: "Mobile no.",
            renderCell: (rowData: { mobile: string }) => {
                return rowData?.mobile
            },
        },
        {
            id: "Status",
            label: "Status",
            renderCell: (rowData: { status: boolean }) => {
                return rowData?.status ? <Chip label="Active" color="success" variant="filled" /> : <Chip label="Disabled" color="error" variant="filled" />
            },
        },
        {
            id: "Created",
            label: "Created",
            width: 250,
            renderCell: (rowData: { createdAt: string }) => dayjs(rowData?.createdAt).format('DD/MM/YYYY hh:mm A'),
        },
        {
            id: "Edited at",
            label: "Edited at",
            renderCell: (rowData: { updatedAt: string }) => dayjs(rowData?.updatedAt).format('DD/MM/YYYY hh:mm A'),
        },
        {
            id: "Actions",
            label: "Actions",
            
            renderCell: (rowData: any) => {
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
