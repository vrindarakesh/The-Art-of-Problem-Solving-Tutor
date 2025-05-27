// components/FibonacciPuzzle.tsx
// Interactive Fibonacci Puzzle component, refactored for theme and functionality.

import React, { useState, useEffect, useCallback } from 'react';
import { PuzzleContent } from '../types';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, SkipForwardIcon, SkipBackIcon } from 'lucide-react'; // Added missing icons

interface FibonacciPuzzleProps {
  puzzle: PuzzleContent;
}

interface TreeNode {
  id: string;
  value: number;
  x: number;
  y: number;
  level: number;
  children: TreeNode[];
  parent: string | null;
  visited: boolean;
  computing: boolean;
  result: number | null;
}

interface IterativeStepDisplay {
  a: number;
  b: number;
  i?: number; // Iteration count, optional for first step
  sequenceSnapshot: number[];
  highlightIndex: number | null; // Index in sequenceSnapshot to highlight
}

interface MemoizationStepDisplay {
    num: number;
    action: 'checking_memo' | 'base_case' | 'computing' | 'returning_memo' | 'storing_memo';
    value?: number; // for base_case, returning_memo, storing_memo
    message: string;
}

export const FibonacciPuzzle: React.FC<FibonacciPuzzleProps> = ({ puzzle }) => {
  const [method, setMethod] = useState<'recursive' | 'iterative' | 'memoization'>('recursive');
  const [n, setN] = useState(5);
  const [inputValueN, setInputValueN] = useState('5');
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1000); // ms per major step
  
  // Recursive state
  const [treeNodes, setTreeNodes] = useState<TreeNode[]>([]);
  const [currentRecursiveCall, setCurrentRecursiveCall] = useState<string | null>(null); // For message display

  // Iterative state
  const [iterativeDisplaySteps, setIterativeDisplaySteps] = useState<IterativeStepDisplay[]>([]);
  const [currentIterativeFrame, setCurrentIterativeFrame] = useState(0);

  // Memoization state
  const [memoTable, setMemoTable] = useState<Record<number, number>>({});
  const [memoizationDisplaySteps, setMemoizationDisplaySteps] = useState<MemoizationStepDisplay[]>([]);
  const [currentMemoFrame, setCurrentMemoFrame] = useState(0);

  const [calls, setCalls] = useState(0);
  const [finalResult, setFinalResult] = useState<number | null>(null);
  const [codeHighlights, setCodeHighlights] = useState<number[]>([]);
  const [animationComplete, setAnimationComplete] = useState(false);

  const MAX_N_RECURSIVE = 8; // Max N for recursive to prevent performance issues/too large tree
  const MAX_N_OTHERS = 20;  // Max N for iterative/memo

  const handleNChange = () => {
    const newN = parseInt(inputValueN, 10);
    let maxN = MAX_N_OTHERS;
    if (method === 'recursive') maxN = MAX_N_RECURSIVE;

    if (!isNaN(newN) && newN >= 0 && newN <= maxN) {
      setN(newN);
    } else {
      setInputValueN(String(n)); // Reset to current valid n
      alert(`For ${method} method, N must be between 0 and ${maxN}.`);
    }
    resetVisualization();
  };
  
  useEffect(() => { // Reset N input if method changes and N is out of bounds
    let maxN = MAX_N_OTHERS;
    if (method === 'recursive') maxN = MAX_N_RECURSIVE;
    if (n > maxN) {
        setN(maxN);
        setInputValueN(String(maxN));
    }
    resetVisualization();
  }, [method]);


  const resetVisualization = useCallback(() => {
    setIsAnimating(false);
    setCalls(0);
    setFinalResult(null);
    setCodeHighlights([]);
    setAnimationComplete(false);
    
    setTreeNodes([]);
    setCurrentRecursiveCall(null);
    
    setIterativeDisplaySteps([]);
    setCurrentIterativeFrame(0);
    
    setMemoTable({});
    setMemoizationDisplaySteps([]);
    setCurrentMemoFrame(0);
  }, []);
  
  // --- Recursive Tree Generation ---
  const generateTreeData = (val: number, x: number, y: number, level: number, parentId: string | null = null, path: string = 'root'): TreeNode => {
    const id = `${path}-${val}-${level}-${Math.random().toString(16).slice(2,8)}`;
    const node: TreeNode = { id, value: val, x, y, level, parent: parentId, children: [], visited: false, computing: false, result: null };
    if (val > 1) {
      const childrenY = y + 70 + Math.min(level * 5, 30); // Increase Y spacing with depth, capped
      const childrenXSpread = Math.max(150 / (level + 1.5), 35 - level*2); // Decrease X spread with depth
      node.children.push(generateTreeData(val - 1, x - childrenXSpread, childrenY, level + 1, id, `${id}_L`));
      node.children.push(generateTreeData(val - 2, x + childrenXSpread, childrenY, level + 1, id, `${id}_R`));
    }
    return node;
  };

  const updateNodeState = (nodes: TreeNode[], nodeId: string, updates: Partial<TreeNode>): TreeNode[] => {
    return nodes.map(node => node.id === nodeId ? { ...node, ...updates } : node);
  };

  const flattenTree = (node: TreeNode): TreeNode[] => {
    let nodes = [node];
    node.children.forEach(child => nodes = nodes.concat(flattenTree(child)));
    return nodes;
  };
  
  // --- Animation Logic ---
  const animateRecursive = async (currentN: number) => {
    resetVisualization();
    const rootNode = generateTreeData(currentN, 350, 50, 0);
    let flatTree = flattenTree(rootNode);
    setTreeNodes(flatTree);
    
    let callCount = 0;

    const fibRecursiveStep = async (nodeId: string): Promise<number> => {
      if (!isAnimatingRef.current) throw new Error("Animation stopped");
      
      let currentNode = treeNodesRef.current.find(n => n.id === nodeId)!;
      callCount++;
      setCalls(callCount);
      setCurrentRecursiveCall(`Computing F(${currentNode.value})...`);
      setCodeHighlights(currentNode.value <= 1 ? [2,3,4,5] : [6,7]);
      
      flatTree = updateNodeState(treeNodesRef.current, nodeId, { computing: true });
      setTreeNodes(flatTree);
      await delay(animationSpeed);

      if (currentNode.value <= 1) {
        const result = currentNode.value;
        flatTree = updateNodeState(treeNodesRef.current, nodeId, { result, visited: true, computing: false });
        setTreeNodes(flatTree);
        setCurrentRecursiveCall(`F(${currentNode.value}) = ${result}`);
        setCodeHighlights(currentNode.value === 0 ? [2,3] : [4,5]);
        await delay(animationSpeed / 2);
        return result;
      }
      
      // Recurse for F(n-1)
      setCodeHighlights([7]); // Highlight fib(n-1) call
      const child1Id = currentNode.children[0].id;
      const result1 = await fibRecursiveStep(child1Id);
      if (!isAnimatingRef.current) throw new Error("Animation stopped");
      
      // Recurse for F(n-2)
      flatTree = treeNodesRef.current; // Get latest tree state
      currentNode = flatTree.find(n => n.id === nodeId)!; // Re-find current node
      setCodeHighlights([7]); // Highlight fib(n-2) call (part of the same line)
      const child2Id = currentNode.children[1].id;
      const result2 = await fibRecursiveStep(child2Id);
      if (!isAnimatingRef.current) throw new Error("Animation stopped");

      const finalNodeResult = result1 + result2;
      flatTree = updateNodeState(treeNodesRef.current, nodeId, { result: finalNodeResult, visited: true, computing: false });
      setTreeNodes(flatTree);
      setCurrentRecursiveCall(`F(${currentNode.value}) = F(${currentNode.value-1}) + F(${currentNode.value-2}) = ${result1} + ${result2} = ${finalNodeResult}`);
      setCodeHighlights([7]); // Highlight return
      await delay(animationSpeed);
      return finalNodeResult;
    };
    
    try {
      const result = await fibRecursiveStep(rootNode.id);
      setFinalResult(result);
      setCurrentRecursiveCall(`Final Result for F(${currentN}) = ${result}`);
    } catch (e) { /* Animation stopped */ }
    setAnimationComplete(true);
    setIsAnimating(false);
  };
  
  const animateIterative = async (currentN: number) => {
    resetVisualization();
    const steps: IterativeStepDisplay[] = [];
    let a = 0, b = 1, currentCalls = 0;

    setCodeHighlights([2]);
    steps.push({ a, b, sequenceSnapshot: [], highlightIndex: null });
    setIterativeDisplaySteps([...steps]);
    await delay(animationSpeed);

    if (currentN === 0) {
      setCodeHighlights([2,3]);
      steps[steps.length - 1] = { ...steps[steps.length -1], sequenceSnapshot: [0], highlightIndex: 0};
      setIterativeDisplaySteps([...steps]);
      setFinalResult(0);
      setAnimationComplete(true);
      setIsAnimating(false);
      return;
    }
    
    setCodeHighlights([4]);
    steps[steps.length-1] = {...steps[steps.length-1], sequenceSnapshot: [0], highlightIndex: 0};
    setIterativeDisplaySteps([...steps]);
    await delay(animationSpeed/2);
    steps[steps.length-1] = {...steps[steps.length-1], sequenceSnapshot: [0,1], highlightIndex: 1};
    setIterativeDisplaySteps([...steps]);
    await delay(animationSpeed/2);

    if (currentN === 1) {
      setCodeHighlights([4,5]);
      setFinalResult(1);
      setAnimationComplete(true);
      setIsAnimating(false);
      return;
    }
    
    setCodeHighlights([6,7]); // a=0, b=1
    steps.push({ a, b, i:2, sequenceSnapshot: [0,1], highlightIndex: 1 }); // Frame for initial a, b
    setIterativeDisplaySteps([...steps]);
    await delay(animationSpeed);

    let currentSequence = [0,1];
    for (let i = 2; i <= currentN; i++) {
      if (!isAnimatingRef.current) break;
      currentCalls++; setCalls(currentCalls);
      setCodeHighlights([8]); // for loop
      steps.push({ a, b, i, sequenceSnapshot: [...currentSequence], highlightIndex: currentSequence.length-1 });
      setIterativeDisplaySteps([...steps]);
      await delay(animationSpeed);

      const temp = a + b;
      setCodeHighlights([9]); // a, b = b, a+b
      currentSequence.push(temp);
      steps.push({ a: b, b: temp, i, sequenceSnapshot: [...currentSequence], highlightIndex: currentSequence.length -1});
      setIterativeDisplaySteps([...steps]);
      a = b;
      b = temp;
      await delay(animationSpeed);
    }
    if (isAnimatingRef.current) {
       setCodeHighlights([10]); // return b
       setFinalResult(b);
    }
    setAnimationComplete(true);
    setIsAnimating(false);
  };

  const animateMemoization = async (currentN: number) => {
    resetVisualization();
    const localMemo: Record<number, number> = {};
    const displaySteps: MemoizationStepDisplay[] = [];
    let currentCalls = 0;

    const fibMemoStep = async (num: number): Promise<number> => {
      if (!isAnimatingRef.current) throw new Error("Animation stopped");
      currentCalls++; setCalls(currentCalls);

      displaySteps.push({num, action: 'checking_memo', message: `Checking memo for F(${num})`});
      setCodeHighlights([2]);
      setMemoizationDisplaySteps([...displaySteps]);
      setMemoTable({...localMemo});
      await delay(animationSpeed);

      if (num in localMemo) {
        displaySteps.push({num, action: 'returning_memo', value: localMemo[num], message: `F(${num}) found in memo: ${localMemo[num]}`});
        setCodeHighlights([3]);
        setMemoizationDisplaySteps([...displaySteps]);
        await delay(animationSpeed);
        return localMemo[num];
      }

      if (num <= 1) {
        displaySteps.push({num, action: 'base_case', value: num, message: `Base case for F(${num}): ${num}`});
        setCodeHighlights(num === 0 ? [4,5] : [6,7]);
        setMemoizationDisplaySteps([...displaySteps]);
        await delay(animationSpeed);
        
        localMemo[num] = num;
        displaySteps.push({num, action: 'storing_memo', value:num, message: `Storing F(${num}) = ${num} in memo`});
        setCodeHighlights([8]); // memo[n] = result
        setMemoizationDisplaySteps([...displaySteps]);
        setMemoTable({...localMemo});
        await delay(animationSpeed);
        return num;
      }
      
      displaySteps.push({num, action: 'computing', message: `Computing F(${num}) = F(${num-1}) + F(${num-2})`});
      setCodeHighlights([8]); // Line for recursive call
      setMemoizationDisplaySteps([...displaySteps]);
      await delay(animationSpeed);

      const result1 = await fibMemoStep(num - 1);
      if (!isAnimatingRef.current) throw new Error("Animation stopped");
      
      const result2 = await fibMemoStep(num - 2);
      if (!isAnimatingRef.current) throw new Error("Animation stopped");
      
      localMemo[num] = result1 + result2;
      displaySteps.push({num, action: 'storing_memo', value: localMemo[num], message: `Storing F(${num}) = ${result1} + ${result2} = ${localMemo[num]} in memo`});
      setCodeHighlights([8]); // memo[n] = result
      setMemoizationDisplaySteps([...displaySteps]);
      setMemoTable({...localMemo});
      await delay(animationSpeed);
      return localMemo[num];
    };

    try {
        const result = await fibMemoStep(currentN);
        setFinalResult(result);
        displaySteps.push({num: currentN, action: 'returning_memo', value: result, message: `Final result for F(${currentN}): ${result}`})
        setMemoizationDisplaySteps([...displaySteps]);
    } catch(e) { /* Animation stopped */ }
    setAnimationComplete(true);
    setIsAnimating(false);
  };
  
  // Refs for animation control (to access latest state in async functions)
  const isAnimatingRef = React.useRef(isAnimating);
  useEffect(() => { isAnimatingRef.current = isAnimating; }, [isAnimating]);
  const treeNodesRef = React.useRef(treeNodes);
  useEffect(() => { treeNodesRef.current = treeNodes; }, [treeNodes]);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleStart = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setAnimationComplete(false);
    if (method === 'recursive') animateRecursive(n);
    else if (method === 'iterative') animateIterative(n);
    else if (method === 'memoization') animateMemoization(n);
  };

  const handleStop = () => setIsAnimating(false);
  
  const handleStep = (direction: 'forward' | 'backward') => {
    setIsAnimating(false); // Stop autoplay if stepping
    if (method === 'iterative') {
        setCurrentIterativeFrame(prev => {
            const next = direction === 'forward' ? prev + 1 : prev - 1;
            if (next >= 0 && next < iterativeDisplaySteps.length) {
                setAnimationComplete(next === iterativeDisplaySteps.length -1);
                if (next === iterativeDisplaySteps.length -1 && iterativeDisplaySteps[next]) {
                     setFinalResult(iterativeDisplaySteps[next].b); // Assuming 'b' holds final for iterative
                }
                return next;
            }
            return prev;
        });
    } else if (method === 'memoization') {
        setCurrentMemoFrame(prev => {
            const next = direction === 'forward' ? prev + 1 : prev - 1;
             if (next >= 0 && next < memoizationDisplaySteps.length) {
                setAnimationComplete(next === memoizationDisplaySteps.length -1);
                if (next === memoizationDisplaySteps.length -1 && memoizationDisplaySteps[next]?.action.includes('returning') && memoizationDisplaySteps[next]?.num === n) {
                     setFinalResult(memoizationDisplaySteps[next].value ?? null);
                }
                return next;
            }
            return prev;
        });
    }
    // Stepping for recursive tree is complex, typically done by full play/pause/reset.
  };


  // Code display logic
  const renderCode = () => {
    let codeString = '';
    if (method === 'recursive') {
      codeString = `function fib_recursive(n):
  // Base cases
  if n == 0:
    return 0
  if n == 1:
    return 1
  // Recursive step
  return fib_recursive(n-1) + fib_recursive(n-2)`;
    } else if (method === 'iterative') {
      codeString = `function fib_iterative(n):
  // Base cases
  if n == 0: return 0
  if n == 1: return 1
  // Iterative calculation
  a = 0
  b = 1
  for i from 2 to n:
    a, b = b, a + b
  return b`;
    } else if (method === 'memoization') {
      codeString = `memo = {}
function fib_memoization(n):
  if n in memo: return memo[n]
  // Base cases
  if n == 0: result = 0
  elif n == 1: result = 1
  // Recursive step with memoization
  else: result = fib_memoization(n-1) + fib_memoization(n-2)
  memo[n] = result
  return result`;
    }
    return codeString.trim().split('\n').map((line, index) => (
      <div key={index} className={`whitespace-pre-wrap transition-colors duration-200 ${codeHighlights.includes(index + 1) ? 'bg-amber-300 dark:bg-amber-600 text-black dark:text-white rounded px-1' : ''}`}>
        <span className="mr-3 inline-block w-5 text-right text-slate-400 dark:text-slate-500 select-none">{index + 1}</span>
        {line}
      </div>
    ));
  };
  
  // Recursive Tree Visual Component
  const TreeVisualization = () => (
    <svg width="100%" height="450" viewBox="0 0 700 450" className="border dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/30 shadow-inner">
      {treeNodes.map(node => {
          const parentNode = node.parent ? treeNodes.find(p => p.id === node.parent) : null;
          return (
            <React.Fragment key={`fg-${node.id}`}>
            {parentNode && (
              <line
                key={`line-${parentNode.id}-${node.id}`}
                x1={parentNode.x} y1={parentNode.y}
                x2={node.x} y2={node.y}
                className="stroke-slate-300 dark:stroke-slate-600 transition-all duration-300" strokeWidth="1.5"
              />
            )}
            </React.Fragment>
          );
      })}
      {treeNodes.map(node => (
          <g key={`g-${node.id}`} className="transition-all duration-300">
            <circle
              cx={node.x} cy={node.y} r="18"
              className={`stroke-slate-500 dark:stroke-slate-400 transition-all duration-300
                          ${node.computing ? 'fill-amber-400 dark:fill-amber-500 animate-pulse' : node.visited ? 'fill-teal-500 dark:fill-teal-600' : 'fill-slate-200 dark:fill-slate-600'}`}
              strokeWidth="2"
            />
            <text x={node.x} y={node.y + 5} textAnchor="middle" className="text-xs font-medium fill-slate-800 dark:fill-slate-100 select-none">
              {`F(${node.value})`}
            </text>
            {node.result !== null && (
              <text x={node.x} y={node.y + 30} textAnchor="middle" className="text-xs font-bold fill-green-600 dark:fill-green-400 select-none">
                = {node.result}
              </text>
            )}
          </g>
        ))}
    </svg>
  );

  const currentIterativeData = iterativeDisplaySteps[currentIterativeFrame];
  const currentMemoData = memoizationDisplaySteps[currentMemoFrame];

  return (
    <article className="p-4 sm:p-6 bg-white dark:bg-slate-800 rounded-xl shadow-xl" aria-labelledby="fibonacci-puzzle-title">
      <h2 id="fibonacci-puzzle-title" className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4 tracking-tight">
        {puzzle.title}
      </h2>

      {/* Controls */}
      <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border dark:border-slate-700 shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div>
            <label htmlFor="fibMethod" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Algorithm:</label>
            <select id="fibMethod" value={method} onChange={e => setMethod(e.target.value as any)} disabled={isAnimating}
              className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200">
              <option value="recursive">Recursive</option>
              <option value="iterative">Iterative</option>
              <option value="memoization">Memoization</option>
            </select>
          </div>
          <div>
            <label htmlFor="fibN" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">N value (0-{method === 'recursive' ? MAX_N_RECURSIVE : MAX_N_OTHERS}):</label>
            <input type="number" id="fibN" value={inputValueN} 
                   onChange={e => setInputValueN(e.target.value)} 
                   onBlur={handleNChange}
                   onKeyPress={e => e.key === 'Enter' && handleNChange()}
                   min="0" max={method === 'recursive' ? MAX_N_RECURSIVE : MAX_N_OTHERS} disabled={isAnimating}
                   className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200" />
          </div>
          <div className="lg:col-span-2">
            <label htmlFor="fibSpeed" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Animation Speed: <span className="text-xs">({2200-animationSpeed}ms)</span></label>
            <input type="range" id="fibSpeed" min="200" max="2000" step="100" value={2200 - animationSpeed} 
                   onChange={e => setAnimationSpeed(2200 - parseInt(e.target.value))} disabled={isAnimating}
                   className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-teal-500"/>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
            <button onClick={handleStart} disabled={isAnimating || animationComplete}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg shadow-md disabled:bg-slate-400 dark:disabled:bg-slate-500 transition-colors flex items-center">
                <Play size={18} className="mr-1.5"/> {animationComplete ? 'Replay' : 'Start'}
            </button>
            <button onClick={handleStop} disabled={!isAnimating}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md disabled:bg-slate-400 dark:disabled:bg-slate-500 transition-colors flex items-center">
                <Pause size={18} className="mr-1.5"/> Stop
            </button>
            <button onClick={resetVisualization}
                className="px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white font-semibold rounded-lg shadow-md transition-colors flex items-center">
                <RotateCcw size={18} className="mr-1.5"/> Reset
            </button>
        </div>
        {(method === 'iterative' || method === 'memoization') && !isAnimatingRef.current && (iterativeDisplaySteps.length > 0 || memoizationDisplaySteps.length > 0) && (
            <div className="mt-3 flex justify-center gap-2">
                 <button onClick={() => handleStep('backward')} 
                    disabled={isAnimating || (method === 'iterative' && currentIterativeFrame === 0) || (method === 'memoization' && currentMemoFrame === 0)}
                    className="p-2 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-full shadow-md hover:bg-slate-300 dark:hover:bg-slate-500 disabled:opacity-50 transition-colors" aria-label="Previous step">
                    <SkipBackIcon size={16}/>
                </button>
                <button onClick={() => handleStep('forward')} 
                    disabled={isAnimating || (method === 'iterative' && currentIterativeFrame >= iterativeDisplaySteps.length - 1) || (method === 'memoization' && currentMemoFrame >= memoizationDisplaySteps.length - 1)}
                    className="p-2 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-full shadow-md hover:bg-slate-300 dark:hover:bg-slate-500 disabled:opacity-50 transition-colors" aria-label="Next step">
                    <SkipForwardIcon size={16}/>
                </button>
            </div>
        )}
      </div>

      {/* Stats Display */}
      <div className="my-4 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg border dark:border-slate-600 text-sm text-slate-700 dark:text-slate-200 shadow-sm">
        <span className="font-semibold">Function Calls:</span> <span className="font-mono text-teal-600 dark:text-teal-400">{calls}</span>
        {finalResult !== null && <span className="ml-4 font-semibold">Result F({n}) =</span> <span className="font-mono text-green-600 dark:text-green-400">{finalResult}</span>}
        {method === 'recursive' && currentRecursiveCall && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Status: {currentRecursiveCall}</p>}
        {method === 'iterative' && currentIterativeData && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Step {currentIterativeFrame + 1} of {iterativeDisplaySteps.length}. Status: {currentIterativeData.i ? `Loop i=${currentIterativeData.i}` : 'Initializing'}</p>}
        {method === 'memoization' && currentMemoData && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Step {currentMemoFrame + 1} of {memoizationDisplaySteps.length}. Status: {currentMemoData.message}</p>}
      </div>

      {/* Visualization Area */}
      <div className="mb-6 min-h-[300px] flex flex-col justify-center items-center">
        {method === 'recursive' && <TreeVisualization />}
        {method === 'iterative' && iterativeDisplaySteps.length > 0 && currentIterativeData && (
          <div className="w-full p-4 bg-slate-50 dark:bg-slate-800/30 rounded-lg border dark:border-slate-700">
            <p className="text-sm mb-2 text-slate-600 dark:text-slate-300">
              State: a = <span className="font-mono text-blue-500 dark:text-blue-400">{currentIterativeData.a}</span>, 
              b = <span className="font-mono text-green-500 dark:text-green-400">{currentIterativeData.b}</span>
              {currentIterativeData.i && <span className="ml-2">, i = <span className="font-mono text-purple-500 dark:text-purple-400">{currentIterativeData.i}</span></span>}
            </p>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-slate-700 dark:text-slate-200">Sequence:</span>
              {currentIterativeData.sequenceSnapshot.map((val, idx) => (
                <span key={idx} className={`px-2.5 py-1.5 rounded-md font-mono text-sm border transition-all duration-200
                  ${idx === currentIterativeData.highlightIndex ? 'bg-amber-400 dark:bg-amber-500 text-black dark:text-white border-amber-500 dark:border-amber-400 ring-2 ring-amber-500' 
                                               : 'bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-500'}`}>
                  {val}
                </span>
              ))}
            </div>
          </div>
        )}
        {method === 'memoization' && (
            <div className="w-full p-4 bg-slate-50 dark:bg-slate-800/30 rounded-lg border dark:border-slate-700">
                <h4 className="text-md font-semibold text-slate-700 dark:text-slate-200 mb-2">Memoization Table (Value: Result)</h4>
                <div className="flex flex-wrap gap-2">
                {Object.entries(memoTable).length > 0 ? 
                    Object.entries(memoTable).map(([key, val]) => (
                    <span key={`memo-${key}`} className="px-2 py-1 bg-emerald-100 dark:bg-emerald-700/50 text-emerald-700 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-600 rounded-md shadow-sm font-mono text-sm">
                        F({key}): {val}
                    </span>
                    )) : <span className="text-sm text-slate-500 dark:text-slate-400 italic">Empty</span>
                }
                </div>
                {currentMemoData && (
                    <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 p-2 rounded">
                        Current Action: {currentMemoData.message}
                    </p>
                )}
            </div>
        )}
      </div>

      {/* Code Display */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">Pseudocode:</h3>
        <div className="p-4 bg-slate-800 dark:bg-black/60 text-slate-100 dark:text-slate-200 rounded-lg font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed shadow-inner">
          {renderCode()}
        </div>
      </div>
      
      {/* Performance Notes */}
      <div className="mt-8 p-4 bg-sky-50 dark:bg-sky-800/40 border-l-4 border-sky-500 dark:border-sky-400 rounded-r-md shadow">
        <h4 className="text-md font-semibold text-sky-700 dark:text-sky-200 mb-2">Performance Insights:</h4>
        <div className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
          {method === 'recursive' && <p><b>Recursive:</b> Time O(2<sup>N</sup>), Space O(N). Inefficient due to many repeated sub-calculations (visible in the tree).</p>}
          {method === 'iterative' && <p><b>Iterative:</b> Time O(N), Space O(1). Very efficient, calculates each Fibonacci number once.</p>}
          {method === 'memoization' && <p><b>Memoization (Top-Down DP):</b> Time O(N), Space O(N). Efficient by storing results of subproblems, avoiding re-computation in recursive calls.</p>}
        </div>
      </div>

       {/* Display Hints from Puzzle Data */}
       {/*FIX: Access 'hints' directly from 'puzzle' prop as PuzzleContent doesn't have a 'data' property.*/}
       {puzzle.hints && puzzle.hints.length > 0 && (
            <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/30 border-l-4 border-amber-500 dark:border-amber-400 rounded-r-md shadow">
                <h3 className="text-lg font-semibold text-amber-700 dark:text-amber-300 mb-2">Hints:</h3>
                <ul className="list-disc list-inside text-amber-600 dark:text-amber-200 space-y-1 text-sm">
                    {/*FIX: Access 'hints' directly from 'puzzle' prop.*/}
                    {puzzle.hints.map((hint: string, index: number) => (
                    <li key={index}>{hint}</li>
                    ))}
                </ul>
            </div>
        )}

    </article>
  );
};