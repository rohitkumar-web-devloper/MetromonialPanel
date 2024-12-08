
import { Avatar, Box, Chip, IconButton } from '@mui/material';
import dayjs from 'dayjs';
import { debounce } from 'lodash'
import EditIcon from '@mui/icons-material/Edit';
export function usePackage(setEditData, handleOpenModal, setSearch) {
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
            label: "Image",
            renderCell: (rowData: { name: string }) => {
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
            renderCell: (rowData: { name: string }) => {
                return rowData?.name
            },
        },
        {
            id: "Description",
            label: "Description",
            renderCell: (rowData: { description: string }) => {
                return rowData?.description
            },
        },
        {
            id: "Price",
            label: "Price",
            renderCell: (rowData: { price: number }) => {
                return rowData?.price
            },
        },
        {
            id: "credits",
            label: "Credits",
            renderCell: (rowData: { credits: number }) => {
                return rowData?.credits
            },
        },
        {
            id: "Type",
            label: "Type",
            renderCell: (rowData: { type: string }) => {
                return rowData?.type == 'normal' ? "Normal" : "Premium"
            },
        },
        {
            id: "Slots",
            label: "Slots",
            renderCell: (rowData: { timeSlots: string }) => {
                return rowData?.timeSlots ? JSON.parse(rowData?.timeSlots)?.length : 0
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
