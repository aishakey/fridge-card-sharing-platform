import Image from "next/image";

const steps = [
  {
    name: "Create",
    iconActive: "/brush-l.svg",
    iconInactive: "/brush-d.svg",
  },
  {
    name: "Choose Recipient",
    iconActive: "/rec-l.svg",
    iconInactive: "/rec-d.svg",
  },
  {
    name: "Review & Send",
    iconActive: "/rs-l.svg",
    iconInactive: "/rs-d.svg",
  },
];

export default function ProgressTracker({ currentStep }) {
  return (
    <div className="flex sm:flex-row flex-col gap-8 sm:gap-32 justify-center items-center pt-10">
      {steps.map((step, index) => (
        <div
          key={step.name}
          className={`flex items-center ${
            index === currentStep ? "text-cream-custom" : "text-[#BBBBBB]"
          }`}
        >
          <Image
            src={index === currentStep ? step.iconActive : step.iconInactive}
            alt={`${step.name} doodle`}
            width={24}
            height={24}
          />
          <span className="ml-2 text-sm sm:text-base">{step.name}</span>
        </div>
      ))}
    </div>
  );
}
