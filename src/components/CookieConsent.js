import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const CookieConsent = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if consent has already been given
    const consentGiven = localStorage.getItem("cookieConsent");
    if (!consentGiven) {
      setShowPopup(true); // Show popup if consent hasn't been given
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true"); // Save consent in local storage
    setShowPopup(false); // Hide popup
  };
  const { t } = useTranslation("index");
  return (
    showPopup && (
      <div style={popupStyle}>
        <p style={{ margin: "0 0 10px 0" }}>
          {t(
            "This website uses cookies to ensure you get the best experience on our website."
          )}
        </p>
        <button onClick={handleAccept} style={buttonStyle}>
          {t("Accept")}
        </button>
      </div>
    )
  );
};

// Styles for the popup and button
const popupStyle = {
  position: "fixed",
  bottom: "2vw",
  left: "2vw",
  backgroundColor: "#fff",
  color: "#0a0a0a",
  padding: "15px",
  zIndex: 1000,
  width: "96vw",
};

const buttonStyle = {
  backgroundColor: '#630661',
  color: "white",
  border: "none",
  padding: "8px 12px",
  cursor: "pointer",
  borderRadius: "0px",
};

export default CookieConsent;
