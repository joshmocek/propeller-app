import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import SearchBox from "../Components/SearchBox";
import DataDialog from "../Components/DataDialog";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TimestampSortButton from "./TimestampSortButton";
import ParameterFilter from "./ParameterFilter";

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

function BareSolution() {
  const [apiData, setApiData] = useState(() => []);
  const [filteredData, setFilteredData] = useState(() => []);
  const [selectedData, setSelectedData] = useState(() => null);
  const [open, setOpen] = useState(() => false);
  const [isAsc, setIsAsc] = useState(() => true);
  const [filterParam, setFilterParam] = useState(() => "");

  const onDataChange = (data) => {
    setApiData(
      data.map((d, index) => {
        d.id = index;
        d.dateLocal = d?.date?.local;
        return d;
      })
    );
  };

  const filterAndSort = () => {
    let results = apiData.slice(); // Create a copy of the results array

    results.sort((a, b) => {
      const timestampA = new Date(a.date.utc).getTime();
      const timestampB = new Date(b.date.utc).getTime();

      if (isAsc) {
        return timestampA - timestampB;
      } else {
        return timestampB - timestampA;
      }
    });
    if (filterParam) {
      results = results.filter((item) => item.parameter === filterParam);
    }
    return results;
  };

  useEffect(() => {
    let newData = filterAndSort();
    setFilteredData(newData);
  }, [apiData, filterParam, isAsc]);

  return (
    <Box>
      <SearchBox onDataChange={onDataChange} />
      <Box>
        <Box sx={{ display: "flex", m: 1 }}>
          <TimestampSortButton isAsc={isAsc} onClick={() => setIsAsc(!isAsc)} />
          <ParameterFilter
            filterParam={filterParam}
            onChange={setFilterParam}
          />
        </Box>
        <TableHeader columns={columns} />
        {filteredData.map((data, index) => {
          return (
            <TableRow
              key={`bare-row-${index}`}
              columns={columns}
              onClick={() => {
                setSelectedData(data);
                setOpen(true);
              }}
              data={data}
              index={index}
            />
          );
        })}
      </Box>
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

export default BareSolution;
