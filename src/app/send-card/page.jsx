"use client";

import { useState } from "react";
import ProgressTracker from "@/components/progress-tracker/ProgressTracker";
import CreateCard from "@/components/create-card/CreateCard";
import ChooseRecipient from "@/components/choose-recipient/ChooseRecipient";
import ReviewSend from "@/components/review-send/ReviewSend";

const stepComponents = [CreateCard, ChooseRecipient, ReviewSend];

export default function SendCardPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [cardData, setCardData] = useState({
    image: null,
    text: "",
    recipient: "",
  });

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, stepComponents.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const updateCardData = (data) => {
    setCardData({ ...cardData, ...data });
  };

  const CurrentStepComponent = stepComponents[currentStep];

  return (
    <div className="bg-darker-custom min-h-screen">
      <ProgressTracker currentStep={currentStep} />
      <CurrentStepComponent
        onNext={nextStep}
        onPrev={prevStep}
        onCardDataChange={updateCardData}
        cardData={cardData}
      />
    </div>
  );
}
