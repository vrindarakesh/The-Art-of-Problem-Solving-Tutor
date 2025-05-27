// components/ModuleContent.tsx
// This component displays the content of a single module, including its lessons, puzzles, and quizzes.
// It handles navigation between items within the module.

import React, { useState, useEffect } from 'react';
import { Module, ContentItem, ContentItemType, QuizContent, LessonContent, PuzzleContent } from '../types';
import { LessonDisplay } from './LessonDisplay';
import { PuzzleDisplay } from './PuzzleDisplay';
import { QuizDisplay } from './QuizDisplay';
import { ProgressBar } from './ProgressBar';
import { FeedbackMessage } from './FeedbackMessage';
import { ChevronLeftIcon, ChevronRightIcon, HomeIcon } from './Icons';
import { TowerOfHanoiPuzzle } from './TowerOfHanoiPuzzle'; 
import { TwoSumPuzzle } from './TwoSumPuzzle';
import { FibonacciPuzzle } from './FibonacciPuzzle';

/**
 * Props for the ModuleContent component.
 */
interface ModuleContentProps {
  module: Module;
  initialItemIndex: number;
  onNavigateToModules: () => void;
  onItemComplete: (moduleId: string, itemId: string) => void;
  onQuizAttempt: (moduleId: string, itemId: string, score: number, passed: boolean) => void;
  onSetCurrentItemIndex: (moduleId: string, index: number) => void;
  completedItemIds: string[];
}

/**
 * ModuleContent component manages the display and interaction with items within a selected module.
 */
export const ModuleContent: React.FC<ModuleContentProps> = ({
  module,
  initialItemIndex,
  onNavigateToModules,
  onItemComplete,
  onQuizAttempt,
  onSetCurrentItemIndex,
  completedItemIds
}) => {
  const [currentItemIndex, setCurrentItemIndexState] = useState(initialItemIndex);
  const [quizFeedback, setQuizFeedback] = useState<{ type: 'success' | 'error' | 'suggestion'; title?: string; message: string | React.ReactNode } | null>(null);

  useEffect(() => {
    setCurrentItemIndexState(initialItemIndex);
    setQuizFeedback(null); 
    window.scrollTo(0, 0); // Scroll to top when module or item index changes
  }, [module, initialItemIndex]);

  // Scroll to top when currentItemIndex changes by user navigation
  useEffect(() => {
    window.scrollTo(0, 0);
    setQuizFeedback(null); 
  }, [currentItemIndex]);


  const currentItem: ContentItem | undefined = module.items[currentItemIndex];

  const handleNext = () => {
    if (currentItem && currentItem.type !== ContentItemType.QUIZ &&
        !(module.id === 'module2' && currentItem.id === 'puzzle1') && 
        !(module.id === 'module2' && currentItem.id === 'puzzle2') && 
        !(module.id === 'module2' && currentItem.id === 'puzzle_fibonacci') &&
        !completedItemIds.includes(`${module.id}_${currentItem.id}`)) {
      onItemComplete(module.id, currentItem.id);
    }

    if (currentItemIndex < module.items.length - 1) {
      const nextIndex = currentItemIndex + 1;
      setCurrentItemIndexState(nextIndex);
      onSetCurrentItemIndex(module.id, nextIndex); 
    } else { 
       onNavigateToModules(); 
    }
  };

  const handlePrev = () => {
    if (currentItemIndex > 0) { 
      const prevIndex = currentItemIndex - 1;
      setCurrentItemIndexState(prevIndex);
      onSetCurrentItemIndex(module.id, prevIndex); 
    }
  };

  const handleQuizComplete = (score: number, passed: boolean, suggestionNode?: React.ReactNode) => {
    if (currentItem && currentItem.type === ContentItemType.QUIZ) {
      onQuizAttempt(module.id, currentItem.id, score, passed);
      if (!completedItemIds.includes(`${module.id}_${currentItem.id}`)) {
        onItemComplete(module.id, currentItem.id);
      }
      
      const quizData = currentItem.data as QuizContent;
      let feedbackMessage: React.ReactNode = quizData.explanation;
      if (suggestionNode) { 
        feedbackMessage = (
          <>
            {quizData.explanation}
            {suggestionNode}
          </>
        );
      }
      setQuizFeedback({
        type: passed ? 'success' : (suggestionNode ? 'suggestion' : 'error'),
        title: passed ? 'Quiz Passed!' : (suggestionNode ? 'Needs Review' : 'Incorrect Attempt'),
        message: feedbackMessage,
      });
    }
  };

  if (!currentItem) {
    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center">
            <div className="p-8 text-center text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 rounded-xl shadow-xl">
                Content not found for this item.
                <button
                    onClick={onNavigateToModules}
                    className="mt-4 flex items-center mx-auto px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg shadow-md transition-colors"
                    aria-label="Back to Modules"
                >
                    <HomeIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                    Back to Modules
                </button>
            </div>
        </div>
    );
  }

  const moduleProgressPercentage = module.items.length > 0 
    ? (completedItemIds.filter(id => id.startsWith(module.id)).length / module.items.length) * 100 
    : 0;

  const renderCurrentItem = () => {
    if (!currentItem) return null;

    switch (currentItem.type) {
      case ContentItemType.LESSON:
        return <LessonDisplay lesson={currentItem.data as LessonContent} />;
      case ContentItemType.PUZZLE:
        if (module.id === 'module2' && currentItem.id === 'puzzle1') {
          return <TowerOfHanoiPuzzle puzzle={currentItem.data as PuzzleContent} />;
        }
        if (module.id === 'module2' && currentItem.id === 'puzzle2') {
          return <TwoSumPuzzle puzzle={currentItem.data as PuzzleContent} />;
        }
        if (module.id === 'module2' && currentItem.id === 'puzzle_fibonacci') {
          return <FibonacciPuzzle puzzle={currentItem.data as PuzzleContent} />;
        }
        return <PuzzleDisplay puzzle={currentItem.data as PuzzleContent} />;
      case ContentItemType.QUIZ:
        return (
          <QuizDisplay
            quiz={currentItem.data as QuizContent}
            moduleId={module.id}
            itemId={currentItem.id}
            onQuizComplete={handleQuizComplete}
          />
        );
      default:
        return <div>Unsupported content type.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-4 sm:p-6 md:p-8 flex flex-col items-center">
      <header className="w-full max-w-4xl mb-8">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onNavigateToModules}
            className="flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-white dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-sm sm:text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            aria-label="Back to Modules"
          >
            <HomeIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-teal-500 dark:text-teal-400" aria-hidden="true" />
            All Modules
          </button>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 text-center mb-1 tracking-tight">{module.title}</h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 text-center mb-4">Item {currentItemIndex + 1} of {module.items.length} ({currentItem.type.toLowerCase()})</p>
            <ProgressBar value={moduleProgressPercentage} color="bg-teal-500" height="h-2.5" />
        </div>
      </header>

      <main className="w-full max-w-3xl flex-grow mb-8">
        {quizFeedback && (
            <FeedbackMessage 
                type={quizFeedback.type} 
                title={quizFeedback.title} 
                message={quizFeedback.message} 
                onClose={() => setQuizFeedback(null)}
            />
        )}
        {renderCurrentItem()}
      </main>

      <footer className="w-full max-w-3xl mt-auto py-4 sticky bottom-0 bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700 z-10">
        <div className="flex justify-between items-center px-2">
          <button
            onClick={handlePrev}
            disabled={currentItemIndex === 0}
            className="flex items-center px-4 py-2 sm:px-5 sm:py-2.5 bg-slate-500 hover:bg-slate-600 dark:bg-slate-600 dark:hover:bg-slate-500 text-white font-semibold rounded-lg shadow-md disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:focus:ring-offset-current text-sm sm:text-base"
            aria-label="Previous item"
          >
            <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" aria-hidden="true" />
            Previous
          </button>
          <button
            onClick={handleNext}
            className="flex items-center px-4 py-2 sm:px-5 sm:py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-current text-sm sm:text-base"
            aria-label={currentItemIndex === module.items.length - 1 ? "Finish Module and return to selector" : "Next item"}
          >
            {currentItemIndex === module.items.length - 1 ? 'Finish Module' : 'Next Item'}
            <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" aria-hidden="true" />
          </button>
        </div>
      </footer>
    </div>
  );
};