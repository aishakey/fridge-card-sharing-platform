"use client";

import { createContext, useContext, useState, useEffect } from "react";

const FridgeCardsContext = createContext();

export const FridgeCardsProvider = ({ children }) => {
  const [fridgeCards, setFridgeCards] = useState([]);

  useEffect(() => {
    const storedCards = JSON.parse(localStorage.getItem("fridgeCards")) || [];
    setFridgeCards(storedCards);
  }, []);

  useEffect(() => {
    if (fridgeCards.length > 0) {
      localStorage.setItem("fridgeCards", JSON.stringify(fridgeCards));
    } else {
    }
  }, [fridgeCards]);

  const addCardToFridge = (card) => {
    if (fridgeCards.length < 5) {
      const newFridgeCards = [...fridgeCards, card];
      setFridgeCards(newFridgeCards);
    } else {
      alert("You can only place a maximum of 5 cards on the fridge.");
    }
  };

  const removeCardFromFridge = (cardId) => {
    setFridgeCards(fridgeCards.filter((card) => card._id !== cardId));
  };

  return (
    <FridgeCardsContext.Provider
      value={{ fridgeCards, addCardToFridge, removeCardFromFridge }}
    >
      {children}
    </FridgeCardsContext.Provider>
  );
};

export const useFridgeCards = () => useContext(FridgeCardsContext);
