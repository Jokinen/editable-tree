import React from "react";
import { render, fireEvent } from "@testing-library/react";
import RapalExerciseComponent from "./RapalExerciseComponent";

describe("RapalExerciseComponent", () => {
  const getWrapper = props => render(<RapalExerciseComponent />);

  it("should have expected initial state", () => {
    const { queryByText } = getWrapper();
    const initialNodes = [
      "Noodi 1",
      "Noodi 1.1",
      "Noodi 1.1.1",
      "Noodi 1.1.2",
      "Noodi 1.2"
    ];

    initialNodes.forEach(node => {
      expect(queryByText(node)).not.toEqual(null);
    });
  });

  it("should add new nodes correctly", () => {
    const { getByTestId, queryByText } = getWrapper();
    const node1Buttons = getByTestId("1").querySelectorAll("button");
    const node1AddButton = node1Buttons.item(node1Buttons.length - 1);
    const node112AddButton = getByTestId("1.1.2").querySelector("button");

    fireEvent.click(node1AddButton);
    fireEvent.click(node112AddButton);

    expect(queryByText("Noodi 1.3")).not.toEqual(null);
    expect(queryByText("Noodi 1.1.2.1")).not.toEqual(null);
  });
});
