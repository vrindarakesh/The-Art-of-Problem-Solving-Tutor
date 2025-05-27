// components/PuzzleDisplay.tsx
// This component renders the content for a standard puzzle item.
// It allows users to view hints, the solution, and optionally provides a textarea for attempts.

import React, { useState, useEffect } from 'react';
import { PuzzleContent } from '../types'; // Type definition for puzzle content
import { LightBulbIcon } from './Icons'; // Icon for the hints button

/**
 * Props for the PuzzleDisplay component.
 */
interface PuzzleDisplayProps {
  /** The puzzle content object to be displayed. */
  puzzle: PuzzleContent;
}

/**
 * PuzzleDisplay component renders puzzle information, including problem statement,
 * an optional image, an interactive prompt with a textarea, hints, and solution steps.
 * Users can toggle the visibility of hints and the solution.
 * @param {PuzzleDisplayProps} props - The properties for the puzzle display.
 */
export const PuzzleDisplay: React.FC<PuzzleDisplayProps> = ({ puzzle }) => {
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [userAttempt, setUserAttempt] = useState('');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setShowHints(false);
    setShowSolution(false);
    setUserAttempt('');
    setImageError(false); // Reset image error state when puzzle changes
  }, [puzzle]);


  return (
    <article className="p-4 sm:p-6 bg-white rounded-xl shadow-xl dark:bg-slate-800" aria-labelledby={`puzzle-title-${puzzle.title.replace(/\s+/g, '-').toLowerCase()}`}>
      <h2 id={`puzzle-title-${puzzle.title.replace(/\s+/g, '-').toLowerCase()}`} className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6 tracking-tight">{puzzle.title}</h2>
      
      {puzzle.imageUrl && (
        <figure className="mb-6 text-center">
          {!imageError ? (
            <img 
              src={puzzle.imageUrl} 
              alt={puzzle.title || 'Puzzle image'} 
              className="w-full h-auto max-h-[400px] object-contain rounded-lg shadow-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50" 
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-[200px] flex items-center justify-center bg-slate-100 dark:bg-slate-700 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600">
              <p className="text-slate-500 dark:text-slate-400 italic">
                Image not found: {puzzle.imageUrl}
                <br/>
                <span className="text-xs">(Ensure image exists in `public/images/...` path)</span>
              </p>
            </div>
          )}
        </figure>
      )}

      <div className="mb-6 prose prose-slate dark:prose-invert max-w-none text-base sm:text-lg leading-relaxed space-y-3">
        {puzzle.problemStatement.map((paragraph, index) => (
          <p key={index}>
            {paragraph}
          </p>
        ))}
      </div>

      {puzzle.interactivePrompt && (
        <div className="my-8">
          <label htmlFor="userAttempt" className="block text-lg font-medium text-slate-700 dark:text-slate-200 mb-2">
            {puzzle.interactivePrompt}
          </label>
          <textarea
            id="userAttempt"
            rows={5}
            className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 transition-colors"
            value={userAttempt}
            onChange={(e) => setUserAttempt(e.target.value)}
            placeholder="Jot down your thoughts or solution steps here..."
            aria-label="Your attempt for the puzzle"
          />
        </div>
      )}

      <div className="space-y-6 mt-8">
        {puzzle.hints && puzzle.hints.length > 0 && (
          <div>
            <button
              onClick={() => setShowHints(!showHints)}
              aria-expanded={showHints} 
              aria-controls="hints-section"
              className="flex items-center px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
            >
              <LightBulbIcon className="w-5 h-5 mr-2" />
              {showHints ? 'Hide Hints' : 'Show Hints'}
            </button>
            {showHints && (
              <div id="hints-section" className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-500 rounded-lg space-y-2 shadow">
                <h3 className="text-lg font-semibold text-amber-700 dark:text-amber-200">Hints:</h3>
                <ul className="list-disc list-inside text-amber-600 dark:text-amber-300 space-y-1 pl-2">
                  {puzzle.hints.map((hint, index) => (
                    <li key={index}>{hint}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div>
          <button
            onClick={() => setShowSolution(!showSolution)}
            aria-expanded={showSolution} 
            aria-controls="solution-section" 
            className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
          >
            {showSolution ? 'Hide Solution' : 'Show Solution'}
          </button>
          {showSolution && (
            <div id="solution-section" className="mt-4 p-4 bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 rounded-lg space-y-3 shadow">
              <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-100">Solution Steps:</h3>
              {puzzle.solutionSteps.map((step, index) => (
                 <div key={index} className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong className="text-slate-700 dark:text-slate-200">Step {index + 1}:</strong> {step}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};