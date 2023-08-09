import { Button } from "@mui/material";

function TimestampSortButton({ onClick, isAsc }) {
  const title = `Sort Timestamp ${isAsc ? "DESC" : "ASC"}`;
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{ m: 2 }}
      data-testid={title}
    >
      {title}
    </Button>
  );
}

export default TimestampSortButton;
