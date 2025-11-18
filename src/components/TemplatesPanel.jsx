import React, { useState } from "react";
import "../TemplatesPanel.scss";

const birthdayTemplates = [
  "/assets/bd/1.jpeg",
  "/assets/bd/2.jpeg",
  "/assets/bd/3.jpeg",
  "/assets/bd/4.jpg",
  "/assets/bd/5.jpg",
];

const natureTemplates = [
  "/assets/bd/7.jpg",
  "/assets/bd/8.jpg",
  "/assets/bd/9.jpg",
  "/assets/bd/11.jpg",
  "/assets/bd/22.jpg",
];

const invitationTemplates = [
  "/assets/bd/33.jpg",
  "/assets/bd/44.jpg",
  "/assets/bd/55.jpg",
  "/assets/bd/66.jpg",
];

const thankYouTemplates = [
  "/assets/templates/thankyou1.jpg",
  "/assets/templates/thankyou2.jpg",
];

const templates = [
  {
    id: 1,
    name: "Birthday Theme",
    backgroundColor: "#ffe0f0",
    textColor: "#d63384",
    borderRadius: 20,
    fontSize: 18,
    fontStyle: "italic",
    preview: "/assets/1.jpg",
  },
  {
    id: 2,
    name: "Classic White",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    borderRadius: 8,
    fontSize: 16,
    fontStyle: "normal",
    preview: "/assets/4.jpg",
  },
  {
    id: 3,
    name: "Nature Theme",
    backgroundColor: "#e6ffe6",
    textColor: "#006400",
    borderRadius: 15,
    fontSize: 17,
    fontStyle: "normal",
    preview: "/assets/2.jpg",
  },
  {
    id: 4,
    name: "Dark Mode",
    backgroundColor: "#1e1e1e",
    textColor: "#f5f5f5",
    borderRadius: 12,
    fontSize: 16,
    fontStyle: "normal",
    preview: "/assets/3.jpg",
  },
];

const TemplatesPanel = ({ onSelectTemplate, cards, setCards, selectedCardId }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const applyTemplateBackground = (img, styleOptions = {}) => {
    if (!selectedCardId) {
      alert("Please select or create a card first!");
      return;
    }

    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === selectedCardId
          ? {
              ...card,
              backgroundImage: `url(${img})`,
              backgroundColor: styleOptions.backgroundColor || "#fff",
              textColor: styleOptions.textColor || "#000",
              borderRadius: styleOptions.borderRadius || 10,
              fontSize: styleOptions.fontSize || 16,
              fontStyle: styleOptions.fontStyle || "normal",
            }
          : card
      )
    );
  };

  return (
    <div className={`templates-panel ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-btn-slide" onClick={() => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? "›" : "‹"}
      </div>

      <div className="templates-content">
        <h3>Choose a Template</h3>

        <div className="template-list">
          {templates.map((template) => (
            <div
              key={template.id}
              className="template-card"
              onClick={() => onSelectTemplate(template)}
            >
              <img src={template.preview} alt={template.name} />
              <p>{template.name}</p>
            </div>
          ))}
        </div>

        <div className="accordion">
          <details open>
            <summary>🎂 Birthday Backgrounds</summary>
            <div className="template-grid">
              {birthdayTemplates.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`birthday-${index}`}
                  className="template-thumb"
                  onClick={() =>
                    applyTemplateBackground(img, {
                      backgroundColor: "#ffe0f0",
                      textColor: "#d63384",
                      borderRadius: 20,
                      fontSize: 18,
                      fontStyle: "italic",
                    })
                  }
                />
              ))}
            </div>
          </details>

          <details open>
            <summary>🍀 Nature Backgrounds</summary>
            <div className="template-grid">
              {natureTemplates.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`nature-${index}`}
                  className="template-thumb"
                  onClick={() =>
                    applyTemplateBackground(img, {
                      backgroundColor: "#e6ffe6",
                      textColor: "#006400",
                      borderRadius: 15,
                    })
                  }
                />
              ))}
            </div>
          </details>

          <details>
            <summary>💌 Invitation Backgrounds</summary>
            <div className="template-grid">
              {invitationTemplates.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`invite-${index}`}
                  className="template-thumb"
                  onClick={() =>
                    applyTemplateBackground(img, {
                      backgroundColor: "#e0f7ff",
                      textColor: "#0077b6",
                      borderRadius: 15,
                    })
                  }
                />
              ))}
            </div>
          </details>

          <details>
            <summary>🙏 Thank You Backgrounds</summary>
            <div className="template-grid">
              {thankYouTemplates.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`thankyou-${index}`}
                  className="template-thumb"
                  onClick={() =>
                    applyTemplateBackground(img, {
                      backgroundColor: "#fff8e1",
                      textColor: "#795548",
                      borderRadius: 25,
                    })
                  }
                />
              ))}
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default TemplatesPanel;
