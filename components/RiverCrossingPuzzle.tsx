// components/RiverCrossingPuzzle.tsx
// Integrates user-provided FarmerPuzzleSolver logic for the correct 7-move solution.
// Refactored for application theme and improved animation handling.

import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, RotateCcw, Play, Pause } from 'lucide-react';

// Corrected 14-step (0-indexed) solution array for the Farmer, Fox, Hen, Grain puzzle.
// UI Step 13 (array index 12) now correctly shows Farmer and Hen in the boat departing.
const steps = [
  { // 0: Initial State
    leftSide: ['fox', 'hen', 'grain'], rightSide: [], farmer: 'left', boat: [],
    action: "Initial state: Everyone starts on the left side",
    explanation: "The farmer needs to get the fox, hen, and grain across the river. Boat capacity: Farmer + 1 item.",
  },
  { // 1: F+H -> (Depart Left)
    leftSide: ['fox', 'grain'], rightSide: [], farmer: 'boat', boat: ['hen'],
    action: "Move 1: Farmer takes Hen across",
    explanation: "Farmer takes Hen. Fox and Grain are safe together on the left.",
  },
  { // 2: F+H -> (Arrive Right)
    leftSide: ['fox', 'grain'], rightSide: ['hen'], farmer: 'right', boat: [],
    action: "Farmer and Hen arrive on Right Bank",
    explanation: "Hen is safely on the right with Farmer.",
  },
  { // 3: F <- (Depart Right)
    leftSide: ['fox', 'grain'], rightSide: ['hen'], farmer: 'boat', boat: [],
    action: "Move 2: Farmer returns Alone",
    explanation: "Farmer returns alone, leaving Hen safely on the right.",
  },
  { // 4: F <- (Arrive Left)
    leftSide: ['fox', 'grain'], rightSide: ['hen'], farmer: 'left', boat: [],
    action: "Farmer arrives on Left Bank",
    explanation: "Farmer is back on the left.",
  },
  { // 5: F+Fox -> (Depart Left)
    leftSide: ['grain'], rightSide: ['hen'], farmer: 'boat', boat: ['fox'],
    action: "Move 3: Farmer takes Fox across",
    explanation: "Farmer takes Fox. Grain is safe alone. Hen is safe on the other side for now.",
  },
  { // 6: F+Fox -> (Arrive Right)
    leftSide: ['grain'], rightSide: ['hen', 'fox'], farmer: 'right', boat: [],
    action: "Farmer and Fox arrive on Right Bank",
    explanation: "Fox and Hen are now together. Unsafe if Farmer leaves them!",
  },
  { // 7: F+H <- (Depart Right)
    leftSide: ['grain'], rightSide: ['fox'], farmer: 'boat', boat: ['hen'],
    action: "Move 4: Farmer brings Hen back (KEY INSIGHT!)",
    explanation: "Crucial! Farmer brings Hen back to the left, leaving Fox alone on the right.",
  },
  { // 8: F+H <- (Arrive Left)
    leftSide: ['grain', 'hen'], rightSide: ['fox'], farmer: 'left', boat: [],
    action: "Farmer and Hen return to Left Bank",
    explanation: "Now Hen and Grain are together on the left (safe). Fox is alone on the right.",
  },
  { // 9: F+Grain -> (Depart Left)
    leftSide: ['hen'], rightSide: ['fox'], farmer: 'boat', boat: ['grain'],
    action: "Move 5: Farmer takes Grain across",
    explanation: "Farmer takes Grain, leaving Hen alone on the left (safe). Fox and Grain will be together on the right.",
  },
  { // 10: F+Grain -> (Arrive Right)
    leftSide: ['hen'], rightSide: ['fox', 'grain'], farmer: 'right', boat: [],
    action: "Farmer and Grain arrive on Right Bank",
    explanation: "Fox and Grain are now on the right with Farmer. Hen is alone on the left.",
  },
  { // 11: F <- (Depart Right)
    leftSide: ['hen'], rightSide: ['fox', 'grain'], farmer: 'boat', boat: [],
    action: "Move 6: Farmer returns Alone",
    explanation: "Farmer returns alone to pick up the Hen.",
  },
  { // 12: F+H -> (Depart Left) - UI Step 13
    leftSide: [], rightSide: ['fox', 'grain'], farmer: 'boat', boat: ['hen'],
    action: "Move 7: Farmer takes Hen across (Final Trip!)",
    explanation: "Farmer is on the boat with the Hen, departing from the left bank for the final trip.",
  },
  { // 13: F+H -> (Arrive Right) - UI Step 14 (SOLVED)
    leftSide: [], rightSide: ['fox', 'hen', 'grain'], farmer: 'right', boat: [],
    action: "🎉 SOLVED! Everyone is safely across",
    explanation: "All items transported! The key was bringing Hen back (Move 4).",
  }
];


export const RiverCrossingPuzzle: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false); 

  const advanceStep = () => {
    if (currentStep < steps.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsAnimating(false);
      }, 700); 
    } else {
      setIsPlaying(false); 
    }
  };
  
  useEffect(() => {
    let timerId: number | undefined = undefined;
    if (isPlaying && !isAnimating && currentStep < steps.length - 1) {
      timerId = window.setTimeout(() => {
        advanceStep();
      }, 1800); 
    } else if (currentStep >= steps.length - 1) {
        setIsPlaying(false); 
    }
    return () => clearTimeout(timerId);
  }, [isPlaying, currentStep, isAnimating]);

  const nextStepManual = () => {
    if (!isAnimating) { 
        advanceStep();
    }
  };

  const prevStep = () => {
    if (currentStep > 0 && !isAnimating) {
      setCurrentStep(currentStep - 1);
      setIsPlaying(false); 
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setIsAnimating(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
        setIsPlaying(false);
    } else {
        if (currentStep >= steps.length - 1) { 
            reset();
        }
        setIsPlaying(true);
        if (!isAnimating && currentStep < steps.length -1) {
             advanceStep();
        }
    }
  };

  const renderCharacter = (item: string, location = 'ground') => {
    const characters: { [key: string]: { emoji: string; name: string; color: string, textColor: string } } = {
      farmer: { emoji: '👨‍🌾', name: 'Farmer', color: 'bg-amber-100 dark:bg-amber-700/50', textColor: 'text-amber-700 dark:text-amber-200' },
      fox: { emoji: '🦊', name: 'Fox', color: 'bg-orange-100 dark:bg-orange-700/50', textColor: 'text-orange-700 dark:text-orange-200' },
      hen: { emoji: '🐔', name: 'Hen', color: 'bg-yellow-100 dark:bg-yellow-700/50', textColor: 'text-yellow-700 dark:text-yellow-200' },
      grain: { emoji: '🌾', name: 'Grain', color: 'bg-lime-100 dark:bg-lime-700/50', textColor: 'text-lime-700 dark:text-lime-200' }
    };

    const char = characters[item];
    if (!char) return null;
    const isInBoat = location === 'boat';
    
    return (
      <div 
        key={`${item}-${location}-${currentStep}`}
        className={`${char.color} ${isInBoat ? 'p-1 m-0.5 md:p-1.5 md:m-1' : 'p-1.5 m-1 md:p-2 md:m-1.5'} rounded-lg shadow-md border-2 border-opacity-50 flex flex-col items-center transition-all duration-300 w-16 md:w-[70px]`}
      >
        <div className={`${isInBoat ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'}`}>{char.emoji}</div>
        {!isInBoat && <div className={`text-xs font-medium ${char.textColor} mt-0.5`}>{char.name}</div>}
      </div>
    );
  };

  const currentStepData = steps[currentStep];
  
  let boatOnLeftBank = true; 
  if (currentStepData.farmer === 'right') {
    boatOnLeftBank = false;
  } else if (currentStepData.farmer === 'boat') {
    if (currentStep > 0) {
        const prevStepData = steps[currentStep-1];
        if(prevStepData.farmer === 'left' && currentStepData.boat.length > 0) boatOnLeftBank = true; 
        else if(prevStepData.farmer === 'right' && currentStepData.boat.length > 0) boatOnLeftBank = false; 
        else boatOnLeftBank = prevStepData.farmer === 'left'; 
    }
  }


  return (
    <div className="my-6 p-3 md:p-4 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/60 shadow-lg">
      <h3 className="text-lg md:text-xl font-bold text-center mb-4 md:mb-6 text-slate-700 dark:text-slate-200 tracking-tight">
        Interactive: The Farmer, Fox, Hen & Grain
      </h3>
      
      <div className="grid grid-cols-3 gap-2 md:gap-3 items-stretch min-h-[220px] md:min-h-[280px] mb-4 md:mb-6 relative">
        <div className="bg-green-100 dark:bg-green-800/30 border-2 border-green-300 dark:border-green-600 rounded-lg p-2 md:p-3 text-center flex flex-col items-center justify-start shadow-sm">
          <h4 className="text-sm md:text-base font-semibold text-green-700 dark:text-green-300 mb-2">Left Bank</h4>
          <div className="flex flex-wrap justify-center items-start flex-grow min-h-[120px] w-full">
            {currentStepData.farmer === 'left' && renderCharacter('farmer')}
            {currentStepData.leftSide.map(item => renderCharacter(item))}
            {currentStepData.leftSide.length === 0 && currentStepData.farmer !== 'left' && (
              <div className="text-slate-500 dark:text-slate-400 italic text-xs md:text-sm mt-4 p-2">Empty</div>
            )}
          </div>
        </div>

        <div className="bg-sky-100 dark:bg-sky-800/30 border-2 border-sky-300 dark:border-sky-600 rounded-lg p-1 md:p-2 text-center flex flex-col justify-center items-center relative overflow-hidden shadow-sm">
            <h4 className="text-sm md:text-base font-semibold text-sky-700 dark:text-sky-300 mb-1 absolute top-2 left-1/2 -translate-x-1/2 w-full">River</h4>
            <div 
                className={`absolute top-1/2 transform -translate-y-1/2 transition-all duration-500 ease-in-out 
                ${boatOnLeftBank ? 'left-[15%] md:left-[20%]' : 'right-[15%] md:right-[20%]'}
                ${isAnimating && currentStepData.boat.length > 0 ? 'scale-110 animate-pulse' : 'scale-100' }
                `}
            >
                <div className={`bg-yellow-400/70 dark:bg-yellow-600/70 rounded-lg p-1 md:p-1.5 border-2 border-yellow-500 dark:border-yellow-400 shadow-lg min-w-[75px] md:min-w-[100px]`}>
                    <div className="text-xs md:text-sm text-yellow-800 dark:text-yellow-100 font-semibold mb-1 text-center">Boat</div>
                    <div className="flex flex-wrap justify-center items-center min-h-[35px] md:min-h-[50px] bg-yellow-200/50 dark:bg-yellow-400/30 rounded p-0.5">
                    {currentStepData.farmer === 'boat' && renderCharacter('farmer', 'boat')}
                    {currentStepData.boat.map(item => renderCharacter(item, 'boat'))}
                    {currentStepData.boat.length === 0 && currentStepData.farmer !== 'boat' && (
                        <div className="text-yellow-700 dark:text-yellow-200 text-xs italic p-1">Empty</div>
                    )}
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-green-100 dark:bg-green-800/30 border-2 border-green-300 dark:border-green-600 rounded-lg p-2 md:p-3 text-center flex flex-col items-center justify-start shadow-sm">
          <h4 className="text-sm md:text-base font-semibold text-green-700 dark:text-green-300 mb-2">Right Bank</h4>
          <div className="flex flex-wrap justify-center items-start flex-grow min-h-[120px] w-full">
            {currentStepData.farmer === 'right' && renderCharacter('farmer')}
            {currentStepData.rightSide.map(item => renderCharacter(item))}
             {currentStepData.rightSide.length === 0 && currentStepData.farmer !== 'right' && (
              <div className="text-slate-500 dark:text-slate-400 italic text-xs md:text-sm mt-4 p-2">Empty</div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-slate-100 dark:bg-slate-700/50 rounded-lg shadow p-3 md:p-4 mb-4 md:mb-6 border border-slate-200 dark:border-slate-600">
        <div className="text-center">
          <h5 className="text-base md:text-lg font-semibold text-slate-700 dark:text-slate-100 mb-1">
            {currentStepData.action}
          </h5>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-2 leading-relaxed">
            {currentStepData.explanation}
          </p>
          <div className="inline-block bg-teal-500 text-white px-3 py-1 rounded-full font-semibold text-xs md:text-sm shadow">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3 mb-4 md:mb-6">
        <button
          onClick={reset}
          className="flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-slate-500 hover:bg-slate-600 text-white text-xs md:text-sm font-semibold rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
          aria-label="Reset puzzle"
        >
          <RotateCcw className="w-4 h-4 mr-1.5" /> Reset
        </button>
        <button
          onClick={prevStep}
          disabled={currentStep === 0 || isAnimating}
          className="flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs md:text-sm font-semibold rounded-lg shadow-md disabled:bg-slate-400 dark:disabled:bg-slate-500 disabled:opacity-70 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
          aria-label="Previous step"
        >
          <ChevronLeft className="w-4 h-4 mr-1.5" /> Previous
        </button>
        <button
          onClick={togglePlay}
          disabled={isAnimating && isPlaying} // Only disable if animating AND trying to pause, allow play if just animating one step.
          className={`flex items-center px-4 py-1.5 md:px-5 md:py-2 text-white text-xs md:text-sm font-semibold rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 ${
            isPlaying ? 'bg-orange-500 hover:bg-orange-600 ring-orange-400' : 'bg-green-500 hover:bg-green-600 ring-green-400'
          } disabled:bg-slate-400 dark:disabled:bg-slate-500 disabled:opacity-70`}
          aria-label={isPlaying ? "Pause auto-play" : "Start auto-play"}
        >
          {isPlaying ? <Pause className="w-4 h-4 mr-1.5" /> : <Play className="w-4 h-4 mr-1.5" />}
          {isPlaying ? 'Pause' : (currentStep >= steps.length -1 ? 'Replay' : 'Play')}
        </button>
        <button
          onClick={nextStepManual}
          disabled={currentStep === steps.length - 1 || isAnimating}
          className="flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs md:text-sm font-semibold rounded-lg shadow-md disabled:bg-slate-400 dark:disabled:bg-slate-500 disabled:opacity-70 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
          aria-label="Next step"
        >
          Next <ChevronRight className="w-4 h-4 ml-1.5" />
        </button>
      </div>

      <div className="my-4 p-3 md:p-4 bg-sky-50 dark:bg-sky-800/40 border-l-4 border-sky-500 dark:border-sky-400 rounded-r-md shadow">
        <h4 className="text-md md:text-lg font-semibold text-sky-700 dark:text-sky-200 mb-2 flex items-center">
          💡 Key Ideas in This Puzzle
        </h4>
        <div className="grid md:grid-cols-2 gap-x-4 gap-y-1 text-slate-700 dark:text-slate-300 text-xs md:text-sm">
          {[
            "State Management: Tracking positions of all items.",
            "Validation Rules: Identifying unsafe item combinations.",
            "Search & Strategy: Finding a sequence of valid moves.",
            "Backtracking: Sometimes a move that seems backward is key (e.g., farmer bringing an item back).",
            "Goal Testing: Checking if all items are safely on the target bank."
          ].map(concept => (
            <div key={concept} className="flex items-start py-0.5">
              <span className="text-sky-500 dark:text-sky-400 mr-2 mt-0.5">▪</span>
              <span>{concept}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};