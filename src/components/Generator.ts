export function generateSudoku(): (number | null)[][] {
  const base: number = 9;
  const side: number = Math.sqrt(base);

  // Pattern function to distribute numbers across the grid
  const pattern = (r: number, c: number): number =>
    (side * (r % side) + Math.floor(r / side) + c) % base;

  // Shuffle function to randomize the order of numbers
  const shuffle = <T>(array: T[]): T[] => array.sort(() => Math.random() - 0.5);

  // Generate a range of numbers from 0 to n-1
  const range = (n: number): number[] => [...Array(n).keys()];

  // Create rows, columns, and a shuffled array of numbers
  const rows: number[] = range(base);
  const cols: number[] = range(base);
  const nums: number[] = shuffle(range(base).map((n) => n + 1));

  // Build the board using the pattern function
  const board: number[][] = rows.map((r) =>
    cols.map((c) => nums[pattern(r, c)])
  );

  // Create the puzzle by removing some numbers
  const puzzle: (number | null)[][] = board.map((row) =>
    row.map((cell) => (Math.random() < 0.5 ? cell : null))
  );

  return puzzle;
}