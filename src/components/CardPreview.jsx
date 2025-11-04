import React, { useState, useEffect } from "react";
import "../App.scss";
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import UploadIcon from '@mui/icons-material/Upload';
import TextIncreaseIcon from '@mui/icons-material/TextIncrease';
import TextDecreaseIcon from '@mui/icons-material/TextDecrease';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import NotesIcon from '@mui/icons-material/Notes'; // for paragraph
import OpenWithIcon from '@mui/icons-material/OpenWith'; // for draggable text

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

    /** --- TEXT FIELD TYPES --- **/
    const addField = (type = "text") => {
        const newField = {
            id: Date.now(),
            text: "",
            bold: false,
            italic: false,
            fontSize: 16,
            textColor: "#000000",
            topSpace: 0,
            bottomSpace: 0,
            type, // text, paragraph, draggable
            x: 50,
            y: 50,
        };
        setFields((prev) => [...prev, newField]);
    };

    const deleteField = (id) => setFields(fields.filter((f) => f.id !== id));

    const handleChange = (id, value) =>
        setFields(fields.map((f) => (f.id === id ? { ...f, text: value } : f)));

    const updateFieldStyle = (id, changes) =>
        setFields(fields.map((f) => (f.id === id ? { ...f, ...changes } : f)));

    /** --- DRAG & REORDER --- **/
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
                src: e.target.result,
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

    const handleEmojiDrop = (e) => {
        e.preventDefault();
        const emoji = e.dataTransfer.getData("emoji");
        if (!emoji) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - 20;
        const y = e.clientY - rect.top - 20;

        setCardImages((prev) => [...prev, { id: Date.now(), emoji, x, y }]);
    };

    const deleteImage = (id) =>
        setCardImages(cardImages.filter((img) => img.id !== id));

    /** --- IMAGE UPLOAD INPUT --- **/
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) addImage(file);
    };

    /** --- DRAG MOVABLE TEXT --- **/
    const handleFreeTextDrag = (e, id) => {
        const rect = e.currentTarget.parentNode.getBoundingClientRect();
        const x = e.clientX - rect.left - 40;
        const y = e.clientY - rect.top - 20;
        setFields((prev) =>
            prev.map((f) => (f.id === id ? { ...f, x, y } : f))
        );
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
                // overflow: "hidden",
                minHeight: "350px",
                zIndex: isActive ? 1 : 0,
            }}
            // onDragOver={(e) => e.preventDefault()}
           onDrop={(e) => {
    handleEmojiDrop(e);
}}

            onClick={onSelect}
            onDragOver={handleDragOver}
        >


            {cardImages.map((item) => (
                <div
                    key={item.id}
                    style={{
                        position: "absolute",
                        top: `${item.y}px`,
                        left: `${item.x}px`,
                        cursor: "move",
                        fontSize: item.emoji ? "40px" : "inherit",
                    }}
                    draggable={!showPreview}
                    onDragEnd={(e) => handleImageDrag(e, item.id)}
                >
                    
                        <span>{item.emoji}</span>
                    
                    {!showPreview && (
                        <button className="delete-img" onClick={() => deleteImage(item.id)}>
                            ❌
                        </button>
                    )}
                </div>
            ))}
            {!showPreview && (
                <div className="toolbar">
                    <button className="toolbar-btn" onClick={() => addField("text")}>
                        <TextFieldsIcon /> Add Text
                    </button>

                    <button className="toolbar-btn" onClick={() => addField("paragraph")}>
                        <NotesIcon /> Add Paragraph
                    </button>

                    <button className="toolbar-btn" onClick={() => addField("draggable")}>
                        <OpenWithIcon /> Drag Text
                    </button>

                    <button
                        className="toolbar-btn"
                        onClick={() =>
                            document.getElementById(`upload-${card.id}`).click()
                        }
                    >
                        <UploadIcon /> Upload Image
                    </button>

                    <input
                        id={`upload-${card.id}`}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />
                </div>
            )}

            <div className="fields-container">
                {/* --- TEXT / PARAGRAPH / DRAG TEXT --- */}
                {fields.map((field, index) => (
                    <div
                        key={field.id}
                        className={`field ${field.type === "draggable" ? "draggable-text" : ""}`}
                        draggable={!showPreview && field.type !== "draggable"}
                        onDragStart={(e) => handleDragStart(e, "text", index)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                        style={{
                            marginTop: `${field.topSpace}px`,
                            marginBottom: `${field.bottomSpace}px`,
                            position: field.type === "draggable" ? "absolute" : "relative",
                            top: field.y,
                            left: field.x,
                            cursor: field.type === "draggable" ? "move" : "default",
                        }}
                        onDragEnd={
                            field.type === "draggable"
                                ? (e) => handleFreeTextDrag(e, field.id)
                                : undefined
                        }
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
                            <div className="custom-field">
                                {field.type === "paragraph" ? (
                                    <textarea
                                        value={field.text}
                                        onChange={(e) => handleChange(field.id, e.target.value)}
                                        placeholder="Enter paragraph..."
                                        style={{
                                            fontWeight: field.bold ? "bold" : "normal",
                                            fontStyle: field.italic ? "italic" : "normal",
                                            fontSize: `${field.fontSize}px`,
                                            color: field.textColor,
                                            textAlign: card.textAlign,
                                            lineHeight: card.lineHeight,
                                        }}
                                    />
                                ) : (
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
                                )}
                                <button
                                    className="custom-icon"
                                    onClick={() => deleteField(field.id)}
                                >
                                    <DeleteIcon />
                                </button>

                                <div className="menu-wrapper">
                                    <button
                                        className="menu-toggle"
                                        onClick={() =>
                                            setMenuOpenId(menuOpenId === field.id ? null : field.id)
                                        }
                                    >
                                        <MoreVertIcon />
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
                                                <TextIncreaseIcon />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    updateFieldStyle(field.id, {
                                                        fontSize: field.fontSize - 2,
                                                    })
                                                }
                                            >
                                                <TextDecreaseIcon />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    updateFieldStyle(field.id, { bold: !field.bold })
                                                }
                                            >
                                                <FormatBoldIcon />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    updateFieldStyle(field.id, { italic: !field.italic })
                                                }
                                            >
                                                <FormatItalicIcon />
                                            </button>
                                            <div className="color-picker">
                                                <button
                                                    className="icon-btn"
                                                    onClick={() =>
                                                        document
                                                            .getElementById(`color-${field.id}`)
                                                            .click()
                                                    }
                                                >
                                                    <FormatColorTextIcon />
                                                </button>
                                                <input
                                                    id={`color-${field.id}`}
                                                    type="color"
                                                    value={field.textColor}
                                                    onChange={(e) =>
                                                        updateFieldStyle(field.id, {
                                                            textColor: e.target.value,
                                                        })
                                                    }
                                                    style={{ display: "none" }}
                                                />
                                            </div>
                                            <div className="margin_menu">
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
                                            </div>
                                            <div className="margin_menu">
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
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}

               
            </div>
        </div>
    );
};

export default CardPreview;
