import { Chip, IconButton } from '@mui/material';
import dayjs from 'dayjs';
import { debounce } from 'lodash'
import EditIcon from '@mui/icons-material/Edit';
export const useCustomer = (setSearch) => {
    const columns = [
        {
            id: "SI No",
            label: "SI No",
            renderCell: (_, index: number) => {
                return index + 1;
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
            id: "From Time",
            label: "From Time",
            renderCell: (rowData: { email: string }) => {
                return rowData?.email
            },
        },
        {
            id: "Till Time.",
            label: "Till Time.",
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
                        <IconButton >
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
