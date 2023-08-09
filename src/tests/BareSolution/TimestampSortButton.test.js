import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TimestampSortButton from "../../BareSolution/TimestampSortButton";

describe("TimestampSortButton Component", () => {
  test("renders TimestampSortButton component with initial state", () => {
    const onClickMock = jest.fn();
    const isAsc = true;

    render(<TimestampSortButton onClick={onClickMock} isAsc={isAsc} />);

    const buttonElement = screen.getByTestId("Sort Timestamp DESC");
    expect(buttonElement).toBeInTheDocument();
  });

  test("calls onClick function when button is clicked", () => {
    const onClickMock = jest.fn();
    const isAsc = true;

    render(<TimestampSortButton onClick={onClickMock} isAsc={isAsc} />);

    const buttonElement = screen.getByTestId("Sort Timestamp DESC");
    fireEvent.click(buttonElement);

    expect(onClickMock).toHaveBeenCalled();
  });

  test("displays 'ASC' in the button text when isAsc is false", () => {
    const onClickMock = jest.fn();
    const isAsc = false;

    render(<TimestampSortButton onClick={onClickMock} isAsc={isAsc} />);

    const buttonElement = screen.getByTestId("Sort Timestamp ASC");
    expect(buttonElement).toBeInTheDocument();
  });
});
