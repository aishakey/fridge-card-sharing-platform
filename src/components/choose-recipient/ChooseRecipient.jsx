export default function ChooseRecipient({
  onNext,
  onCardDataChange,
  cardData,
}) {
  // Logic for handling file selection and text input will go here

  return (
    <div>
      {/* UI for uploading an image and adding text */}
      <button onClick={onNext}>Next</button>
    </div>
  );
}
