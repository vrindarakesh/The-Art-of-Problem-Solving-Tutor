// components/ProgressBar.tsx
// A reusable progress bar component.

import React from 'react';

/**
 * Props for the ProgressBar component.
 */
interface ProgressBarProps {
  /** The current value of the progress bar (percentage from 0 to 100). */
  value: number;
  /** Optional label text displayed above the progress bar. */
  label?: string;
  /** Optional Tailwind CSS background color class for the progress indicator. Defaults to 'bg-teal-500'. */
  color?: string;
  /** Optional height class for the progress bar. Defaults to 'h-2.5'. */
  height?: string;
}

/**
 * ProgressBar component displays a visual representation of progress.
 * It clamps the value between 0 and 100.
 * @param {ProgressBarProps} props - The properties for the progress bar.
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({ value, label, color = 'bg-teal-500', height = 'h-2.5' }) => {
  // Ensure the value is within the 0-100 range.
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <div className="w-full">
      {/* Optional label displayed above the bar */}
      {label && <div className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">{label}</div>}
      {/* Background of the progress bar */}
      <div 
        className={`w-full bg-slate-200 rounded-full ${height} dark:bg-slate-700 overflow-hidden`} 
        role="progressbar" 
        aria-valuenow={clampedValue} 
        aria-valuemin={0} 
        aria-valuemax={100} 
        aria-label={label || 'Progress'}
      >
        {/* The actual progress indicator element */}
        <div
          className={`${color} ${height} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clampedValue}%` }}
        ></div>
      </div>
      {/* Percentage text displayed below the bar */}
      { typeof value === 'number' && (
         <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 text-right">{clampedValue.toFixed(0)}% Complete</div>
      )}
    </div>
  );
};