import { useState } from 'react';

const useSteps = () => {
  const [step, setStep] = useState(1);
  const next = () => setStep((prev) => prev + 1);
  const prev = () => setStep((prev) => prev - 1);
  return { step, next, prev };
};

export default useSteps;
