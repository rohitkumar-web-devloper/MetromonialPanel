/* eslint-disable react/prop-types */
import {
  Box,
  IconButton,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface CustomTableTypes {
  columns: { [key: string]: string | null | number | any | unknown }[]
  rows: { [key: string]: string | null | number | any | unknown }[]
  loading?: boolean
}
export function CustomTable({ columns = [], rows = [], loading }: CustomTableTypes) {
  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={{
        maxHeight: `${window.innerHeight - 200}px`,
        overflow: "auto",
        // border:"1px solid lightGrey"
        // ...ScrollBarDesign,
      }}
    >
      <Table stickyHeader aria-label="sticky table" sx={{ borderSpacing: "0" }} >
        <TableHead>
          <TableRow  >
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column?.align || "center"}
                style={{
                  minWidth: column.id == "SI No" ? "80px" : column?.width ? column?.width : "150px",
                  padding: "15px 0px",
                  verticalAlign: "middle"

                }}
              >
                {column.label}
                {
                  column.sort ?
                    <IconButton color="primary" onClick={() => column?.onSort()}>
                      <Box
                        component="img"
                        sx={{ cursor: "pointer" }}
                        onClick={() => column?.onSort()}
                        src={column?.icon}
                      />
                    </IconButton>

                    : null
                }


              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading
            ? rows.map((row, index) => {
              return (
                <TableRow role="checkbox" tabIndex={-1} key={index} >
                  {columns.map((column) => {
                    const value = row[column?.id];
                    return (
                      <TableCell
                        key={column?.id}
                        align={column?.align || "center"}
                        style={{ padding: "15px 0px" }}
                      >
                        {column.renderCell
                          ? column.renderCell(row, index)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })
            : [...Array(5)].map((_, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={"center"}
                    style={{ padding: "15px 10px" }}
                  >
                    <Skeleton />
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
