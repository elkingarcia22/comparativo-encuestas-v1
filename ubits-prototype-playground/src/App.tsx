import * as React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UbitsToaster } from "@/components/feedback";
import { EncuestasDashboard } from "@/screens/EncuestasDashboard";
import { ComparativeDashboard } from "@/screens/ComparativeDashboard";
import { PlaygroundShellDemo } from "@/screens/PlaygroundShellDemo";

function App() {
  const [view, setView] = React.useState<'list' | 'comparative'>('comparative');
  const [comparisonContext, setComparisonContext] = React.useState<{
    baseId: string;
    comparativeIds: string[];
    type: string;
  } | null>(null);

  const [activeStep, setActiveStep] = React.useState<number | undefined>(undefined);
  
  const handleGenerateComparative = (baseId: string, comparativeIds: string[], type: string) => {
    setComparisonContext({ baseId, comparativeIds, type });
    setView('comparative');
    setActiveStep(undefined);
  };

  const handleExitComparative = () => {
    setView('list');
    setComparisonContext(null);
    setActiveStep(undefined);
  };

  const handleEditSelection = (step?: number) => {
    setActiveStep(step);
    setView('list');
  };

  return (
    <TooltipProvider>
      <UbitsToaster />
      {view === 'list' ? (
        <PlaygroundShellDemo>
          <EncuestasDashboard 
            key={activeStep !== undefined ? `step-${activeStep}` : 'default'}
            onGenerateComparative={handleGenerateComparative} 
            initialIsDrawerOpen={comparisonContext !== null}
            initialBaseId={comparisonContext?.baseId}
            initialComparativeIds={comparisonContext?.comparativeIds}
            initialType={comparisonContext?.type}
            initialStep={activeStep}
          />
        </PlaygroundShellDemo>
      ) : (
        <ComparativeDashboard 
          onExit={handleExitComparative} 
          onEditSelection={handleEditSelection}
          baseId={comparisonContext?.baseId}
          comparativeIds={comparisonContext?.comparativeIds}
          type={comparisonContext?.type}
        />
      )}
    </TooltipProvider>
  );
}


export default App;


