import React, { useState } from "react";
import "./App.css";

function App() {
  const [towers, setTowers] = useState([
    [3, 2, 1], // Initial state, all disks are on the first tower
    [],
    [],
  ]);

  const [selectedTower, setSelectedTower] = useState(null);

  const moveDisk = (from, to) => {
    if (from === to) return; // Can't move to the same tower

    const fromTower = [...towers[from]];
    const toTower = [...towers[to]];

    if (fromTower.length === 0) return; // No disk to move

    const diskToMove = fromTower[fromTower.length - 1];

    // Rule: can't place a larger disk on a smaller disk
    if (toTower.length > 0 && toTower[toTower.length - 1] < diskToMove) return;

    fromTower.pop(); // Remove the disk from the "from" tower
    toTower.push(diskToMove); // Place it on the "to" tower

    const newTowers = [...towers];
    newTowers[from] = fromTower;
    newTowers[to] = toTower;

    setTowers(newTowers);
  };

  const handleClick = (towerIndex) => {
    if (selectedTower === null) {
      setSelectedTower(towerIndex); // Select the tower
    } else {
      moveDisk(selectedTower, towerIndex); // Try to move disk
      setSelectedTower(null); // Deselect the tower
    }
  };

  return (
    <div className="game">
      <h1>Disks shift</h1>
      <div className="towers">
        {towers.map((tower, index) => (
          <div
            key={index}
            className={`tower ${selectedTower === index ? "selected" : ""}`}
            onClick={() => handleClick(index)}
          >
            <div className="peg"></div>
            {tower.map((disk, diskIndex) => (
              <div key={diskIndex} className={`disk disk-${disk}`}>
                {disk}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
