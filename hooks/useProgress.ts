// hooks/useProgress.ts
// This custom React hook manages user progress throughout the application.
// It handles loading progress from localStorage, saving updates, and providing
// functions to interact with the progress data.

import { useState, useEffect, useCallback } from 'react';
import { MODULES_DATA } from '../constants'; // Data for all modules, used for initialization
import { UserProgress, ModuleProgress, QuizAttempt } from '../types'; // Type definitions

/**
 * Key used for storing user progress in localStorage.
 */
const LOCAL_STORAGE_KEY = 'ctTutorProgress';

/**
 * Initializes the progress state for all modules.
 * This function is called when no progress is found in localStorage or when resetting progress.
 * @returns {UserProgress} A UserProgress object with initial (empty) progress for each module.
 */
const initializeProgress = (): UserProgress => {
  const initialProgress: UserProgress = {};
  MODULES_DATA.forEach(module => {
    initialProgress[module.id] = {
      completedItemIds: [],    // No items completed initially
      quizAttempts: [],        // No quiz attempts initially
      currentItemIndex: 0,     // Start at the first item of each module
    };
  });
  return initialProgress;
};

/**
 * `useProgress` is a custom hook for managing user learning progress.
 * It synchronizes progress with localStorage and provides methods to update and retrieve progress.
 * @returns An object containing the current progress state and functions to modify it.
 */
export const useProgress = () => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const storedProgress = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedProgress) {
        const parsedProgress = JSON.parse(storedProgress) as UserProgress;
        const defaultProgressShell = initializeProgress(); // Get a shell with all current modules
        const mergedProgress = { ...defaultProgressShell };

        // Merge stored progress into the default shell to ensure all modules
        // defined in MODULES_DATA are present and to handle potential schema changes.
        for (const moduleId in parsedProgress) {
          if (mergedProgress.hasOwnProperty(moduleId)) { // Only process modules that exist in current MODULES_DATA
            const storedModuleProgress = parsedProgress[moduleId];
            mergedProgress[moduleId] = {
              ...defaultProgressShell[moduleId], // Start with defaults for the module
              ...storedModuleProgress,          // Override with stored values
              // Ensure completedItemIds is always an array (handles migration from old Set format if any)
              completedItemIds: Array.isArray(storedModuleProgress.completedItemIds)
                                ? storedModuleProgress.completedItemIds
                                : Array.from(storedModuleProgress.completedItemIds || []),
              // Ensure quizAttempts is always an array
              quizAttempts: Array.isArray(storedModuleProgress.quizAttempts)
                              ? storedModuleProgress.quizAttempts
                              : [],
              // Ensure currentItemIndex is a number and valid
              currentItemIndex: typeof storedModuleProgress.currentItemIndex === 'number' 
                                ? storedModuleProgress.currentItemIndex 
                                : 0,
            };
          }
        }
        return mergedProgress;
      }
    } catch (error) {
      console.error("Error loading progress from localStorage:", error);
      // Fallback to a clean initialization if loading fails
    }
    return initializeProgress(); // Initialize if no stored progress or if loading failed
  });

  /**
   * useEffect hook to save progress to localStorage whenever the `progress` state changes.
   */
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error("Error saving progress to localStorage:", error);
    }
  }, [progress]); // Dependency array: run this effect when `progress` changes.

  /**
   * Marks a specific content item as completed for a given module.
   * Uses useCallback to memoize the function for performance.
   * @param {string} moduleId - The ID of the module.
   * @param {string} itemId - The ID of the item within the module.
   */
  const markItemAsCompleted = useCallback((moduleId: string, itemId: string) => {
    setProgress(prevProgress => {
      const currentModuleProgress = prevProgress[moduleId] || { completedItemIds: [], quizAttempts: [], currentItemIndex: 0 };
      const fullItemId = `${moduleId}_${itemId}`; // Create a fully qualified item ID

      // Add item to completed list only if it's not already there
      if (!currentModuleProgress.completedItemIds.includes(fullItemId)) {
        return {
          ...prevProgress,
          [moduleId]: {
            ...currentModuleProgress,
            completedItemIds: [...currentModuleProgress.completedItemIds, fullItemId],
          },
        };
      }
      return prevProgress; // Return previous state if no change
    });
  }, []); // Empty dependency array means this function is created once and memoized.

  /**
   * Records an attempt for a quiz item.
   * Uses useCallback to memoize the function.
   * @param {string} moduleId - The ID of the module.
   * @param {string} itemId - The ID of the quiz item.
   * @param {number} score - The score achieved in the quiz (0-100).
   * @param {boolean} passed - Whether the quiz was passed.
   */
  const recordQuizAttempt = useCallback((moduleId: string, itemId: string, score: number, passed: boolean) => {
    setProgress(prevProgress => {
      const currentModuleProgress = prevProgress[moduleId] || { completedItemIds: [], quizAttempts: [], currentItemIndex: 0 };
      const attempt: QuizAttempt = { 
        itemId: `${moduleId}_${itemId}`, // Fully qualified item ID
        score, 
        passed, 
        timestamp: Date.now() 
      };
      return {
        ...prevProgress,
        [moduleId]: {
          ...currentModuleProgress,
          quizAttempts: [...currentModuleProgress.quizAttempts, attempt],
        },
      };
    });
  }, []);

  /**
   * Retrieves the current item index for a specific module.
   * Uses useCallback to memoize the function.
   * @param {string} moduleId - The ID of the module.
   * @returns {number} The current item index, or 0 if not found.
   */
  const getCurrentItemIndex = useCallback((moduleId: string): number => {
    return progress[moduleId]?.currentItemIndex || 0;
  }, [progress]); // Depends on `progress` state.

  /**
   * Sets the current item index for a specific module.
   * Used for navigation within a module.
   * Uses useCallback to memoize the function.
   * @param {string} moduleId - The ID of the module.
   * @param {number} index - The new current item index.
   */
  const setCurrentItemIndex = useCallback((moduleId: string, index: number) => {
    setProgress(prevProgress => ({
      ...prevProgress,
      [moduleId]: {
        ...(prevProgress[moduleId] || { completedItemIds: [], quizAttempts: [], currentItemIndex: 0 }),
        currentItemIndex: index,
      },
    }));
  }, []);
  
  /**
   * Retrieves the entire progress object for a specific module.
   * Uses useCallback to memoize the function.
   * @param {string} moduleId - The ID of the module.
   * @returns {ModuleProgress | undefined} The progress data for the module, or undefined if not found.
   */
  const getModuleProgress = useCallback((moduleId: string): ModuleProgress | undefined => {
    return progress[moduleId];
  }, [progress]); // Depends on `progress` state.

  /**
   * Resets all user progress back to the initial state.
   * This clears localStorage and resets the `progress` state.
   * Uses useCallback to memoize the function.
   */
  const resetProgress = useCallback(() => {
    const freshProgress = initializeProgress(); // Get a completely new, clean progress object
    try {
      // Synchronously update localStorage to ensure the reset persists immediately,
      // especially important if the page were to be closed or refreshed right after.
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(freshProgress));
    } catch (error) {
      console.error("Error saving fresh progress to localStorage during reset:", error);
    }
    // Update React state. This will trigger the useEffect above to save to localStorage again (redundant but safe),
    // and will cause components consuming this hook to re-render with the fresh progress.
    setProgress(freshProgress);
  }, [setProgress]); // `setProgress` is stable, so this is effectively memoized once.

  // Expose the progress state and action functions.
  return { 
    progress, 
    markItemAsCompleted, 
    recordQuizAttempt, 
    getCurrentItemIndex, 
    setCurrentItemIndex, 
    getModuleProgress, 
    resetProgress 
  };
};
