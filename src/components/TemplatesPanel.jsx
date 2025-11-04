import React from "react";
import "../TemplatesPanel.scss";

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
  return (
    <div className="templates-panel">
      <h3>🎨 Choose a Template</h3>
      <div className="template-grid">
        {templates.map((t) => (
          <div
            key={t.id}
            className="template-card"
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              cursor: "pointer",
            }}
            onClick={() => onSelectTemplate(t)}
          >
            <img
              src={t.preview}
              alt={t.name}
              className="template-image"
              style={{
                width: "100%",
                height: "120px",
                objectFit: "cover",
                borderBottom: "2px solid #ddd",
              }}
            />
            <div
              className="template-info"
              style={{
                padding: "10px",
                textAlign: "center",
                fontWeight: "bold",
                color: t.textColor,
              }}
            >
              {t.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatesPanel;
