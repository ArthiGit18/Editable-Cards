import React from "react";
import "../TemplatesPanel.scss";

const birthdayTemplates = [
  "/assets/templates/birthday1.jpg",
  "/assets/templates/birthday2.jpg",
  "/assets/templates/birthday3.jpg",
];

const invitationTemplates = [
  "/assets/templates/invite1.jpg",
  "/assets/templates/invite2.jpg",
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

const TemplatesPanel = ({ onSelectTemplate }) => {
  const applyTemplateBackground = (img, baseTheme) => {
    onSelectTemplate({
      ...baseTheme,
      backgroundImage: img,
    });
  };

  return (
    <div className="templates-panel">
      <h3>Choose a Template</h3>

      {/* Basic theme cards */}
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

      {/* Accordion for background images */}
      <div className="accordion">
        <details>
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

        <details>
          <summary>💐 Invitation Backgrounds</summary>
          <div className="template-grid">
            {invitationTemplates.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`invite-${index}`}
                className="template-thumb"
                onClick={() =>
                  applyTemplateBackground(img, {
                    backgroundColor: "#fffaf0",
                    textColor: "#444",
                    borderRadius: 12,
                    fontSize: 17,
                    fontStyle: "normal",
                  })
                }
              />
            ))}
          </div>
        </details>

        <details>
          <summary>🎁 Thank You Backgrounds</summary>
          <div className="template-grid">
            {thankYouTemplates.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thankyou-${index}`}
                className="template-thumb"
                onClick={() =>
                  applyTemplateBackground(img, {
                    backgroundColor: "#fef9e7",
                    textColor: "#333",
                    borderRadius: 15,
                    fontSize: 16,
                    fontStyle: "italic",
                  })
                }
              />
            ))}
          </div>
        </details>
      </div>
    </div>
  );
};

export default TemplatesPanel;
