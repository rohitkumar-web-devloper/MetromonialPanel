import { IconButton } from '@mui/material'
import { debounce } from 'lodash'
import EditIcon from '@mui/icons-material/Edit'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
const useColumns = (setSearch,setEditData,handleOpenModal) => {
  const navigate = useNavigate()
  const columns = [
    {
      id: 'SI No',
      label: 'SI No',
      renderCell: (_, index: number) => {
        return index + 1
      }
    },
    {
      id: 'Name',
      label: 'Name',
      renderCell: (rowData: { name: string }) => {
        return rowData?.name
      }
    },
    {
      id: 'Created At',
      label: 'Created At',
      renderCell: (rowData: { createdAt: string }) => {
        return dayjs(rowData?.createdAt).format('DD/MM/YYYY hh:mm A')
      }
    },
    {
      id: 'Actions',
      label: 'Actions',

      renderCell: (rowData: any) => {
        return (
          <>
            <IconButton
             onClick={() => {
                // setEditData(rowData);
                // handleOpenModal()
                navigate(`cities/${rowData?.id}`)

            }}
            >
              <RemoveRedEyeIcon />
            </IconButton>
          </>
        )
      }
    }
  ]
  const Cities = [
    {
      id: 'SI No',
      label: 'SI No',
      renderCell: (_, index: number) => {
        return index + 1
      }
    },
    {
      id: 'Name',
      label: 'Name',
      renderCell: (rowData: { name: string }) => {
        return rowData?.name
      }
    },
    {
      id: 'Created At',
      label: 'Created At',
      renderCell: (rowData: { createdAt: string }) => {
        return dayjs(rowData?.createdAt).format('DD/MM/YYYY hh:mm A')
      }
    },
    {
      id: 'Actions',
      label: 'Actions',

      renderCell: (rowData: any) => {
        return (
          <>
            <IconButton
             onClick={() => {
                setEditData(rowData);
                handleOpenModal()

            }}
            >
              <EditIcon />
            </IconButton>
          </>
        )
      }
    }
  ]

  const handleSearch = debounce(e => {
    setSearch(e.target.value)
  }, 800)
  return { columns, handleSearch,Cities }
}

export { useColumns }
