import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";

function SearchBox({ onDataChange }) {
  const [locationId, setLocationId] = useState(() => 1601);
  const search = () => {
    const url = `https://api.openaq.org/v2/measurements?location_id=${Number(
      locationId
    )}`;
    axios.get(url, { timeout: 10000 }).then(function (response) {
      onDataChange(response?.data?.results || []);
    });
  };

  return (
    <Box sx={{ display: "flex", m: 1 }}>
      <TextField
        label="Location Id"
        value={locationId}
        onChange={({ target: { value } }) => setLocationId(Number(value))}
      />
      <Button variant="contained" onClick={search} sx={{ m: 1 }}>
        Search
      </Button>
    </Box>
  );
}

export default SearchBox;
