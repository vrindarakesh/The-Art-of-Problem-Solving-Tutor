// components/Icons.tsx
// This file contains stateless functional components for SVG icons used throughout the application.
// Each icon component accepts an optional `className` prop for styling with Tailwind CSS.

import React from 'react';

/**
 * Props for icon components.
 */
interface IconProps {
  /** Optional CSS class name(s) for styling the SVG element. Defaults to "w-5 h-5" or "w-6 h-6". */
  className?: string;
}

/**
 * ChevronLeftIcon component. Displays a left-pointing chevron.
 * @param {IconProps} props - Component props.
 */
export const ChevronLeftIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

/**
 * ChevronRightIcon component. Displays a right-pointing chevron.
 * @param {IconProps} props - Component props.
 */
export const ChevronRightIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

/**
 * HomeIcon component. Displays a home symbol.
 * @param {IconProps} props - Component props.
 */
export const HomeIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
  </svg>
);

/**
 * CheckCircleIcon component. Displays a check mark within a circle.
 * @param {IconProps} props - Component props.
 */
export const CheckCircleIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

/**
 * XCircleIcon component. Displays an 'X' mark within a circle.
 * @param {IconProps} props - Component props.
 */
export const XCircleIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

/**
 * LightBulbIcon component. Displays a light bulb, often used for hints or ideas.
 * @param {IconProps} props - Component props.
 */
export const LightBulbIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311V21m-3.75-2.311V21m0 0a3 3 0 01-3-3V6.75a3 3 0 013-3h3a3 3 0 013 3v6.75a3 3 0 01-3 3H9z" />
  </svg>
);

/**
 * BookOpenIcon component. Displays an open book, often used for lessons or documentation.
 * @param {IconProps} props - Component props.
 */
export const BookOpenIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
);

/**
 * PuzzlePieceIcon component. Displays a puzzle piece, used for puzzle activities.
 * @param {IconProps} props - Component props.
 */
export const PuzzlePieceIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.75a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0V9A.75.75 0 0018 8.25h-1.5a.75.75 0 00-.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0115 7.5h-1.5a.75.75 0 01-.75-.75zm-3.75-.75A.75.75 0 009.75 6H6a.75.75 0 00-.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 014.5 6h1.5a.75.75 0 01.75.75v1.5a.75.75 0 001.5 0V6.75a.75.75 0 00-.75-.75H6a.75.75 0 00-.75.75V9a.75.75 0 01-1.5 0V7.5A2.25 2.25 0 016 5.25h4.5A2.25 2.25 0 0112.75 7.5v1.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75V6zm-1.5 6.75a.75.75 0 00-.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75h1.5zm3 0a.75.75 0 00-.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75h1.5zM9 12.75a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0V15a.75.75 0 00-.75-.75h-1.5a.75.75 0 00-.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 014.5 15h1.5a.75.75 0 01.75.75v1.5a.75.75 0 001.5 0v-1.5A.75.75 0 019 12.75zm6 0a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0V15a.75.75 0 00-.75-.75h-1.5a.75.75 0 00-.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v1.5a.75.75 0 001.5 0v-1.5A.75.75 0 0115 12.75z" />
    </svg>
);

/**
 * QuestionMarkCircleIcon component. Displays a question mark within a circle, used for quizzes or help.
 * @param {IconProps} props - Component props.
 */
export const QuestionMarkCircleIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </svg>
);

/**
 * BeakerIcon component. Displays a beaker, often used for experiments or scientific topics.
 * @param {IconProps} props - Component props.
 */
export const BeakerIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 4.5A.75.75 0 0013.5 3.75H10.5A.75.75 0 009.75 4.5v.75c0 .048.006.095.017.141L6.017 13.5H5.25a.75.75 0 000 1.5h13.5a.75.75 0 000-1.5h-.767L14.233 5.391c.01-.046.017-.093.017-.141v-.75zM12 15V9.75m-2.025 5.25h4.05" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 17.25h16.5M5.25 20.25h13.5" />
  </svg>
);

/**
 * ArrowPathIcon component. Displays a circular arrow, often used for reset or refresh actions.
 * @param {IconProps} props - Component props.
 */
export const ArrowPathIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

/**
 * AcademicCapIcon component. Displays an academic cap (graduation hat), symbolizing learning or achievement.
 * @param {IconProps} props - Component props.
 */
export const AcademicCapIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg>
);

/**
 * CpuChipIcon component. Displays a CPU chip, symbolizing computation or technology.
 * @param {IconProps} props - Component props.
 */
export const CpuChipIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75v4.5m0-4.5h-4.5m4.5 0L15 9M20.25 20.25v-4.5m0 4.5h-4.5m4.5 0L15 15M9 3.75h6M9 20.25h6M3.75 9v6M20.25 9v6M7.5 7.5h9v9h-9v-9z" />
  </svg>
);

/**
 * AdjustmentsHorizontalIcon component. Displays sliders or adjustment controls.
 * @param {IconProps} props - Component props.
 */
export const AdjustmentsHorizontalIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
  </svg>
);

/**
 * XMarkIcon component. Simple X mark, often for closing UI elements.
 * @param {IconProps} props - Component props.
 */
export const XMarkIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

/**
 * BrainIcon component. Symbolizes thought, AI, or learning.
 * @param {IconProps} props - Component props.
 */
export const BrainIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.39m3.421 1.756a15.975 15.975 0 001.622-3.389m3.421 1.756a15.975 15.975 0 001.622-3.389m-3.421-1.756a15.994 15.994 0 01-1.622-3.39m-5.043 5.025a15.998 15.998 0 00-3.388-1.621m0 0A15.998 15.998 0 013 6.632m12.998 3.868c.318-.172.624-.363.921-.566m-3.421 4.245a15.975 15.975 0 00.218-4.795m0 0A15.975 15.975 0 005.632 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

/**
 * CodeIcon component. Represents programming or code. (Using CodeBracketIcon from Heroicons)
 * @param {IconProps} props - Component props.
 */
export const CodeIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
);

/**
 * ServerIcon component. Represents databases, networking, or backend systems.
 * @param {IconProps} props - Component props.
 */
export const ServerIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3V7.5a3 3 0 013-3h13.5a3 3 0 013 3v3.75a3 3 0 01-3 3m-13.5 0v1.5a3 3 0 003 3h7.5a3 3 0 003-3v-1.5" />
    </svg>
);

/**
 * ShieldCheckIcon component. Represents security or cybersecurity.
 * @param {IconProps} props - Component props.
 */
export const ShieldCheckIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
    </svg>
);