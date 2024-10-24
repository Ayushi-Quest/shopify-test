import React from "react";
import { Box } from "@shopify/polaris";
import styles from "../styles/app.module.css";
import FrontendDesignModal from "./FrontendDesignModal";
import cartIcon from "../assets/images/cartIcon.svg";
import orderIcon from "../assets/images/orderIcon.svg";
import previewIcon from "../assets/images/previewIcon.svg";
import { Link } from "@remix-run/react";

export default function Preview({
  setActiveTab,
  loyaltyProgramName,
  borderRadius,
}) {
  return (
    <Box className={styles.previewContainer}>
      <Box className={styles.previewOptions}>
        <Box className={styles.previewOptionsContent}>
          <Box className={styles.previewOptionsHeader}>
            <h1 className={styles.headerContentText}>
              Ready to Reward Your Loyal Customers?
            </h1>
            <p>
              Let us know your industry and we’ll provide design templates
              tailored to your store’s widget
            </p>
          </Box>
          <Box className={styles.frameGroupContent}>
            <Box className={styles.frameGroup}>
              <Box className={styles.frameGroupIcon}>
                <img src={cartIcon} alt="cartIcon" />
              </Box>
              <Box className={styles.frameGroupText}>
                <h2>Get Points on Every Order</h2>
                <p>
                  Customers earn 5 XP per dollar spent, getting closer to
                  exclusive rewards.
                </p>
              </Box>
            </Box>
            <Box className={styles.frameGroup}>
              <Box className={styles.frameGroupIcon}>
                <img src={orderIcon} alt="orderIcon" />
              </Box>
              <Box className={styles.frameGroupText}>
                <h2>Get Points on Every Order</h2>
                <p>
                  Customers earn 5 XP per dollar spent, getting closer to
                  exclusive rewards.
                </p>
              </Box>
            </Box>
            <Box className={styles.frameGroup}>
              <Box className={styles.frameGroupIcon}>
                <img src={previewIcon} alt="previewIcon" />
              </Box>
              <Box className={styles.frameGroupText}>
                <h2>Preview</h2>
                <p>
                  Get exclusive features and fast support. Our team replies in
                  under a minute.
                </p>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className={styles.frontendDesignModal}>
          <FrontendDesignModal
            loyaltyProgramName={loyaltyProgramName}
            borderRadius={borderRadius}
          />
        </Box>
      </Box>
      <Box className={styles.navigation}>
        <button
          className={styles.primaryButton}
          onClick={() => setActiveTab("Customization")}
        >
          Go Back
        </button>
        <Link to="/app/getstarted">
          <button className={styles.secondaryButton}>Activate Rewards</button>
        </Link>
      </Box>
    </Box>
  );
}
