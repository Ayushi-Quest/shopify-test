import { Box, Text } from "@shopify/polaris";
import React, { useState } from "react";
import styles from "./redeempoints.module.css";
import earnCash from "../assets/images/earnCash.svg";
import getBigSaving from "../assets/images/getBigSaving.svg";
import editIcon from "../assets/images/editIcon.svg";
import addMoreIcon from "../assets/images/addMoreIcon.svg";
import RedeemAddMoreModal from "./RedeemAddMoreModal";
import RedeemSuccessfullyModal from "./RedeemSuccessfullyModal";

const RedeemPoints = () => {
  const [isModalOpenRedeemAddMore, setIsModalOpenRedeemAddMore] =
    useState(false);
  const [isActivePlaceAnOrder, setIsActivePlaceAnOrder] = useState(true);
  const [isActiveSignUp, setIsActiveSignUp] = useState(false);
  const [isActiveFacebookLink, setIsActiveFacebookLink] = useState(true);
  const [isModalOpenCreatePlaceAnOrder, setIsModalOpenCreatePlaceAnOrder] =
    useState(false);
  const handleCloseModalCreatePlaceAnOrder = () => {
    setIsModalOpenCreatePlaceAnOrder(false);
  };

  const handleOpenModalRedeemAddMore = () => {
    setIsModalOpenRedeemAddMore(true);
  };

  const handleCloseModalRedeemAddMore = () => {
    setIsModalOpenRedeemAddMore(false);
  };

  const toggleSwitchPlaceAnOrder = () =>
    setIsActivePlaceAnOrder(!isActivePlaceAnOrder);

  const toggleSwitchSignUp = () => setIsActiveSignUp(!isActiveSignUp);

  const toggleSwitchFacebookLink = () => {
    setIsActiveFacebookLink(!isActiveFacebookLink);
  };

  return (
    <Box className={styles.redeemPointsContent}>
      <Box className={styles.redeemPointsContentSection}>
        <Box className={styles.redeemPointsContentHeader}>
          <Box className={styles.redeemPointsContentHeaderText}>
            <Text variant="headingLg" as="h1">
              Redeem Points for Discounts
            </Text>
          </Box>
          <Box className={styles.redeemPointsContentHeaderDescription}>
            <Text variant="bodyMd" as="p">
              Create programs that let customers use points for great discounts.
            </Text>
          </Box>
        </Box>
        <Box
          className={styles.redeemPointsContentRepublishAppButton}
          onClick={handleOpenModalRedeemAddMore}
        >
          <img
            src={addMoreIcon}
            alt="addMoreIcon"
            className={styles.addMoreIcon}
          />
          <Text variant="bodyMd" as="p">
            Add more
          </Text>
        </Box>
        {isModalOpenRedeemAddMore && !isModalOpenCreatePlaceAnOrder ? (
          <RedeemAddMoreModal
            onClose={handleCloseModalRedeemAddMore}
            setIsModalOpenAddMore={setIsModalOpenRedeemAddMore}
            setIsModalOpenCreatePlaceAnOrder={setIsModalOpenCreatePlaceAnOrder}
          />
        ) : !isModalOpenRedeemAddMore && isModalOpenCreatePlaceAnOrder ? (
          <RedeemSuccessfullyModal
            onClose={handleCloseModalCreatePlaceAnOrder}
          />
        ) : null}
      </Box>

      <Box className={styles.redeemPointsContentRewardPointsContent}>
        <Box className={styles.redeemPointsContentRewardPointsItem}>
          <Box className={styles.redeemPointsContentRewardPointsItemSection}>
            <Box className={styles.redeemPointsContentRewardPointsItemImage}>
              <img src={earnCash} alt="earnCash" className={styles.earnCash} />
            </Box>
            <Box className={styles.redeemPointsContentRewardPointsItemText}>
              <h2 className={styles.title}>Earn Cash Discounts Easily</h2>
              <p>Redeem 100 points for a $10 discount on purchases.</p>
            </Box>
          </Box>

          <Box className={styles.redeemPointsContentRewardPointsItemActions}>
            <Box
              className={`${styles.redeemPointsContentStatusBadge} ${
                isActivePlaceAnOrder ? styles.active : styles.inactive
              }`}
            >
              {isActivePlaceAnOrder ? "Active" : "Inactive"}
            </Box>

            <Box className={styles.redeemPointsContentRewardPointsItemXPButton}>
              $10
            </Box>
            <Box className={styles.redeemPointsContentRewardPointsItemEdit}>
              <img src={editIcon} alt="editIcon" className={styles.editIcon} />
            </Box>
            <Box className={styles.generalContentToggleSwitchContainer}>
              <Box
                className={styles.toggleSwitch}
                onClick={toggleSwitchPlaceAnOrder}
                style={{
                  background: isActivePlaceAnOrder
                    ? "var(--button-strokegrey, linear-gradient(85deg, #535353 1.44%, #3E3E3E 99.78%))"
                    : "#D9D9D9",
                }}
              >
                <Box
                  className={`${styles.switchCircle} ${
                    isActivePlaceAnOrder ? styles.switchOn : styles.switchOff
                  }`}
                ></Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className={styles.redeemPointsContentRewardPointsContent}>
        <Box className={styles.redeemPointsContentRewardPointsItem}>
          <Box className={styles.redeemPointsContentRewardPointsItemSection}>
            <Box className={styles.redeemPointsContentRewardPointsItemImage}>
              <img src={earnCash} alt="earnCash" className={styles.earnCash} />
            </Box>
            <Box className={styles.redeemPointsContentRewardPointsItemText}>
              <h2 className={styles.title}>Earn Cash Discounts Easily</h2>
              <p>Redeem 300 points for a $30 discount on purchases.</p>
            </Box>
          </Box>

          <Box className={styles.redeemPointsContentRewardPointsItemActions}>
            <Box
              className={`${
                styles.redeemPointsContentStatusBadge
              } ${isActiveSignUp ? styles.active : styles.inactive}`}
            >
              {isActiveSignUp ? "Active" : "Inactive"}
            </Box>

            <Box className={styles.redeemPointsContentRewardPointsItemXPButton}>
              $30
            </Box>
            <Box className={styles.redeemPointsContentRewardPointsItemEdit}>
              <img src={editIcon} alt="editIcon" className={styles.editIcon} />
            </Box>
            <Box className={styles.generalContentToggleSwitchContainer}>
              <Box
                className={styles.toggleSwitch}
                onClick={toggleSwitchSignUp}
                style={{
                  background: isActiveSignUp
                    ? "var(--button-strokegrey, linear-gradient(85deg, #535353 1.44%, #3E3E3E 99.78%))"
                    : "#D9D9D9",
                }}
              >
                <Box
                  className={`${styles.switchCircle} ${
                    isActiveSignUp ? styles.switchOn : styles.switchOff
                  }`}
                ></Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className={styles.redeemPointsContentRewardPointsContent}>
        <Box className={styles.redeemPointsContentRewardPointsItem}>
          <Box className={styles.redeemPointsContentRewardPointsItemSection}>
            <Box className={styles.redeemPointsContentRewardPointsItemImage}>
              <img
                src={getBigSaving}
                alt="getBigSaving"
                className={styles.getBigSaving}
              />
            </Box>
            <Box className={styles.redeemPointsContentRewardPointsItemText}>
              <h2 className={styles.title}>Get Big Savings with Points</h2>
              <p>
                Get offer deals like 25% off for 300 points to encourage bigger
                buys.
              </p>
            </Box>
          </Box>

          <Box className={styles.redeemPointsContentRewardPointsItemActions}>
            <Box
              className={`${styles.redeemPointsContentStatusBadge} ${
                isActiveFacebookLink ? styles.active : styles.inactive
              }`}
            >
              {isActiveFacebookLink ? "Active" : "Inactive"}
            </Box>

            <Box className={styles.redeemPointsContentRewardPointsItemXPButton}>
              25%
            </Box>
            <Box className={styles.redeemPointsContentRewardPointsItemEdit}>
              <img src={editIcon} alt="editIcon" className={styles.editIcon} />
            </Box>
            <Box className={styles.generalContentToggleSwitchContainer}>
              <Box
                className={styles.toggleSwitch}
                onClick={toggleSwitchFacebookLink}
                style={{
                  background: isActiveFacebookLink
                    ? "var(--button-strokegrey, linear-gradient(85deg, #535353 1.44%, #3E3E3E 99.78%))"
                    : "#D9D9D9",
                }}
              >
                <Box
                  className={`${styles.switchCircle} ${
                    isActiveFacebookLink ? styles.switchOn : styles.switchOff
                  }`}
                ></Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RedeemPoints;
