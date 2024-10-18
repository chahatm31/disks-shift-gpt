import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("Disks shift", () => {
  test("Requirement 1: Users can select a disk and move it to another tower", () => {
    render(<App />);

    const tower1 = screen.getAllByTestId("tower")[0];
    const tower2 = screen.getAllByTestId("tower")[1];

    // Select top disk from tower 1
    fireEvent.click(tower1);
    fireEvent.click(tower2);

    const tower2Disks = screen.getAllByTestId("disk");
    expect(tower2Disks).toHaveLength(1); // The disk has moved to tower 2
  });

  test("Requirement 2: Prevent larger disk on smaller disk", () => {
    render(<App />);

    const tower1 = screen.getAllByTestId("tower")[0];
    const tower2 = screen.getAllByTestId("tower")[1];

    // Move disk 1 to tower 2
    fireEvent.click(tower1);
    fireEvent.click(tower2);

    // Try to move a larger disk (disk 2) on top of disk 1
    fireEvent.click(tower1);
    fireEvent.click(tower2);

    const tower2Disks = screen.getAllByTestId("disk");
    expect(tower2Disks).toHaveLength(1); // The larger disk should not be placed
  });

  test("Requirement 3: Display towers and disks visually", () => {
    render(<App />);

    const towers = screen.getAllByTestId("tower");
    expect(towers).toHaveLength(3); // Three towers are displayed

    const disks = screen.getAllByTestId("disk");
    expect(disks).toHaveLength(3); // Initial three disks are present
  });

  test("Requirement 4: Users can drag and drop a disk", () => {
    render(<App />);

    // Simulate drag and drop event (this is just an example, actual implementation may vary)
    const tower1 = screen.getAllByTestId("tower")[0];
    const tower2 = screen.getAllByTestId("tower")[1];

    fireEvent.dragStart(tower1);
    fireEvent.drop(tower2);

    const tower2Disks = screen.getAllByTestId("disk");
    expect(tower2Disks).toHaveLength(1); // Disk has been moved to tower 2
  });

  test("Requirement 5: Highlight selected disk", () => {
    render(<App />);

    const tower1 = screen.getAllByTestId("tower")[0];

    fireEvent.click(tower1);

    const selectedTower = screen.getByTestId("tower-selected");
    expect(selectedTower).toBeTruthy(); // Tower is highlighted
  });

  test("Requirement 6: Show feedback on invalid move", () => {
    render(<App />);

    const tower1 = screen.getAllByTestId("tower")[0];
    const tower2 = screen.getAllByTestId("tower")[1];

    fireEvent.click(tower1);
    fireEvent.click(tower2);

    // Move larger disk on smaller disk
    fireEvent.click(tower1);
    fireEvent.click(tower2);

    const errorMessage = screen.getByText("Invalid move");
    expect(errorMessage).toBeInTheDocument(); // Feedback is displayed
  });

  test("Requirement 7: Track the number of moves", () => {
    render(<App />);

    const tower1 = screen.getAllByTestId("tower")[0];
    const tower2 = screen.getAllByTestId("tower")[1];

    fireEvent.click(tower1);
    fireEvent.click(tower2);

    const moveCounter = screen.getByText(/Moves: 1/);
    expect(moveCounter).toBeInTheDocument(); // Move counter is updated
  });

  test("Requirement 8: Reset the puzzle", () => {
    render(<App />);

    const resetButton = screen.getByText("Reset");
    fireEvent.click(resetButton);

    const disksInTower1 = screen.getAllByTestId("disk");
    expect(disksInTower1).toHaveLength(3); // Disks are reset to the initial position
  });

  test("Requirement 9: Show a hint for the next move", () => {
    render(<App />);

    const hintButton = screen.getByText("Hint");
    fireEvent.click(hintButton);

    const hintMessage = screen.getByText("Move disk 1 to tower 3");
    expect(hintMessage).toBeInTheDocument(); // Hint message is shown
  });

  test("Requirement 10: Difficulty levels", () => {
    render(<App />);

    const difficultySelect = screen.getByLabelText("Difficulty");
    fireEvent.change(difficultySelect, { target: { value: "medium" } });

    const disks = screen.getAllByTestId("disk");
    expect(disks).toHaveLength(4); // Medium level has 4 disks
  });

  test("Requirement 11: Display minimum moves", () => {
    render(<App />);

    const minMovesDisplay = screen.getByText(/Minimum moves: 7/);
    expect(minMovesDisplay).toBeInTheDocument(); // Minimum move count is displayed
  });

  test("Requirement 12: Custom appearance", () => {
    render(<App />);

    const settingsButton = screen.getByText("Settings");
    fireEvent.click(settingsButton);

    const colorSelect = screen.getByLabelText("Tower Color");
    fireEvent.change(colorSelect, { target: { value: "red" } });

    const towers = screen.getAllByTestId("tower");
    towers.forEach((tower) => {
      expect(tower).toHaveStyle("background-color: red"); // Tower color changes to red
    });
  });
});
