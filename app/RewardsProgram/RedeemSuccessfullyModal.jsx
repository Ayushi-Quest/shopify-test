import React from "react";
import styles from "../styles/addmore.module.css";
import { Box, Button } from "@shopify/polaris";
import CreatedSuccessfullyImage from "../assets/images/CreatedSuccessfullyImage.jpg";

const RedeemSuccessfullyModal = ({ onClose }) => {
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
            Program Activated Successfully!
          </h2>
          <p className={styles.createdSuccessfullysText}>
            Customers can now use points to enjoy discounts. Start boosting
            engagement today!
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

export default RedeemSuccessfullyModal;
