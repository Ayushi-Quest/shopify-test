import React, { useEffect, useState } from "react";
import { DataTable, Box, Popover, ActionList } from "@shopify/polaris";
import styles from "../styles/activity.module.css";
import searchIcon from "../assets/images/searchIcon.svg";
import { generalFunction } from "../config/generalFunction";
import axios from "axios";

const Activity = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("points");
  const [pointsData, setPointsData] = useState([]);
  const [pointsPage, setPointsPage] = useState(1);
  const [pointsTotalPage, setPointsTotalPage] = useState(1);
  const [referralsData, setReferralsData] = useState([
    {
      name: "Rich Explorer",
      userEmail: "captaintrunk@tartanhq.com",
      referredUserEmail: "100 XP",
      createdAt: "26-Aug-24",
    },
  ]);
  const [verificationData, setVerificationData] = useState([
    {
      id: 1,
      name: "Rich Explorer",
      email: "captaintrunk@tartanhq.com",
      task: "Share Instagram post",
      imageUrl:
        "https://img.freepik.com/premium-photo/grainy-gradient-background-red-white-blue-colors-with-soft-faded-watercolor-border-texture_927344-24167.jpg",
      status: "Verified",
      points: "200 XP",
      date: "2024-08-26",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "janesmith@example.com",
      task: "Share Facebook post",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVXKmhslVFKCeoyECJMXMry48tE20Mor5ZDw&s",
      status: "Pending",
      points: "0 XP",
      date: "2024-09-25",
    },
    {
      id: 3,
      name: "Jane Smith",
      email: "janesmith@example.com",
      task: "Share Facebook post",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVXKmhslVFKCeoyECJMXMry48tE20Mor5ZDw&s",
      status: "Rejected",
      points: "320 XP",
      date: "2024-09-25",
    },
  ]);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setSearchTerm("");
  };

  const getXpHistory = async () => {
    try {
      let request = generalFunction.createUrl(
        `/api/entities/${"e-0000000000"}/xp-history?page=${pointsPage}&limit=20`,
      );
      let response = await axios.get(request.url, {
        headers: request.headers,
      });
      if (response?.data?.success) {
        setPointsData(response?.data?.data);
        setPointsTotalPage(response?.data?.totalPages);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getReferrals = async () => {
    try {
      let request = generalFunction.createUrl(
        `/api/entities/${generalFunction.getEntityId()}/quests/q-shopify-referral/referraldashboard?userId=${generalFunction.getUserId()}`,
      );
      let response = await axios.get(request.url, {
        headers: request.headers,
      });
      if (response?.data?.success) {
        setReferralsData(response?.data?.data);
        // setReferralsTotalPage(response?.data?.totalPages);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getVerificationData = async () => {
    try {
      let response = await axios.get("/api/verification-data");
      if (response.data.success) {
        setVerificationData(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching verification data", error);
    }
  };

  useEffect(() => {
    if (selectedTab === "points") {
      getXpHistory();
    } else if (selectedTab === "referrals") {
      getReferrals();
    } else if (selectedTab === "verification") {
      getVerificationData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab]);

  const changeDate = (date) => {
    const options = { day: "2-digit", month: "short", year: "2-digit" };
    return new Date(date)
      .toLocaleDateString("en-GB", options)
      .replace(/ /g, "-");
  };

  const handleImageDownload = (imageUrl, fileName) => {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(() => alert("An error occurred while downloading the image."));
  };

  const [activePopoverId, setActivePopoverId] = useState(null);

  const handleStatusChange = (id, newStatus) => {
    setVerificationData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item,
      ),
    );
    setActivePopoverId(null);
  };

  return (
    <Box className={styles.activityContainer}>
      <Box className={styles.activityContainerTabs}>
        <Box
          className={`${styles.activityContainerTab} ${
            selectedTab === "points" ? styles.activityContainerTabActive : ""
          }`}
          onClick={() => handleTabChange("points")}
        >
          Points
        </Box>
        <Box
          className={`${styles.activityContainerTab} ${
            selectedTab === "referrals" ? styles.activityContainerTabActive : ""
          }`}
          onClick={() => handleTabChange("referrals")}
        >
          Referrals
        </Box>
        <Box
          className={`${styles.activityContainerTab} ${
            selectedTab === "verification"
              ? styles.activityContainerTabActive
              : ""
          }`}
          onClick={() => handleTabChange("verification")}
        >
          Verification
        </Box>
      </Box>
      <Box className={styles.activityContainerTableWrapper}>
        <Box className={styles.activityContainerTableSection}>
          <Box className={styles.activityContainerSearchBar}>
            <img src={searchIcon} alt="searchIcon" />
            <input
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search..."
            />
          </Box>
          <Box className={styles.activityContainertableContent}>
            {selectedTab === "points" && (
              <DataTable
                columnContentTypes={[
                  "text",
                  "text",
                  "text",
                  "text",
                  "text",
                  "text",
                ]}
                headings={[
                  <span className={styles.activityContainerHeading} key={1}>
                    Sr
                  </span>,
                  <span className={styles.activityContainerHeading} key={2}>
                    Name
                  </span>,
                  <span className={styles.activityContainerHeading} key={3}>
                    Contact
                  </span>,
                  <span className={styles.activityContainerHeading} key={4}>
                    Points
                  </span>,
                  <span className={styles.activityContainerHeading} key={5}>
                    Action
                  </span>,
                  <span className={styles.activityContainerHeading} key={6}>
                    Date
                  </span>,
                ]}
                rows={pointsData.map((row, index) => [
                  <span
                    className={styles.activityContainerNameColumn}
                    key={`a-${index}`}
                  >
                    {index + 1}
                  </span>,
                  <span
                    className={styles.activityContainerName}
                    key={`b-${index}`}
                  >
                    {row?.name || "User"}
                  </span>,
                  <span
                    className={styles.activityContainerNameColumn}
                    key={`c-${index}`}
                  >
                    {row?.email || "-"}
                  </span>,
                  <span
                    className={styles.activityContainerNameColumn}
                    key={`d-${index}`}
                  >
                    {row?.xp || "0"}XP
                  </span>,
                  <span
                    className={styles.activityContainerNameColumn}
                    key={`e-${index}`}
                  >
                    <p className={styles.activityContainerTranket}>
                      {row?.title}
                    </p>
                  </span>,
                  <span
                    className={styles.activityContainerNameColumn}
                    key={`f-${index}`}
                  >
                    {changeDate(row?.createdAt)}
                  </span>,
                ])}
                pagination={{
                  onNext: () => setPointsPage(pointsPage + 1),
                  onPrevious: () => setPointsPage(pointsPage - 1),
                  hasPrevious: pointsPage > 1,
                  hasNext: pointsPage < pointsTotalPage,
                  label: `Page ${pointsPage} of ${pointsTotalPage}`,
                }}
              />
            )}
            {selectedTab === "referrals" && (
              <DataTable
                columnContentTypes={["text", "text", "text", "text", "text"]}
                headings={[
                  <span className={styles.activityContainerHeading} key={1}>
                    Sr
                  </span>,
                  <span className={styles.activityContainerHeading} key={2}>
                    Referrer Name
                  </span>,
                  <span className={styles.activityContainerHeading} key={3}>
                    Referrer Email
                  </span>,
                  <span className={styles.activityContainerHeading} key={4}>
                    Refree Email
                  </span>,
                  <span className={styles.activityContainerHeading} key={5}>
                    Date
                  </span>,
                ]}
                rows={referralsData?.map((row, i) => [
                  <span
                    className={styles.activityContainerNameColumn}
                    key={`a-${i}`}
                  >
                    {i + 1}
                  </span>,
                  <span className={styles.activityContainerName} key={`b-${i}`}>
                    {row?.name}
                  </span>,
                  <span
                    className={styles.activityContainerNameColumn}
                    key={`c-${i}`}
                  >
                    {row?.userEmail}
                  </span>,
                  <span key={`d-${i}`}>{row?.referredUserEmail}</span>,
                  <span
                    className={styles.activityContainerNameColumn}
                    key={`e-${i}`}
                  >
                    {changeDate(row?.createdAt)}
                  </span>,
                ])}
              />
            )}
            {selectedTab === "verification" && (
              <DataTable
                columnContentTypes={[
                  "text",
                  "text",
                  "text",
                  "text",
                  "text",
                  "text",
                  "text",
                  "text",
                ]}
                headings={[
                  <span className={styles.activityContainerHeading} key={1}>
                    Sr
                  </span>,
                  <span className={styles.activityContainerHeading} key={2}>
                    Name
                  </span>,
                  <span className={styles.activityContainerHeading} key={3}>
                    Contact
                  </span>,
                  <span className={styles.activityContainerHeading} key={4}>
                    Task
                  </span>,
                  <span className={styles.activityContainerHeading} key={5}>
                    Share images
                  </span>,
                  <span className={styles.activityContainerHeading} key={6}>
                    Status
                  </span>,
                  <span className={styles.activityContainerHeading} key={7}>
                    Points
                  </span>,
                  <span className={styles.activityContainerHeading} key={8}>
                    Date
                  </span>,
                ]}
                rows={verificationData
                  .filter(
                    (row) =>
                      row.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      row.email
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()),
                  )
                  .map((row, index) => [
                    <span
                      className={styles.activityContainerNameColumn}
                      key={`a-${index}`}
                    >
                      {index + 1}
                    </span>,
                    <span
                      className={styles.activityContainerName}
                      key={`b-${index}`}
                    >
                      {row.name}
                    </span>,
                    <span
                      className={styles.activityContainerNameColumn}
                      key={`c-${index}`}
                    >
                      {row.email}
                    </span>,
                    <span
                      className={styles.activityContainerNameColumn}
                      key={`d-${index}`}
                    >
                      {row.task}
                    </span>,
                    <span
                      className={styles.activityContainerLink}
                      onClick={() =>
                        handleImageDownload(
                          row.imageUrl,
                          `shared_image_${row.id}.jpg`,
                        )
                      }
                      key={`e-${index}`}
                    >
                      Link
                    </span>,
                    <Popover
                      active={activePopoverId === row.id}
                      activator={
                        <button
                          onClick={() => setActivePopoverId(row.id)}
                          className={`${styles.statusButton} ${styles[`status${row.status}`]}`}
                        >
                          {row.status}
                        </button>
                      }
                      onClose={() => setActivePopoverId(null)}
                      key={`f-${index}`}
                    >
                      <ActionList
                        items={[
                          {
                            content: "Pending",
                            onAction: () =>
                              handleStatusChange(row.id, "Pending"),
                            "data-status": "Pending",
                          },
                          {
                            content: "Verified",
                            onAction: () =>
                              handleStatusChange(row.id, "Verified"),
                            "data-status": "Verified",
                          },
                          {
                            content: "Rejected",
                            onAction: () =>
                              handleStatusChange(row.id, "Rejected"),
                            "data-status": "Rejected",
                          },
                        ]}
                      />
                    </Popover>,
                    <span
                      className={styles.activityContainerNameColumn}
                      key={`g-${index}`}
                    >
                      {row.points}
                    </span>,
                    <span
                      className={styles.activityContainerNameColumn}
                      key={`h-${index}`}
                    >
                      {changeDate(row.date)}
                    </span>,
                  ])}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Activity;
