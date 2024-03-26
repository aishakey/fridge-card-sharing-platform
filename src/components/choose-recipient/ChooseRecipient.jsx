"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import debounce from "lodash/debounce";

export default function ChooseRecipient({
  onNext,
  onCardDataChange,
  cardData,
  onPrev,
}) {
  const [recipient, setRecipient] = useState("");
  const [recipients, setRecipients] = useState(cardData.recipients || []);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");

  const fetchUsers = async (query) => {
    try {
      const response = await fetch(
        `/api/search-users?q=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Failed to fetch users:", error.message);
      setSuggestions([]);
    }
  };

  const debouncedFetchUsers = debounce(fetchUsers, 300);

  useEffect(() => {
    if (recipient) {
      debouncedFetchUsers(recipient);
    } else {
      setSuggestions([]);
    }
  }, [recipient]);

  const handleAddRecipient = (suggestion) => {
    const suggestionEmailOrUsername = suggestion.email || suggestion.username;
    if (recipients.find((r) => r === suggestionEmailOrUsername)) {
      setError("Recipient already added.");
      return;
    }
    setError("");
    const updatedRecipients = [...recipients, suggestionEmailOrUsername];
    setRecipients(updatedRecipients);
    setRecipient("");
    setSuggestions([]);
    onCardDataChange({ ...cardData, recipients: updatedRecipients });
  };

  const handleNext = () => {
    if (recipients.length === 0) {
      setError("Please add at least one recipient.");
      return;
    }
    onNext();
  };

  const handleRemoveRecipient = (removedRecipient) => {
    const updatedRecipients = recipients.filter((r) => r !== removedRecipient);
    setRecipients(updatedRecipients);
    onCardDataChange({ ...cardData, recipients: updatedRecipients });
  };

  return (
    <div className="flex flex-col items-center mt-20 md:mt-32 pb-28 md:pb-56 space-y-10 md:mr-6">
      {error && <div className="text-red-500 -mt-6 mb-4">{error}</div>}
      <p className="text-2xl text-center text-cream-custom mb-4">
        Send the card to:
      </p>
      <div className="relative w-4/5 md:w-2/5">
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Email or username"
          className="p-3 border rounded-lg bg-dark-custom text-cream-custom focus:outline-none focus:ring-2 focus:ring-cream-custom w-full"
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-10 list-none bg-white border rounded-lg mt-1 w-full">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="cursor-pointer p-2 hover:bg-gray-200"
                onClick={() => handleAddRecipient(suggestion)}
              >
                {suggestion.username} - {suggestion.email}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex justify-center gap-12 mt-4">
        <button onClick={onPrev} className="transform scale-x-[-1]">
          <Image
            src="/round-arrow-btn.svg"
            alt="Previous"
            width={40}
            height={24}
          />
        </button>
        <button onClick={handleNext}>
          <Image src="/round-arrow-btn.svg" alt="Next" width={40} height={24} />
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-12 sm:px-0 gap-4 mt-4">
        {recipients.map((recipient, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-2 border rounded-lg"
          >
            <span className="text-sm text-cream-custom truncate">
              {recipient}
            </span>
            <button
              onClick={() => handleRemoveRecipient(recipient)}
              className="ml-4 text-xs font-bold rounded-lg p-2 md:p-0 bg-cherry-main md:bg-transparent text-cream-custom md:text-cherry-main md:hover:text-red-700 md:rounded-none"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
