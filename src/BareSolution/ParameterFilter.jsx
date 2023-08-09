import { TextField } from "@mui/material";

function ParameterFilter({ filterParam, onChange }) {
  return (
    <TextField
      label="Parameter Filter"
      value={filterParam}
      onChange={({ target: { value } }) => onChange(String(value))}
      sx={{ m: 2 }}
    />
  );
}

export default ParameterFilter;
