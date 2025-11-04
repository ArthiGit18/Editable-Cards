import React from "react";
import "../App.scss";

const TemplatesPanel = () => {
  const templates = ["Birthday Card", "Invitation", "Thank You", "Minimal", "Retro"];
  return (
    <div className="templates-panel">
      <h3>Templates</h3>
      <ul>
        {templates.map((tpl, i) => (
          <li key={i}>{tpl}</li>
        ))}
      </ul>
    </div>
  );
};

export default TemplatesPanel;
