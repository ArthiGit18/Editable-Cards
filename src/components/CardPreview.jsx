import React, { useState, useEffect } from "react";
import "../App.scss";

const CardPreview = ({
  card,
  updateCard,
  showPreview,
  onSelect,
  isActive,
}) => {
  const [fields, setFields] = useState(card.fields || []);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [cardImages, setCardImages] = useState(card.images || []);

  useEffect(() => {
    updateCard(card.id, { fields, images: cardImages });
  }, [fields, cardImages]);

  /** --- TEXT FIELDS --- **/
  const addField = () => {
    const newField = {
      id: Date.now(),
      text: "",
      bold: false,
      italic: false,
      fontSize: 16,
      textColor: "#000000",
      topSpace: 0,
      bottomSpace: 0,
    };
    setFields((prev) => [...prev, newField]);
  };

  const deleteField = (id) => setFields(fields.filter((f) => f.id !== id));

  const handleChange = (id, value) =>
    setFields(fields.map((f) => (f.id === id ? { ...f, text: value } : f)));

  const updateFieldStyle = (id, changes) =>
    setFields(fields.map((f) => (f.id === id ? { ...f, ...changes } : f)));

  /** --- DRAG TEXT --- **/
  const handleDragStart = (e, type, index) => {
    e.dataTransfer.setData("dragType", type);
    e.dataTransfer.setData("index", index);
  };

  const handleDrop = (e, index) => {
    const type = e.dataTransfer.getData("dragType");
    const from = parseInt(e.dataTransfer.getData("index"), 10);

    if (type === "text") {
      const updated = [...fields];
      const [dragged] = updated.splice(from, 1);
      updated.splice(index, 0, dragged);
      setFields(updated);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  /** --- ADD IMAGE --- **/
  const addImage = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const newImg = {
        id: Date.now(),
        src: e.target.result, // base64 image for instant preview
        x: 50,
        y: 50,
      };
      setCardImages((prev) => [...prev, newImg]);
    };
    reader.readAsDataURL(file);
  };

  /** --- MOVE IMAGE --- **/
  const handleImageDrag = (e, id) => {
    const rect = e.currentTarget.parentNode.getBoundingClientRect();
    const x = e.clientX - rect.left - 40;
    const y = e.clientY - rect.top - 40;
    setCardImages((imgs) =>
      imgs.map((img) => (img.id === id ? { ...img, x, y } : img))
    );
  };

  const deleteImage = (id) =>
    setCardImages(cardImages.filter((img) => img.id !== id));

  /** --- IMAGE UPLOAD INPUT --- **/
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) addImage(file);
  };

  return (
    <div
      className={`card-preview ${isActive ? "active" : ""}`}
      style={{
        backgroundColor: card.backgroundColor,
        borderRadius: `${card.borderRadius}px`,
        textAlign: card.textAlign,
        color: card.textColor,
        lineHeight: card.lineHeight,
        fontSize: `${card.fontSize}px`,
        fontStyle: card.fontStyle,
        position: "relative",
        overflow: "hidden",
        minHeight: "350px",
      }}
      onClick={onSelect}
      onDragOver={handleDragOver}
    >
      {!showPreview && (
        <div className="toolbar">
          <button className="add-field" onClick={addField}>
            + Add Text
          </button>
          <label className="upload-btn">
            📷 Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              hidden
            />
          </label>
        </div>
      )}

      <div className="fields-container">
        {/* --- TEXT FIELDS --- */}
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="field"
            draggable={!showPreview}
            onDragStart={(e) => handleDragStart(e, "text", index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            style={{
              marginTop: `${field.topSpace}px`,
              marginBottom: `${field.bottomSpace}px`,
            }}
          >
            {showPreview ? (
              <p
                style={{
                  fontWeight: field.bold ? "bold" : "normal",
                  fontStyle: field.italic ? "italic" : "normal",
                  fontSize: `${field.fontSize}px`,
                  color: field.textColor,
                }}
              >
                {field.text}
              </p>
            ) : (
              <>
                <input
                  type="text"
                  value={field.text}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  placeholder="Enter text..."
                  style={{
                    fontWeight: field.bold ? "bold" : "normal",
                    fontStyle: field.italic ? "italic" : "normal",
                    fontSize: `${field.fontSize}px`,
                    color: field.textColor,
                    textAlign: card.textAlign,
                    lineHeight: card.lineHeight,
                  }}
                />
                <button onClick={() => deleteField(field.id)}>🗑</button>

                <div className="menu-wrapper">
                  <button
                    className="menu-toggle"
                    onClick={() =>
                      setMenuOpenId(menuOpenId === field.id ? null : field.id)
                    }
                  >
                    ⋮
                  </button>
                  {menuOpenId === field.id && (
                    <div className="menu">
                      <button
                        onClick={() =>
                          updateFieldStyle(field.id, {
                            fontSize: field.fontSize + 2,
                          })
                        }
                      >
                        A+
                      </button>
                      <button
                        onClick={() =>
                          updateFieldStyle(field.id, {
                            fontSize: field.fontSize - 2,
                          })
                        }
                      >
                        A-
                      </button>
                      <button
                        onClick={() =>
                          updateFieldStyle(field.id, { bold: !field.bold })
                        }
                      >
                        B
                      </button>
                      <button
                        onClick={() =>
                          updateFieldStyle(field.id, { italic: !field.italic })
                        }
                      >
                        I
                      </button>
                      <input
                        type="color"
                        value={field.textColor}
                        onChange={(e) =>
                          updateFieldStyle(field.id, {
                            textColor: e.target.value,
                          })
                        }
                      />
                      <label>Top:</label>
                      <input
                        type="number"
                        value={field.topSpace}
                        onChange={(e) =>
                          updateFieldStyle(field.id, {
                            topSpace: +e.target.value,
                          })
                        }
                      />
                      <label>Bottom:</label>
                      <input
                        type="number"
                        value={field.bottomSpace}
                        onChange={(e) =>
                          updateFieldStyle(field.id, {
                            bottomSpace: +e.target.value,
                          })
                        }
                      />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        ))}

        {/* --- IMAGES / STICKERS --- */}
        {cardImages.map((img) => (
          <div
            key={img.id}
            className="sticker"
            style={{
              position: "absolute",
              top: `${img.y}px`,
              left: `${img.x}px`,
              cursor: "move",
            }}
            draggable={!showPreview}
            onDragEnd={(e) => handleImageDrag(e, img.id)}
          >
            <img src={img.src} alt="sticker" width={80} />
            {!showPreview && (
              <button className="delete-img" onClick={() => deleteImage(img.id)}>
                ❌
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardPreview;
