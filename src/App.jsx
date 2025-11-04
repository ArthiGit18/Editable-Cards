import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import CardPreview from "./components/CardPreview";
import TemplatesPanel from "./components/TemplatesPanel";
import "./App.scss";

const App = () => {
  const [cards, setCards] = useState([]);
  const [activeCardId, setActiveCardId] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  const addCard = () => {
    const newCard = {
      id: Date.now(),
      fields: [],
      images: [], // store images per card
      backgroundColor: "#ffffff",
      textColor: "#000000",
      borderRadius: 10,
      textAlign: "left",
      lineHeight: 1.5,
      fontSize: 16,
      fontStyle: "normal",
    };
    setCards((prev) => [...prev, newCard]);
    setActiveCardId(newCard.id);
  };

  const updateCard = (id, updates) => {
    setCards((prev) => prev.map((card) => (card.id === id ? { ...card, ...updates } : card)));
  };

  const activeCard = cards.find((c) => c.id === activeCardId) || null;

  // add a text field to the active card
  const addFieldToActiveCard = () => {
    if (!activeCard) {
      alert("Please create or select a card first.");
      return;
    }
    const newField = {
      id: Date.now(),
      text: "",
      bold: false,
      italic: false,
      fontSize: activeCard.fontSize,
      textColor: activeCard.textColor,
      topSpace: 0,
      bottomSpace: 0,
    };
    updateCard(activeCard.id, { fields: [...(activeCard.fields || []), newField] });
  };

  // upload image (dataURL) and attach to active card
  const handleUploadImage = (dataUrl) => {
    if (!activeCard) {
      alert("Please create or select a card before uploading an image.");
      return;
    }
    const newImage = {
      id: Date.now(),
      src: dataUrl,
      x: 50,
      y: 50,
      width: 80,
      rotate: 0,
    };
    updateCard(activeCard.id, { images: [...(activeCard.images || []), newImage] });
  };

  // optional: delete card / select card helpers
  const selectCard = (id) => setActiveCardId(id);

  return (
    <div className="app">
     <Sidebar
  addCard={addCard}
  showPreview={showPreview}
  setShowPreview={setShowPreview}
  showTemplates={showTemplates}
  setShowTemplates={setShowTemplates}
  activeCard={activeCard}
  updateCard={updateCard}
  onUploadImage={(src) => {
    if (activeCard) {
      const newImages = [...(activeCard.images || []), { id: Date.now(), src, x: 50, y: 50 }];
      updateCard(activeCard.id, { images: newImages });
    }
  }}
/>

      <div className="main">
        {cards.map((card) => (
          <CardPreview
            key={card.id}
            card={card}
            updateCard={updateCard}
            showPreview={showPreview}
            onSelect={() => selectCard(card.id)}
            isActive={card.id === activeCardId}
          />
        ))}

        {showPreview && cards.length > 0 && (
          <div className="preview-buttons">
            <button onClick={() => alert("Saved!")}>Save</button>
            <button onClick={() => window.print()}>Print</button>
          </div>
        )}
      </div>

      {showTemplates && <TemplatesPanel />}
    </div>
  );
};

export default App;
