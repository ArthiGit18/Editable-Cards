import React, {useRef} from "react";
import "../App.scss";

const Sidebar = ({
  addCard,
  showPreview,
  setShowPreview,
  showTemplates,
  setShowTemplates,
  activeCard,
  updateCard,
  onAddTextField, onUploadImage 
}) => {
  const handleStyleChange = (field, value) => {
    if (!activeCard) return;
    updateCard(activeCard.id, { [field]: value });
  };

  
const fileInputRef = useRef();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onUploadImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="sidebar">
      <h3>Card Controls</h3>
      <button onClick={addCard}>+ Add Card</button>

      {activeCard && (
        <>
          <div className="style-group">
            <h4>Background Color</h4>
            <input
              type="color"
              value={activeCard.backgroundColor}
              onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
            />
          </div>

          <div className="style-group">
            <h4>Text Color</h4>
            <input
              type="color"
              value={activeCard.textColor}
              onChange={(e) => handleStyleChange("textColor", e.target.value)}
            />
          </div>

          <div className="style-group">
            <h4>Border Radius</h4>
            <input
              type="range"
              min="0"
              max="50"
              value={activeCard.borderRadius}
              onChange={(e) => handleStyleChange("borderRadius", +e.target.value)}
            />
          </div>

          <div className="style-group">
            <h4>Line Height</h4>
            <input
              type="range"
              min="1"
              max="3"
              step="0.1"
              value={activeCard.lineHeight}
              onChange={(e) => handleStyleChange("lineHeight", +e.target.value)}
            />
          </div>

          <div className="style-group">
            <h4>Font Size</h4>
            <input
              type="range"
              min="10"
              max="40"
              value={activeCard.fontSize}
              onChange={(e) => handleStyleChange("fontSize", +e.target.value)}
            />
          </div>

          <div className="style-group">
            <h4>Font Style</h4>
            <select
              value={activeCard.fontStyle}
              onChange={(e) => handleStyleChange("fontStyle", e.target.value)}
            >
              <option value="normal">Normal</option>
              <option value="italic">Italic</option>
              <option value="oblique">Oblique</option>
            </select>
          </div>

          <div className="alignment">
            <h4>Text Align</h4>
            <div className="align-buttons">
              <button onClick={() => handleStyleChange("textAlign", "left")}>L</button>
              <button onClick={() => handleStyleChange("textAlign", "center")}>C</button>
              <button onClick={() => handleStyleChange("textAlign", "right")}>R</button>
            </div>
          </div>

                <div className="section">
        <h4>Stickers / Images</h4>
        <button onClick={() => fileInputRef.current.click()}>
          Upload Image
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />
      </div>

        </>
      )}

      <button className="preview-btn" onClick={() => setShowPreview(!showPreview)}>
        {showPreview ? "Back to Edit" : "Preview"}
      </button>

      <button
        className="templates-btn"
        onClick={() => setShowTemplates(!showTemplates)}
      >
        {showTemplates ? "Close Templates" : "Templates"}
      </button>
    </div>
  );
};

export default Sidebar;
