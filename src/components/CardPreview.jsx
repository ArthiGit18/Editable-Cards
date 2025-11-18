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
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const CardPreview = ({
    card,
    updateCard,
    showPreview,
    onSelect,
    isActive,
    deleteCard
}) => {
    const [fields, setFields] = useState(card.fields || []);
    const [menuOpenId, setMenuOpenId] = useState(null);
    const [cardImages, setCardImages] = useState(card.images || []);
    const [draggingItem, setDraggingItem] = useState(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [showStickers, setShowStickers] = useState(false);

    const stickers = [
        "/assets/st/1.png",
        "/assets/st/2.png",
        "/assets/st/3.png",
        "/assets/st/4.png",
        "/assets/st/5.png",
        "/assets/st/6.png",
        "/assets/st/11.png",
        "/assets/st/22.png",
        "/assets/st/33.png",
        "/assets/st/44.png",
    ];

    const addSticker = (src) => {
        setCardImages((prev) => [
            ...prev,
            { id: Date.now(), src, x: 100, y: 100, type: "sticker" },
        ]);
        setShowStickers(false);
    };

    const startDrag = (e, id, type) => {
        e.stopPropagation();
        const rect = e.currentTarget.getBoundingClientRect();
        setDraggingItem({ id, type });
        setOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const handleMouseMove = (e) => {
        if (!draggingItem) return;

        const parentRect = e.currentTarget.getBoundingClientRect
            ? e.currentTarget.getBoundingClientRect()
            : document.querySelector(".card-preview").getBoundingClientRect();

        const x = e.clientX - parentRect.left - offset.x;
        const y = e.clientY - parentRect.top - offset.y;

        if (draggingItem.type === "image" || draggingItem.type === "sticker") {
            setCardImages((imgs) =>
                imgs.map((img) =>
                    img.id === draggingItem.id ? { ...img, x, y } : img
                )
            );
        } else if (draggingItem.type === "text") {
            setFields((f) =>
                f.map((field) =>
                    field.id === draggingItem.id ? { ...field, x, y } : field
                )
            );
        }
    };


    const stopDrag = () => setDraggingItem(null);


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

        <>

        {/* <h2>Custom Card </h2> */}
            <div
                className={`card-preview ${isActive ? "active" : ""}`}
                style={{
                    backgroundColor: card.backgroundColor,
                    backgroundImage: card.backgroundImage ? card.backgroundImage : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: `${card.borderRadius}px`,
                    textAlign: card.textAlign,
                    color: card.textColor,
                    lineHeight: card.lineHeight,
                    fontSize: `${card.fontSize}px`,
                    fontStyle: card.fontStyle,
                    position: "relative",
                    minHeight: "350px",
                    height: "100vh",
                    overflow: "hidden",
                    zIndex: isActive ? 1 : 0,
                    cursor: draggingItem ? "grabbing" : "default",
                }}
                onMouseMove={handleMouseMove}
                onMouseUp={stopDrag}
                onMouseLeave={stopDrag}
                onClick={onSelect}
                onDrop={handleEmojiDrop}
                onDragOver={handleDragOver}
            >



                {cardImages.map((item) => (
                    <div
                        key={item.id}
                        style={{
                            position: "absolute",
                            top: `${item.y}px`,
                            left: `${item.x}px`,
                            cursor: "grab",
                            userSelect: "none",
                        }}
                        onMouseDown={(e) =>
                            startDrag(e, item.id, item.type === "sticker" ? "sticker" : "image")
                        }
                    >
                        {item.type === "sticker" ? (
                            <img
                                src={item.src}
                                alt="sticker"
                                style={{
                                    width: 80,
                                    height: 80,
                                    pointerEvents: "none",
                                }}
                            />
                        ) : item.emoji ? (
                            <span style={{ fontSize: "40px" }}>{item.emoji}</span>
                        ) : (
                            <img
                                src={item.src}
                                alt="uploaded"
                                style={{
                                    width: 100,
                                    height: 100,
                                    pointerEvents: "none",
                                }}
                            />
                        )}

                        {!showPreview && (
                            <button
                                className="delete-img"
                                onClick={() => deleteImage(item.id)}
                            >
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



                        <button
                            className="toolbar-btn"
                            onClick={() => setShowStickers((prev) => !prev)}
                        >
                            <EmojiEmotionsIcon /> Stickers
                        </button>

                        <button
                            className="toolbar-btn delete-btn"
                            onClick={() => deleteCard(card.id)}
                        >
                            <DeleteIcon /> Delete Card
                        </button>


                    </div>
                )}

                {showStickers && (
                    <div className="sticker-panel">
                        {stickers.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt="sticker"
                                className="sticker-thumb"
                                draggable
                                onClick={() => addSticker(src)}
                            />
                        ))}
                    </div>
                )}
                <>
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
                                width: field.type === "draggable" ? "auto" : "80%",
                            }}
                            onDragEnd={
                                field.type === "draggable"
                                    ? (e) => handleFreeTextDrag(e, field.id)
                                    : undefined
                            }
                            onMouseDown={(e) => startDrag(e, field.id, "text")}
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
                                            placeholder="Enter text111..."
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


                </>
            </div>
        </>
    );
};

export default CardPreview;
