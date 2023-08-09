import { Box, Divider, Typography } from "@mui/material";

function TableRow({ columns, onClick, data, index }) {
  return (
    <>
      <Box
        sx={{ display: "flex", mt: 1, cursor: "pointer" }}
        onClick={onClick}
        data-testid="table-row"
      >
        {columns.map((col) => (
          <Box
            key={`row-${col.headerName}-${index}`}
            sx={{ display: "flex", width: col.width }}
          >
            <Typography sx={{ width: col.width }}>{data[col.field]}</Typography>
          </Box>
        ))}
      </Box>
      <Divider />
    </>
  );
}

export default TableRow;
