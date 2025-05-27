// types.ts
// This file contains all TypeScript type definitions and interfaces used throughout the application.

import React from 'react';

/**
 * Enum representing the different types of content items within a module.
 */
export enum ContentItemType {
  LESSON = 'LESSON',
  PUZZLE = 'PUZZLE',
  QUIZ = 'QUIZ',
}

/**
 * Interface for a single page within a lesson.
 * Allows lessons to be broken down into smaller, navigable segments.
 */
export interface LessonPage {
  title?: string; // Optional title for this specific page.
  paragraphs: string[]; // An array of paragraphs for this page.
  imageUrl?: string; // Optional URL for an image related to this page.
  imageCaption?: string; // Optional caption for the image.
  animationComponentName?: string; // Placeholder for a TSX animation component name relevant to this page.
  pauseForThought?: { // Optional interactive "pause for thought" section
    question: string; // The question to pause and think about.
    answerPrompt?: string; // Text for the button/link to reveal the answer (e.g., "Click to see our thoughts").
    answer: string; // The answer or thoughts related to the question.
  };
}

/**
 * Interface for the content of a lesson item.
 * Lessons are now structured as a series of pages.
 */
export interface LessonContent {
  title: string; // The overall title of the lesson.
  pages: LessonPage[]; // An array of LessonPage objects that make up the lesson.
  keyConcepts?: string[]; // Optional list of key concepts covered in the entire lesson.
}

/**
 * Interface for the content of a puzzle item.
 */
export interface PuzzleContent {
  title: string; // The title of the puzzle.
  problemStatement: string[]; // An array of paragraphs describing the puzzle.
  hints?: string[]; // Optional array of hints for solving the puzzle.
  solutionSteps: string[]; // An array of strings describing the steps to solve the puzzle.
  interactivePrompt?: string; // Optional prompt for user interaction (e.g., "Try to write down the steps...").
  imageUrl?: string; // Optional URL for an image related to the puzzle.
}

/**
 * Interface for a single option in a quiz question.
 */
export interface QuizOption {
  text: string; // The text displayed for the quiz option.
  isCorrect: boolean; // Flag indicating if this option is the correct answer.
}

/**
 * Interface for the content of a quiz item.
 */
export interface QuizContent {
  title: string; // The title of the quiz.
  question: string; // The main question text.
  options: QuizOption[]; // An array of possible answers for the quiz.
  explanation: string; // Explanation provided after the user attempts the quiz.
  relatedLessonIds?: string[]; // Optional array of fully qualified lesson IDs (e.g., "moduleId_lessonId") related to this quiz.
}

/**
 * Union type representing the data for any content item (Lesson, Puzzle, or Quiz).
 */
export type ItemData = LessonContent | PuzzleContent | QuizContent;

/**
 * Interface for a generic content item within a module.
 */
export interface ContentItem {
  id: string; // Unique identifier for the item within its module (e.g., "lesson1", "puzzle1").
  type: ContentItemType; // The type of the content item (LESSON, PUZZLE, QUIZ).
  data: ItemData; // The actual content data, specific to the item type.
}

/**
 * Interface for a learning module.
 */
export interface Module {
  id: string; // Unique identifier for the module (e.g., "module1").
  title: string; // The title of the module.
  description: string; // A short description of the module.
  longDescription?: string; // A more detailed description, often used on selection screens.
  estimatedTime: string; // Estimated time to complete the module (e.g., "2 hours", "3 weeks").
  icon?: React.FC<{ className?: string }>; // Optional SVG icon component for the module.
  items: ContentItem[]; // An array of content items that make up the module.
}

// --- User Progress related types ---

/**
 * Interface for recording a user's attempt at a quiz.
 */
export interface QuizAttempt {
  itemId: string; // Fully qualified ID of the quiz item (e.g., "moduleId_itemId").
  score: number; // Score achieved, typically a percentage (0-100).
  passed: boolean; // Whether the user passed the quiz based on the score.
  timestamp: number; // Timestamp of when the attempt was made.
}

/**
 * Interface for tracking user progress within a single module.
 */
export interface ModuleProgress {
  completedItemIds: string[]; // Array of fully qualified IDs of completed items (e.g., "moduleId_itemId").
  quizAttempts: QuizAttempt[]; // Array of all quiz attempts for this module.
  currentItemIndex: number; // Index of the last viewed or current item in the module.
}

/**
 * Interface for tracking overall user progress across all modules.
 * The keys are module IDs.
 */
export interface UserProgress {
  [moduleId: string]: ModuleProgress;
}

/**
 * Constant for the application name, used in titles and headers.
 */
export const APP_NAME = "Art of Problem Solving";