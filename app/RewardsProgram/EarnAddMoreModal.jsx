import React, { useEffect, useState } from "react";
import styles from "../styles/rewardsprogram.module.css";
import discordIcon from "../assets/images/discordIcon.svg";
import twitterIcon from "../assets/images/twitterIcon.svg";
import productIcon from "../assets/images/productCartIcon.svg";
import { Button } from "@shopify/polaris";


const defaultActionType = {
  Discord: [
    {
      type: "DISCORD_JOIN_GUILD",
      name: "Join",
      inputPlaceholder: "Write the respective link"
    },
    {
      type: "DISCORD_ASSIGNED_ROLE",
      name: "Assign role",
      inputPlaceholder: "Write the respective role"
    }
  ],
  Twitter: [
    {
      type: "TWITTER_FOLLOW_ACCOUNT",
      name: "Follow",
      inputPlaceholder: "Write the respective link"
    },
    {
      type: "TWITTER_LIKE_POST",
      name: "Like",
      inputPlaceholder: "Write the respective link"
    },
    {
      type: "TWITTER_COMMENT_POST",
      name: "Comment",
      inputPlaceholder: "Write the respective link"
    },
    {
      type: "TWITTER_RETWEET_POST",
      name: "Retweet",
      inputPlaceholder: "Write the respective link"
    },
  ],
  Product: [
    {
      type: "LINK_OPEN_READ",
      name: "Place order",
      // inputPlaceholder: "Write the respective link"
    },
    {
      type: "VIEW_ONLY_TEXT",
      name: "Review",
      // inputPlaceholder: "Write the respective link"
    },
  ]
}

const EarnAddMoreModal = ({
  onClose,
  setIsModalOpenAddMore,
  setIsModalOpenCreatePlaceAnOrder,
  updateMainQuest,
  actions,
  editFor,
  setEditFor
}) => {
  const [programName, setProgramName] = useState("");
  const [programDescription, setProgramDescription] = useState("");
  const [actionData, setActionData] = useState("Discord");
  const [actionType, setActionType] = useState("DISCORD_JOIN_GUILD");
  const [reward, setReward] = useState("XPPoints");
  const [earningPoints, setEarningPoints] = useState("");
  const [inputOpen, setInputOpen] = useState("");
  const [link, setLink] = useState("");






  useEffect(() => {
    if (editFor == "") {
      setProgramName("")
      setProgramDescription("")
      setActionData("Discord")
      setActionType("DISCORD_JOIN_GUILD")
      setReward("XPPoints")
      setEarningPoints("")
      setInputOpen("")
      setLink("")
    } else {
      let filteredData = actions?.find(e => e?.data?.criteriaId == editFor)
      setProgramName(filteredData?.data?.metadata?.title)
      setProgramDescription(filteredData?.data?.metadata?.description)
      setActionData(filteredData?.data?.criteriaType?.includes("DISCORD") ? "Discord" : filteredData?.data?.criteriaType?.includes("TWITTER") ? "Twitter" : "Product")
      setActionType(filteredData?.data?.criteriaType)
      setReward("XPPoints")
      setEarningPoints(filteredData?.data?.metadata?.xp)
      setLink(filteredData?.data?.metadata?.link)
    }
  }, [])

  useEffect(() => {
    if (editFor == "") {
      setActionType(defaultActionType[actionData][0]?.type)
    }
  }, [actionData])

  useEffect(() => {
    const findData = defaultActionType[actionData]?.find(e => e?.type === actionType)
    if (findData?.inputPlaceholder) {
      setInputOpen(findData?.inputPlaceholder)
    } else {
      setInputOpen("")
    }
  }, [actionType])

  const handleSubmit = async(e) => {
    e.preventDefault();
    let body = {}

    if (editFor != "") {
      let filteredData = actions?.find(e => e?.data?.criteriaId == editFor)
      let data = {
        ...filteredData,
        data: {
          ...filteredData?.data,
          criteriaType: actionType,
          metadata: {
            ...filteredData?.data?.metadata,
            title: programName,
            description: programDescription,
            xp: earningPoints,
            ...(inputOpen != "" && {link})
          }
        }
      }

      body = actions?.map(e => {
        if (e?.data?.criteriaId == editFor) {
          return data
        } else {
          return e
        }
      })
    } else {
      let data = {
        criteriaType: actionType,
        metadata: {
          title: programName,
          description: programDescription,
          frequency: "ONCE",
          requiresApproval: true,
          xp: earningPoints,
          isActive: true,
          ...(inputOpen != "" && {link})
        }
      }

      body = [...actions, {data}]
    }

    await updateMainQuest(body)

    setIsModalOpenCreatePlaceAnOrder(true);
    setIsModalOpenAddMore(false);
    setEditFor("")
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Ways to earn</h2>
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
              placeholder="e.g Follow on Twitter"
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
              placeholder="e.g Follow on Twitter"
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
                Discord
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
                Twitter
              </button>
              <button
                type="button"
                className={`${styles.actionButton} ${
                  actionData === "Product" ? styles.active : ""
                }`}
                onClick={() => setActionData("Product")}
              >
                <img
                  src={productIcon}
                  alt="Product"
                  className={styles.productIcon}
                />
                Product
              </button>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Choose Action Type</label>
            <div className={styles.actionTypeButtons}>
              {defaultActionType[actionData].map((e, i) => (
                <button
                  key={i}
                  type="button"
                  className={`${styles.actionTypeButton} ${
                    actionType == e?.type ? styles.activeActionType : ""
                  }`}
                  onClick={() => setActionType(e?.type)}
                >
                  {e?.name}
                </button>
              ))}
            </div>
          </div>
          { inputOpen != "" &&
            <div className={styles.formGroup}>
              <label htmlFor="programDescription">
                Enter your program description
              </label>
              <input
                type="text"
                id="programDescription"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder={inputOpen}
                required
              />
            </div>
          }

          <div className={styles.formGroupContent}>
            <div className={styles.rewardSelect}>
              <label htmlFor="reward">Choose rewards</label>
              <select
                id="reward"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="XPPoints">XP Points</option>
                {/* <option value="DiscountPercentage">Discount Percentage</option> */}
                {/* <option value="DiscountAmount">Discount Amount</option> */}
              </select>
            </div>
            <div className={styles.earningPointsInput}>
              <label htmlFor="earningPoints">Enter earning points</label>
              <div className={styles.inputGroup}>
                <input
                  type="number"
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

export default EarnAddMoreModal;
