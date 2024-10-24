import { Box, Spinner, Text } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import styles from "./earnpoints.module.css";
import EarnAddMoreModal from "./EarnAddMoreModal";
import editIcon from "../assets/images/editIcon.svg";
import addMoreIcon from "../assets/images/addMoreIcon.svg";
import EarnSuccessfullyModal from "./EarnSuccessfullyModal";
import { defaultCalls } from "../routes/defaultCalls";
import { generalFunction } from "../config/generalFunction";
import discordIcon from "../assets/images/discordIcon.svg";
import twitterIcon from "../assets/images/twitterIcon.svg";
import productIcon from "../assets/images/productCartIcon.svg";
import axios from "axios";

const EarnPoints = () => {
  const [questDetails, setQuestDetails] = useState({});
  const [actions, setActions] = useState([]);
  const [isModalOpenAddMore, setIsModalOpenAddMore] = useState(false);
  const [editFor, setEditFor] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const getMainQuest = async () => {
    setLoading(true);
    try {
      let response = await defaultCalls({ priority: "main" });
      setQuestDetails(response?.data);
      setActions(response?.eligibilityData);
    } catch (error) {
      console.error("Error fetching quest details:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateMainQuest = async (
    modActions,
    eligibilityCriteriaIdsToDelete,
  ) => {
    try {
      const request = generalFunction.createUrl(
        `/api/entities/${generalFunction.getEntityId()}/quests/q-shopify-component/update?userId=${generalFunction.getUserId()}`,
      );
      const response = await axios.post(
        request.url,
        {
          title: questDetails?.title,
          description: questDetails?.description,
          eligibilityCriterias: (modActions.length ? modActions : actions)?.map(
            (e) => {
              return {
                ...(e?.data?.criteriaId && { id: e?.data?.criteriaId }),
                type: e?.data?.criteriaType,
                data: e.data.metadata,
              };
            },
          ),
          ...(eligibilityCriteriaIdsToDelete?.length && {
            eligibilityCriteriaIdsToDelete,
          }),
          rewards: [],
        },
        {
          headers: request.headers,
        },
      );

      if (response?.data?.success) {
        setIsModalOpenCreatePlaceAnOrder(true);
        setIsModalOpenAddMore(false);
        getMainQuest();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (criteriaId) => {
    let modData = actions.filter((e) => e?.data?.criteriaId != criteriaId);
    await updateMainQuest(modData, [criteriaId]);
    setActions(() => modData);
  };

  const changeAvailability = async (criteriaId) => {
    let modData = actions.map((prevAction) => {
      if (prevAction?.data?.criteriaId === criteriaId) {
        return {
          ...prevAction,
          data: {
            ...prevAction?.data,
            metadata: {
              ...prevAction?.data?.metadata,
              isActive: !prevAction?.data?.metadata?.isActive,
            },
          },
        };
      } else {
        return prevAction;
      }
    });

    setActions(() => modData);
    updateMainQuest(modData);
  };

  const handleOpenModalAddMore = () => {
    setIsModalOpenAddMore(true);
    setIsModalOpenCreatePlaceAnOrder(false);
  };

  const handleCloseModalAddMore = () => {
    setIsModalOpenAddMore(false);
    setEditFor("");
  };

  const [isModalOpenCreatePlaceAnOrder, setIsModalOpenCreatePlaceAnOrder] =
    useState(false);
  const handleCloseModalCreatePlaceAnOrder = () => {
    setIsModalOpenCreatePlaceAnOrder(false);
  };

  useEffect(() => {
    getMainQuest();
  }, []);

  return (
    <Box className={styles.earnPointsContent}>
      {loading ? (
        <Box
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <Spinner accessibilityLabel="Loading" size="large" />
        </Box>
      ) : (
        <>
          <Box className={styles.earnPointsContentSection}>
            <Box className={styles.earnPointsContentHeader}>
              <Box className={styles.earnPointsContentHeaderText}>
                <Text variant="headingLg" as="h1">
                  Drive Loyalty with Reward Points
                </Text>
              </Box>
              <Box className={styles.earnPointsContentHeaderDescription}>
                <Text variant="bodyMd" as="p">
                  Engage your customers with easy ways to earn rewards and stay
                  connected!
                </Text>
              </Box>
            </Box>
            <Box
              className={styles.earnPointsContentRepublishAppButton}
              onClick={handleOpenModalAddMore}
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
            {isModalOpenAddMore && !isModalOpenCreatePlaceAnOrder ? (
              <EarnAddMoreModal
                onClose={handleCloseModalAddMore}
                setIsModalOpenAddMore={setIsModalOpenAddMore}
                setIsModalOpenCreatePlaceAnOrder={
                  setIsModalOpenCreatePlaceAnOrder
                }
                updateMainQuest={updateMainQuest}
                actions={actions}
                editFor={editFor}
                setEditFor={setEditFor}
              />
            ) : !isModalOpenAddMore && isModalOpenCreatePlaceAnOrder ? (
              <EarnSuccessfullyModal
                onClose={handleCloseModalCreatePlaceAnOrder}
                isModalOpenAddMore={isModalOpenAddMore}
                isModalOpenCreatePlaceAnOrder={isModalOpenCreatePlaceAnOrder}
              />
            ) : null}
          </Box>

          {actions?.map((action, index) => (
            <Box
              className={styles.earnPointsContentRewardPointsContent}
              key={index}
            >
              <Box className={styles.earnPointsContentRewardPointsItem}>
                <Box
                  className={styles.earnPointsContentRewardPointsItemSection}
                >
                  <Box
                    className={styles.earnPointsContentRewardPointsItemImage}
                  >
                    <img
                      src={
                        action?.data?.criteriaType?.includes("DISCORD")
                          ? discordIcon
                          : action?.data?.criteriaType?.includes("TWITTER")
                            ? twitterIcon
                            : productIcon
                      }
                      alt="placeAnOrderIcon"
                      className={styles.placeAnOrderIcon}
                    />
                  </Box>
                  <Box className={styles.earnPointsContentRewardPointsItemText}>
                    <h2 className={styles.title}>
                      {action?.data?.metadata?.title}
                    </h2>
                    <p>{action?.data?.metadata?.description}</p>
                  </Box>
                </Box>

                <Box
                  className={styles.earnPointsContentRewardPointsItemActions}
                >
                  <Box
                    className={`${styles.earnPointsContentStatusBadge} ${
                      action?.data?.metadata?.isActive
                        ? styles.active
                        : styles.inactive
                    }`}
                  >
                    {action?.data?.metadata?.isActive ? "Active" : "Inactive"}
                  </Box>

                  <Box
                    className={styles.earnPointsContentRewardPointsItemXPButton}
                  >
                    {action?.data?.metadata?.xp || 0} XP
                  </Box>
                  <Box
                    className={styles.earnPointsContentRewardPointsItemEdit}
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
                            setEditFor(action?.data?.criteriaId);
                            handleOpenModalAddMore();
                          }}
                        >
                          Edit
                        </Box>
                        <Box
                          className={styles.dropdownItem}
                          onClick={() => {
                            toggleDropdown(null);
                            handleDelete(action?.data?.criteriaId);
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
                      onClick={() =>
                        changeAvailability(action?.data?.criteriaId)
                      }
                      style={{
                        background: action?.data?.metadata?.isActive
                          ? "var(--button-strokegrey, linear-gradient(85deg, #535353 1.44%, #3E3E3E 99.78%))"
                          : "#D9D9D9",
                      }}
                    >
                      <Box
                        className={`${styles.switchCircle} ${
                          action?.data?.metadata?.isActive
                            ? styles.switchOn
                            : styles.switchOff
                        }`}
                      ></Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </>
      )}
    </Box>
  );
};

export default EarnPoints;
