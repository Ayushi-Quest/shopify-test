import React from "react";
import styles from "../styles/addmore.module.css";
import { Box, Button } from "@shopify/polaris";
import CreatedSuccessfullyImage from "../assets/images/CreatedSuccessfullyImage.jpg";

const TierSuccessfullyModal = ({ onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <Box className={styles.createdSuccessfullyContainer}>
        <img
          src={CreatedSuccessfullyImage}
          alt="CreatedSuccessfully-Image"
          className={styles.createdSuccessfully}
        />
        <div>
          <h2 className={styles.createdSuccessfullyTitle}>
            Loyalty Tier Created Successfully!
          </h2>
          <p className={styles.createdSuccessfullysText}>
            Your new loyalty tier has been added and is now active for your
            customers.
          </p>
        </div>

        <Button
          variant="primary"
          className={styles.createdSuccessfullyButton}
          onClick={onClose}
        >
          Continue
        </Button>
      </Box>
    </div>
  );
};

export default TierSuccessfullyModal;
