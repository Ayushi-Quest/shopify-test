import React, { useState } from "react";
import styles from "../styles/rewardsprogram.module.css";
import discordIcon from "../assets/images/discordIcon.svg";
import twitterIcon from "../assets/images/twitterIcon.svg";
import { Button } from "@shopify/polaris";

const RedeemAddMoreModal = ({
  onClose,
  setIsModalOpenAddMore,
  setIsModalOpenCreatePlaceAnOrder,
}) => {
  const [programName, setProgramName] = useState("");
  const [programDescription, setProgramDescription] = useState("");
  const [actionData, setActionData] = useState("");
  const [earningPoints, setEarningPoints] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpenCreatePlaceAnOrder(true);
    setIsModalOpenAddMore(false);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Redeem program</h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <form>
          <div className={styles.formGroup}>
            <label htmlFor="programName">Enter your program name</label>
            <input
              type="text"
              id="programName"
              value={programName}
              onChange={(e) => setProgramName(e.target.value)}
              placeholder="e.g Get the discount "
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="programDescription">
              Enter your program description
            </label>
            <input
              type="text"
              id="programDescription"
              value={programDescription}
              onChange={(e) => setProgramDescription(e.target.value)}
              placeholder="e.g Get the discount on 10 %"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Choose Action Data</label>
            <div className={styles.actionButtons}>
              <button
                type="button"
                className={`${styles.actionButton} ${
                  actionData === "Discord" ? styles.active : ""
                }`}
                onClick={() => setActionData("Discord")}
              >
                <img
                  src={discordIcon}
                  alt="Discord"
                  className={styles.discordIcon}
                />
                Discord amount
              </button>
              <button
                type="button"
                className={`${styles.actionButton} ${
                  actionData === "Twitter" ? styles.active : ""
                }`}
                onClick={() => setActionData("Twitter")}
              >
                <img
                  src={twitterIcon}
                  alt="Twitter"
                  className={styles.twitterIcon}
                />
                Discount percentage
              </button>
            </div>
          </div>
          <div className={styles.formGroupContent}>
            <div className={styles.earningPointsInput}>
              <label htmlFor="earningPoints">Redeems every</label>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  id="earningPoints"
                  value={earningPoints}
                  onChange={(e) => setEarningPoints(e.target.value)}
                  placeholder="e.g 100"
                  required
                />
              </div>
            </div>
            <div className={styles.earningPointsInput}>
              <label htmlFor="earningPoints">Earn discount</label>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  id="earningPoints"
                  value={earningPoints}
                  onChange={(e) => setEarningPoints(e.target.value)}
                  placeholder="e.g 10"
                  required
                />
              </div>
            </div>
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
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RedeemAddMoreModal;
