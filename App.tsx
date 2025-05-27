// App.tsx
// This is the root component of the application.
// It manages the main view (module selector or module content) and global state like user progress.

import React, { useState, useEffect } from 'react';
import { ModuleSelector } from './components/ModuleSelector';
import { ModuleContent } from './components/ModuleContent';
import { MODULES_DATA } from './constants'; // Source of all module definitions
import { Module as ModuleType } from './types'; // Type definition for a Module
import { useProgress } from './hooks/useProgress'; // Custom hook for managing user progress

/**
 * The main App component.
 * It orchestrates the display of either the ModuleSelector or ModuleContent views
 * based on the application state. It also initializes and passes down progress data.
 */
const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'selector' | 'module'>('selector');
  const [selectedModule, setSelectedModule] = useState<ModuleType | null>(null);
  const [resetKey, setResetKey] = useState(0); // Key to force re-render of ModuleSelector on reset

  const { 
    progress, 
    markItemAsCompleted, 
    recordQuizAttempt, 
    setCurrentItemIndex,
    getModuleProgress,
    resetProgress 
  } = useProgress();

  const handleSelectModule = (moduleId: string) => {
    const module = MODULES_DATA.find(m => m.id === moduleId);
    if (module) {
      setSelectedModule(module);
      setCurrentView('module');
    }
  };

  const handleNavigateToModules = () => {
    setSelectedModule(null); 
    setCurrentView('selector'); 
  };
  
  // Effect to ensure initialItemIndex is valid when a module is selected or progress changes.
  useEffect(() => {
    if (selectedModule) {
      const moduleProg = getModuleProgress(selectedModule.id);
      const currentIdx = moduleProg?.currentItemIndex || 0;
      
      // Validate currentItemIndex against the actual items in the selected module
      if (!selectedModule.items || selectedModule.items.length === 0) {
        // Module has no items, reset index if necessary (though unlikely with current data)
        if (currentIdx !== 0) setCurrentItemIndex(selectedModule.id, 0); 
      } else if (currentIdx >= selectedModule.items.length || currentIdx < 0) {
        // Index is out of bounds, reset to 0
        setCurrentItemIndex(selectedModule.id, 0);
      }
      // If currentIdx is valid, it remains unchanged by this effect.
    }
  }, [selectedModule, getModuleProgress, setCurrentItemIndex, progress]); // Added progress as a dependency

  const handleResetProgressApp = () => {
    resetProgress(); 
    setResetKey(prevKey => prevKey + 1); 
    if (currentView === 'module') {
        handleNavigateToModules();
    }
  };

  return (
    <div className="antialiased text-slate-800 dark:text-slate-200 selection:bg-teal-300 selection:text-teal-900 dark:selection:bg-teal-600 dark:selection:text-teal-100">
      {currentView === 'selector' || !selectedModule ? (
        <ModuleSelector 
          key={resetKey} // Use key to force re-mount and re-initialization of state if needed
          onSelectModule={handleSelectModule} 
          userProgress={progress} 
          onResetProgress={handleResetProgressApp} 
        />
      ) : (
        (() => { 
          const moduleProgressData = getModuleProgress(selectedModule.id);
          let initialItemIdx = 0;
          if (selectedModule.items && selectedModule.items.length > 0 && moduleProgressData?.currentItemIndex) {
            if (moduleProgressData.currentItemIndex < selectedModule.items.length && moduleProgressData.currentItemIndex >= 0) {
                initialItemIdx = moduleProgressData.currentItemIndex;
            }
          }
          const completedItemsForModule = moduleProgressData?.completedItemIds || [];

          return (
            <ModuleContent
              module={selectedModule}
              initialItemIndex={initialItemIdx}
              onNavigateToModules={handleNavigateToModules}
              onItemComplete={markItemAsCompleted}
              onQuizAttempt={recordQuizAttempt}
              onSetCurrentItemIndex={setCurrentItemIndex}
              completedItemIds={completedItemsForModule}
            />
          );
        })()
      )}
    </div>
  );
};

export default App;