import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import BareSolution from "../../BareSolution/BareSolution";
import { shortSearchData } from "../../data/search.data";

jest.mock("axios");

describe("BareSolution Component", () => {
  test("renders BareSolution component", () => {
    render(<BareSolution />);
    const searchBox = screen.getByLabelText("Location Id");
    const timestampSortButton = screen.getByTestId("Sort Timestamp DESC");
    const parameterFilter = screen.getByLabelText("Parameter Filter");

    expect(searchBox).toBeInTheDocument();
    expect(timestampSortButton).toBeInTheDocument();
    expect(parameterFilter).toBeInTheDocument();
  });

  test("fetches data and displays in table", async () => {
    const mockData = shortSearchData.results;
    axios.get.mockResolvedValue({ data: { results: mockData } });

    render(<BareSolution />);
    const searchBox = screen.getByLabelText("Location Id");
    fireEvent.change(searchBox, { target: { value: "123" } });
    fireEvent.click(screen.getByText("Search"));

    await waitFor(() => {
      screen.findByText("so2");
    });
    const parameterFilter = screen.getByLabelText("Parameter Filter");
    fireEvent.change(parameterFilter, { target: { value: "" } });

    await waitFor(() => {
      const tableRows = screen.getAllByTestId("table-row");
      expect(tableRows).toHaveLength(mockData.length);
    });
  });

  test("clicking sort button changes sorting order", async () => {
    const mockData = shortSearchData.results;
    axios.get.mockResolvedValue({ data: { results: mockData } });

    render(<BareSolution />);
    const searchBox = screen.getByLabelText("Location Id");
    fireEvent.change(searchBox, { target: { value: "123" } });
    fireEvent.click(screen.getByText("Search"));

    await waitFor(() => {
      screen.findByText("so2");
    });

    const timestampSortButton = screen.getByTestId("Sort Timestamp DESC");
    fireEvent.click(timestampSortButton);

    await waitFor(() => {
      expect(screen.getByTestId("Sort Timestamp ASC")).toBeInTheDocument();
    });
  });

  test("filtering by parameter displays filtered data", async () => {
    const mockData = shortSearchData.results;
    axios.get.mockResolvedValue({ data: { results: mockData } });

    render(<BareSolution />);
    const searchBox = screen.getByLabelText("Location Id");
    fireEvent.change(searchBox, { target: { value: "123" } });
    fireEvent.click(screen.getByText("Search"));
    await waitFor(() => {
      screen.findByText("so2");
    });

    const parameterFilter = screen.getByLabelText("Parameter Filter");
    fireEvent.change(parameterFilter, { target: { value: "so2" } });

    await waitFor(() => {
      const tableRows = screen.getAllByTestId("table-row");
      expect(tableRows).toHaveLength(mockData.length);
    });
    const row = screen.getAllByTestId("table-row")[0];
    fireEvent.click(row);

    await waitFor(() => {
      screen.getByTestId("modal-close-button");
    });
    const closeButton = screen.getByTestId("modal-close-button");
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    await waitFor(() => {
      const dataDialog = screen.queryByTestId("modal");
      expect(dataDialog).not.toBeInTheDocument();
    });
  });
});
