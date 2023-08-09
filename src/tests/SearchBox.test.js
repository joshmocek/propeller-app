import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import SearchBox from "../Components/SearchBox";
import { searchData } from "../data/search.data";
jest.mock("axios");

describe("SearchBox Component", () => {
  test("renders SearchBox component", () => {
    render(<SearchBox onDataChange={() => {}} />);
    const locationIdInput = screen.getByLabelText("Location Id");
    const searchButton = screen.getByText("Search");

    expect(locationIdInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  test("fetches data and calls onDataChange on button click", async () => {
    const mockData = {
      data: {
        results: searchData.results,
      },
    };
    axios.get.mockResolvedValue(mockData);

    const onDataChangeMock = jest.fn();

    render(<SearchBox onDataChange={onDataChangeMock} />);
    const locationIdInput = screen.getByLabelText("Location Id");
    const searchButton = screen.getByText("Search");

    fireEvent.change(locationIdInput, { target: { value: "123" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        "https://api.openaq.org/v2/measurements?location_id=123",
        { timeout: 10000 }
      );
      expect(onDataChangeMock).toHaveBeenCalledWith(mockData.data.results);
    });
  });
});
