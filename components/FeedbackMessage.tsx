// components/FeedbackMessage.tsx
// A reusable component for displaying feedback messages (e.g., success, error, info).

import React from 'react';
import { CheckCircleIcon, XCircleIcon, LightBulbIcon, XMarkIcon } from './Icons'; // Icons for different message types

/**
 * Props for the FeedbackMessage component.
 */
interface FeedbackMessageProps {
  /** The type of feedback message, determining its styling and icon. */
  type: 'success' | 'error' | 'info' | 'suggestion';
  /** Optional title for the feedback message. */
  title?: string;
  /** The main content of the feedback message. Can be a string or ReactNode for richer content. */
  message: string | React.ReactNode;
  /** Optional callback function to be invoked when the close button is clicked. If not provided, the close button is not shown. */
  onClose?: () => void;
}

/**
 * FeedbackMessage component renders a styled message box for user feedback.
 * It supports different types (success, error, info, suggestion) with corresponding icons and colors.
 * @param {FeedbackMessageProps} props - The properties for the feedback message.
 */
export const FeedbackMessage: React.FC<FeedbackMessageProps> = ({ type, title, message, onClose }) => {
  let bgColor: string, borderColor: string, textColor: string, iconColor: string, IconComponent: React.FC<{ className?: string }>;

  // Determine styling and icon based on the message type, aligned with new theme.
  switch (type) {
    case 'success':
      bgColor = 'bg-green-50 dark:bg-green-900/50'; // Brighter dark mode success
      borderColor = 'border-green-500 dark:border-green-400';
      textColor = 'text-green-700 dark:text-green-200';
      iconColor = 'text-green-500 dark:text-green-400';
      IconComponent = CheckCircleIcon;
      break;
    case 'error':
      bgColor = 'bg-red-50 dark:bg-red-900/50'; // Brighter dark mode error
      borderColor = 'border-red-500 dark:border-red-400';
      textColor = 'text-red-700 dark:text-red-200';
      iconColor = 'text-red-500 dark:text-red-400';
      IconComponent = XCircleIcon;
      break;
    case 'suggestion':
      bgColor = 'bg-amber-50 dark:bg-amber-900/50'; // Amber for suggestions
      borderColor = 'border-amber-500 dark:border-amber-400';
      textColor = 'text-amber-700 dark:text-amber-200';
      iconColor = 'text-amber-500 dark:text-amber-400';
      IconComponent = LightBulbIcon;
      break;
    case 'info':
    default: // Default to 'info' style if type is unrecognized
      bgColor = 'bg-sky-50 dark:bg-sky-900/50'; // Using sky for info
      borderColor = 'border-sky-500 dark:border-sky-400';
      textColor = 'text-sky-700 dark:text-sky-200';
      iconColor = 'text-sky-500 dark:text-sky-400';
      IconComponent = LightBulbIcon; // Using LightBulb for info
      break;
  }

  return (
    // ARIA role 'alert' makes this message accessible to screen readers.
    <div className={`${bgColor} ${borderColor} border-l-4 p-4 rounded-md shadow-lg my-4`} role="alert">
      <div className="flex">
        {/* Icon container */}
        <div className="py-1">
          <IconComponent className={`w-6 h-6 ${iconColor} mr-3`} />
        </div>
        {/* Message content container */}
        <div className="flex-grow">
          {title && <p className={`font-bold text-lg ${textColor}`}>{title}</p>}
          <div className={`text-sm prose prose-sm max-w-none ${textColor}`}>{message}</div>
        </div>
        {/* Optional close button */}
        {onClose && (
          <button 
            onClick={onClose} 
            className="ml-3 -mx-1.5 -my-1.5 bg-transparent rounded-lg p-1.5 inline-flex h-8 w-8 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 dark:focus:ring-offset-current focus:outline-none" 
            aria-label="Close message" // ARIA label for accessibility
          >
            <span className="sr-only">Close</span> {/* Screen-reader only text for the button's purpose */}
            <XMarkIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};