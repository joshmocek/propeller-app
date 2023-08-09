import { Box, Divider, Typography } from "@mui/material";

function TableHeader({ columns }) {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        {columns.map((col) => (
          <Typography
            key={`header-${col.headerName}`}
            sx={{ width: col.width }}
          >
            {col.headerName}
          </Typography>
        ))}
      </Box>
      <Divider />
    </>
  );
}

export default TableHeader;
