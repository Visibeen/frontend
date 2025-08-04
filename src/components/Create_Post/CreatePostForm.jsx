import React, { useState, useRef, useEffect } from "react";
import Layout from "../Layouts/Layout";

const COLOR_PALETTE = [
  "#EF232A", // red
  "#0090e7", // blue
  "#FFD600", // yellow
  "#00C853", // green
  "#FF6D00", // orange
  "#6C63FF", // purple
  "#222",    // black
  "#fff"     // white
];

export default function CreatePostForm({ name: initialName, testimonial: initialTestimonial, bgColor: initialBgColor, onNext }) {
  const [name, setName] = useState(initialName);
  const [testimonial, setTestimonial] = useState(initialTestimonial);
  const [bgColor, setBgColor] = useState(initialBgColor);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const colorInputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const handleCancel = (e) => {
    e.preventDefault();
    setName("");
    setTestimonial("");
    setBgColor("#EF232A");
  };

  const handleNext = (e) => {
    e.preventDefault();
    onNext({ name, testimonial, bgColor });
  };

  // Only arrow click toggles palette
  const handleArrowClick = (e) => {
    e.stopPropagation();
    setDropdownOpen((open) => !open);
  };

  const handleCustomColor = (e) => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };

  // Custom color picker: only update color, do NOT close palette
  const handleColorChange = (e) => {
    setBgColor(e.target.value);
    // Do NOT close the palette here
  };

  // Palette stays open after color select
  const handlePaletteColor = (color) => {
    setBgColor(color);
    // Do NOT close the palette here
  };

  return (
    <Layout>
    <div className="create-post-form-bg">
      <div className="create-post-form-heading-block">
        <h1 className="create-post-form-title">Create Post</h1>
        <p className="create-post-form-desc">
          Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.
        </p>
      </div>
      <form className="create-post-form-card" onSubmit={handleNext} autoComplete="off">
        {/* Avatar, Name, and Stars inside the card, centered */}
        <div className="create-post-form-avatar-block" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="User"
            className="create-post-form-avatar"
          />
          <div className="create-post-form-name">Karen Abshire</div>
          <div className="create-post-form-stars">
            <span className="star filled">★</span>
            <span className="star filled">★</span>
            <span className="star filled">★</span>
            <span className="star filled">★</span>
            <span className="star">★</span>
          </div>
        </div>
        {/* Sub-card for fields */}
        <div style={{ background: '#fff', border: '2px solid #e0e0e0', borderRadius: 12, padding: 32, marginBottom: 32 }}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="create-post-form-input"
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="testimonial">Testimonial Text</label>
            <textarea
              id="testimonial"
              rows="3"
              value={testimonial}
              onChange={e => setTestimonial(e.target.value)}
              className="create-post-form-textarea"
              placeholder="Write your testimonial here"
            />
          </div>
          <div className="form-group">
            <label htmlFor="bgcolor">Background Color</label>
            <div
              className="create-post-form-color-row"
              ref={dropdownRef}
              style={{ cursor: 'pointer', position: 'relative', overflow: 'visible', zIndex: 1, display: 'flex', alignItems: 'center' }}
            >
              <div
                className="create-post-form-color-box"
                style={{ background: bgColor, cursor: 'pointer' }}
                aria-label="Current color"
                tabIndex={-1}
              />
              <input
                type="text"
                id="bgcolor"
                value={bgColor}
                onChange={e => setBgColor(e.target.value)}
                className="create-post-form-color-input"
                placeholder="#EF232A"
                style={{ cursor: 'pointer' }}
              />
              <span
                className="create-post-form-color-dropdown"
                style={{ marginLeft: 'auto', cursor: 'pointer', pointerEvents: 'auto' }}
                aria-label="Toggle color palette"
                onClick={handleArrowClick}
              >
                ▼
              </span>
              {dropdownOpen && (
                <div className="create-post-form-color-palette" style={{ position: 'absolute', top: '100%', right: 0, left: 'auto', zIndex: 9999 }}>
                  {COLOR_PALETTE.map((color) => (
                    <div
                      key={color}
                      onClick={() => handlePaletteColor(color)}
                      className={"color-swatch" + (color === bgColor ? " selected" : "")}
                      style={{ background: color }}
                      title={color}
                      aria-label={`Select color ${color}`}
                    />
                  ))}
                  <div
                    onClick={handleCustomColor}
                    className="color-swatch custom"
                    title="Custom color"
                    aria-label="Custom color picker"
                  >
                    +
                    <input
                      ref={colorInputRef}
                      type="color"
                      style={{ display: 'none' }}
                      value={bgColor}
                      onChange={handleColorChange}
                      onClick={e => e.stopPropagation()}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="create-post-form-actions">
          <button type="button" className="btn btn-cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Next
          </button>
        </div>
      </form>
    </div>
    </Layout>
  );
}