// components/ModuleSelector.tsx
// This component displays a list of all available modules for the user to select.
// It also shows overall progress and progress for each module.

import React from 'react';
import { Module, UserProgress, APP_NAME } from '../types'; // Type definitions and app name constant
import { MODULES_DATA } from '../constants'; // The source of all module data
import { ProgressBar } from './ProgressBar'; // Component to display progress bars
import { ArrowPathIcon, CheckCircleIcon } from './Icons'; // Icons for reset and completion

/**
 * Props for the ModuleSelector component.
 */
interface ModuleSelectorProps {
  onSelectModule: (moduleId: string) => void;
  userProgress: UserProgress;
  onResetProgress: () => void;
}

/**
 * ModuleSelector component renders a grid of module cards, allowing users to
 * navigate to a specific module. It displays overall progress and individual
 * module progress. It also provides an option to reset all learning progress.
 * @param {ModuleSelectorProps} props - The properties for the module selector.
 */
export const ModuleSelector: React.FC<ModuleSelectorProps> = ({ onSelectModule, userProgress, onResetProgress }) => {
  
  const calculateModuleProgress = (moduleId: string): number => {
    const module = MODULES_DATA.find(m => m.id === moduleId);
    const progress = userProgress[moduleId]; 

    if (!module || !progress || module.items.length === 0) return 0;
    
    const completedCount = module.items.filter(item => 
      progress.completedItemIds.includes(`${moduleId}_${item.id}`)
    ).length;
    
    return (completedCount / module.items.length) * 100;
  };

  const totalModules = MODULES_DATA.length;
  const completedModulesCount = MODULES_DATA.filter(m => calculateModuleProgress(m.id) === 100).length;
  const overallProgressPercentage = totalModules > 0 ? (completedModulesCount / totalModules) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-sky-100 to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-sky-500 to-blue-600 dark:from-teal-400 dark:via-sky-400 dark:to-blue-500 pb-2 tracking-tight">
          {APP_NAME}
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          Master Computational Thinking and Problem Solving through interactive puzzles and guided lessons. Choose a module to begin your journey!
        </p>
      </header>

      <div className="max-w-4xl mx-auto mb-12 p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-200 mb-4">Overall Progress</h2>
        <ProgressBar value={overallProgressPercentage} color="bg-gradient-to-r from-green-500 to-emerald-500" height="h-3.5" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {MODULES_DATA.map((module) => {
          const moduleProgPercentage = calculateModuleProgress(module.id);
          const isModuleCompleted = moduleProgPercentage === 100;
          const IconComponent = module.icon;

          return (
            <div
              key={module.id}
              className={`bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out flex flex-col group overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-400 cursor-pointer ${isModuleCompleted ? 'ring-2 ring-green-500 dark:ring-green-400' : ''}`}
              role="button"
              tabIndex={0}
              onClick={() => onSelectModule(module.id)}
              onKeyPress={(e) => (e.key === 'Enter' || e.key === ' ') && onSelectModule(module.id)}
              aria-labelledby={`module-title-${module.id}`}
              aria-describedby={`module-desc-${module.id} module-progress-${module.id}`}
            >
              <div className="p-6 flex-grow">
                <div className="flex items-start mb-4">
                  {IconComponent && <IconComponent className="w-10 h-10 sm:w-12 sm:h-12 text-teal-500 dark:text-teal-400 mr-4 mt-1 flex-shrink-0" aria-hidden="true" />}
                  <div>
                    <h2 id={`module-title-${module.id}`} className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 leading-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {module.title}
                    </h2>
                    {isModuleCompleted && <span className="flex items-center text-xs text-green-600 dark:text-green-400 mt-1"><CheckCircleIcon className="w-4 h-4 mr-1"/>Completed</span>}
                  </div>
                </div>
                <p id={`module-desc-${module.id}`} className="text-slate-600 dark:text-slate-300 mb-3 text-sm leading-relaxed">{module.longDescription || module.description}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 italic">Estimated time: {module.estimatedTime}</p>
                <div id={`module-progress-${module.id}`} className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700">
                   <ProgressBar 
                      value={moduleProgPercentage} 
                      label="Module Progress" 
                      color={isModuleCompleted ? 'bg-green-500' : 'bg-teal-500'} 
                      height="h-2.5"
                    />
                </div>
              </div>
              <div
                className={`w-full block text-white font-semibold py-3 px-4 text-center transition-colors duration-300
                            ${isModuleCompleted ? 'bg-green-500 group-hover:bg-green-600 dark:bg-green-600 dark:group-hover:bg-green-500' 
                                               : 'bg-teal-500 group-hover:bg-teal-600 dark:bg-teal-600 dark:group-hover:bg-teal-500'}`}
              >
                {moduleProgPercentage > 0 && moduleProgPercentage < 100 ? 'Continue Module' : (isModuleCompleted ? 'Review Module' : 'Start Module')}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-20">
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to reset all your progress? This action cannot be undone.")) {
              onResetProgress();
            }
          }}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-colors flex items-center mx-auto focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
        >
          <ArrowPathIcon className="w-5 h-5 mr-2" aria-hidden="true"/>
          Reset All Progress
        </button>
      </div>
    </div>
  );
};