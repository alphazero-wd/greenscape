import { cn } from "@/lib/utils";
import { CheckIcon } from "@heroicons/react/24/solid";
import { steps } from "../utils";

export interface StepProps {
  curStep?: number;
}

export const Steps: React.FC<StepProps> = ({ curStep = 0 }) => {
  return (
    // set max-height for sticky position to work
    <ol className="top-10 max-h-0 max-w-xs lg:sticky">
      {steps.map((step, i) => (
        <li key={step.name} className="relative pb-10">
          {i < steps.length - 1 && (
            <div
              className={cn(
                "absolute left-4 top-4 -ml-[1px] mt-0.5 h-full w-0.5 bg-gray-800",
                curStep <= i && "bg-gray-300",
              )}
            />
          )}
          <div className="relative flex items-center">
            <span className="h-9 items-center">
              {curStep > i ? (
                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-900">
                  <CheckIcon className="h-5 w-5 text-white" />
                </span>
              ) : curStep === i ? (
                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-800 bg-white">
                  <span className="h-2.5 w-2.5 rounded-full bg-gray-900" />
                </span>
              ) : (
                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white" />
              )}
            </span>
            <span className="ml-4 flex min-w-0 flex-col text-sm">
              <span
                className={cn(
                  "font-medium",
                  curStep < i ? "text-gray-500" : "text-gray-900",
                )}
              >
                {step.name}
              </span>
              <span className="text-gray-500">{step.desc}</span>
            </span>
          </div>
        </li>
      ))}
    </ol>
  );
};
