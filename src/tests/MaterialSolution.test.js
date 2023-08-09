import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import axios from "axios";
import MaterialSolution from "../MaterialSolution/MaterialSolution";
import { shortSearchData } from "../data/search.data";
jest.mock("axios");

describe("MaterialSolution Component", () => {
  test("renders MaterialSolution component", () => {
    render(<MaterialSolution />);
    const searchBox = screen.getByLabelText("Location Id");
    const dataGrid = screen.getByRole("grid");

    expect(searchBox).toBeInTheDocument();
    expect(dataGrid).toBeInTheDocument();
  });

  test("fetches and displays data on row click", async () => {
    const mockData = shortSearchData.results;
    axios.get.mockResolvedValue({ data: { results: mockData } });

    render(<MaterialSolution />);
    const searchBox = screen.getByLabelText("Location Id");

    fireEvent.change(searchBox, { target: { value: "123" } });
    await act(() => {
      fireEvent.click(screen.getByText("Search"));
    });

    await waitFor(() => {
      screen.findByText("so2");
    });
    expect(screen.queryAllByText("so2")).not.toBeNull();
  });
});
