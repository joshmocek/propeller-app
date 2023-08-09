import { useState } from "react";
import { Box } from "@mui/material";
import SearchBox from "../Components/SearchBox";
import { DataGrid } from "@mui/x-data-grid";
import DataDialog from "../Components/DataDialog";

const columns = [
  { field: "dateLocal", headerName: "Timestamp", width: 250 },
  { field: "parameter", headerName: "Parameter", width: 130 },
  { field: "value", headerName: "Value", width: 130 },
  {
    field: "unit",
    headerName: "Unit",
    type: "number",
    width: 130,
  },
];

function MaterialSolution() {
  const [apiData, setApiData] = useState([]);
  const [selectedData, setSelectedData] = useState(() => null);
  const [open, setOpen] = useState(() => false);

  const onDataChange = (data) => {
    setApiData(
      data.map((d, index) => {
        d.id = index;
        d.dateLocal = d?.date?.local;
        return d;
      })
    );
  };
  return (
    <Box>
      <SearchBox onDataChange={onDataChange} />
      <DataGrid
        rows={apiData}
        columns={columns}
        onRowClick={(d) => {
          setSelectedData(d.row);
          setOpen(true);
        }}
      />
      <DataDialog
        open={open && selectedData !== null}
        onClose={() => {
          setSelectedData(null);
          setOpen(false);
        }}
        data={selectedData}
      />
    </Box>
  );
}

export default MaterialSolution;
