import React, { useState } from "react";
import { Box } from "@shopify/polaris";
import leftLogo from "../assets/images/leftLogo.svg";
import themeIcon from "../assets/images/themeIcon.svg";

import styles from "../styles/app.module.css";
import FrontendDesignModal from "./FrontendDesignModal";
import useDebounce from "../Context/useDebounce";

export default function Customization({
  setActiveTab,
  loyaltyProgramName,
  setLoyaltyProgramName,
  borderRadius,
  setBorderRadius,
}) {
  const [activeButton, setActiveButton] = useState("Light");
  const debouncedLoyaltyProgramName = useDebounce(loyaltyProgramName, 300);
  
  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const handleLoyaltyProgramNameChange = (e) => {
    setLoyaltyProgramName(e.target.value);
  };

  const handleBorderRadiusChange = (radius) => {
    setBorderRadius(radius);
  };

  const colors = [
    {
      fill: "var(--button-fill, radial-gradient(288.85% 77.24% at 100% 78.12%, #C4C6FD 0%, rgba(0, 101, 255, 0.00) 100%), radial-gradient(666.24% 220.15% at 105.03% -112.5%, #0065FF 0%, rgba(0, 101, 255, 0.00) 100%), radial-gradient(367.24% 88.88% at 4.78% -13.04%, #FFF 0%, #9035FF 100%), #FFF)",
      strokeWidth: "2px",
      stroke: "#1C1C1C",
    },
    {
      fill: "linear-gradient(98deg, #6200EE 40%, #1F3EFE 155.8%)",
      strokeWidth: "1.5px",
      stroke: "rgba(28, 28, 28, 0.40)",
    },
    {
      fill: "linear-gradient(81deg, #4C4C4C 27.35%, #454545 32.81%, #3F3F3F 38.27%, #393939 43.73%, #333 49.2%, #2D2D2D 54.66%, #272727 60.12%, #222 65.58%, #1D1D1D 71.05%, #191919 76.51%, #151515 81.97%, #121212 87.44%, #101010 92.9%, #0E0E0E 98.36%, #0D0D0D 103.82%, #0D0D0D 109.29%, #0D0D0D 114.75%)",
      strokeWidth: "1.5px",
      stroke: "rgba(28, 28, 28, 0.40)",
    },
    {
      fill: "#D1ACFF",
      strokeWidth: "1.5px",
      stroke: "rgba(28, 28, 28, 0.40)",
    },
  ];

  return (
    <Box className={styles.customizationContainer}>
      <Box className={styles.customizationOptions}>
        <div className={styles.customizationOptionsContent}>
          <Box className={styles.customizationOptionsContentHeader}>
            <h1 className={styles.headerContentText}>Your brand, your tone</h1>
            <p className={styles.description}>
              Let us know your industry and we'll provide design templates
              tailored to your store's visiblst
            </p>
          </Box>

          <Box className={styles.formGroupContent}>
            <Box className={styles.formGroup}>
              <Box className={styles.inputGroup}>
                <img src={leftLogo} alt="leftLogo" />
                <label className={styles.label}>
                  Enter your loyalty program name
                </label>
              </Box>
              <input
                type="text"
                className={styles.input}
                placeholder="Quest rewards"
                value={loyaltyProgramName}
                onChange={handleLoyaltyProgramNameChange}
              />
            </Box>

            <Box className={styles.formGroup}>
              <Box className={styles.inputGroup}>
                <img src={leftLogo} alt="leftLogo" />
                <label className={styles.label}>Select theme</label>
              </Box>
              <Box className={styles.buttonGroup}>
                <Box
                  className={`${styles.button} ${
                    activeButton === "Light" ? styles.active : ""
                  }`}
                  onClick={() => handleButtonClick("Light")}
                >
                  <h1>Light</h1>
                  {activeButton === "Light" && (
                    <div style={{ marginTop: "2.75px" }}>
                      <img src={themeIcon} alt="themeIcon" />
                    </div>
                  )}
                </Box>
                <Box
                  className={`${styles.button} ${
                    activeButton === "Dark" ? styles.active : ""
                  }`}
                  onClick={() => handleButtonClick("Dark")}
                >
                  <h1>Dark</h1>
                  {activeButton === "Dark" && (
                    <div style={{ marginTop: "2.75px" }}>
                      <img src={themeIcon} alt="themeIcon" />
                    </div>
                  )}
                </Box>
              </Box>
            </Box>

            <Box className={styles.formGroup}>
              <Box className={styles.inputGroup}>
                <img src={leftLogo} alt="leftLogo" />
                <label className={styles.label}>Choose your brand color</label>
              </Box>
              <Box className={styles.colorPicker}>
                {colors.map((color, index) => (
                  <Box
                    key={index}
                    className={styles.colorOption}
                    style={{
                      background: color.fill,
                      borderWidth: color.strokeWidth,
                      borderColor: color.stroke,
                      borderStyle: "solid",
                    }}
                  />
                ))}
                <Box className={styles.addColor}>+</Box>
              </Box>
            </Box>

            <Box className={styles.formGroup}>
              <Box className={styles.inputGroup}>
                <img src={leftLogo} alt="leftLogo" />
                <label className={styles.label}>Border radius</label>
              </Box>
              <Box className={styles.buttonGroupNumber}>
                {[4, 8, 12, 16].map((radius) => (
                  <button
                    key={radius}
                    onClick={() => handleBorderRadiusChange(radius)}
                    className={`${styles.buttonValue} ${borderRadius === radius ? styles.active : ""}`}
                    style={{
                      borderColor:
                        borderRadius === radius ? "#9035ff" : "#b0b0b0",
                    }}
                  >
                    {radius}px
                  </button>
                ))}
              </Box>
            </Box>
          </Box>
        </div>
        <Box className={styles.frontendDesignModal}>
          <FrontendDesignModal
            loyaltyProgramName={debouncedLoyaltyProgramName}
            borderRadius={borderRadius}
          />
        </Box>
      </Box>
      <Box className={styles.navigation}>
        <button
          className={styles.primaryButton}
          onClick={() => setActiveTab("Rewards")}
        >
          Go Back
        </button>
        <button
          className={styles.secondaryButton}
          onClick={() => setActiveTab("Preview")}
        >
          Continue
        </button>
      </Box>
    </Box>
  );
}
