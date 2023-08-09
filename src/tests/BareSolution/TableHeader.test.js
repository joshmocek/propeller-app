import React from "react";
import { render, screen } from "@testing-library/react";
import TableHeader from "../../BareSolution/TableHeader";

describe("TableHeader Component", () => {
  const columns = [
    { headerName: "Column 1", width: 100 },
    { headerName: "Column 2", width: 150 },
    { headerName: "Column 3", width: 200 },
  ];

  test("renders TableHeader component with columns", () => {
    render(<TableHeader columns={columns} />);

    columns.forEach((col) => {
      const headerElement = screen.getByText(col.headerName);
      expect(headerElement).toBeInTheDocument();
    });
  });
});
