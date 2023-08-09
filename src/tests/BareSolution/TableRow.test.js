import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TableRow from "../../BareSolution/TableRow";

describe("TableRow Component", () => {
  const columns = [
    { headerName: "Column 1", width: 100, field: "col1" },
    { headerName: "Column 2", width: 150, field: "col2" },
    { headerName: "Column 3", width: 200, field: "col3" },
  ];

  const data = {
    col1: "Value 1",
    col2: "Value 2",
    col3: "Value 3",
  };

  test("renders TableRow component with data", () => {
    render(
      <TableRow columns={columns} data={data} index={0} onClick={() => {}} />
    );

    columns.forEach((col) => {
      const cellElement = screen.getByText(data[col.field]);
      expect(cellElement).toBeInTheDocument();
    });
  });

  test("calls onClick function when row is clicked", () => {
    const onClickMock = jest.fn();
    render(
      <TableRow columns={columns} data={data} index={0} onClick={onClickMock} />
    );

    const rowElement = screen.getByTestId("table-row");
    fireEvent.click(rowElement);

    expect(onClickMock).toHaveBeenCalled();
  });
});
