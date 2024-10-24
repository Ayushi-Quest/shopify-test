import React, { useEffect, useState } from "react";
import styles from "../styles/rewardsprogram.module.css";
import { Box, Button } from "@shopify/polaris";
import { generalFunction } from "../config/generalFunction";
import axios from "axios";
import UploadImage from "./UploadImage";

const TierAddMoreModal = ({
  onClose,
  setIsModalOpenAddMore,
  setIsModalOpenCreatePlaceAnOrder,
  updateTier,
  tiers,
  setTiers,
  editData,
  setEditData,
}) => {
  const [description, setDescription] = useState("");
  const [xpThreshold, setXpThreshold] = useState("");
  const [rewards, setRewards] = useState("");
  const [file, setFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const createtier = async ({ imagelink }) => {
    try {
      const request = generalFunction.createUrl(
        `/api/entities/${generalFunction.getEntityId()}/membershipTiers?userId=${generalFunction.getUserId()}`,
      );
      const body = {
        xpThreshold,
        description,
        membershipTier: new Date().getTime(),
        ...(imagelink != "" && { imageUrl: imagelink }),
        rewards: [
          {
            type: "REWARD_XP",
            xp: Number(rewards),
          },
        ],
      };

      axios
        .post(request.url, body, {
          headers: request.headers,
        })
        .then((res) => {
          if (res.data.success) {
            setTiers([...tiers, res.data.data]);
            setIsModalOpenCreatePlaceAnOrder(true);
            setIsModalOpenAddMore(false);
            clearData();
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const clearData = (e) => {
    setDescription("");
    setXpThreshold("");
    setRewards("");
    setFile("");
    setImageUrl("");
    setEditData(null);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (description == "" || xpThreshold == "" || rewards == "") {
      return;
    }

    let imagelink = "";
    if (file) {
      let links = await generalFunction.uploadImage(file);
      if (links?.data?.success) {
        imagelink = links.data.imageUrl;
        setImageUrl(imagelink);
      }
    }

    editData?.membershipTier
      ? updateTier({
          ...editData,
          description,
          xpThreshold,
          rewards,
          imageUrl: imagelink || editData.imageUrl,
        })
      : createtier({ imagelink });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  useEffect(() => {
    if (editData?.membershipTier) {
      setDescription(editData.description);
      setXpThreshold(editData.xpThreshold);
      setRewards(editData.xp);
      setImageUrl(editData.imageUrl);
    }
  }, [editData]);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Create a New Loyalty Tier</h2>
          <button className={styles.closeButton} onClick={clearData}>
            &times;
          </button>
        </div>

        <form style={{ gap: "4px" }}>
          <div className={styles.formGroup}>
            <label htmlFor="programName">Enter Display tier name</label>
            <input
              type="text"
              id="programName"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Bronze "
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="programDescription">
              Enter milestone to achieve tier
            </label>
            <input
              type="number"
              id="programDescription"
              value={xpThreshold}
              onChange={(e) => setXpThreshold(e.target.value)}
              placeholder="e.g 100"
              min="0"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Tier icon</label>
            <UploadImage
              setFile={setFile}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
            />
            <input
              type="file"
              id="fileInput"
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
          </div>
          <div className={styles.formGroupContent}>
            <div className={styles.earningPointsInput}>
              <label htmlFor="earningPoints">Enter rewards</label>
              <div className={styles.inputGroup}>
                <input
                  type="number"
                  id="earningPoints"
                  value={rewards}
                  onChange={(e) => setRewards(e.target.value)}
                  placeholder="e.g 0"
                  required
                  min="0"
                />
              </div>
            </div>
          </div>
          <Box className={styles.tierPointsContentRewardPointsItemDescription}>
            <p>
              It will be unlocked once a customer enters this tier. only once
              per customer
            </p>
          </Box>
          <div className={styles.formActions}>
            <Button
              variant="secondary"
              type="button"
              className={styles.cancelButton}
              onClick={clearData}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="button"
              className={styles.createButton}
              onClick={handleSubmit}
            >
              {editData?.membershipTier ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TierAddMoreModal;
