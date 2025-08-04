import React from "react";
import Layout from "./Layouts/Layout";
import { AiOutlineMail, AiOutlineLink } from "react-icons/ai";
import { FaFacebook, FaWhatsapp, FaInstagram } from "react-icons/fa";

export default function ReferEarn() {
  const [showShareMenu, setShowShareMenu] = React.useState(false);
  const [referralLink, setReferralLink] = React.useState("");
  const [isEditable, setIsEditable] = React.useState(false);

  const shareMenuRef = React.useRef(null);
  const shareBtnRef = React.useRef(null);

  // Close share menu when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (
        shareMenuRef.current &&
        !shareMenuRef.current.contains(event.target) &&
        shareBtnRef.current &&
        !shareBtnRef.current.contains(event.target)
      ) {
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
    <Layout>
      <div className="refer-earn-page">
        {/* Top Section */}
        <div className="refer-earn-header">
          <h2 className="refer-earn-title">Refer & Earn</h2>
          <p className="refer-earn-desc">
            Lorem ipsum is a dummy or placeholder text commonly used in graphic design,
          </p>
        </div>

        {/* Share Box */}
        <div className="refer-earn-share-box" style={{ position: "relative" }}>
          <h3 className="refer-earn-share-title">Share Referral Link With Friend</h3>
          <p className="refer-earn-share-desc">
            Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing
          </p>
          <div className="refer-earn-share-row">
            <input
              className="refer-earn-link"
              value={referralLink}
              readOnly={!isEditable}
              placeholder="www.website.com"
              onClick={() => setIsEditable(true)}
              onChange={(e) => setReferralLink(e.target.value)}
            />
            <button
              className="btn btn-primary refer-earn-share-btn"
              ref={shareBtnRef}
              onClick={() => setShowShareMenu((v) => !v)}
            >
              Share
            </button>
          </div>
          {showShareMenu && (
            <div className="preview-share-menu" ref={shareMenuRef}>
              <div className="share-menu-item">
                <AiOutlineMail style={{ marginRight: 8 }} />
                Email
              </div>
              <div className="share-menu-item">
                <FaFacebook style={{ marginRight: 8, color: "#1877f3" }} />
                Facebook
              </div>
              <div className="share-menu-item">
                <FaWhatsapp style={{ marginRight: 8, color: "#25d366" }} />
                WhatsApp
              </div>
              <div className="share-menu-item">
                <FaInstagram style={{ marginRight: 8, color: "#e4405f" }} />
                Instagram
              </div>
              <div className="share-menu-item">
                <AiOutlineLink style={{ marginRight: 8 }} />
                Copy link
              </div>
            </div>
          )}
        </div>

        {/* How It Works */}
        <div className="refer-earn-how-it-works">
          <h3>How It Works</h3>
          <ol>
            <li>
              <b>Share Your Unique Referral Link</b>
              <br />
              After signing up, you'll receive a unique referral link. Share this link with your
              friends, family, or social networks.
            </li>
            <li>
              <b>Your Friend Signs Up</b>
              <br />
              When someone signs up using your referral link and meets the eligibility criteria (e.g.,
              places a first order, completes a purchase, or subscribes), both of you get rewarded.
            </li>
            <li>
              <b>Earn Rewards</b>
              <ul>
                <li>You Earn: {'{'}[Amount or %]{'}'} credit in your wallet/account.</li>
                <li>Your Friend Earns: {'{'}[Amount or %]{'}'} discount on their first order/purchase.</li>
              </ul>
            </li>
          </ol>
        </div>

        {/* Contact Us */}
        <div className="refer-earn-contact">
          <h4>Contact Us</h4>
          <p>
            If you have questions about our Refer & Earn Policy, feel free to contact us at{" "}
            <a href="mailto:support@yourwebsite.com">support@yourwebsite.com</a>.
          </p>
        </div>
      </div>
    </Layout>
  );
}