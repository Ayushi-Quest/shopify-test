import React, { useState, useEffect } from "react";
import { DataTable, Box } from "@shopify/polaris";
import styles from "../styles/customer.module.css";
import noCustomersImage from "../assets/images/no-customers-yet.svg";
import searchIcon from "../assets/images/searchIcon.svg";
import filterIcon from "../assets/images/filterIcon.svg";
import { generalFunction } from "../config/generalFunction";
import { config } from "../config/config";
import axios from "axios";

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [allData, setAllData] = useState([]);
  const [pointFilter, setPointFilter] = useState(false);
  const [azFilter, setAzFilter] = useState(false);
  const [timeFrame, setTimeFrame] = useState("");

  useEffect(() => {
    getCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCustomer = async () => {
    if (!config.PARENT_ENTITY_ID) return;

    const request = generalFunction.createUrl(
      `/api/v2/entities/${config.PARENT_ENTITY_ID}/users?page=1&limit=20`,
    );

    const response = await axios.get(request?.url, {
      headers: request.headers,
    });

    if (response.data.success) {
      const updatedUserData = response?.data?.data?.userData?.map((user) => {
        const randomXP = Math.floor(Math.random() * 101);
        const status = randomXP > 50 ? "Members" : "Guest";

        const getRandomTier = () => {
          if (randomXP > 70) return "Gold";
          if (randomXP > 40) return "Silver";
          return "Bronze";
        };

        const tier = getRandomTier();

        const createdAtDate = user.createdAt;

        return [
          user?._id,
          user?.name,
          user?.emails,
          `${randomXP} XP`,
          status,
          tier,
          randomXP,
          createdAtDate,
        ];
      });
      setAllData(updatedUserData);
    }
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setSearchTerm("");
  };

  const filteredData = () => {
    let filtered = allData;

    if (selectedTab === "members") {
      filtered = filtered.filter((row) => row[4] === "Members");
    } else if (selectedTab === "guest") {
      filtered = filtered.filter((row) => row[4] === "Guest");
    } else if (selectedTab === "goingaway") {
      filtered = allData?.filter(
        (row) => new Date(row[5]) < new Date("2024-09-26"),
      );
    }

    if (pointFilter) {
      filtered = filtered.filter((row) => row[6] > 50);
    }

    if (azFilter) {
      filtered = filtered.sort((a, b) => a[1].localeCompare(b[1]));
    }

    if (searchTerm) {
      filtered = filtered.filter((row) =>
        [row[1], row[2]].some((cell) =>
          cell?.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    }

    if (timeFrame) {
      const today = new Date();
      filtered = filtered.filter((row) => {
        const createdAtDate = new Date(row[7]);
        if (timeFrame === "earlier-week") {
          const lastWeek = new Date(today);
          lastWeek.setDate(today.getDate() - 7);
          return createdAtDate >= lastWeek && createdAtDate <= today;
        } else if (timeFrame === "earlier-month") {
          const lastMonth = new Date(today);
          lastMonth.setMonth(today.getMonth() - 1);
          return createdAtDate >= lastMonth && createdAtDate <= today;
        } else if (timeFrame === "last-month") {
          const lastMonth = new Date(today);
          lastMonth.setMonth(today.getMonth() - 1);
          const startOfLastMonth = new Date(
            lastMonth.getFullYear(),
            lastMonth.getMonth(),
            1,
          );
          const endOfLastMonth = new Date(
            lastMonth.getFullYear(),
            lastMonth.getMonth() + 1,
            0,
          );
          return (
            createdAtDate >= startOfLastMonth && createdAtDate <= endOfLastMonth
          );
        } else if (timeFrame === "long-time-ago") {
          const longTimeAgo = new Date(today);
          longTimeAgo.setFullYear(today.getFullYear() - 1);
          return createdAtDate < longTimeAgo;
        }
        return true;
      });
    }

    return filtered;
  };

  const formatDate = (date) => {
    const options = { day: "2-digit", month: "short", year: "2-digit" };
    return new Date(date)
      .toLocaleDateString("en-GB", options)
      .replace(/ /g, "-");
  };

  const handlePointFilterChange = () => {
    setPointFilter(!pointFilter);
  };

  const handleAzFilterChange = () => {
    setAzFilter(!azFilter);
  };

  const handleTimeFrameChange = (event) => {
    setTimeFrame(event.target.id);
  };

  const renderTableRows = (data) => {
    return data?.map((row, index) => [
      <span className={styles.customersContainerNameColumn} key={index}>
        {index + 1}
      </span>,
      <span className={styles.customersContainerName} key={row[1]}>
        {row[1]}
      </span>,
      <span className={styles.customersContainerNameColumn} key={row[2]}>
        {row[2]}
      </span>,
      <span key={row[3]}>{row[3]}</span>,
      <span
        className={`${styles.customersContainerStatus} ${
          row[4] === "Members"
            ? styles.customersContainerMembers
            : styles.customersContainerGuest
        }`}
        key={row[4]}
      >
        {row[4]}
      </span>,
      <span key={row[5]}>{row[5]}</span>,
      <span key={row[6]}>{formatDate(row[7])}</span>,
    ]);
  };

  const renderTableContent = (data) => {
    if (data?.length === 0) {
      return (
        <Box className={styles.noCustomersContainer}>
          <img
            src={noCustomersImage}
            alt="No Customers Yet"
            className={styles.noCustomersImage}
          />
          <h2 className={styles.noCustomersTitle}>No Customers Yet</h2>
          <p className={styles.noCustomersText}>
            Add customers to start tracking their rewards.
          </p>
        </Box>
      );
    }

    return (
      <DataTable
        columnContentTypes={["text", "text", "text", "text", "text", "text"]}
        headings={[
          <span className={styles.customersContainerHeading} key={1}>
            Sr
          </span>,
          <span className={styles.customersContainerHeading} key={2}>
            Name
          </span>,
          <span className={styles.customersContainerHeading} key={3}>
            Contact
          </span>,
          <span className={styles.customersContainerHeading} key={4}>
            Points
          </span>,
          <span className={styles.customersContainerHeading} key={5}>
            Status
          </span>,
          <span className={styles.customersContainerHeading} key={6}>
            Tier
          </span>,
          <span className={styles.customersContainerHeading} key={7}>
            Date
          </span>,
        ]}
        rows={renderTableRows(data)}
      />
    );
  };

  return (
    <Box className={styles.customersContainer}>
      <Box className={styles.customersContainerTabs}>
        <Box
          className={`${styles.customersContainerTab} ${
            selectedTab === "all" ? styles.customersContainerTabActive : ""
          }`}
          onClick={() => handleTabChange("all")}
        >
          All
        </Box>
        <Box
          className={`${styles.customersContainerTab} ${
            selectedTab === "members" ? styles.customersContainerTabActive : ""
          }`}
          onClick={() => handleTabChange("members")}
        >
          Members
        </Box>
        <Box
          className={`${styles.customersContainerTab} ${
            selectedTab === "guest" ? styles.customersContainerTabActive : ""
          }`}
          onClick={() => handleTabChange("guest")}
        >
          Guest
        </Box>
        <Box
          className={`${styles.customersContainerTab} ${
            selectedTab === "goingaway"
              ? styles.customersContainerTabActive
              : ""
          }`}
          onClick={() => handleTabChange("goingaway")}
        >
          Going Away
        </Box>
      </Box>
      <Box className={styles.customersContainerTableWrapper}>
        <Box className={styles.customersContainerTableSection}>
          <Box className={styles.customersContainerSearchBar}>
            <Box className={styles.activityContainerSearchBar}>
              <img src={searchIcon} alt="searchIcon" />
              <input
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search by name or contact..."
              />
            </Box>
            <div
              className={styles.customersContainerFilterIcon}
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <img src={filterIcon} alt="filterIcon" />
            </div>
          </Box>
          {filterOpen && (
            <div className={styles.customersContainerFilterMenuSection}>
              <Box className={styles.customersContainerFilterMenu}>
                <Box className={styles.customersContainerFilterMenuRadio}>
                  <input
                    type="checkbox"
                    name="filter"
                    id="point"
                    checked={pointFilter}
                    onChange={handlePointFilterChange}
                  />
                  <label htmlFor="point">Points &gt; 50</label>
                </Box>
                <Box className={styles.customersContainerFilterMenuRadio}>
                  <input
                    type="checkbox"
                    name="filter"
                    id="az"
                    checked={azFilter}
                    onChange={handleAzFilterChange}
                  />
                  <label htmlFor="az">A-Z Order</label>
                </Box>
              </Box>
              <Box className={styles.customersContainerFilterTime}>
                <input
                  type="radio"
                  name="filter"
                  id="earlier-week"
                  checked={timeFrame === "earlier-week"}
                  onChange={handleTimeFrameChange}
                />
                <label htmlFor="earlier-week">Earlier this week</label>
              </Box>
              <Box className={styles.customersContainerFilterTime}>
                <input
                  type="radio"
                  name="filter"
                  id="earlier-month"
                  checked={timeFrame === "earlier-month"}
                  onChange={handleTimeFrameChange}
                />
                <label htmlFor="earlier-month">Earlier this month</label>
              </Box>
              <Box className={styles.customersContainerFilterTime}>
                <input
                  type="radio"
                  name="filter"
                  id="last-month"
                  checked={timeFrame === "last-month"}
                  onChange={handleTimeFrameChange}
                />
                <label htmlFor="last-month">Last month</label>
              </Box>
              <Box className={styles.customersContainerFilterTime}>
                <input
                  type="radio"
                  name="filter"
                  id="long-time-ago"
                  checked={timeFrame === "long-time-ago"}
                  onChange={handleTimeFrameChange}
                />
                <label htmlFor="long-time-ago">A long time ago</label>
              </Box>
            </div>
          )}
          {renderTableContent(filteredData())}
        </Box>
      </Box>
    </Box>
  );
};

export default Customers;
