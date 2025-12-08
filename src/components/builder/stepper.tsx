import { cn } from "@/lib/utils";

const steps = [
  { step: 1, name: "Build Form" },
  { step: 2, name: "Design Story" },
  { step: 3, name: "Publish" },
];

interface StepperProps {
  currentStep: number;
  totalSteps: number;
  goToStep: (step: number) => void;
}

export function Stepper({ currentStep, totalSteps, goToStep }: StepperProps) {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
        {steps.map((s) => (
          <li key={s.name} className="md:flex-1">
            <button
              onClick={() => goToStep(s.step)}
              disabled={s.step > currentStep}
              className={cn(
                "group flex w-full flex-col border-l-4 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4",
                s.step < currentStep ? "border-primary hover:border-primary/80" : "",
                s.step === currentStep ? "border-primary" : "border-border",
                s.step > currentStep ? "border-gray-200 dark:border-gray-700" : ""
              )}
            >
              <span className={cn(
                "text-sm font-medium transition-colors text-left",
                s.step < currentStep ? "text-primary" : "",
                s.step === currentStep ? "text-primary" : "text-muted-foreground",
                s.step < currentStep && "group-hover:text-primary/80"
              )}>
                Step {s.step}
              </span>
              <span className="text-sm font-medium text-left">{s.name}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
