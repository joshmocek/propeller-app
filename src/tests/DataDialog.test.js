import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DataDialog from "../Components/DataDialog";

describe("DataDialog Component", () => {
  test("renders DataDialog component with provided data", () => {
    const mockData = {
      location: "Test Location",
      entity: "Test Entity",
      sensorType: "Test Sensor",
    };
    render(<DataDialog open={true} onClose={() => {}} data={mockData} />);

    const title = screen.getByText("Additional Data");
    const locationText = screen.getByText(`Location: ${mockData.location}`);
    const entityText = screen.getByText(`Entity: ${mockData.entity}`);
    const sensorText = screen.getByText(`Sensor Type: ${mockData.sensorType}`);

    expect(title).toBeInTheDocument();
    expect(locationText).toBeInTheDocument();
    expect(entityText).toBeInTheDocument();
    expect(sensorText).toBeInTheDocument();
  });

  test("calls onClose when modal is closed", () => {
    const onCloseMock = jest.fn();
    render(<DataDialog open={true} onClose={onCloseMock} data={{}} />);

    const closeButton = screen.getByTestId("modal-close-button");
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalled();
  });

  test("renders nothing when not open", () => {
    const mockData = {
      location: "Test Location",
      entity: "Test Entity",
      sensorType: "Test Sensor",
    };
    render(<DataDialog open={false} onClose={() => {}} data={mockData} />);

    const title = screen.queryByText("Additional Data");
    const locationText = screen.queryByText(`Location: ${mockData.location}`);
    const entityText = screen.queryByText(`Entity: ${mockData.entity}`);
    const sensorText = screen.queryByText(
      `Sensor Type: ${mockData.sensorType}`
    );

    expect(title).not.toBeInTheDocument();
    expect(locationText).not.toBeInTheDocument();
    expect(entityText).not.toBeInTheDocument();
    expect(sensorText).not.toBeInTheDocument();
  });
});
