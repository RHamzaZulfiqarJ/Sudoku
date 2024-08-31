"use client";

import Button from "@/components/Button";
import { generateSudoku } from "@/components/Generator";
import React, { useState } from "react";
import { toast } from "sonner";

// Type for grid cells
type Cell = { value: number | null; editable: boolean };

const Game = () => {
  // Initialize grid with an additional editable flag for each cell
  const [grid, setGrid] = useState<Cell[][]>(() => {
    const initialGrid = generateSudoku();
    return initialGrid.map((row) => row.map((cell) => ({ value: cell, editable: cell === null })));
  });

  // Handle cell change
  const handleChange = (row: number, col: number, value: string) => {
    if (!grid[row][col].editable) return; // Prevent changes to non-editable cells

    const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));

    if (value === "") {
      newGrid[row][col].value = null;
    } else {
      const parsed = parseInt(value, 10);
      if (isNaN(parsed) || parsed < 1 || parsed > 9) {
        return;
      }
      newGrid[row][col].value = parsed;
    }

    setGrid(newGrid);
  };

  // Check if the move is valid
  const isValidMove = (grid: Cell[][], row: number, col: number, num: number | null) => {
    for (let i = 0; i < 9; i++) {
      if (grid[row][i].value === num || grid[i][col].value === num) {
        return false;
      }
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[startRow + i][startCol + j].value === num) {
          return false;
        }
      }
    }

    return true;
  };

  // Solve the puzzle
  const solve = (grid: Cell[][]) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col].value === null) {
          for (let num = 1; num <= 9; num++) {
            if (isValidMove(grid, row, col, num)) {
              grid[row][col].value = num;
              if (solve(grid)) {
                return true;
              }
              grid[row][col].value = null;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  // Automatically solve the puzzle
  const autoSolver = () => {
    const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
    if (solve(newGrid)) {
      setGrid(newGrid);
      return true;
    }
    return false;
  };

  // Check if the current grid is valid
  const check = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const cell = grid[row][col];
        if (cell.value === null) {
          return false;
        }
        const num = cell.value;
        cell.value = null;
        if (!isValidMove(grid, row, col, num)) {
          cell.value = num;
          return false;
        }
        cell.value = num;
      }
    }
    return true;
  };

  return (
    <div className="flex flex-col gap-10 items-center">
      <div className="grid grid-cols-9 gap-1 max-w-sm mx-auto mt-10">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="text"
              maxLength={1}
              value={cell.value !== null ? cell.value : ""}
              onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
              disabled={!cell.editable} // Disable input for non-editable cells
              className={`md:w-10 md:h-10 w-8 h-8 text-center border ${
                cell.editable ? "bg-transparent border-gray-300" : "bg-transparent"
              } rounded-md text-white`}
            />
          ))
        )}
      </div>
      <div className="flex flex-row gap-10">
        <div
          onClick={() =>
            setGrid(
              generateSudoku().map((row) =>
                row.map((cell) => ({ value: cell, editable: cell === null }))
              )
            )
          }>
          <Button text="New Game" />
        </div>
        <div
          onClick={() => {
            if (check()) {
              toast.success("Correct!");
            } else {
              toast.error("Incorrect!");
            }
          }}>
          <Button text="Solve" />
        </div>
        <div
          onClick={() => {
            if (autoSolver()) {
              toast.success("Solution found!");
            } else {
              toast.error("No solution found!");
            }
          }}>
          <Button text="Auto Solve" />
        </div>
      </div>
    </div>
  );
};

export default Game;