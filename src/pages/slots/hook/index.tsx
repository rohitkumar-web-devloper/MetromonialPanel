import { Chip, IconButton } from '@mui/material';
import dayjs from 'dayjs';
import { debounce } from 'lodash'
import EditIcon from '@mui/icons-material/Edit';

export const useSlots = (setEditData, handleOpenModal, setSearch) => {
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
            renderCell: (rowData: { startTime: string }) => {
                return dayjs(rowData?.startTime).format('hh:mm A')
            },
        },
        {
            id: "Till Time.",
            label: "Till Time.",
            renderCell: (rowData: { endTime: string }) => {
                return dayjs(rowData?.endTime).format('hh:mm A')
            },
        },
        {
            id: "createdByName",
            label: "Created By.",
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
            label: "Created At",
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
