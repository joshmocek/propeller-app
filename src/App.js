import "./App.css";
import { useState } from "react";
import { Box, Button } from "@mui/material";
import MaterialSolution from "./MaterialSolution/MaterialSolution";
import BareSolution from "./BareSolution/BareSolution";

function App() {
  const [selectedOption, setSelectedOption] = useState(() => "option1");
  return (
    <div className="App">
      <Box>
        <Button
          onClick={() => {
            setSelectedOption("option1");
          }}
          sx={{ m: 1 }}
          variant="contained"
        >
          Material Solution
        </Button>
        <Button
          onClick={() => {
            setSelectedOption("option2");
          }}
          sx={{ m: 1 }}
          variant="contained"
        >
          Bare Solution
        </Button>
      </Box>
      <Box sx={{ m: 1 }}>
        {selectedOption === "option1" ? <MaterialSolution /> : <BareSolution />}
      </Box>
    </div>
  );
}

export default App;
