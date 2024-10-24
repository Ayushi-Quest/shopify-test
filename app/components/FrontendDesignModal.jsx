import React from "react";
import { Box, Image, Text } from "@shopify/polaris";
import styles from "../styles/frontendModal.module.css";
import moneyImage from "../assets/images/money.svg";
import boxImage from "../assets/images/box.svg";
import copyIcon from "../assets/images/copyIcon.svg";
import linkedInIcon from "../assets/images/linkedIn.svg";
import facebookIcon from "../assets/images/facebook.svg";
import xIcon from "../assets/images/X.svg";
import historyIcon from "../assets/images/historyIcon.svg";
import questLabsLogo from "../assets/images/Vector.svg";
import homeIcon from "../assets/images/home.svg";
import earnIcon from "../assets/images/earnXP.svg";
import redeemIcon from "../assets/images/redeemIcon.svg";
import tierIcon from "../assets/images/tierIcon.svg";
import homeColorIcon from "../assets/images/homeColor.svg";
import arrowIcon from "../assets/images/arrowIcon.svg";

const FrontendDesignModal = ({ loyaltyProgramName, borderRadius }) => {
  const [activeTabs, setActiveTabs] = React.useState("home");

  const handleCopy = () => {
    navigator.clipboard.writeText("https://outmail.com/22712701");
  };

  const getIcon = (tab) => {
    switch (tab) {
      case "home":
        return activeTabs === "home" ? homeColorIcon : homeIcon;
      case "earn":
        return activeTabs === "earn" ? "" : earnIcon;
      case "redeem":
        return activeTabs === "redeem" ? "" : redeemIcon;
      case "tiers":
        return activeTabs === "tiers" ? "" : tierIcon;
      default:
        return homeIcon;
    }
  };

  return (
    <>
      <Box className={styles.homeModal}>
        <Box className={styles.headerText}>
          <p>Hey Rich Excplorer!</p>
          <h2 variant="headingLg">Welcome to {loyaltyProgramName}</h2>
        </Box>

        <Box
          className={styles.pointsSection}
          style={{ borderRadius: `${borderRadius}px` }}
        >
          <p>My Points</p>
          <h3>400 XP</h3>
        </Box>

        <Box className={styles.actionButtons}>
          <button
            className={styles.earnButton}
            style={{ borderRadius: `${borderRadius}px` }}
          >
            <Image src={moneyImage} alt="Earn" className={styles.buttonIcon} />
            Earn
          </button>
          <button
            className={styles.redeemButton}
            style={{ borderRadius: `${borderRadius}px` }}
          >
            <Image src={boxImage} alt="Redeem" className={styles.buttonIcon} />
            Redeem
          </button>
        </Box>

        <Box
          className={styles.referSection}
          style={{ borderRadius: `${borderRadius}px` }}
        >
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <h2>Refer & Earn</h2>
            <Box
              style={{
                width: "12px",
                height: "12px",
                cursor: "pointer",
                marginTop: "-5px",
              }}
            >
              <img src={arrowIcon} alt="arrowIcon" />
            </Box>
          </Box>
          <Box>
            <p>
              Get exclusive features and fast support. Our team replies in under
              a minute.
            </p>
            <h5>Invitation Link</h5>
          </Box>
          <Box
            className={styles.inviteSection}
            style={{ borderRadius: `${borderRadius}px` }}
          >
            <input
              type="text"
              value="https://outmail.com/22712701"
              readOnly
              className={styles.inviteLink}
            />
            <button onClick={handleCopy} className={styles.copyButton}>
              <img src={copyIcon} alt="Copy" className={styles.copyIcon} />
            </button>
          </Box>
          <Box
            className={styles.shareButton}
            style={{ borderRadius: `${borderRadius}px` }}
          >
            <button>Share with friends</button>
          </Box>

          <Box className={styles.socialButtons}>
            <button
              className={styles.linkedinButton}
              style={{ borderRadius: `${borderRadius}px` }}
            >
              <img src={linkedInIcon} alt="LinkedIn" />
            </button>
            <button
              className={styles.facebookButton}
              style={{ borderRadius: `${borderRadius}px` }}
            >
              <img src={facebookIcon} alt="Facebook" />
            </button>
            <button
              className={styles.otherButton}
              style={{ borderRadius: `${borderRadius}px` }}
            >
              <img src={xIcon} alt="X" />
            </button>
          </Box>
        </Box>

        <Box
          className={styles.silverStoneSection}
          style={{ borderRadius: `${borderRadius}px` }}
        >
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              cursor: "pointer",
            }}
          >
            <h2>Silver Stone</h2>
            <Box style={{ width: "12px", height: "12px" }}>
              <img src={arrowIcon} alt="arrowIcon" />
            </Box>
          </Box>

          <Box
            style={{
              marginTop: "5px",
              color: "#9035FF",
            }}
          >
            <Text variant="bodyXs" as="p" fontWeight="bold">
              40% complete
            </Text>
          </Box>
          <Box className={styles.progressBar}>
            <Box className={styles.progressBarInner} style={{ width: "40%" }} />
          </Box>
          <h3>Earn 500XP by 3 Months to reach Quest silver stone.</h3>
        </Box>

        <Box
          className={styles.pointsHistorySection}
          style={{ borderRadius: `${borderRadius}px` }}
        >
          <Box style={{ marginTop: "4px" }}>
            <Image src={historyIcon} alt="History" width="110%" />
          </Box>

          <Box style={{ marginTop: "5px" }}>
            <h2>Points History</h2>
            <p>Track your rewards, referrals, and spending.</p>
          </Box>
          <Box style={{ width: "12px", height: "12px" }}>
            <img src={arrowIcon} alt="arrowIcon" />
          </Box>
        </Box>
      </Box>
      <Box className={styles.footer}>
        <Box className={styles.bottomNavSection}>
          {["home", "earn", "redeem", "tiers"].map((tab) => (
            <Box key={tab} className={styles.navItem}>
              <Image src={getIcon(tab)} alt={tab} className={styles.navIcon} />
              <p
                style={{
                  color: activeTabs === tab ? "#9035ff" : "#808080",
                  fontWeight: activeTabs === tab ? "800" : "500",
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </p>
            </Box>
          ))}
        </Box>
        <Box className={styles.poweredBySection}>
          <p>Powered by Quest Labs</p>
          <Image
            src={questLabsLogo}
            alt="Quest Labs Logo"
            className={styles.questLabsLogo}
          />
        </Box>
      </Box>
    </>
  );
};

export default FrontendDesignModal;
