import React, { useState } from "react";
import { Box } from "@shopify/polaris";
import { FaCheckCircle } from "react-icons/fa";
import styles from "../styles/app.module.css";
import productCartColorIcon from "../assets/images/productCartColorIcon.svg";
import lineIconOne from "../assets/images/lineIconOne.svg";
import earnColorIcon from "../assets/images/earnColorIcon.svg";
import line2IconOne from "../assets/images/line2IconOne.svg";
import redeempointsColorIcon from "../assets/images/redeempointsColorIcon.svg";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function Reward({ activeTab, setActiveTab }) {
  const [selectedReward, setSelectedReward] = useState("5%");

  const handleTabClick = () => {
    setActiveTab("Customization");
  };

  return (
    <Box className={styles.rewardsSection}>
      <Box className={styles.rewardsContainer}>
        <Box className={styles.headerContent}>
          <h1 className={styles.headerContentText}>
            Rewards on every order with XP
          </h1>
          <p className={styles.headerContentDescription}>
            Do you know the largest enterprises typically use a 2-5% loyalty
            program rate, whereas smaller merchants use an average discount rate
            of 10%.
          </p>
        </Box>

        <Box className={styles.rewardsOptions}>
          <Box
            className={`${styles.rewardOption} ${
              selectedReward === "2%" ? styles.selected : ""
            }`}
            onClick={() => setSelectedReward("2%")}
          >
            <h2>2%</h2>
            <p>2% back in XP on every order</p>
            {selectedReward === "2%" && (
              <FaCheckCircle className={styles.checkIcon} />
            )}
          </Box>
          <Box
            className={`${styles.rewardOption} ${
              selectedReward === "5%" ? styles.selected : ""
            }`}
            onClick={() => setSelectedReward("5%")}
          >
            <h2>5%</h2>
            <p>5% back in XP on every order</p>
            {selectedReward === "5%" && (
              <FaCheckCircle className={styles.checkIcon} />
            )}
          </Box>
          <Box
            className={`${styles.rewardOption} ${
              selectedReward === "10%" ? styles.selected : ""
            }`}
            onClick={() => setSelectedReward("10%")}
          >
            <h2>10%</h2>
            <p>10% back in XP on every order</p>
            {selectedReward === "10%" && (
              <FaCheckCircle className={styles.checkIcon} />
            )}
          </Box>
        </Box>

        <Box className={styles.rewardStepsContent}>
          <Box className={styles.rewardStep}>
            <Box className={styles.rewardStepIcon}>
              <img src={productCartColorIcon} alt="productCartIcon" />
            </Box>
            <Box className={styles.rewardStepText}>
              <h4>Purchase</h4>
              <p>Spend $100</p>
            </Box>
            <Box className={styles.lineIconOne}>
              <img src={lineIconOne} alt="lineIconOne" />
            </Box>
          </Box>

          <Box className={styles.rewardStep}>
            <Box className={styles.rewardStepIcon}>
              <img src={earnColorIcon} alt="earnColorIcon" />
            </Box>
            <Box className={styles.rewardStepText}>
              <h4>Earn</h4>
              <p>Earn 100 XP</p>
            </Box>
            <Box className={styles.line2IconOne}>
              <img src={line2IconOne} alt="line2IconOne" />
            </Box>
          </Box>

          <Box className={styles.rewardStep}>
            <Box className={styles.rewardStepIcon}>
              {" "}
              <img src={redeempointsColorIcon} alt="redeempointsColorIcon" />
            </Box>
            <Box className={styles.rewardStepText}>
              <h4>Redeem</h4>
              <p>Redeem points to get a $10 coupon</p>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className={styles.buttonContainer}>
        <button
          primary="true"
          className={styles.backButton}
          disabled={activeTab === "Rewards"}
          style={{
            cursor: activeTab === "Rewards" ? "not-allowed" : "pointer",
          }}
        >
          Go Back
        </button>
        <button
          primary="true"
          className={styles.continueButton}
          onClick={handleTabClick}
        >
          Continue
        </button>
      </Box>
    </Box>
  );
}
