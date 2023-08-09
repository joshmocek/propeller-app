import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ParameterFilter from "../../BareSolution/ParameterFilter";
describe("ParameterFilter Component", () => {
  test("renders ParameterFilter component with initial value", () => {
    const initialValue = "so2";
    render(<ParameterFilter filterParam={initialValue} onChange={() => {}} />);
    const inputElement = screen.getByLabelText("Parameter Filter");

    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe(initialValue);
  });

  test("calls onChange function when input value changes", () => {
    const onChangeMock = jest.fn();
    render(<ParameterFilter filterParam="" onChange={onChangeMock} />);
    const inputElement = screen.getByLabelText("Parameter Filter");

    const newValue = "pm10";
    fireEvent.change(inputElement, { target: { value: newValue } });

    expect(onChangeMock).toHaveBeenCalledWith(newValue);
  });

  test("updates input value when filterParam prop changes", () => {
    const initialValue = "so2";
    const updatedValue = "co2";
    const { rerender } = render(
      <ParameterFilter filterParam={initialValue} onChange={() => {}} />
    );
    const inputElement = screen.getByLabelText("Parameter Filter");

    expect(inputElement.value).toBe(initialValue);

    rerender(
      <ParameterFilter filterParam={updatedValue} onChange={() => {}} />
    );

    expect(inputElement.value).toBe(updatedValue);
  });
});
