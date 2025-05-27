// components/LessonDisplay.tsx
// This component is responsible for rendering the content of a lesson, now with pagination.

import React, { useState, useEffect } from 'react';
import { LessonContent, LessonPage } from '../types'; // Type definition for lesson content and page
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';
import { RiverCrossingPuzzle } from './RiverCrossingPuzzle'; // Import the new interactive puzzle

/**
 * Props for the LessonDisplay component.
 */
interface LessonDisplayProps {
  /** The lesson content object to be displayed. */
  lesson: LessonContent;
}

/**
 * LessonDisplay component takes lesson data (now structured with pages) and renders it.
 * It allows navigation between pages within a single lesson.
 * @param {LessonDisplayProps} props - The properties for the lesson display.
 */
export const LessonDisplay: React.FC<LessonDisplayProps> = ({ lesson }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [showPauseForThoughtAnswer, setShowPauseForThoughtAnswer] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Reset to the first page if the lesson itself changes
  useEffect(() => {
    setCurrentPageIndex(0);
    setShowPauseForThoughtAnswer(false);
    setImageError(false); // Reset image error state when lesson changes
  }, [lesson]);

  // Reset image error state when page changes
  useEffect(() => {
    setImageError(false);
    setShowPauseForThoughtAnswer(false);
  }, [currentPageIndex]);


  const currentPage: LessonPage | undefined = lesson.pages[currentPageIndex];

  if (!currentPage) {
    return <div className="p-4 text-red-600 bg-red-100 dark:bg-red-900/30 rounded-md">Error: Lesson page not found.</div>;
  }

  const handleNextPage = () => {
    if (currentPageIndex < lesson.pages.length - 1) {
      setCurrentPageIndex(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
    }
  };

  const togglePauseForThoughtAnswer = () => {
    setShowPauseForThoughtAnswer(prev => !prev);
  };

  const isLastPage = currentPageIndex === lesson.pages.length - 1;

  return (
    <article className="p-4 sm:p-6 bg-white rounded-xl shadow-xl dark:bg-slate-800" aria-labelledby={`lesson-title-${lesson.title.replace(/\s+/g, '-').toLowerCase()}`}>
      <h2 id={`lesson-title-${lesson.title.replace(/\s+/g, '-').toLowerCase()}`} className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6 tracking-tight">
        {lesson.title}
      </h2>
      
      {currentPage.title && (
        <h3 className="text-xl sm:text-2xl font-semibold text-teal-700 dark:text-teal-400 mb-4">{currentPage.title}</h3>
      )}
      
      {currentPage.imageUrl && (
        <figure className="mb-6 text-center">
          {!imageError ? (
            <img 
              src={currentPage.imageUrl} 
              alt={currentPage.imageCaption || currentPage.title || lesson.title}
              className="w-full h-auto max-h-[400px] object-contain rounded-lg shadow-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50" 
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-[200px] flex items-center justify-center bg-slate-100 dark:bg-slate-700 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600">
              <p className="text-slate-500 dark:text-slate-400 italic">
                Image not found: {currentPage.imageUrl}
                <br/>
                <span className="text-xs">(Ensure image exists in `public/images/...` path)</span>
                </p>
            </div>
          )}
          {currentPage.imageCaption && !imageError && (
            <figcaption className="text-sm text-slate-500 dark:text-slate-400 mt-2">{currentPage.imageCaption}</figcaption>
          )}
        </figure>
      )}

      {currentPage.animationComponentName === "RiverCrossingPuzzle" && <RiverCrossingPuzzle />}
      
      {currentPage.animationComponentName && currentPage.animationComponentName !== "RiverCrossingPuzzle" && (
        <div className="my-6 p-4 border-2 border-dashed border-sky-400 dark:border-sky-600 rounded-lg bg-sky-50 dark:bg-sky-900/30 text-center">
          <p className="text-sky-700 dark:text-sky-300 font-semibold">Interactive Animation Placeholder:</p>
          <p className="text-sky-600 dark:text-sky-400 text-sm">A component named <code>{currentPage.animationComponentName}</code> would be rendered here.</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">(Developer: Create this TSX component and import it into LessonDisplay to activate.)</p>
        </div>
      )}
      
      <div className="prose prose-slate dark:prose-invert max-w-none text-base sm:text-lg leading-relaxed space-y-4">
        {currentPage.paragraphs.map((paragraph, index) => (
          <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-700 dark:text-slate-200">$1</strong>') }}>
          </p>
        ))}
      </div>

      {currentPage.pauseForThought && (
        <div className="my-8 p-4 bg-amber-50 dark:bg-amber-900/30 border-l-4 border-amber-500 dark:border-amber-400 rounded-r-md shadow">
          <h4 className="font-semibold text-amber-700 dark:text-amber-300 mb-2 text-lg">🤔 Pause for Thought:</h4>
          <p className="text-amber-800 dark:text-amber-200 mb-3">{currentPage.pauseForThought.question}</p>
          <button
            onClick={togglePauseForThoughtAnswer}
            className="text-sm text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300 underline focus:outline-none font-medium"
            aria-expanded={showPauseForThoughtAnswer}
          >
            {showPauseForThoughtAnswer ? 'Hide Answer' : (currentPage.pauseForThought.answerPrompt || 'Show Answer')}
          </button>
          {showPauseForThoughtAnswer && (
            <div className="mt-3 text-sm text-amber-700 dark:text-amber-200 bg-amber-100 dark:bg-amber-800/40 p-3 rounded">
              {currentPage.pauseForThought.answer}
            </div>
          )}
        </div>
      )}
      
      {isLastPage && lesson.keyConcepts && lesson.keyConcepts.length > 0 && (
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
          <h3 className="text-lg sm:text-xl font-semibold text-slate-700 dark:text-slate-200 mb-3">Key Concepts for this Lesson:</h3>
          <ul className="list-disc list-inside space-y-1 pl-1">
            {lesson.keyConcepts.map((concept, index) => (
              <li key={index} className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">{concept}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
        <button
          onClick={handlePrevPage}
          disabled={currentPageIndex === 0}
          className="flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-600 dark:hover:bg-slate-500 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-medium rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page in lesson"
        >
          <ChevronLeftIcon className="w-4 h-4 mr-1 sm:mr-2" />
          Prev Page
        </button>
        <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Page {currentPageIndex + 1} of {lesson.pages.length}
        </span>
        <button
          onClick={handleNextPage}
          disabled={isLastPage}
          className="flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-sky-500 hover:bg-sky-600 text-white text-xs sm:text-sm font-medium rounded-md shadow-sm disabled:bg-slate-400 dark:disabled:bg-slate-500 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page in lesson"
        >
          Next Page
          <ChevronRightIcon className="w-4 h-4 ml-1 sm:ml-2" />
        </button>
      </div>
    </article>
  );
};