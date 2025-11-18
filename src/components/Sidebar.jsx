import React, { useState } from "react";
import "../App.scss";

const emojis = ["😊", "🎉", "🌸", "🔥", "❤️", "🌟", "🐱", "🦋", "🍀"];

const Sidebar = ({
    addCard,
    showPreview,
    setShowPreview,
    showTemplates,
    setShowTemplates,
    activeCard,
    updateCard,
    onUploadImage,
}) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleStyleChange = (field, value) => {
        if (!activeCard) return;
        updateCard(activeCard.id, { [field]: value });
    };

    return (
        <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
            <div className="sidebar-section">
                <h3>Custom Field Palette</h3>
                <button onClick={addCard}>+ Add Card</button>

                {activeCard && !isCollapsed && (
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

                        <div className="sidebar-section">
                            <h4>Emojis</h4>
                            <div className="emoji-library">
                                {emojis.map((emoji, i) => (
                                    <span
                                        key={i}
                                        className="emoji"
                                        draggable
                                        onDragStart={(e) => {
                                            e.dataTransfer.setData("emoji", emoji);
                                        }}
                                    >
                                        {emoji}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>

            {!isCollapsed && (
                <div className="main-btns">
                    <button onClick={() => setShowPreview(!showPreview)}>
                        {showPreview ? "Exit Preview" : "Preview"}
                    </button>

                
                </div>
            )}

            <div
                className="sidebar-btn-slide"
                onClick={() => setIsCollapsed((prev) => !prev)}
            >
                {isCollapsed ? "›" : "‹"}
            </div>
        </div>
    );
};

export default Sidebar;
