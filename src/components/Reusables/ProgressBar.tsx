import React from "react";

interface ProgressBarProps {
  step: number;
}

export const ProgressBar = ({ step }: ProgressBarProps) => {
  const steps = ["Step 1", "Step 2", "Complete"];

  return (
    <div className="flex items-center justify-center my-4">
      {steps.map((s, index) => (
        <div
          key={index}
          className={`flex items-center ${
            index < step ? "text-green-500" : "text-gray-300"
          } ${index === step ? "font-bold" : ""}`}
        >
          {s}
          {index < steps.length - 1 && <span className="mx-2">&#8594;</span>}
        </div>
      ))}
    </div>
  );
};
