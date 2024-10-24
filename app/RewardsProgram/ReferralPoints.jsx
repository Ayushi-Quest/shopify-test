import { Box, Button, Text } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import ReferralAddMoreModal from "./ReferralAddMoreModal";
import styles from "./referralpoints.module.css";
import editIcon from "../assets/images/editIcon.svg";
import addMoreIcon from "../assets/images/addMoreIcon.svg";
import rewardGift from "../assets/images/rewardGift.svg";
import rewardReferringCustomer from "../assets/images/rewardReferringCustomers.svg";
import discordIcon from "../assets/images/discordIcon.svg";
import facebookIcon from "../assets/images/facebookIcon.svg";
import twitterIcon from "../assets/images/twitterIcon.svg";
import linkedInIcon from "../assets/images/linkedInIcon.svg";
import ReferralSuccessfullyModal from "./ReferralSuccessfullyModal";
import { defaultCalls } from "../routes/defaultCalls";
import { generalFunction } from "../config/generalFunction";
import axios from "axios";

const ReferralPoints = () => {
  const [isModalOpenReferralAddMore, setIsModalOpenReferralAddMore] =
    useState(false);
  const [isActivePlaceAnOrder, setIsActivePlaceAnOrder] = useState(true);
  const [isActiveSignUp, setIsActiveSignUp] = useState(false);
  const [isModalOpenCreatePlaceAnOrder, setIsModalOpenCreatePlaceAnOrder] =
    useState(false);
  const [referralData, setReferralData] = useState([]);
  const [popupValue, setPopupValue] = useState("");

  const handleCloseModalCreatePlaceAnOrder = () => {
    setIsModalOpenCreatePlaceAnOrder(false);
  };

  const handleOpenModalReferralAddMore = () => {
    setIsModalOpenReferralAddMore(true);
  };

  const handleCloseModalReferralAddMore = () => {
    setIsModalOpenReferralAddMore(false);
  };

  const toggleSwitchPlaceAnOrder = () =>
    setIsActivePlaceAnOrder(!isActivePlaceAnOrder);

  const toggleSwitchSignUp = () => setIsActiveSignUp(!isActiveSignUp);

  const getReferralQuest = async () => {
    let response = await defaultCalls({ priority: "referral" });
    setReferralData(response?.data);
  };

  const updateReferralQuest = async () => {
    try {
      const request = generalFunction.createUrl(
        `/api/entities/${generalFunction.getEntityId()}/quests/q-shopify-referral/update?userId=${generalFunction.getUserId()}`,
      );
      const response = await axios.post(
        request.url,
        {
          title: referralData?.title,
          description: referralData?.description,
          eligibilityCriterias: [],
          rewards: [],
          hasReferral: true,
          priority: 1,
          referralXP: referralData?.referralXP,
          referredUserXP: referralData?.referredUserXP,
          visibility: "PUBLIC",
          isMultiQuest: false,
          metadata: referralData?.metadata,
        },
        {
          headers: request.headers,
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getReferralQuest();
  }, []);

  const setReferralSocials = (social) => {
    setReferralData((prevReferralData) => {
      const socials = prevReferralData?.metadata?.socials || [];

      if (socials.includes(social)) {
        return {
          ...prevReferralData,
          metadata: {
            ...prevReferralData.metadata,
            socials: socials.filter((item) => item !== social),
          },
        };
      } else {
        return {
          ...prevReferralData,
          metadata: {
            ...prevReferralData.metadata,
            socials: [...socials, social],
          },
        };
      }
    });
  };

  return (
    <Box className={styles.earnPointsContent}>
      <Box className={styles.earnPointsContentSection}>
        <Box className={styles.earnPointsContentHeader}>
          <Box className={styles.earnPointsContentHeaderText}>
            <Text variant="headingLg" as="h1">
              Referral Points
            </Text>
          </Box>
          <Box className={styles.earnPointsContentHeaderDescription}>
            <Text variant="bodyMd" as="p">
              Expand your community by rewarding customers for inviting their
              friends.
            </Text>
          </Box>
        </Box>
        {isModalOpenReferralAddMore && !isModalOpenCreatePlaceAnOrder ? (
          <ReferralAddMoreModal
            onClose={handleCloseModalReferralAddMore}
            referralData={referralData}
            setReferralData={setReferralData}
            popupValue={popupValue}
            setIsModalOpenAddMore={setIsModalOpenReferralAddMore}
            setIsModalOpenCreatePlaceAnOrder={setIsModalOpenCreatePlaceAnOrder}
          />
        ) : !isModalOpenReferralAddMore && isModalOpenCreatePlaceAnOrder ? (
          <ReferralSuccessfullyModal
            onClose={handleCloseModalCreatePlaceAnOrder}
          />
        ) : null}
      </Box>

      <Box className={styles.rewardsProgramContainerRewardPointsContent}>
        <Box className={styles.rewardsProgramContainerRewardPointsItem}>
          <Box
            className={styles.rewardsProgramContainerRewardPointsItemSection}
          >
            <Box
              className={styles.rewardsProgramContainerRewardPointsItemImage}
            >
              <img
                src={rewardGift}
                alt="rewardGift"
                className={styles.rewardGift}
              />
            </Box>
            <Box className={styles.rewardsProgramContainerRewardPointsItemText}>
              <h2 className={styles.title}>Rewards for New Customers</h2>
              <p>
                New customers earn 100 XP when they join through a referral.
              </p>
            </Box>
          </Box>

          <Box
            className={styles.rewardsProgramContainerRewardPointsItemActions}
          >
            <Box
              className={`${styles.rewardsProgramContentStatusBadge} ${
                referralData?.referralXP > 0 ? styles.active : styles.inactive
              }`}
            >
              {referralData?.referralXP > 0 ? "Active" : "Inactive"}
            </Box>

            <Box
              className={styles.rewardsProgramContainerRewardPointsItemXPButton}
            >
              {referralData?.referralXP || 0} XP
            </Box>
            <Box
              className={styles.rewardsProgramContainerRewardPointsItemEdit}
              onClick={() => {
                setPopupValue("referralXP");
                handleOpenModalReferralAddMore();
              }}
            >
              <img src={editIcon} alt="editIcon" className={styles.editIcon} />
            </Box>
            <Box className={styles.generalContentToggleSwitchContainer}>
              <Box
                className={styles.toggleSwitch}
                onClick={toggleSwitchPlaceAnOrder}
                style={{
                  background:
                    referralData?.referralXP > 0
                      ? "var(--button-strokegrey, linear-gradient(85deg, #535353 1.44%, #3E3E3E 99.78%))"
                      : "#D9D9D9",
                }}
              >
                <Box
                  className={`${styles.switchCircle} ${
                    referralData?.referralXP > 0
                      ? styles.switchOn
                      : styles.switchOff
                  }`}
                ></Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className={styles.rewardsProgramContainerRewardPointsContent}>
        <Box className={styles.rewardsProgramContainerRewardPointsItem}>
          <Box
            className={styles.rewardsProgramContainerRewardPointsItemSection}
          >
            <Box
              className={styles.rewardsProgramContainerRewardPointsItemImage}
            >
              <img
                src={rewardReferringCustomer}
                alt="rewardReferringCustomer"
                className={styles.rewardReferringCustomer}
              />
            </Box>
            <Box className={styles.rewardsProgramContainerRewardPointsItemText}>
              <h2 className={styles.title}>Rewards for Referring Customers</h2>
              <p>
                Existing customers earn 100 XP for every successful referral.
              </p>
            </Box>
          </Box>

          <Box
            className={styles.rewardsProgramContainerRewardPointsItemActions}
          >
            <Box
              className={`${
                styles.rewardsProgramContentStatusBadge
              } ${referralData?.referredUserXP > 0 ? styles.active : styles.inactive}`}
            >
              {referralData?.referredUserXP > 0 ? "Active" : "Inactive"}
            </Box>

            <Box
              className={styles.rewardsProgramContainerRewardPointsItemXPButton}
            >
              {referralData?.referredUserXP || 0} XP
            </Box>
            <Box
              className={styles.rewardsProgramContainerRewardPointsItemEdit}
              onClick={() => {
                setPopupValue("referredUserXP");
                handleOpenModalReferralAddMore();
              }}
            >
              <img src={editIcon} alt="editIcon" className={styles.editIcon} />
            </Box>
            <Box className={styles.generalContentToggleSwitchContainer}>
              <Box
                className={styles.toggleSwitch}
                onClick={toggleSwitchSignUp}
                style={{
                  background:
                    referralData?.referredUserXP > 0
                      ? "var(--button-strokegrey, linear-gradient(85deg, #535353 1.44%, #3E3E3E 99.78%))"
                      : "#D9D9D9",
                }}
              >
                <Box
                  className={`${styles.switchCircle} ${
                    referralData?.referredUserXP > 0
                      ? styles.switchOn
                      : styles.switchOff
                  }`}
                ></Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className={styles.referralsPointsContentHeader}>
        <Box className={styles.referralsPointsContentHeaderText}>
          <Text variant="headingLg" as="h1">
            Settings
          </Text>
        </Box>
        <Box className={styles.referralsPointsContentHeaderDescription}>
          <Text variant="bodyMd" as="p">
            Create referrals to reward your most loyal customers while
            increasing your average customer lifetime value.
          </Text>
        </Box>
      </Box>
      <div className={styles.referralFormContent}>
        <form>
          <div className={styles.formGroup}>
            <label htmlFor="programName">Enter your program name</label>
            <input
              type="text"
              id="programName"
              value={referralData?.title}
              onChange={(e) =>
                setReferralData({
                  ...referralData,
                  ...{ title: e.target.value },
                })
              }
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
              value={referralData?.description}
              onChange={(e) =>
                setReferralData({
                  ...referralData,
                  ...{ description: e.target.value },
                })
              }
              placeholder="e.g Get the discount on 10 %"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Share via social media</label>
            <Box className={styles.referralContainerFilterMenu}>
              <Box className={styles.referralContainerFilterMenuRadio}>
                <input
                  type="checkbox"
                  name="filter"
                  id="discord"
                  checked={referralData?.metadata?.socials?.includes("discord")}
                  onChange={() => setReferralSocials("discord")}
                />
                <Box className={styles.referralContainerFilterMenuRadioLabel}>
                  <img
                    src={discordIcon}
                    alt="Discord"
                    className={styles.discordIcon}
                  />
                  <label htmlFor="discord">Discord</label>
                </Box>
              </Box>
              <Box className={styles.referralContainerFilterMenuRadio}>
                <input
                  type="checkbox"
                  name="filter"
                  id="facebook"
                  checked={referralData?.metadata?.socials?.includes(
                    "facebook",
                  )}
                  onChange={() => setReferralSocials("facebook")}
                />
                <Box className={styles.referralContainerFilterMenuRadioLabel}>
                  <img
                    src={facebookIcon}
                    alt="facebookIcon"
                    className={styles.facebookIcon}
                  />
                  <label htmlFor="facebook">Facebook</label>
                </Box>
              </Box>
              <Box className={styles.referralContainerFilterMenuRadio}>
                <input
                  type="checkbox"
                  name="filter"
                  id="twitter"
                  checked={referralData?.metadata?.socials?.includes("twitter")}
                  onChange={() => setReferralSocials("twitter")}
                />
                <Box className={styles.referralContainerFilterMenuRadioLabel}>
                  <img
                    src={twitterIcon}
                    alt="twitterIcon"
                    className={styles.twitterIcon}
                  />
                  <label htmlFor="twitter">Twitter</label>
                </Box>
              </Box>
              <Box className={styles.referralContainerFilterMenuRadio}>
                <input
                  type="checkbox"
                  name="filter"
                  id="linkedin"
                  checked={referralData?.metadata?.socials?.includes(
                    "linkedin",
                  )}
                  onChange={() => setReferralSocials("linkedin")}
                />
                <Box className={styles.referralContainerFilterMenuRadioLabel}>
                  <img
                    src={linkedInIcon}
                    alt="linkedInIcon"
                    className={styles.linkedInIcon}
                  />
                  <label htmlFor="linkedin">Linkedin</label>
                </Box>
              </Box>
            </Box>
          </div>
          <div className={styles.formGroupContent}>
            <div className={styles.earningPointsInput}>
              <label htmlFor="earningPoints">Referral redirection URL</label>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  id="earningPoints"
                  value={referralData?.metadata?.referralLink}
                  onChange={(e) =>
                    setReferralData({
                      ...referralData,
                      ...{
                        metadata: {
                          ...referralData?.metadata,
                          ...{ referralLink: e.target.value },
                        },
                      },
                    })
                  }
                  placeholder="https://"
                  required
                />
              </div>
            </div>
          </div>
          <div className={styles.formActions}>
            {/* <Button
              variant="secondary"
              type="button"
              className={styles.cancelButton}
              // onClick={onClose}
            >
              Cancel
            </Button> */}
            <Button
              variant="primary"
              type="button"
              className={styles.createButton}
              onClick={updateReferralQuest}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </Box>
  );
};

export default ReferralPoints;
