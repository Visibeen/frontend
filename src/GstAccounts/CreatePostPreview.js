import React from "react";
import { AiOutlineMail, AiOutlineLink } from "react-icons/ai";
import { FaFacebook, FaWhatsapp, FaInstagram, FaGoogle } from "react-icons/fa";
import visibeenLogo from "./visibeen-logo.png";

// Style images (replace with your actual image URLs if needed)
const STYLE_IMAGES = [
  "https://cdn.pixabay.com/photo/2017/01/20/00/30/people-1990266_1280.jpg", // Ada Harrison
  "https://img.freepik.com/free-psd/testimonial-template-design_23-2149526336.jpg", // Dr. Amy Grantt (green)
  "https://img.freepik.com/free-psd/testimonial-template-design_23-2149526338.jpg", // Johnson Smith (pink)
  "https://img.freepik.com/free-psd/testimonial-template-design_23-2149526336.jpg" // Dr. Amy Grantt (green, again)
];

export default function CreatePostPreview() {
  const [showShareMenu, setShowShareMenu] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(0);
  const shareMenuRef = React.useRef(null);

  // Close share menu when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target)) {
        setShowShareMenu(false);
      }
    }
    if (showShareMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showShareMenu]);

  return (
    <div className="create-post-preview-page" style={{ minHeight: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', background: '#f7f7f9', paddingTop: 32 }}>
      {/* Page Title and Description */}
      <h1 className="section-title-centered">Create Post</h1>
      <p className="section-desc-centered">
        Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.
      </p>
      {/* Style Thumbnails Row */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 32, marginTop: 8 }}>
        {STYLE_IMAGES.map((img, i) => (
          <div
            key={i}
            onClick={() => setSelectedImage(i)}
            style={{
              border: selectedImage === i ? '3px solid #0090e7' : '2px solid #e5e7eb',
              borderRadius: 16,
              boxShadow: selectedImage === i ? '0 4px 24px rgba(0,144,231,0.10)' : '0 2px 12px rgba(0,0,0,0.07)',
              cursor: 'pointer',
              overflow: 'hidden',
              width: 140,
              height: 140,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#fff',
              transition: 'box-shadow 0.2s, border 0.2s',
            }}
          >
            <img src={img} alt={`Style ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 16 }} />
          </div>
        ))}
      </div>
      {/* Main Preview Image - No card, just the image, larger height */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '32px 0' }}>
        <img src={STYLE_IMAGES[selectedImage]} alt="Preview" style={{ width: 500, height: 500, objectFit: 'cover', borderRadius: 18, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }} />
      </div>
      {/* Action Buttons as a button group with right-side dropdown */}
      <div className="preview-actions-row" style={{ position: 'relative', justifyContent: 'center' }}>
        <button className="btn preview-download">Download</button>
        <button className="btn preview-share" onClick={() => setShowShareMenu((v) => !v)}>Share</button>
        {showShareMenu && (
          <div
            className="preview-share-menu"
            ref={shareMenuRef}
            style={{
              position: 'absolute',
              left: '100%',
              top: 0,
              marginLeft: 16,
              zIndex: 9999,
            }}
          >
            <div className="share-menu-item"><AiOutlineMail style={{marginRight:8}} />Email</div>
            <div className="share-menu-item"><FaFacebook style={{marginRight:8, color:'#1877f3'}} />Facebook</div>
            <div className="share-menu-item"><FaWhatsapp style={{marginRight:8, color:'#25d366'}} />Whats app</div>
            <div className="share-menu-item"><FaInstagram style={{marginRight:8, color:'#e4405f'}} />Instagram</div>
            <div className="share-menu-item disabled"><FaGoogle style={{marginRight:8, color:'#ea4335'}} />Google Profile <span className="coming-soon">(coming soon)</span></div>
            <div className="share-menu-item"><AiOutlineLink style={{marginRight:8}} />Copy link</div>
          </div>
        )}
      </div>
    </div>
  );
} 