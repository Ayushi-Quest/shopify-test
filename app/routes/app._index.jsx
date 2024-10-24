import React, { useState, useEffect } from "react";
import { Box, Text } from "@shopify/polaris";
import styles from "../styles/app.module.css";
import Reward from "../components/Reward";
import Customization from "../components/Customization";
import Preview from "../components/Preview";
import { useLoaderData } from "@remix-run/react";
import { apiVersion, authenticate } from "../shopify.server";
import { config } from "../config/config";
import { generalFunction } from "../config/generalFunction";
import axios from "axios";
import { defaultCalls } from "./defaultCalls";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const { shop, accessToken } = session;
  try {
    const response = await fetch(
      `https://${shop}/admin/api/${apiVersion}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": accessToken,
        },
        body: JSON.stringify({
          query: `
          {
            shop {
              id
              name
              email
              myshopifyDomain
              primaryDomain {
                url
                host
              }
            }
          }
          `,
        }),
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data.data.shop;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("Rewards");
  const [loyaltyProgramName, setLoyaltyProgramName] =
    useState("loyalty program");
  const [borderRadius, setBorderRadius] = useState(8);

  const shopDetails = useLoaderData();
  // console.log("activetab", activeTab);

  useEffect(() => {
    const initialFunction = async () => {
      if (shopDetails) {
        let { id, email, name } = shopDetails;
        if (id) {
          let shopId = id.split("/");
          id = shopId[shopId.length - 1];
          if (name) {
            name = `${name}(${id})`;
          }
          id = `shopify-${id}`;
        }
        await externalLogin(email);
        getEntity(id, name);
      }
    };
    if (shopDetails) {
      localStorage.setItem("shopDetails", JSON.stringify(shopDetails));
      initialFunction();
    }
    console.log("Shop detailsssssss:", shopDetails);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopDetails]);

  const externalLogin = async (email) => {
    if (!email) return;

    const request = generalFunction.createUrl("/api/users/external/login");

    const body = {
      externalUserId: email || null,
      entityId: config.PARENT_ENTITY_ID,
      email: email || null,
    };

    const response = await axios.post(request.url, body, {
      headers: request.headers,
    });

    console.log("External login response:", response);

    if (response?.data?.success === true) {
      generalFunction.setUserId(response.data.userId);
      generalFunction.setToken(response.data.token);
    }
  };

  const createEntity = async (id, name) => {
    if (!id) return;

    const request = generalFunction.createUrl(
      `/api/entities?userId=${generalFunction.getUserId()}`,
    );

    const body = {
      name: name || null,
      entityURLAlias: id || null,
      parentEntityId: config.PARENT_ENTITY_ID,
    };

    await axios.post(request.url, body, {
      headers: request.headers,
    });
  };

  const getEntity = async (id, name) => {
    if (!id) return;

    const request = generalFunction.createUrl(
      `/api/entities/${id}?userId=${generalFunction.getUserId()}`,
    );

    const response = await axios.get(request.url, {
      headers: request.headers,
    });

    if (response?.data?.success === true) {
      const entityData = response?.data?.data;
      if (generalFunction.getEntityId() !== entityData?.id) {
        generalFunction.setEntityId(entityData?.id);
        getApiKey();
      } else {
        defaultCalls({priority: "all"});
      }
    } else {
      createEntity(id, name);
    }
  };

  const getApiKey = async () => {
    const request = generalFunction.createUrl(
      `/api/entities/${generalFunction.getEntityId()}/keys?userId=${generalFunction.getUserId()}`,
    );

    const response = await axios.get(request.url, {
      headers: request.headers,
    });

    if (response?.data?.success === true) {
      const entityData = response?.data?.data;
      generalFunction.setApiKey(entityData?.key);
      defaultCalls({priority: "all"});
    }
  };



  const renderContent = () => {
    switch (activeTab) {
      case "Rewards":
        return <Reward activeTab={activeTab} setActiveTab={setActiveTab} />;
      case "Customization":
        return (
          <Customization
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            loyaltyProgramName={loyaltyProgramName}
            setLoyaltyProgramName={setLoyaltyProgramName}
            borderRadius={borderRadius}
            setBorderRadius={setBorderRadius}
          />
        );
      case "Preview":
        return (
          <Preview
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            loyaltyProgramName={loyaltyProgramName}
            borderRadius={borderRadius}
          />
        );
      default:
        return <Reward activeTab={activeTab} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <Box className={styles.tabContainer}  style={{ backgroundColor: "#fff" }}>
      <Box className={styles.tabContent}>
        <Box className={styles.frameContent}>
          <Box className={styles.tabs}>
            <button
              className={`${styles.tabButton} ${
                activeTab === "Rewards" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("Rewards")}
            >
              <Text>Rewards</Text>
            </button>

            <button
              className={`${styles.tabButton} ${
                activeTab === "Customization" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("Customization")}
            >
              <Text>Customization</Text>
            </button>

            <button
              className={`${styles.tabButton} ${
                activeTab === "Preview" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("Preview")}
            >
              <Text>Preview</Text>
            </button>
          </Box>

          <Box className={styles.content}>{renderContent()}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Index;
