// components/TwoSumPuzzle.tsx
// This component provides an interactive visualization for the "Two Sum" problem.

import React, { useState, useEffect, useCallback } from 'react';
import { PuzzleContent } from '../types'; 
import { PlayIcon, PauseIcon, SkipForwardIcon, SkipBackIcon, RotateCcwIcon, EyeIcon, EyeOffIcon } from 'lucide-react';


interface TwoSumStep {
  message: string; 
  numColors: string[]; 
  pointers: { [key: string]: number }; 
  pairs?: number[][]; 
  sortedNums?: number[]; 
  originalIndices?: number[]; 
  hashMap?: { [key: number]: number }; 
  calculation?: string; 
  isMatch?: boolean; 
  result?: number[]; 
  codeHighlights?: number[]; 
  nextMove?: string; 
}

interface TwoSumPuzzleProps {
  puzzle: PuzzleContent;
}

export const TwoSumPuzzle: React.FC<TwoSumPuzzleProps> = ({ puzzle }) => {
  const [numsInput, setNumsInput] = useState("-5, 7, 0, 1, 9"); 
  const [targetInput, setTargetInput] = useState("8");         
  
  const [nums, setNums] = useState<number[]>([]);
  const [target, setTarget] = useState<number>(0);
  const [error, setError] = useState<string | null>(null); 

  const [currentAlgorithm, setCurrentAlgorithm] = useState<'brute' | 'twoPointers' | 'hashmap'>('brute');
  const [animationSpeed, setAnimationSpeed] = useState(1000); 
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); 
  const [steps, setSteps] = useState<TwoSumStep[]>([]); 
  const [result, setResult] = useState<number[] | null>(null); 
  const [animationDone, setAnimationDone] = useState(false); 
  const [showCode, setShowCode] = useState(true); 
  
  const vizColors = {
    default: 'bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-100 border-slate-400 dark:border-slate-500',
    checking: 'bg-amber-400 dark:bg-amber-500 text-amber-900 dark:text-amber-50 border-amber-600 dark:border-amber-400 ring-2 ring-amber-500',
    match: 'bg-green-500 dark:bg-green-600 text-white border-green-700 dark:border-green-500 ring-2 ring-green-600',
    pointer: 'bg-indigo-500 dark:bg-indigo-600 text-white border-indigo-700 dark:border-indigo-500 ring-2 ring-indigo-600',
  };

  const parseInputs = useCallback((): boolean => {
    try {
      const parsedNums = numsInput.split(',').map(s => {
        const num = parseInt(s.trim(), 10);
        if (isNaN(num)) throw new Error(`Invalid number: "${s.trim()}"`);
        return num;
      });
      const parsedTarget = parseInt(targetInput.trim(), 10);
      if (isNaN(parsedTarget)) throw new Error(`Invalid target: "${targetInput.trim()}"`);
      
      setNums(parsedNums);
      setTarget(parsedTarget);
      setError(null); 
      return true;
    } catch (e: any) {
      setError(e.message);
      setNums([]); 
      setTarget(0);  
      return false;
    }
  }, [numsInput, targetInput]); 

  useEffect(() => {
    parseInputs(); 
  }, [parseInputs]); 

  useEffect(() => {
    if (nums.length === 0 && target === 0 && !error) { 
        setSteps([]); 
        return;
    }
    if (error && nums.length === 0) { // If there's an error and no valid nums, clear steps.
        setSteps([]);
        return;
    }
    
    setCurrentStep(0);
    setResult(null);
    setAnimationDone(false);
    setIsPlaying(false); 
    
    let newSteps: TwoSumStep[] = [];
    if (currentAlgorithm === 'brute') {
      newSteps = generateBruteForceSteps(nums, target);
    } else if (currentAlgorithm === 'twoPointers') {
      newSteps = generateTwoPointersSteps(nums, target);
    } else if (currentAlgorithm === 'hashmap') {
      newSteps = generateHashMapSteps(nums, target);
    }
    setSteps(newSteps);
  }, [nums, target, currentAlgorithm, error]); // Added error as dependency


  const generateBruteForceSteps = (currentNums: number[], currentTarget: number): TwoSumStep[] => {
    const localSteps: TwoSumStep[] = [];
    const defaultColors = Array(currentNums.length).fill(vizColors.default);
    
    localSteps.push({ message: "Starting Brute Force. Will check every unique pair.", numColors: [...defaultColors], pointers: {}, codeHighlights: [1] });
    
    for (let i = 0; i < currentNums.length - 1; i++) {
      const iColors = [...defaultColors];
      iColors[i] = vizColors.pointer;
      localSteps.push({ message: `Outer loop: Fix first number at index ${i} (value: ${currentNums[i]}).`, numColors: iColors, pointers: { first_num_idx: i }, codeHighlights: [2] });
      
      for (let j = i + 1; j < currentNums.length; j++) {
        const ijColors = [...iColors]; 
        ijColors[j] = vizColors.checking; 
        const sum = currentNums[i] + currentNums[j];
        const isMatch = sum === currentTarget;
        
        localSteps.push({
          message: `Inner loop: Check with number at index ${j} (value: ${currentNums[j]}). Sum: ${currentNums[i]} + ${currentNums[j]} = ${sum}. Target: ${currentTarget}.`,
          numColors: ijColors,
          pointers: { first_num_idx: i, second_num_idx: j },
          calculation: `${currentNums[i]} + ${currentNums[j]} = ${sum}`,
          isMatch,
          codeHighlights: [3,4]
        });
        
        if (isMatch) {
          const resultColors = [...defaultColors];
          resultColors[i] = vizColors.match;
          resultColors[j] = vizColors.match;
          localSteps.push({ message: `Match Found! Pair: [${currentNums[i]}, ${currentNums[j]}]`, numColors: resultColors, pointers: { first_num_idx: i, second_num_idx: j }, result: [currentNums[i], currentNums[j]], isMatch: true, codeHighlights: [5,6] });
          return localSteps; 
        }
      }
    }
    localSteps.push({ message: "No pair found after checking all combinations.", numColors: [...defaultColors], pointers: {}, result: [], codeHighlights: [7] });
    return localSteps;
  };

  const generateTwoPointersSteps = (currentNums: number[], currentTarget: number): TwoSumStep[] => {
    const localSteps: TwoSumStep[] = [];
    const indexedNums = currentNums.map((num, index) => ({ num, originalIndex: index }));
    const sortedIndexedNums = [...indexedNums].sort((a, b) => a.num - b.num);
    const sortedNums = sortedIndexedNums.map(item => item.num);
    const originalIndices = sortedIndexedNums.map(item => item.originalIndex);
    const defaultColors = Array(sortedNums.length).fill(vizColors.default);

    localSteps.push({ message: "Starting Two Pointers. First, sort the array conceptually. Visualization shows sorted values with original indices mapped below.", numColors: [...defaultColors], pointers: {}, sortedNums, originalIndices, codeHighlights: [1,2] });

    let left = 0;
    let right = sortedNums.length - 1;

    if (sortedNums.length < 2) {
        localSteps.push({ message: "Array has less than two elements. Cannot find a pair.", numColors: [...defaultColors], pointers: {}, result: [], sortedNums, originalIndices, codeHighlights: [10] }); // Line 10 for return []
        return localSteps;
    }

    const initialPointerColors = [...defaultColors];
    initialPointerColors[left] = vizColors.pointer;
    initialPointerColors[right] = vizColors.pointer;
    localSteps.push({ message: `Initialize left pointer at index ${left} (value: ${sortedNums[left]}), right pointer at index ${right} (value: ${sortedNums[right]}).`, numColors: initialPointerColors, pointers: { small_num_idx: left, big_num_idx: right }, sortedNums, originalIndices, codeHighlights: [3,4,5] });

    while (left < right) {
      const currentPointerColors = [...defaultColors];
      currentPointerColors[left] = vizColors.pointer;
      currentPointerColors[right] = vizColors.pointer;
      const sum = sortedNums[left] + sortedNums[right];
      const isMatch = sum === currentTarget;

      localSteps.push({ message: `Checking sum: ${sortedNums[left]} + ${sortedNums[right]} = ${sum}. Target: ${currentTarget}.`, numColors: currentPointerColors, pointers: { small_num_idx: left, big_num_idx: right }, calculation: `${sortedNums[left]} + ${sortedNums[right]} = ${sum}`, isMatch, sortedNums, originalIndices, codeHighlights: [6,7] });

      if (isMatch) {
        const resultColors = [...defaultColors];
        resultColors[left] = vizColors.match;
        resultColors[right] = vizColors.match;
        localSteps.push({ message: `Match Found! Pair: [${sortedNums[left]}, ${sortedNums[right]}]`, numColors: resultColors, pointers: { small_num_idx: left, big_num_idx: right }, result: [sortedNums[left], sortedNums[right]], isMatch: true, sortedNums, originalIndices, codeHighlights: [8] });
        return localSteps;
      } else if (sum < currentTarget) {
        localSteps.push({ message: `Sum ${sum} < Target ${currentTarget}. Increment left pointer.`, numColors: currentPointerColors, pointers: { small_num_idx: left, big_num_idx: right }, nextMove: 'Increment left', sortedNums, originalIndices, codeHighlights: [9,10] }); // Line 10 is left++
        left++;
      } else { // sum > target
        localSteps.push({ message: `Sum ${sum} > Target ${currentTarget}. Decrement right pointer.`, numColors: currentPointerColors, pointers: { small_num_idx: left, big_num_idx: right }, nextMove: 'Decrement right', sortedNums, originalIndices, codeHighlights: [11,12] }); // Line 12 is right--
        right--;
      }
    }
    localSteps.push({ message: "No pair found. Pointers crossed.", numColors: [...defaultColors], pointers: {}, result: [], sortedNums, originalIndices, codeHighlights: [13] });
    return localSteps;
  };

  const generateHashMapSteps = (currentNums: number[], currentTarget: number): TwoSumStep[] => {
    const localSteps: TwoSumStep[] = [];
    const hashMap: { [key: number]: number } = {}; 
    const defaultColors = Array(currentNums.length).fill(vizColors.default);

    localSteps.push({ message: "Starting Hash Map approach. Initialize an empty hash map.", numColors: [...defaultColors], pointers: {}, hashMap: { ...hashMap }, codeHighlights: [1,2] });

    for (let i = 0; i < currentNums.length; i++) {
      const num = currentNums[i];
      const complement = currentTarget - num;
      const iterColors = [...defaultColors];
      iterColors[i] = vizColors.checking; 

      localSteps.push({ message: `Iterating: current number is ${num} at index ${i}. Calculate complement: ${currentTarget} - ${num} = ${complement}.`, numColors: iterColors, pointers: { current_idx: i }, calculation: `${currentTarget} - ${num} = ${complement}`, hashMap: { ...hashMap }, codeHighlights: [3,4,5] });

      if (complement in hashMap) {
        const complementIndex = hashMap[complement];
        const resultColors = [...defaultColors];
        resultColors[i] = vizColors.match;
        resultColors[complementIndex] = vizColors.match;
        localSteps.push({ message: `Complement ${complement} found in hash map (at original index ${complementIndex})! Pair: [${complement}, ${num}]`, numColors: resultColors, pointers: { current_idx: i, complement_idx: complementIndex }, result: [complement, num], isMatch: true, hashMap: { ...hashMap }, codeHighlights: [6,7] });
        return localSteps;
      }
      
      hashMap[num] = i; 
      localSteps.push({ message: `Complement ${complement} not in hash map. Add ${num} (from original index ${i}) to hash map.`, numColors: iterColors, pointers: { current_idx: i }, hashMap: { ...hashMap }, codeHighlights: [8] });
    }
    localSteps.push({ message: "No pair found after checking all numbers.", numColors: [...defaultColors], pointers: {}, result: [], hashMap: { ...hashMap }, codeHighlights: [9] });
    return localSteps;
  };

  useEffect(() => {
    let timerId: number;
    if (isPlaying && currentStep < steps.length - 1) {
      timerId = window.setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, animationSpeed);
    } else if (isPlaying && steps.length > 0 && currentStep === steps.length - 1) {
      setIsPlaying(false);
      setAnimationDone(true);
      if (steps[currentStep]?.result) {
        setResult(steps[currentStep].result as number[]);
      }
    }
    return () => window.clearTimeout(timerId); 
  }, [isPlaying, currentStep, steps, animationSpeed]);

  const handlePlayPause = () => {
    if (steps.length === 0) { 
        if (!parseInputs()) return; 
    }
    if ((animationDone || currentStep >= steps.length - 1) && steps.length > 0) {
      setCurrentStep(0); 
      setIsPlaying(true);
      setAnimationDone(false);
      setResult(null);
    } else if (steps.length > 0) { 
      setIsPlaying(!isPlaying); 
    }
  };
  const handleStepForward = () => { 
    if (steps.length === 0) { if (!parseInputs()) return; }
    setIsPlaying(false); 
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      if (currentStep + 1 === steps.length -1 && steps[currentStep+1]?.result) { 
        setAnimationDone(true);
        setResult(steps[currentStep+1].result as number[]);
      }
    }
  };
  const handleStepBackward = () => { 
    if (steps.length === 0) { if (!parseInputs()) return; }
    setIsPlaying(false); 
    setAnimationDone(false); 
    setResult(null); 
    if (currentStep > 0) setCurrentStep(currentStep - 1); 
  };
  const handleReset = () => {
    parseInputs(); 
    setCurrentStep(0); 
    setIsPlaying(false); 
    setAnimationDone(false); 
    setResult(null);
  };

  const currentStepData: TwoSumStep = steps[currentStep] || {
    message: "Enter array and target, then select an algorithm and press Play.",
    numColors: Array(nums.length).fill(vizColors.default),
    pointers: {},
    hashMap: {},
  };
  
  const displayNums = currentAlgorithm === 'twoPointers' && currentStepData.sortedNums 
                      ? currentStepData.sortedNums 
                      : nums;
  const displayIndices = currentAlgorithm === 'twoPointers' && currentStepData.originalIndices 
                      ? currentStepData.originalIndices 
                      : nums.map((_,i) => i);

  const renderCode = (): JSX.Element[] => {
    const highlights = currentStepData.codeHighlights || [];
    let codeString = '';
    if (currentAlgorithm === 'brute') {
      codeString = `
1 function twoSumBruteForce(array, targetSum):
2   for i from 0 to length(array) - 2:
3     for j from i + 1 to length(array) - 1:
4       if array[i] + array[j] == targetSum:
5         // Pair found!
6         return [array[i], array[j]]
7   return [] // No pair found`;
    } else if (currentAlgorithm === 'twoPointers') {
      codeString = `
1 function twoSumTwoPointers(array, targetSum):
2   sort(array) 
3   left = 0
4   right = length(array) - 1
5   while left < right:
6     currentSum = array[left] + array[right]
7     if currentSum == targetSum:
8       return [array[left], array[right]]
9     else if currentSum < targetSum:
10      left = left + 1
11    else: // currentSum > targetSum
12      right = right - 1
13  return []`;
    } else if (currentAlgorithm === 'hashmap') {
      codeString = `
1 function twoSumHashMap(array, targetSum):
2   seenNumbers = new HashMap()
3   for i from 0 to length(array) - 1:
4     currentNum = array[i]
5     complement = targetSum - currentNum
6     if complement is in seenNumbers:
7       return [complement, currentNum]
8     seenNumbers.add(currentNum, i)
9   return []`;
    }
    return codeString.trim().split('\n').map((line, index) => {
        const lineNumberMatch = line.trim().match(/^(\d+)\s/);
        const lineNumber = lineNumberMatch ? parseInt(lineNumberMatch[1], 10) : -1;
        const isHighlighted = highlights.includes(lineNumber);
        const codeContent = lineNumberMatch ? line.substring(lineNumberMatch[0].length) : line;
        return (
            <div key={index} className={`whitespace-pre ${isHighlighted ? 'bg-amber-300 dark:bg-amber-600 text-black dark:text-white rounded px-1' : ''}`}>
                <span className="mr-2 inline-block w-5 text-right text-slate-400 dark:text-slate-500 select-none">{index + 1}</span>
                {codeContent}
            </div>
        );
    });
  };


  return (
    <article className="p-4 sm:p-6 bg-white dark:bg-slate-800 rounded-xl shadow-xl" aria-labelledby="twosum-puzzle-title">
      <h2 id="twosum-puzzle-title" className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4 tracking-tight">{puzzle.title}</h2>
      <div className="mb-6 prose prose-slate dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed">
        {puzzle.problemStatement.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
            <label htmlFor="twoSumNumsInput" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Numbers (comma-separated):</label>
            <input type="text" id="twoSumNumsInput" value={numsInput} onChange={(e) => setNumsInput(e.target.value)} onBlur={parseInputs} className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 sm:text-sm" aria-describedby={error ? "input-error" : undefined} />
        </div>
        <div>
            <label htmlFor="twoSumTargetInput" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Target Sum:</label>
            <input type="text" id="twoSumTargetInput" value={targetInput} onChange={(e) => setTargetInput(e.target.value)} onBlur={parseInputs} className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 sm:text-sm" aria-describedby={error ? "input-error" : undefined} />
        </div>
      </div>
      {error && <p id="input-error" className="text-red-500 dark:text-red-400 text-sm mb-4 p-2 bg-red-50 dark:bg-red-900/30 rounded-md border border-red-300 dark:border-red-600" role="alert">{error}</p>}

      <div className="flex flex-wrap justify-center gap-2 mb-6" role="radiogroup" aria-label="Select Two Sum Algorithm">
        {(['brute', 'twoPointers', 'hashmap'] as const).map(algo => (
          <button 
            key={algo} 
            onClick={() => setCurrentAlgorithm(algo)}
            role="radio"
            aria-checked={currentAlgorithm === algo}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800
                        ${currentAlgorithm === algo 
                            ? 'bg-teal-600 text-white ring-teal-500' 
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 ring-transparent'}`}>
            {algo === 'brute' ? 'Brute Force' : algo === 'twoPointers' ? 'Two Pointers' : 'Hash Map'}
          </button>
        ))}
      </div>
      
      <div className="mb-4 p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/60 min-h-[150px]" aria-label="Array visualization area">
        <h4 className="text-md font-semibold text-slate-700 dark:text-slate-200 mb-3">
          {currentAlgorithm === 'twoPointers' ? 'Sorted Array View:' : 'Array View:'}
        </h4>
        <div className="flex flex-wrap justify-center items-end min-h-[70px]">
          {displayNums.map((numVal: number, indexInDisplayArray: number) => {
            const originalIdx = displayIndices[indexInDisplayArray]; 
            const colorClass = currentStepData.numColors[indexInDisplayArray] || vizColors.default;
            let pointerLabel = '';
            if (currentAlgorithm === 'brute') {
                if(currentStepData.pointers.first_num_idx === indexInDisplayArray) pointerLabel = 'i';
                else if(currentStepData.pointers.second_num_idx === indexInDisplayArray) pointerLabel = 'j';
            } else if (currentAlgorithm === 'twoPointers') {
                if(currentStepData.pointers.small_num_idx === indexInDisplayArray) pointerLabel = 'L';
                else if(currentStepData.pointers.big_num_idx === indexInDisplayArray) pointerLabel = 'R';
            } else if (currentAlgorithm === 'hashmap') {
                if(currentStepData.pointers.current_idx === originalIdx) pointerLabel = 'curr'; // Hashmap uses original indices for pointers
            }

            return (
              <div key={`vis-${originalIdx}-${numVal}-${indexInDisplayArray}`} className="relative m-1.5 text-center flex flex-col items-center">
                <div 
                    className={`p-3 w-14 h-14 flex items-center justify-center rounded-lg border-2 ${colorClass} font-mono text-md transition-all duration-300 shadow-lg`}
                    title={`Value: ${numVal}${currentAlgorithm === 'twoPointers' ? ` (Original Index: ${originalIdx})` : ` (Index: ${indexInDisplayArray})`}`}
                    aria-label={`Value ${numVal}. ${currentAlgorithm === 'twoPointers' ? `Original index ${originalIdx}.` : `Index ${indexInDisplayArray}.`} Status: ${colorClass.includes('match') ? 'match' : colorClass.includes('checking') ? 'checking' : colorClass.includes('pointer') ? 'pointer' : 'default'}`}
                >
                  {numVal}
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block" aria-hidden="true">[{currentAlgorithm === 'twoPointers' ? originalIdx : indexInDisplayArray}]</span>
                {pointerLabel && <span className="absolute -bottom-4 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">{pointerLabel}</span>}
              </div>
            );
          })}
           {displayNums.length === 0 && <p className="text-slate-500 dark:text-slate-400 italic p-4 text-center w-full">Array is empty or inputs are invalid.</p>}
        </div>
      </div>

      {currentAlgorithm === 'hashmap' && currentStepData.hashMap && (
        <div className="mb-4 p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/60" aria-label="Hash Map contents">
          <h4 className="text-md font-semibold text-slate-700 dark:text-slate-200 mb-2">Hash Map (Value Seen <span className="font-normal text-xs text-slate-500 dark:text-slate-400">-&gt; Its Original Index</span>):</h4>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {Object.entries(currentStepData.hashMap).length > 0 ? Object.entries(currentStepData.hashMap).map(([key, val]) => (
              <span key={`map-${key}`} className="m-0.5 px-2 py-1 bg-emerald-100 dark:bg-emerald-700/50 text-emerald-700 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-600 rounded-md shadow-sm font-mono">
                {key}: {val as number}
              </span>
            )) : <span className="text-slate-500 dark:text-slate-400 italic">Empty</span>}
          </div>
        </div>
      )}
      
      <div className="min-h-[70px] p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg border border-slate-300 dark:border-slate-600 mb-6 text-sm shadow" aria-live="polite" aria-atomic="true">
        <p className="font-semibold text-slate-700 dark:text-slate-200">Status:</p>
        <p className="text-slate-600 dark:text-slate-300 break-words leading-relaxed">{currentStepData.message}</p>
        {currentStepData.calculation && (
            <p className="mt-1 font-mono text-blue-700 dark:text-blue-300">Calculation: {currentStepData.calculation}
            {currentStepData.isMatch === true && <span className="text-green-500 dark:text-green-400 font-semibold ml-1"> ✔ Match!</span>}
            {currentStepData.isMatch === false && <span className="text-red-500 dark:text-red-400 font-semibold ml-1"> ✘ No match.</span>}
            </p>
        )}
      </div>

      {animationDone && result && result.length > 0 && (
        <div className="mt-4 p-4 bg-green-100 dark:bg-green-800/50 border-2 border-green-500 dark:border-green-600 rounded-lg text-center shadow-lg" role="status">
          <h4 className="text-lg font-bold text-green-700 dark:text-green-300">🎉 Pair Found! 🎉</h4>
          <p className="text-green-600 dark:text-green-200 text-xl font-mono mt-1">[{result.join(', ')}]</p>
        </div>
      )}
       {animationDone && result && result.length === 0 && (
        <div className="mt-4 p-4 bg-amber-100 dark:bg-amber-800/50 border-2 border-amber-500 dark:border-amber-600 rounded-lg text-center shadow-lg" role="status">
          <h4 className="text-lg font-bold text-amber-700 dark:text-amber-300">😔 No Pair Found 😔</h4>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center mt-8">
        <div className="flex items-center space-x-2 sm:col-span-1">
          <label htmlFor="speedControlTwoSum" className="text-sm font-medium text-slate-700 dark:text-slate-300">Speed:</label>
          <input id="speedControlTwoSum" type="range" min="200" max="2000" step="100" value={2200 - animationSpeed} onChange={(e) => setAnimationSpeed(2200 - parseInt(e.target.value))} className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-teal-500"/>
        </div>
        <div className="flex justify-center space-x-2 sm:col-span-1">
          <button onClick={handleReset} className="p-2 bg-slate-500 hover:bg-slate-600 text-white rounded-full shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:focus:ring-offset-slate-800" aria-label="Reset animation"><RotateCcwIcon size={18}/></button>
          <button onClick={handleStepBackward} disabled={currentStep === 0 || isPlaying || steps.length === 0} className="p-2 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-full shadow-md hover:bg-slate-300 dark:hover:bg-slate-500 disabled:opacity-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300" aria-label="Previous step"><SkipBackIcon size={18}/></button>
          <button onClick={handlePlayPause} disabled={steps.length === 0 && !!error} className={`p-2 rounded-full shadow-md text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 ${isPlaying ? 'bg-orange-500 hover:bg-orange-600 ring-orange-400' : 'bg-teal-600 hover:bg-teal-700 ring-teal-500'} disabled:bg-slate-400 dark:disabled:bg-slate-500`} aria-label={isPlaying ? 'Pause animation' : (animationDone || (currentStep >= steps.length -1 && steps.length > 0)) ? 'Replay animation' : 'Play animation'}>
            {isPlaying ? <PauseIcon size={18}/> : <PlayIcon size={18}/>}
          </button>
          <button onClick={handleStepForward} disabled={currentStep >= steps.length - 1 || isPlaying || steps.length === 0} className="p-2 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-full shadow-md hover:bg-slate-300 dark:hover:bg-slate-500 disabled:opacity-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300" aria-label="Next step"><SkipForwardIcon size={18}/></button>
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400 sm:col-span-1 text-center sm:text-right">Step: {steps.length > 0 ? currentStep + 1 : 0} / {steps.length}</div>
      </div>
      
      <div className="mt-8">
        <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">Algorithm Pseudocode:</h3>
            <button onClick={() => setShowCode(!showCode)} className="p-2 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300" aria-expanded={showCode} aria-controls="twosum-code-display">
                {showCode ? <EyeOffIcon size={18}/> : <EyeIcon size={18}/>}
                <span className="sr-only">{showCode ? 'Hide Code' : 'Show Code'}</span>
            </button>
        </div>
        {showCode && (
            <div id="twosum-code-display" className="p-4 bg-slate-800 dark:bg-black/50 text-slate-100 dark:text-slate-200 rounded-lg font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed shadow-inner">
                {renderCode()}
            </div>
        )}
      </div>
    </article>
  );
};