// components/TowerOfHanoiPuzzle.tsx
// This component provides an interactive visualization of the Tower of Hanoi puzzle.
// Users can set the number of disks and watch the algorithmic solution unfold.

import React, { useState, useEffect, useCallback } from 'react';
import { PuzzleContent } from '../types'; // Type definition for puzzle content
import { PlayIcon, PauseIcon, RotateCcwIcon } from 'lucide-react';


/**
 * Props for the TowerOfHanoiPuzzle component.
 */
interface TowerOfHanoiGameProps {
  puzzle: PuzzleContent;
}

/**
 * Represents a single move in the Tower of Hanoi puzzle.
 */
interface HanoiMove {
  from: number; 
  to: number;   
}

/**
 * TowerOfHanoiPuzzle component.
 */
export const TowerOfHanoiPuzzle: React.FC<TowerOfHanoiGameProps> = ({ puzzle }) => {
  const [diskCount, setDiskCount] = useState(3);
  const [inputDiskCount, setInputDiskCount] = useState('3');

  const initializeTowers = useCallback((n: number): number[][] => {
    // Creates an array representing the initial state of the towers.
    // Tower 0 has disks N down to 1 (N is largest, 1 is smallest).
    // Array [N, N-1, ..., 1] means N is at index 0 (bottom), 1 is at index n-1 (top).
    return [
      Array.from({ length: n }, (_, i) => n - i), 
      [], 
      []  
    ];
  }, []);

  const [towers, setTowers] = useState(() => initializeTowers(diskCount));
  const [moveCount, setMoveCount] = useState(0);
  const [movesHistory, setMovesHistory] = useState<Array<HanoiMove>>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [currentMove, setCurrentMove] = useState<HanoiMove | null>(null);

  const diskColors = [ // Max 7 disks supported by this palette
    '#EF4444', // Red-500
    '#F97316', // Orange-500
    '#EAB308', // Yellow-500
    '#22C55E', // Green-500
    '#3B82F6', // Blue-500
    '#6366F1', // Indigo-500
    '#A855F7'  // Purple-500 (was Violet)
  ];

  const diskHeight = 18; 
  const towerVisibleHeight = 150; 
  const towerRodWidth = 10;       
  const baseHeight = 15;         
  const svgWidth = 380;          
  const baseWidth = 340;         
  const towerSpacing = 115;      
  const firstTowerXCenter = (svgWidth - (2 * towerSpacing)) / 2; 

  /**
   * Calculates the visual width of a disk based on its value.
   * @param {number} diskValue - The numerical value of the disk (1 is smallest, totalDisks is largest).
   * @param {number} totalDisks - The total number of disks in the puzzle.
   * @returns {number} The calculated width for the disk.
   */
  const calculateDiskWidth = (diskValue: number, totalDisks: number): number => {
    const minDiskWidth = 30;  
    const maxDiskWidth = 100; 
    if (totalDisks <= 1) return maxDiskWidth; // A single disk should be full width

    // diskValue ranges from 1 (smallest) to totalDisks (largest)
    // We want disk 1 to have minDiskWidth, and disk 'totalDisks' to have maxDiskWidth
    // The scaling factor (diskValue - 1) / (totalDisks - 1) achieves this:
    // - If diskValue = 1, factor = 0 / (totalDisks - 1) = 0
    // - If diskValue = totalDisks, factor = (totalDisks - 1) / (totalDisks - 1) = 1
    const factor = (diskValue - 1) / (totalDisks - 1);
    return minDiskWidth + factor * (maxDiskWidth - minDiskWidth);
  };

  const solveHanoiRecursive = useCallback((n: number, source: number, auxiliary: number, target: number, currentMovesList: HanoiMove[] = []): HanoiMove[] => {
    if (n > 0) {
      solveHanoiRecursive(n - 1, source, target, auxiliary, currentMovesList);
      currentMovesList.push({ from: source, to: target });
      solveHanoiRecursive(n - 1, auxiliary, source, target, currentMovesList);
    }
    return currentMovesList;
  }, []);

  useEffect(() => {
    resetAnimation(diskCount); 
  }, [diskCount]); // solveHanoiRecursive, initializeTowers are stable from useCallback


  useEffect(() => {
    let timerId: number;
    if (isPlaying && moveCount < movesHistory.length) {
      timerId = window.setTimeout(() => {
        const move = movesHistory[moveCount];
        executeMoveAnimation(move); 
        setCurrentMove(move);       
        setMoveCount(prev => prev + 1); 
      }, 1000); // Animation speed
    } else if (movesHistory.length > 0 && moveCount >= movesHistory.length) {
      setIsPlaying(false);
      setIsComplete(true);
    }
    return () => window.clearTimeout(timerId); 
  }, [isPlaying, moveCount, movesHistory]);

  const executeMoveAnimation = (move: HanoiMove) => {
    const { from, to } = move;
    setTowers(prevTowers => {
      const newTowers = prevTowers.map(tower => [...tower]); 
      const diskToMove = newTowers[from].pop(); // Disk is taken from the top (end of array if top is end)
      if (diskToMove !== undefined) {
        newTowers[to].push(diskToMove); // Disk is placed on top
      }
      return newTowers;
    });
  };
  
  const resetAnimation = useCallback((n: number = diskCount) => {
    setTowers(initializeTowers(n));
    setMoveCount(0);
    setIsPlaying(false);
    setIsComplete(false);
    setCurrentMove(null);
    const solution = solveHanoiRecursive(n, 0, 1, 2);
    setMovesHistory(solution);
  }, [diskCount, initializeTowers, solveHanoiRecursive]);

  const handleDiskCountChange = () => {
    const newCount = parseInt(inputDiskCount, 10);
    if (!isNaN(newCount) && newCount >= 1 && newCount <= 7) { 
      if (newCount !== diskCount) {
        setDiskCount(newCount); 
      }
    } else {
      setInputDiskCount(diskCount.toString());
    }
  };

  /**
   * Renders a single disk.
   * @param {number} diskValue - The value of the disk (1-N, N being largest).
   * @param {number} diskIndexInTowerStack - The index of this disk in its tower's array (0 is bottom).
   * @param {number} towerIndex - The index of the tower (0, 1, or 2).
   * @returns {JSX.Element} The SVG rect element for the disk.
   */
  const renderDisk = (diskValue: number, diskIndexInTowerStack: number, towerIndex: number): JSX.Element => {
    const towerX = firstTowerXCenter + towerIndex * towerSpacing;
    const diskW = calculateDiskWidth(diskValue, diskCount);
    // Y-positioning: diskIndexInTowerStack = 0 is the bottom-most disk on the rod.
    // It should be placed at towerVisibleHeight - diskHeight.
    // diskIndexInTowerStack = 1 is above it, at towerVisibleHeight - 2*diskHeight, and so on.
    const diskY = towerVisibleHeight - ((diskIndexInTowerStack + 1) * diskHeight); 
    
    return (
      <rect
        key={`disk-${towerIndex}-${diskValue}-${diskIndexInTowerStack}`} // More unique key
        x={towerX - diskW / 2} 
        y={diskY}
        width={diskW}
        height={diskHeight}
        rx={4} 
        ry={4}
        fill={diskColors[diskValue - 1] || '#A0AEC0'} // diskValue is 1-based
        strokeWidth={1.5}
        className="stroke-slate-700 dark:stroke-slate-900 transition-all duration-300 ease-in-out shadow-sm"
      />
    );
  };

  const renderTowerRod = (towerIndex: number): JSX.Element => {
    const towerX = firstTowerXCenter + towerIndex * towerSpacing;
    const rodHeight = (diskCount * diskHeight) + 10; // Ensure rod is tall enough
    const rodY = towerVisibleHeight - rodHeight; // Rod starts from base upwards
    return (
      <rect
        key={`tower-rod-${towerIndex}`}
        x={towerX - towerRodWidth / 2} 
        y={rodY} 
        width={towerRodWidth}
        height={rodHeight} 
        fill="#a0aec0" // Slate-400
        className="dark:fill-slate-500 rounded-t-sm"
      />
    );
  };

  return (
    <article className="p-4 sm:p-6 bg-white dark:bg-slate-800 rounded-xl shadow-xl" aria-labelledby="hanoi-puzzle-title">
      <h2 id="hanoi-puzzle-title" className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4 tracking-tight">{puzzle.title}</h2>
      <div className="mb-6 prose prose-slate dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed">
        {puzzle.problemStatement.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <div className="flex flex-col items-center p-4 bg-slate-50 dark:bg-slate-800/60 rounded-lg mt-6 border border-slate-200 dark:border-slate-700 shadow-inner">
        <div className="mb-6 flex items-center space-x-3">
          <label htmlFor="diskCountInputHanoi" className="font-medium text-slate-700 dark:text-slate-300 text-sm sm:text-base">Disks (1-7):</label>
          <input
            id="diskCountInputHanoi"
            type="number" 
            min="1" max="7"
            className="w-20 px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-center transition-colors"
            value={inputDiskCount}
            onChange={(e) => setInputDiskCount(e.target.value)}
            onBlur={handleDiskCountChange} 
            onKeyPress={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleDiskCountChange(); } }} 
            aria-label="Number of disks for Tower of Hanoi"
          />
        </div>

        <div className="relative mb-6" role="img" aria-label={`Tower of Hanoi with ${diskCount} disks. Current state: ${towers.map((t,i) => `Rod ${String.fromCharCode(65+i)} has ${t.length} disks`).join(', ')}`}>
          <svg width={svgWidth} height={towerVisibleHeight + baseHeight + 30} viewBox={`0 0 ${svgWidth} ${towerVisibleHeight + baseHeight + 30}`}>
            {/* Base for all towers */}
            <rect x={(svgWidth - baseWidth)/2} y={towerVisibleHeight} width={baseWidth} height={baseHeight} fill="#cbd5e0" className="dark:fill-slate-600 rounded-md shadow" />

            {[0, 1, 2].map(index => renderTowerRod(index))}
            {towers.map((towerDisks, towerIdx) =>
              towerDisks.map((diskValue, diskIdxInStackArray) => 
                renderDisk(diskValue, diskIdxInStackArray, towerIdx)
              )
            )}
            {['A', 'B', 'C'].map((label, index) => (
              <text 
                key={`label-${label}`}
                x={firstTowerXCenter + index * towerSpacing} 
                y={towerVisibleHeight + baseHeight + 20} 
                textAnchor="middle" 
                fill="#475569" // Slate-600
                className="text-xs sm:text-sm font-semibold dark:fill-slate-400"
                aria-hidden="true"
              >
                {label}
              </text>
            ))}
          </svg>
        </div>

        <div className="flex justify-center space-x-3 mb-4">
          <button
            className="flex items-center px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 disabled:bg-slate-400 dark:disabled:bg-slate-500 disabled:opacity-70 transition-colors text-sm sm:text-base"
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={isComplete || (movesHistory.length > 0 && moveCount >= movesHistory.length && !isPlaying) || movesHistory.length === 0}
            aria-label={isPlaying ? "Pause animation" : (moveCount === 0 || moveCount >= movesHistory.length) ? "Start animation" : "Resume animation"}
          >
            {isPlaying ? <PauseIcon size={18} className="mr-1.5" /> : <PlayIcon size={18} className="mr-1.5" />}
            {isPlaying ? "Pause" : (moveCount === 0 || moveCount >= movesHistory.length) ? "Start" : "Resume"}
          </button>
          <button
            className="flex items-center px-4 py-2 bg-slate-500 text-white font-semibold rounded-lg shadow-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-colors text-sm sm:text-base"
            onClick={() => resetAnimation(diskCount)}
            aria-label="Reset animation"
          >
            <RotateCcwIcon size={18} className="mr-1.5" />
            Reset
          </button>
        </div>

        <div className="text-center text-slate-700 dark:text-slate-300" aria-live="polite">
          <p className="text-md sm:text-lg font-semibold">
            Moves: {moveCount} / {movesHistory.length > 0 ? movesHistory.length : (Math.pow(2, diskCount) - 1)}
          </p>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            (Minimum required: {Math.pow(2, diskCount) - 1})
          </p>
          {currentMove && (
            <p className="text-sm sm:text-md mt-1">
              Move: Disk from Rod <span className="font-bold">{String.fromCharCode(65 + currentMove.from)}</span> to Rod <span className="font-bold">{String.fromCharCode(65 + currentMove.to)}</span>
            </p>
          )}
          {isComplete && (
            <p className="text-green-500 dark:text-green-400 font-bold mt-2 text-lg sm:text-xl">Puzzle Solved!</p>
          )}
        </div>
      </div>
    </article>
  );
};
