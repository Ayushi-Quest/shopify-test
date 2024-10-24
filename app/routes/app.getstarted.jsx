import React, { useEffect, useState } from "react";
import { Button, Box, Text, Spinner } from "@shopify/polaris";
import Ellipse1276 from "../assets/images/Ellipse1276.svg";
import Ellipse1277 from "../assets/images/Ellipse1277.svg";
import Ellipse1278 from "../assets/images/Ellipse1278.svg";
import Ellipse1279 from "../assets/images/Ellipse1279.svg";
import rightImage from "../assets/images/right-image.svg";
import rightSecondaryImage from "../assets/images/right-second-image.svg";
import styles from "../styles/getstarted.module.css";
import { PlusIcon } from "@shopify/polaris-icons";
import { generalFunction } from "../config/generalFunction";
import { config } from "../config/config";
import { Link, useNavigate } from "@remix-run/react";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

function GetStarted() {
  const [guideItems, setGuideItems] = useState([]);
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleSecondaryButtonClick = (tab) => {
    navigate(`/app/rewardsprogram?tab=${tab}`);
  };

  const getStartedFetch = async () => {
    if (!config.PARENT_ENTITY_ID) return;
    setLoading(true);
    try {
      const request = generalFunction.createUrl(
        `/api/v2/entities/${config.PARENT_ENTITY_ID}/campaigns/${config.PARENT_QUEST_ID}`,
      );

      const response = await fetch(request.url, {
        headers: request.headers,
      });

      if (response.status === 200) {
        const data = await response.json();
        const headers = data.sdkConfig?.Headers?.[0];
        if (headers) {
          setHeading(headers.heading);
          setSubHeading(headers.subHeading);
        }
        setGuideItems(data?.data?.actions);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStartedFetch();
  }, []);

  return (
    <Box className={styles.getStarted}>
      <div className={styles.getStartedContainer}>
        <div className={styles.leftSection}>
          <Box className={styles.leftSectionHeader}>
            <Box className={styles.leftSectionHeading}>
              <Text variant="headingLg" as="h1">
                Enhance Customer Loyalty with Quest
              </Text>
            </Box>

            <Box className={styles.leftSectionDescription}>
              <Text variant="bodyMd" as="p">
                Boost customer engagement with dynamic rewards and powerful
                tools from Quest.
              </Text>
            </Box>
            <Box className={styles.createRewardButton}>
              <Link to="/app/rewardsprogram">
                <Button variant="primary" icon={PlusIcon}>
                  Create Reward
                </Button>
              </Link>
            </Box>
          </Box>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.backgroundOverlay}>
            <img
              src={Ellipse1276}
              alt="Ellipse1276"
              className={styles.Ellipse1276}
            />
            <img
              src={Ellipse1277}
              alt="Ellipse1277"
              className={styles.Ellipse1277}
            />
            <img
              src={Ellipse1278}
              alt="Ellipse1278"
              className={styles.Ellipse1278}
            />
            <img
              src={Ellipse1279}
              alt="Ellipse1279"
              className={styles.Ellipse1279}
            />
            <div className={styles.overlayContent}>
              <img
                src={rightImage}
                alt="Silver Stone"
                className={styles.overlayImage}
              />
              <img
                src={rightSecondaryImage}
                alt="Earn Points"
                className={styles.overlayImageSecondary}
              />
            </div>
          </div>
        </div>
      </div>
      <Box className={styles.quickstartGuideContainer}>
        <Box>
          <Box className={styles.quickstartGuide}>
            {" "}
            <Text variant="headingLg" as="h2">
              {heading || "Quickstart Guide"}
            </Text>
          </Box>
          <Box className={styles.quickstartGuideDescription}>
            <Text variant="bodyLg" as="p">
              {subHeading ||
                "Get started with Quest and explore how Quest can take your customer engagement to the next level"}
            </Text>
          </Box>
        </Box>
        {loading ? (
          <Box style={{ width: "10%", margin: "auto" }}>
            <Spinner accessibilityLabel="Loading" size="large" />
          </Box>
        ) : (
          <div className={styles.quickstartGuideSection}>
            {guideItems?.map((item, index) => (
              <div sectioned key={index} className={styles.guideItem}>
                <div className={styles.guideContent}>
                  <div className={styles.guideImage}>
                    <img
                      src={item.metadata.imageUrl}
                      alt={`${item.title} icon`}
                      className={styles.frameGroupIcon}
                    />
                  </div>
                  <div className={styles.guideText}>
                    <div className={styles.title}>{item.title}</div>
                    <p>{item.description}</p>
                  </div>
                  <div className={styles.guideActions}>
                    {index === 0 && (
                      <Button
                        onClick={() => handleSecondaryButtonClick("earnpoints")}
                        primary
                      >
                        {item.metadata.secondaryTitle}
                      </Button>
                    )}
                    {index === 1 && (
                      <Button
                        onClick={() =>
                          handleSecondaryButtonClick("redeempoint")
                        }
                        primary
                      >
                        {item.metadata.secondaryTitle}
                      </Button>
                    )}
                    {index === 2 && (
                      <Button
                        onClick={() => handleSecondaryButtonClick("referral")}
                        primary
                      >
                        {item.metadata.secondaryTitle}
                      </Button>
                    )}
                    {index === 3 && (
                      <Button
                        onClick={() => handleSecondaryButtonClick("tier")}
                        primary
                      >
                        {item.metadata.secondaryTitle}
                      </Button>
                    )}

                    <Button variant="primary">
                      {item.metadata.buttonTitle}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Box>
    </Box>
  );
}

export default GetStarted;
