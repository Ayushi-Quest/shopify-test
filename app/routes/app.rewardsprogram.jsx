import React, { useState, useEffect } from "react";
import { Box } from "@shopify/polaris";
import { useSearchParams, useNavigate } from "@remix-run/react";
import styles from "../styles/rewardsprogram.module.css";
import EarnPoints from "../RewardsProgram/EarnPoints";
import RedeemPoints from "../RewardsProgram/RedeemPoints";
import ReferralPoints from "../RewardsProgram/ReferralPoints";
import TierPoints from "../RewardsProgram/TierPoints";

const RewardsProgram = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("earnpoints");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setSelectedTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    navigate(`/app/rewardsprogram?tab=${tab}`); 
  };

  return (
    <Box className={styles.rewardsProgramContainer}>
      <Box className={styles.rewardsProgramContainerTabs}>
        <Box
          className={`${styles.rewardsProgramContainerTab} ${
            selectedTab === "earnpoints"
              ? styles.rewardsProgramContainerTabActive
              : ""
          }`}
          onClick={() => handleTabChange("earnpoints")}
        >
          Earn Points
        </Box>
        <Box
          className={`${styles.rewardsProgramContainerTab} ${
            selectedTab === "redeempoint"
              ? styles.rewardsProgramContainerTabActive
              : ""
          }`}
          onClick={() => handleTabChange("redeempoint")}
        >
          Redeem Points
        </Box>
        <Box
          className={`${styles.rewardsProgramContainerTab} ${
            selectedTab === "referral"
              ? styles.rewardsProgramContainerTabActive
              : ""
          }`}
          onClick={() => handleTabChange("referral")}
        >
          Referral
        </Box>
        <Box
          className={`${styles.rewardsProgramContainerTab} ${
            selectedTab === "tier"
              ? styles.rewardsProgramContainerTabActive
              : ""
          }`}
          onClick={() => handleTabChange("tier")}
        >
          Tier
        </Box>
      </Box>
      <Box className={styles.rewardsProgramContainerTableWrapper}>
        <Box className={styles.rewardsProgramContainerTableSection}>
          <Box className={styles.rewardsProgramContainertableContent}>
            {selectedTab === "earnpoints" && <EarnPoints />}
            {selectedTab === "redeempoint" && <RedeemPoints />}
            {selectedTab === "referral" && <ReferralPoints />}
            {selectedTab === "tier" && <TierPoints />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RewardsProgram;
