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
      images: [],
      backgroundColor: "#ffffff",
      textColor: "#000000",
      borderRadius: 10,
      textAlign: "left",
      lineHeight: 1.5,
      fontSize: 16,
      fontStyle: "normal",
      backgroundImage: null,
    };
    setCards((prev) => [...prev, newCard]);
    setActiveCardId(newCard.id);
  };

  const updateCard = (id, updates) => {
    setCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, ...updates } : card))
    );
  };

  const deleteCard = (id) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
    if (activeCardId === id) setActiveCardId(null);
  };

  const activeCard = cards.find((c) => c.id === activeCardId) || null;

  const selectCard = (id) => setActiveCardId(id);

  return (
    <div className="app">
      {/* 🧭 Left Sidebar */}
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
            const newImages = [
              ...(activeCard.images || []),
              { id: Date.now(), src, x: 50, y: 50 },
            ];
            updateCard(activeCard.id, { images: newImages });
          }
        }}
      />

      {/* 🎨 Main Custom Area */}
      <div className="main">

        <div className="custom_card_section">
          {cards.map((card) => (
            <CardPreview
              key={card.id}
              card={card}
              updateCard={updateCard}
              showPreview={showPreview}
              onSelect={() => selectCard(card.id)}
              isActive={card.id === activeCardId}
              deleteCard={deleteCard}
            />
          ))}
        </div>
        <div className="main_preview_action">

          {showPreview && cards.length > 0 && (
            <div className="preview-buttons">
              <button className="save-btn" onClick={() => alert("Card Saved!")}>
                💾 Save
              </button>
              <button className="print-btn" onClick={() => window.print()}>
                🖨️ Print
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 📂 Right Templates Panel */}
    
        <TemplatesPanel
          cards={cards}
          setCards={setCards}
          selectedCardId={activeCardId}
          onSelectTemplate={(template) => {
            const newCard = {
              id: Date.now(),
              fields: [],
              images: [],
              backgroundColor: template.backgroundColor || "#ffffff",
              textColor: template.textColor || "#000000",
              borderRadius: template.borderRadius || 10,
              fontSize: template.fontSize || 16,
              fontStyle: template.fontStyle || "normal",
              textAlign: "left",
              lineHeight: 1.5,
              backgroundImage: template.backgroundImage || null,
            };

            setCards((prev) => [...prev, newCard]);
            setActiveCardId(newCard.id);
            setShowTemplates(false);
          }}
        />

      
    </div>
  );
};

export default App;
