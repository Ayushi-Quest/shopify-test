import React, { useState } from "react";
import { Box, Button, RadioButton, Text, TextField } from "@shopify/polaris";
import styles from "../styles/setting.module.css";
import { IoCopyOutline } from "react-icons/io5";

const Setting = () => {
  const [selectedTab, setSelectedTab] = useState("email");
  const [isActiveGeneral, setIsActiveGeneral] = useState(true);
  const [singularLabel, setSingularLabel] = useState("XP");
  const [pluralLabel, setPluralLabel] = useState("XP");
  const [labelPosition, setLabelPosition] = useState("after");
  const [isActiveEmail, setIsActiveEmail] = useState(true);
  const [customEmail, setCustomEmail] = useState({ email: "", name: "" });
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [isActiveSMTPServer, setIsActiveSMTPServer] = useState(true);
  const [orderSelected, orderSetSelected] = useState("paid");   

  const handleSingularLabelChange = (value) => setSingularLabel(value);
  const handlePluralLabelChange = (value) => setPluralLabel(value);
  const handleLabelPositionChange = (value) => setLabelPosition(value);
  const toggleSwitchGeneral = () => setIsActiveGeneral(!isActiveGeneral);
  const toggleSwitchEmail = () => setIsActiveEmail(!isActiveEmail);
  const toggleSwitchSMTPServer = () =>
    setIsActiveSMTPServer(!isActiveSMTPServer);  
  const handleChange = (value) => orderSetSelected(value);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  }; 

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };    

  return (
    <Box className={styles.settingContainer}>
      <Box className={styles.tabs}>
        <Box
          className={`${styles.tab} ${
            selectedTab === "general" ? styles.tabActive : ""
          }`}
          onClick={() => handleTabChange("general")}
        >
          General
        </Box>
        <Box
          className={`${styles.tab} ${
            selectedTab === "email" ? styles.tabActive : ""
          }`}
          onClick={() => handleTabChange("email")}
        >
          Email
        </Box>
        <Box
          className={`${styles.tab} ${
            selectedTab === "order" ? styles.tabActive : ""
          }`}
          onClick={() => handleTabChange("order")}
        >
          Order
        </Box>
      </Box>
      <Box className={styles.settingContent}>
        {selectedTab === "general" && (
          <Box className={styles.generalContent}>
            <Box className={styles.generalContentHeader}>
              <Box className={styles.generalContentHeaderText}>
                <Text variant="headingLg" as="h1">
                  Set Rewards by Order Status
                </Text>
              </Box>
              <Box className={styles.generalContentHeaderDescription}>
                <Text variant="bodyMd" as="p">
                  Choose when to reward customers based on order status.
                </Text>
              </Box>
            </Box>
            <Box className={styles.generalContentChangedYourTheme}>
              <Box className={styles.generalContentChangedYourThemeSection}>
                <Box className={styles.generalContentChangedYourThemeText}>
                  <Text variant="headingMd" as="h1">
                    Changed your theme?
                  </Text>
                </Box>
                <Box
                  className={styles.generalContentChangedYourThemeDescription}
                >
                  <Text variant="bodyMd" as="p">
                    If you change your heme, you will need to republish the app
                    so everything should be working properly
                  </Text>
                </Box>
              </Box>
              <Box>
                <Button variant="primary">Republish App</Button>
              </Box>
            </Box>

            <Box className={styles.generalContentCustomerPointLabel}>
              <Box className={styles.generalContentCustomerPointLabelHeader}>
                <Box className={styles.generalContentCustomerPointLabelText}>
                  <Box className={styles.customerPointLabelText}>
                    <Text variant="headingMd" as="h1">
                      Custom point label
                    </Text>
                  </Box>
                  <Box className={styles.customerPointLabelDescription}>
                    <Text variant="bodyMd" as="p">
                      Change loyalty point's label into another word to match
                      your own business.
                    </Text>
                  </Box>
                </Box>
                <Box className={styles.generalContentToggleSwitchContainer}>
                  <Box
                    className={`${styles.generalContentStatusBadge} ${
                      isActiveGeneral ? styles.active : styles.inactive
                    }`}
                  >
                    {isActiveGeneral ? "Active" : "Inactive"}
                  </Box>
                  <Box
                    className={styles.toggleSwitch}
                    onClick={toggleSwitchGeneral}
                    style={{
                      background: isActiveGeneral
                        ? "var(--button-strokegrey, linear-gradient(85deg, #535353 1.44%, #3E3E3E 99.78%))"
                        : "#D9D9D9",
                    }}
                  >
                    <Box
                      className={`${styles.switchCircle} ${
                        isActiveGeneral ? styles.switchOn : styles.switchOff
                      }`}
                    ></Box>
                  </Box>
                </Box>
              </Box>

              <Box className={styles.generalContentCustomerPointLabelForm}>
                <Box className={styles.inputContainer}>
                  <TextField
                    label="Singular 'point' label"
                    value={singularLabel}
                    onChange={handleSingularLabelChange}
                    autoComplete="off"
                    className={styles.formGroup}
                    disabled={!isActiveGeneral}
                  />
                </Box>
                <Box className={styles.inputContainer}>
                  <TextField
                    label="Plural 'point' label"
                    value={pluralLabel}
                    onChange={handlePluralLabelChange}
                    autoComplete="off"
                    disabled={!isActiveGeneral}
                  />
                </Box>
              </Box>

              <Box
                className={
                  styles.generalContentCustomerPointLabelRadioGroupSection
                }
              >
                <Text variant="bodyMd" as="p">
                  Place 'point' label
                </Text>
                <Box
                  className={styles.generalContentCustomerPointLabelRadioGroup}
                >
                  <RadioButton
                    label="Before point amount"
                    checked={labelPosition === "before"}
                    onChange={() => handleLabelPositionChange("before")}
                    disabled={!isActiveGeneral}
                  />
                  <RadioButton
                    label="After point amount"
                    checked={labelPosition === "after"}
                    onChange={() => handleLabelPositionChange("after")}
                    disabled={!isActiveGeneral}
                  />
                </Box>
              </Box>
            </Box>

            <Box className={styles.manageKeysContainer}>
              <Box className={styles.manageKeysHeader}>
                <Box className={styles.manageKeysHeaderText}>
                  <Text variant="headingMd" as="h2">
                    Manage keys
                  </Text>
                </Box>
                <Box className={styles.manageKeysHeaderDescription}>
                  <Text variant="bodyMd" as="p">
                    Use your app credentials here to integrate Quest Loyalty
                    with other platforms such as third-party apps. You should
                    keep these keys safely.
                  </Text>
                </Box>
              </Box>

              <Box className={styles.manageKeysFormSection}>
                <Box className={styles.manageKeysField}>
                  <TextField
                    label="App ID"
                    value="MnYkMCU67HDcvU"
                    readOnly
                    autoComplete="off"
                  />
                  <Box className={styles.copyIconClick}>
                    <IoCopyOutline
                      className={styles.copyIcon}
                      onClick={() => handleCopy("MnYkMCU67HDcvU")}
                      title="Copy App ID"
                    />
                  </Box>
                </Box>

                <Box className={styles.manageKeysForm}>
                  <Box className={styles.manageKeysField}>
                    <TextField
                      label="Secret key"
                      value="●●●●●●●●●●●●"
                      readOnly
                      autoComplete="off"
                      type="password"
                    />
                    <Box className={styles.copyIconClick}>
                      <IoCopyOutline
                        onClick={() => handleCopy("YourSecretKeyHere")}
                        title="Copy Secret Key"
                      />
                    </Box>
                  </Box>

                  <Box className={styles.generateKeyButton}>
                    <Button variant="primary">Generate Key</Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
        {selectedTab === "email" && (
          <Box className={styles.emailContainer}>
            <Box className={styles.emailSection}>
              <Box className={styles.emailSectionHeader}>
                <Box className={styles.emailSectionHeaderText}>
                  <Text variant="headingMd">Custom Email Settings</Text>
                </Box>

                <Box className={styles.emailContainerToggleSwitchContainer}>
                  <Box
                    className={`${styles.emailContainerStatusBadge} ${
                      isActiveEmail ? styles.active : styles.inactive
                    }`}
                  >
                    {isActiveEmail ? "Active" : "Inactive"}
                  </Box>
                  <Box
                    className={styles.toggleSwitch}
                    onClick={toggleSwitchEmail}
                    style={{
                      background: isActiveEmail
                        ? "var(--button-strokegrey, linear-gradient(85deg, #535353 1.44%, #3E3E3E 99.78%))"
                        : "#D9D9D9",
                    }}
                  >
                    <Box
                      className={`${styles.switchCircle} ${
                        isActiveEmail ? styles.switchOn : styles.switchOff
                      }`}
                    ></Box>
                  </Box>
                </Box>
              </Box>
              <Box className={styles.emailContainerFormGroup}>
                <Box className={styles.emailContainerInputContainer}>
                  <TextField
                    label="Email"
                    value={customEmail.email}
                    onChange={(value) =>
                      setCustomEmail({ ...customEmail, email: value })
                    }
                    placeholder="eg. example@gmail.com"
                    disabled={!isActiveEmail}
                  />
                </Box>
                <Box className={styles.emailContainerInputContainer}>
                  <TextField
                    label="Name"
                    value={customEmail.name}
                    onChange={(value) =>
                      setCustomEmail({ ...customEmail, name: value })
                    }
                    placeholder="Questlabs"
                    disabled={!isActiveEmail}
                  />
                </Box>
                <Box className={styles.emailContainerStatus}>
                  <Text variant="bodyMd">Status</Text>
                  <span className={styles.emailContainerStatusBadge}>
                    Unverified
                  </span>
                </Box>
                <Box className={styles.emailContainerAction}>
                  <Text variant="bodyMd">Action</Text>
                  <Box className={styles.emailContainerCopyIconClick}>
                    <IoCopyOutline
                      onClick={() => handleCopy("YourSecretKeyHere")}
                      title="Copy Secret Key"
                      disabled={!isActiveEmail}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className={styles.emailSectionSMTOServerSection}>
              <Box className={styles.emailSectionSMTOServe}>
                <Box
                  className={styles.emailSectionSMTOServeText}
                  style={{ color: isActiveSMTPServer ? "#181818" : "#c9c9c9" }}
                >
                  <Text variant="headingMd">Use Your Own SMTP Server</Text>
                </Box>
                <Box
                  className={styles.emailContainerSMTOServeDescription}
                  style={{ color: isActiveSMTPServer ? "#535353" : "#c9c9c9" }}
                >
                  <Text variant="bodyMd">
                    Enable this option to use your own SMTP server for sending
                    emails. Enter the required SMTP settings to connect.
                  </Text>
                </Box>
              </Box>

              <Box
                className={styles.emailContainerSMTOServerToggleSwitchContainer}
              >
                <Box
                  className={`${styles.emailContainerSMTOServerStatusBadge} ${
                    isActiveSMTPServer ? styles.active : styles.inactive
                  }`}
                >
                  {isActiveSMTPServer ? "Active" : "Inactive"}
                </Box>
                <Box
                  className={styles.toggleSwitch}
                  onClick={toggleSwitchSMTPServer}
                  style={{
                    background: isActiveSMTPServer
                      ? "var(--button-strokegrey, linear-gradient(85deg, #535353 1.44%, #3E3E3E 99.78%))"
                      : "#D9D9D9",
                  }}
                >
                  <Box
                    className={`${styles.switchCircle} ${
                      isActiveSMTPServer ? styles.switchOn : styles.switchOff
                    }`}
                  ></Box>
                </Box>
              </Box>
            </Box>

            <Box className={styles.emailSection}>
              <Box className={styles.emailSectionWeeklyActivityReports}>
                <Box className={styles.emailSectionWeeklyActivityReportsText}>
                  <Text variant="headingMd">Weekly Activity Reports</Text>
                </Box>
                <Box
                  className={
                    styles.emailContainerWeeklyActivityReportsDescription
                  }
                >
                  <Text variant="bodyMd">
                    Monitor your performance with weekly reports covering
                    overall activity, rewards, and reviews. Add emails to the
                    subscriber list to receive updates.
                  </Text>
                </Box>
              </Box>

              <Box
                className={
                  styles.emailContainerWeeklyActivityReportsBulletListContent
                }
              >
                <ul
                  className={
                    styles.emailContainerWeeklyActivityReportsBulletList
                  }
                >
                  <li>Summary of all activities.</li>
                  <li>Details of rewards given and redeemed.</li>
                  <li>Feedback and reviews received.</li>
                </ul>
              </Box>

              <Box
                className={
                  styles.emailSectionWeeklyActivityReportsSubscriberList
                }
              >
                <Box
                  className={
                    styles.emailSectionWeeklyActivityReportsSubscriberListText
                  }
                >
                  <Text variant="bodyMd">Email subscriber list</Text>
                </Box>
                <Box
                  className={
                    styles.emailContainerWeeklyActivityReportsSubscriberInput
                  }
                >
                  <input
                    value={subscriberEmail}
                    onChange={(e) => setSubscriberEmail(e.target.value)}
                    placeholder="example@questlabs.ai"
                  />
                </Box>
              </Box>
              <Box className={styles.buttonContainer}>
                <Button variant="primary">Send test email</Button>
              </Box>
            </Box>
          </Box>
        )}
        {selectedTab === "order" && (
          <Box className={styles.orderContainer}>
            <Box className={styles.orderContentHeader}>
              <Box className={styles.orderContentHeaderText}>
                <Text variant="headingLg" as="h1">
                  Set Rewards by Order Status
                </Text>
              </Box>
              <Box className={styles.orderContentHeaderDescription}>
                <Text variant="bodyMd" as="p">
                  Choose when to reward customers based on order status.
                </Text>
              </Box>
            </Box>

            <Box className={styles.orderContainerOptionContainer}>
              <div
                className={`${styles.orderContainerOptionBox} ${
                  orderSelected === "paid" ? styles.selected : ""
                }`}
                onClick={() => handleChange("paid")}
              >
                <input
                  type="radio"
                  id="paid"
                  name="orderStatus"
                  checked={orderSelected === "paid"}
                  onChange={() => handleChange("paid")}
                  className={styles.orderContainerRadioInput}
                />
                <label
                  htmlFor="paid"
                  className={styles.orderContainerOptionLabel}
                >
                  <Box className={styles.orderContainerOptionLabelText}>
                    <Text variant="headingSm" as="h3">
                      Paid
                    </Text>
                  </Box>

                  <Box className={styles.orderContainerOptionLabelDescription}>
                    <Text variant="bodySm" as="p">
                      Reward customers right after they complete their payment.
                    </Text>
                  </Box>
                </label>
              </div>

              <div
                className={`${styles.orderContainerOptionBox} ${
                  orderSelected === "fulfilled" ? styles.selected : ""
                }`}
                onClick={() => handleChange("fulfilled")}
              >
                <input
                  type="radio"
                  id="fulfilled"
                  name="orderStatus"
                  checked={orderSelected === "fulfilled"}
                  onChange={() => handleChange("fulfilled")}
                  className={styles.orderContainerRadioInput}
                />
                <label
                  htmlFor="fulfilled"
                  className={styles.orderContainerOptionLabel}
                >
                  <Box className={styles.orderContainerOptionLabelText}>
                    <Text variant="headingSm" as="h3">
                      Fulfilled
                    </Text>
                  </Box>
                  <Box className={styles.orderContainerOptionLabelDescription}>
                    <Text variant="bodySm" as="p">
                      Reward customers after their order has been fulfilled and
                      shipped.
                    </Text>
                  </Box>
                </label>
              </div>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Setting;
