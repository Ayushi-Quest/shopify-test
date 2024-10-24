import React, { useState } from "react";
import styles from "../styles/rewardsprogram.module.css";
import { Button } from "@shopify/polaris";

const ReferralAddMoreModal = ({
  onClose,
  referralData,
  setReferralData,
  popupValue,
  setIsModalOpenAddMore,
  setIsModalOpenCreatePlaceAnOrder,
}) => {
  const [rewards, setRewards] = useState(referralData[popupValue] || 0);
  const handleSubmit = (e) => {
    e.preventDefault();
    setReferralData({...referralData, ...{[popupValue]: rewards}})
    setIsModalOpenAddMore(false);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Referral program</h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <form>
          <div className={styles.formGroup}>
            <label htmlFor="rewards">Enter rewards</label>
            <input
              type="number"
              id="rewards"
              value={rewards}
              onChange={(e) => setRewards(e.target.value)}
              placeholder="e.g 10 "
              required
            />
          </div>
          <div className={styles.formActions}>
            <Button
              variant="secondary"
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="button"
              className={styles.createButton}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReferralAddMoreModal;
