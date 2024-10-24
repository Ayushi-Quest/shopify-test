import { Box, Spinner, Text } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import styles from "./tierpoints.module.css";
import editIcon from "../assets/images/editIcon.svg";
import addMoreIcon from "../assets/images/addMoreIcon.svg";
import tierMedalIcon from "../assets/images/tierMedalIcon.svg";
import TierAddMoreModal from "./TierAddMoreModal";
import TierSuccessfullyModal from "./TierSuccessfullyModal";
import { generalFunction } from "../config/generalFunction";
import axios from "axios";

const TierPoints = () => {
  const [isModalOpenTierAddMore, setIsModalOpenTierAddMore] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [isModalOpenCreatePlaceAnOrder, setIsModalOpenCreatePlaceAnOrder] =
    useState(false);
  const [tiers, setTiers] = useState([]);
  const [editData, setEditData] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const getInitialTiers = async () => {
    setLoading(true);
    try {
      const request = generalFunction.createUrl(
        `/api/entities/${generalFunction.getEntityId()}/membershipTiers?userId=${generalFunction.getUserId()}`,
      );
      const response = await axios.get(request.url, {
        headers: request.headers,
      });

      if (response?.data?.success) {
        const tierData = response?.data?.data;
        setTiers(tierData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateTier = ({
    membershipTier,
    description,
    xpThreshold,
    rewards,
    imageUrl,
    isEnabled,
    isVisible,
  }) => {
    try {
      const request = generalFunction.createUrl(
        `/api/entities/${generalFunction.getEntityId()}/membershipTiers/${membershipTier}/update?userId=${generalFunction.getUserId()}`,
      );
      const body = {
        xpThreshold,
        description,
        ...(imageUrl !== "" && { imageUrl }),
        ...(isEnabled !== undefined && { isEnabled }),
        ...(isVisible !== undefined && { isVisible }),
        ...(rewards !== "" && {
          rewards: [
            {
              type: "REWARD_XP",
              xp: rewards,
            },
          ],
        }),
      };

      axios
        .post(request.url, body, {
          headers: request.headers,
        })
        .then((res) => {
          if (isEnabled === false) {
            setTiers(
              tiers.filter((tier) => tier.membershipTier !== membershipTier),
            );
          } else {
            setTiers(
              tiers.map((tier) =>
                tier.membershipTier === membershipTier ? res.data.data : tier,
              ),
            );
          }
          setIsModalOpenTierAddMore(false);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (membershipTier, xpThreshold) => {
    try {
      const request = generalFunction.createUrl(
        `/api/entities/${generalFunction.getEntityId()}/membershipTiers/${membershipTier}/delete?userId=${generalFunction.getUserId()}`,
      );
      const body = {
        xpThreshold,
      };

      axios
        .post(request.url, body, {
          headers: request.headers,
        })
        .then((res) => {
          setTiers(
            tiers.filter((tier) => tier.membershipTier !== membershipTier),
          );
          setIsModalOpenTierAddMore(false);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getInitialTiers();
  }, []);

  const handleCloseModalCreatePlaceAnOrder = () => {
    setIsModalOpenCreatePlaceAnOrder(false);
  };

  const handleOpenModalTierAddMore = () => {
    setIsModalOpenTierAddMore(true);
  };

  const handleCloseModalTierAddMore = () => {
    setIsModalOpenTierAddMore(false);
  };

  const handleDateChange = (event) => {
    setStartDate(event.target.value);
  };

  return (
    <Box className={styles.tierPointsContent}>
      <Box className={styles.tierPointsContentSection}>
        <Box className={styles.tierPointsContentHeader}>
          <Box className={styles.tierPointsContentHeaderText}>
            <Text variant="headingLg" as="h1">
              Customer Loyalty Tiers
            </Text>
          </Box>
          <Box className={styles.tierPointsContentHeaderDescription}>
            <Text variant="bodyMd" as="p">
              Create loyalty tiers to reward your most dedicated customers and
              boost their lifetime value.
            </Text>
          </Box>
        </Box>
        <Box
          className={styles.tierPointsContentRepublishAppButton}
          onClick={handleOpenModalTierAddMore}
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
        {isModalOpenTierAddMore && !isModalOpenCreatePlaceAnOrder ? (
          <TierAddMoreModal
            onClose={handleCloseModalTierAddMore}
            setIsModalOpenAddMore={setIsModalOpenTierAddMore}
            setIsModalOpenCreatePlaceAnOrder={setIsModalOpenCreatePlaceAnOrder}
            updateTier={updateTier}
            tiers={tiers}
            setTiers={setTiers}
            editData={editData}
            setEditData={setEditData}
          />
        ) : !isModalOpenTierAddMore && isModalOpenCreatePlaceAnOrder ? (
          <TierSuccessfullyModal onClose={handleCloseModalCreatePlaceAnOrder} />
        ) : null}
      </Box>
      {loading ? (
        <Box
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "40vh",
          }}
        >
          <Spinner accessibilityLabel="Loading" size="large" />
        </Box>
      ) : (
        <>
          {tiers?.map((tier, index) => (
            <Box
              className={styles.tierPointsContentRewardPointsContent}
              key={tier?.membershipTier}
            >
              <Box className={styles.tierPointsContentRewardPointsItem}>
                <Box className={styles.tiersContainerRewardPointsItemSection}>
                  <Box
                    className={styles.tierPointsContentRewardPointsItemImage}
                  >
                    <img
                      src={tier?.imageUrl || tierMedalIcon}
                      alt="tierMedalIcon"
                      className={styles.tierMedalIcon}
                    />
                  </Box>
                  <Box className={styles.tierPointsContentRewardPointsItemText}>
                    <h2 className={styles.title}>{tier?.description}</h2>
                    <p>Earn {tier?.xpThreshold || 0} XP plus</p>
                  </Box>
                </Box>

                <Box
                  className={styles.tierPointsContentRewardPointsItemActions}
                >
                  <Box
                    className={`${styles.tierPointsContentStatusBadge} ${tier?.isVisible ? styles.active : styles.inactive}`}
                  >
                    {tier?.isVisible ? "Active" : "Inactive"}
                  </Box>

                  <Box
                    className={
                      styles.tierPointsContentRewardPointsItemCustomersButton
                    }
                  >
                    {`${tier?.xp || 0} Customers`}
                  </Box>
                  <Box
                    className={styles.tierPointsContentRewardPointsItemEdit}
                    onClick={() => toggleDropdown(index)}
                  >
                    <img
                      src={editIcon}
                      alt="editIcon"
                      className={styles.editIcon}
                    />
                    {dropdownOpen === index && (
                      <Box className={styles.dropdownMenu}>
                        <Box
                          className={styles.dropdownItem}
                          onClick={() => {
                            toggleDropdown(null);
                            setEditData(tier);
                            handleOpenModalTierAddMore();
                          }}
                        >
                          Edit
                        </Box>
                        <Box
                          className={styles.dropdownItem}
                          onClick={() => {
                            toggleDropdown(null);
                            handleDelete(
                              tier?.membershipTier,
                              tier?.xpThreshold,
                            );
                          }}
                        >
                          Delete
                        </Box>
                      </Box>
                    )}
                  </Box>

                  <Box className={styles.generalContentToggleSwitchContainer}>
                    <Box
                      className={styles.toggleSwitch}
                      onClick={() => {
                        updateTier({
                          ...tier,
                          rewards: tier?.xp,
                          isVisible: !tier?.isVisible,
                        });
                      }}
                      style={{
                        background: tier?.isVisible
                          ? "var(--button-strokegrey, linear-gradient(85deg, #535353 1.44%, #3E3E3E 99.78%))"
                          : "#D9D9D9",
                      }}
                    >
                      <Box
                        className={`${styles.switchCircle} ${tier?.isVisible ? styles.switchOn : styles.switchOff}`}
                      ></Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </>
      )}

      <Box className={styles.tierPointsContentHeader}>
        <Box className={styles.tierPointsContentHeaderText}>
          <Text variant="headingLg" as="h1">
            Settings
          </Text>
        </Box>
        <Box className={styles.tierPointsContentHeaderDescription}>
          <Text variant="bodyMd" as="p">
            Create tiers to reward your most loyal customers while increasing
            your average customer lifetime value.
          </Text>
        </Box>
      </Box>
      <Box className={styles.tierPointsContentProgramStartDate}>
        <div className={styles.datePickerContainer}>
          <label className={styles.label}>Program Start date</label>
          <div className={styles.inputWrapper}>
            <input
              type="date"
              value={startDate}
              onChange={handleDateChange}
              className={styles.input}
              placeholder="Select start date"
            />
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default TierPoints;
