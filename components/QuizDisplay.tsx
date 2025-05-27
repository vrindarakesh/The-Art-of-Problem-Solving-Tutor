// components/QuizDisplay.tsx
// This component handles the rendering and interaction for a quiz item.

import React, { useState, useEffect } from 'react';
import { MODULES_DATA } from '../constants'; // Used to fetch related lesson titles
import { QuizContent, LessonContent, ContentItemType } from '../types'; // Type definitions
import { FeedbackMessage } from './FeedbackMessage'; // Component for showing success/error messages
import { CheckCircleIcon, XCircleIcon } from './Icons'; // Icons for correct/incorrect options

/**
 * Props for the QuizDisplay component.
 */
interface QuizDisplayProps {
  quiz: QuizContent;
  moduleId: string;
  itemId: string;
  onQuizComplete: (score: number, passed: boolean, feedback?: React.ReactNode) => void;
}

/**
 * QuizDisplay component renders a quiz question with multiple choice options.
 * It handles user selection, submission, scoring, and feedback display.
 * If the answer is incorrect, it can suggest related lessons for review.
 * @param {QuizDisplayProps} props - The properties for the quiz display.
 */
export const QuizDisplay: React.FC<QuizDisplayProps> = ({ quiz, moduleId, itemId, onQuizComplete }) => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [feedbackNode, setFeedbackNode] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    setSelectedOptionIndex(null);
    setSubmitted(false);
    setIsCorrect(null);
    setFeedbackNode(null);
  }, [quiz]);

  const handleSubmit = () => {
    if (selectedOptionIndex === null) return;

    const wasCorrect = quiz.options[selectedOptionIndex].isCorrect;
    setIsCorrect(wasCorrect);
    setSubmitted(true);
    
    const score = wasCorrect ? 100 : 0;
    let suggestionNode: React.ReactNode = null;

    if (!wasCorrect && quiz.relatedLessonIds && quiz.relatedLessonIds.length > 0) {
      const relatedLessons: string[] = [];
      quiz.relatedLessonIds.forEach(fullLessonId => {
        const [modId, lessonIdPart] = fullLessonId.split('_');
        const module = MODULES_DATA.find(m => m.id === modId);
        const lessonItem = module?.items.find(item => item.id === lessonIdPart && item.type === ContentItemType.LESSON);
        if (lessonItem) {
          relatedLessons.push((lessonItem.data as LessonContent).title);
        }
      });

      if (relatedLessons.length > 0) {
        suggestionNode = (
          <div className="mt-3 prose-sm">
            <p className="font-semibold">You might want to review:</p>
            <ul className="list-disc list-inside">
              {relatedLessons.map(title => <li key={title}>{title}</li>)}
            </ul>
          </div>
        );
      }
    }
    setFeedbackNode(suggestionNode);
    onQuizComplete(score, wasCorrect, suggestionNode);
  };

  return (
    <article className="p-4 sm:p-6 bg-white rounded-xl shadow-xl dark:bg-slate-800" aria-labelledby={`quiz-title-${quiz.title.replace(/\s+/g, '-').toLowerCase()}`}>
      <h2 id={`quiz-title-${quiz.title.replace(/\s+/g, '-').toLowerCase()}`} className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-3 tracking-tight">{quiz.title}</h2>
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg mb-8">{quiz.question}</p>

      <div role="radiogroup" aria-labelledby={`quiz-title-${quiz.title.replace(/\s+/g, '-').toLowerCase()}`} className="space-y-4 mb-8">
        {quiz.options.map((option, index) => {
          const isSelected = selectedOptionIndex === index;
          let optionStyle = 'border-slate-300 dark:border-slate-600 hover:border-teal-500 dark:hover:border-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 text-slate-700 dark:text-slate-200';
          let iconToShow: React.ReactNode = null;

          if (submitted) {
            if (option.isCorrect) {
              optionStyle = 'bg-green-50 dark:bg-green-900/40 border-green-500 dark:border-green-400 ring-2 ring-green-500 dark:ring-green-400 text-green-700 dark:text-green-100';
              iconToShow = <CheckCircleIcon className="w-6 h-6 text-green-500 dark:text-green-400 flex-shrink-0" />;
            } else if (isSelected && !option.isCorrect) {
              optionStyle = 'bg-red-50 dark:bg-red-900/40 border-red-500 dark:border-red-400 ring-2 ring-red-500 dark:ring-red-400 text-red-700 dark:text-red-100';
              iconToShow = <XCircleIcon className="w-6 h-6 text-red-500 dark:text-red-400 flex-shrink-0" />;
            } else {
               optionStyle = 'border-slate-300 dark:border-slate-700 opacity-60 cursor-not-allowed bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400'; 
            }
          } else if (isSelected) {
            optionStyle = 'border-teal-500 dark:border-teal-400 ring-2 ring-teal-500 dark:ring-teal-400 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-200';
          }

          return (
            <button
              key={index}
              role="radio"
              aria-checked={isSelected}
              onClick={() => !submitted && setSelectedOptionIndex(index)}
              disabled={submitted}
              className={`w-full text-left p-4 border rounded-lg transition-all duration-150 ease-in-out flex justify-between items-center shadow-sm
                ${optionStyle}
                ${!submitted ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:ring-offset-1 dark:focus:ring-offset-slate-800' : 'cursor-not-allowed'}
              `}
            >
              <span className={`font-medium text-base`}>{option.text}</span>
              {iconToShow}
            </button>
          );
        })}
      </div>

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={selectedOptionIndex === null}
          className="w-full px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg shadow-md disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-70 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
        >
          Submit Answer
        </button>
      )}

      {submitted && isCorrect !== null && (
        <div className="mt-6">
          <FeedbackMessage
            type={isCorrect ? 'success' : (feedbackNode ? 'suggestion' : 'error')}
            title={isCorrect ? 'Correct!' : (feedbackNode ? 'Needs Review' : 'Incorrect')}
            message={
              <>
                {quiz.explanation}
                {feedbackNode}
              </>
            }
          />
        </div>
      )}
    </article>
  );
};