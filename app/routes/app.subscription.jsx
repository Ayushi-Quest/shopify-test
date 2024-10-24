import React, { useState } from "react";
import { Text, Box } from "@shopify/polaris";
import styles from "../styles/subscription.module.css";
import check from "../assets/images/Check.svg";
import uparrow from "../assets/images/uparrow.svg";
import downarrow from "../assets/images/downarrow.svg";

export default function Subscription() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <Box className={styles.subscriptionContainer}>
      <Box className={styles.subscriptionHeader}>
        <Text variant="headingLg" as="h1">
          Unlock Your Business Potential
        </Text>
        <Text variant="bodyMd" as="p">
          Choose the plan that best suits your needs.
        </Text>
      </Box>

      <Box className={styles.subscriptionCard}>
        <Box className={styles.planCard}>
          <Box className={styles.planPrice}>
            <Box className={styles.planPriceHeader}>
              <Box className={styles.starter}>
                <Text variant="headingLg" as="h2">
                  Starter
                </Text>
              </Box>
              <Box className={styles.starterDescription}>
                <Text variant="bodyMd" as="p">
                  Ideal for businesses in their early stages, seeking to improve
                  customer retention.{" "}
                </Text>
              </Box>
            </Box>
            <Box className={styles.planPriceFreeHeader}>
              <Box className={styles.planPriceFree}>
                <Text varient="headingLg" as="h2">
                  Free
                </Text>
              </Box>
              <Box className={styles.planPriceFreeDescription}>
                <Text variant="bodyMd" as="p">
                  + $00/{" "}
                  <span
                    style={{
                      color: "#B9B9B9",
                      textOverflow: "ellipsis",
                      fontFamily: "Figtree",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: "400",
                      lineHeight: "20px",
                    }}
                  >
                    person per month
                  </span>
                </Text>
              </Box>
            </Box>
            <Box className={styles.planScheduleDemo}>
              <Text variant="bodyMd" as="p">
                Schedule a demo
              </Text>
            </Box>
            <Box className={styles.planFeaturesList}>
              <Box className={styles.featureList}>
                <img src={check} alt="check" className={styles.check} />
                <Box className={styles.featureListText}>
                  <Text variant="bodyMd" as="p">
                    Up to 150 orders
                  </Text>
                </Box>
              </Box>
              <Box className={styles.featureList}>
                <img src={check} alt="check" className={styles.check} />
                <Box className={styles.featureListText}>
                  <Text variant="bodyMd" as="p">
                    Basic Loyalty page
                  </Text>
                </Box>
              </Box>
              <Box className={styles.featureList}>
                <img src={check} alt="check" className={styles.check} />

                <Box className={styles.featureListText}>
                  <Text variant="bodyMd" as="p">
                    Earn point programs: Sign Up, Place Order
                  </Text>
                </Box>
              </Box>
              <Box className={styles.featureList}>
                <img src={check} alt="check" className={styles.check} />
                <Box className={styles.featureListText}>
                  <Text variant="bodyMd" as="p">
                    Redeem programs
                  </Text>
                </Box>
              </Box>
              <Box className={styles.featureList}>
                <img src={check} alt="check" className={styles.check} />
                <Box className={styles.featureListText}>
                  <Text variant="bodyMd" as="p">
                    Basic Integrations
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className={styles.planCard}>
          <Box className={styles.planPrice}>
            <Box className={styles.planPriceHeader}>
              <Box className={styles.starter}>
                <Text variant="headingLg" as="h2">
                  Professional
                </Text>
              </Box>
              <Box className={styles.starterDescription}>
                <Text variant="bodyMd" as="p">
                  Ideal for growing businesses with advanced loyalty programs
                  and customer engagement{" "}
                </Text>
              </Box>
            </Box>
            <Box className={styles.planPriceFreeHeader}>
              <Box className={styles.planPriceFree}>
                <Text varient="headingLg" as="h2">
                  $99/month
                </Text>
              </Box>
              <Box className={styles.planPriceFreeDescription}>
                <Text variant="bodyMd" as="p">
                  + $20/{" "}
                  <span
                    style={{
                      color: "#B9B9B9",
                      textOverflow: "ellipsis",
                      fontFamily: "Figtree",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: "400",
                      lineHeight: "20px",
                    }}
                  >
                    person per month
                  </span>
                </Text>
              </Box>
            </Box>
            <Box className={styles.planGetStarted}>
              <Text variant="bodyMd" as="p">
                Get started
              </Text>
            </Box>
            <Box className={styles.planFeaturesList}>
              <Box className={styles.featureList}>
                <img src={check} alt="check" className={styles.check} />
                <Box className={styles.featureListText}>
                  <Text variant="bodyMd" as="p">
                    Up to 500 orders
                  </Text>
                </Box>
              </Box>
              <Box className={styles.featureList}>
                <img src={check} alt="check" className={styles.check} />
                <Box className={styles.featureListText}>
                  <Text variant="bodyMd" as="p">
                    All in Free plus
                  </Text>
                </Box>
              </Box>
              <Box className={styles.featureList}>
                <img src={check} alt="check" className={styles.check} />
                <Box className={styles.featureListText}>
                  <Text variant="bodyMd" as="p">
                    VIP tiers
                  </Text>
                </Box>
              </Box>
              <Box className={styles.featureList}>
                <img src={check} alt="check" className={styles.check} />
                <Box className={styles.featureListText}>
                  <Text variant="bodyMd" as="p">
                    Unlimired Points Rewards and Redeem Programs
                  </Text>
                </Box>
              </Box>
              <Box className={styles.featureList}>
                <img src={check} alt="check" className={styles.check} />
                <Box className={styles.featureListText}>
                  <Text variant="bodyMd" as="p">
                    Analytics
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className={styles.planCard}>
          <Box className={styles.planPrice}>
            <Box className={styles.planPriceHeader}>
              <Box className={styles.starter}>
                <Text variant="headingLg" as="h2">
                  Advanced
                </Text>
              </Box>
              <Box className={styles.starterDescription}>
                <Text variant="bodyMd" as="p">
                  For established businesses looking for a fully featured
                  program.{" "}
                </Text>
              </Box>
            </Box>
            <Box className={styles.planPriceFreeHeader}>
              <Box className={styles.planPriceFree}>
                <Text varient="headingLg" as="h2">
                  $299/month
                </Text>
              </Box>
              <Box className={styles.planPriceFreeDescription}>
                <Text variant="bodyMd" as="p">
                  + $20/{" "}
                  <span
                    style={{
                      color: "#B9B9B9",
                      textOverflow: "ellipsis",
                      fontFamily: "Figtree",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: "400",
                      lineHeight: "20px",
                    }}
                  >
                    person per month
                  </span>
                </Text>
              </Box>
            </Box>
            <Box className={styles.planUpgrade}>
              <Text variant="bodyMd" as="p">
                Upgrade
              </Text>
            </Box>
            <Box className={styles.planFeaturesList}>
              <Box className={styles.featureList}>
                <img src={check} alt="check" className={styles.check} />
                <Box className={styles.featureListText}>
                  <Text variant="bodyMd" as="p">
                    Up to 2,000 monthly orders
                  </Text>
                </Box>
              </Box>
              <Box className={styles.featureList}>
                <img src={check} alt="check" className={styles.check} />
                <Box className={styles.featureListText}>
                  <Text variant="bodyMd" as="p">
                    All features in Pro plan
                  </Text>
                </Box>
              </Box>
              <Box className={styles.featureList}>
                <img src={check} alt="check" className={styles.check} />
                <Box className={styles.featureListText}>
                  <Text variant="bodyMd" as="p">
                    Advanced Rules Engine
                  </Text>
                </Box>
              </Box>
              <Box className={styles.featureList}>
                <img src={check} alt="check" className={styles.check} />
                <Box className={styles.featureListText}>
                  <Text variant="bodyMd" as="p">
                    Member privileges
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className={styles.subscriptionFAQSection}>
        <Box className={styles.subscriptionFAQHeaderSection}>
          <Box className={styles.subscriptionFAQHeader}>
            <h1 className={styles.subscriptionFAQHeaderText}>FAQ</h1>
            <p className={styles.subscriptionFAQHeaderDescription}>
              Don’t see your answer? Reach out to us, we’d love to help!
            </p>
          </Box>
        </Box>
        {/* FAQ 1 */}
        <Box className={styles.subscriptionFAQDescriptionSection}>
          <Box
            className={styles.subscriptionFAQDescription}
            onClick={() => toggleFAQ(1)}
          >
            <Box className={styles.subscriptionFAQDescriptionTextSection}>
              <h1
                className={styles.subscriptionFAQDescriptionText}
                style={{
                  fontSize: openFAQ === 1 ? "18px" : "16px",
                }}
              >
                How do I cancel my Questlabs Rewards subscription?
              </h1>
              <img src={openFAQ === 1 ? uparrow : downarrow} alt="toggle" />
            </Box>
            {openFAQ === 1 && (
              <p className={styles.subscriptionFAQHeaderDescriptionText}>
                You can cancel your Questlabs subscription at any time through
                your account settings. Just go to the 'Subscription' section and
                select 'Cancel Subscription.'
              </p>
            )}
          </Box>
        </Box>

        {/* FAQ 2 */}
        <Box className={styles.subscriptionFAQDescriptionSection}>
          <Box
            className={styles.subscriptionFAQDescription}
            onClick={() => toggleFAQ(2)}
          >
            <Box className={styles.subscriptionFAQDescriptionTextSection}>
              <h1
                className={styles.subscriptionFAQDescriptionText}
                style={{
                  fontSize: openFAQ === 2 ? "18px" : "16px",
                }}
              >
                Will I lose all my data if I downgrade or cancel my Questlabs
                plan?
              </h1>
              <img src={openFAQ === 2 ? uparrow : downarrow} alt="toggle" />
            </Box>
            {openFAQ === 2 && (
              <p className={styles.subscriptionFAQHeaderDescriptionText}>
                No, you won't lose your data if you downgrade or cancel your
                plan. However, some features will be limited based on the plan.
              </p>
            )}
          </Box>
        </Box>

        {/* FAQ 3 */}
        <Box className={styles.subscriptionFAQDescriptionSection}>
          <Box
            className={styles.subscriptionFAQDescription}
            onClick={() => toggleFAQ(3)}
          >
            <Box className={styles.subscriptionFAQDescriptionTextSection}>
              <h1
                className={styles.subscriptionFAQDescriptionText}
                style={{
                  fontSize: openFAQ === 3 ? "18px" : "16px",
                }}
              >
                Can I upgrade my plan at any time?
              </h1>
              <img src={openFAQ === 3 ? uparrow : downarrow} alt="toggle" />
            </Box>
            {openFAQ === 3 && (
              <p className={styles.subscriptionFAQHeaderDescriptionText}>
                Yes, you can upgrade your plan at any time by going to the
                'Subscription' section of your account and selecting the plan
                that fits your needs.
              </p>
            )}
          </Box>
        </Box>

        {/* FAQ 4 */}
        <Box className={styles.subscriptionFAQDescriptionSection}>
          <Box
            className={styles.subscriptionFAQDescription}
            onClick={() => toggleFAQ(4)}
          >
            <Box className={styles.subscriptionFAQDescriptionTextSection}>
              <h1
                className={styles.subscriptionFAQDescriptionText}
                style={{
                  fontSize: openFAQ === 4 ? "18px" : "16px",
                }}
              >
                What happens if I exceed my order limit?
              </h1>
              <img src={openFAQ === 4 ? uparrow : downarrow} alt="toggle" />
            </Box>
            {openFAQ === 4 && (
              <p className={styles.subscriptionFAQHeaderDescriptionText}>
                If you exceed your order limit, you will need to upgrade to a
                higher plan. You will receive notifications before you reach
                your limit.
              </p>
            )}
          </Box>
        </Box>

        {/* FAQ 5 */}
        <Box className={styles.subscriptionFAQDescriptionSection}>
          <Box
            className={styles.subscriptionFAQDescription}
            onClick={() => toggleFAQ(5)}
          >
            <Box className={styles.subscriptionFAQDescriptionTextSection}>
              <h1
                className={styles.subscriptionFAQDescriptionText}
                style={{
                  fontSize: openFAQ === 5 ? "18px" : "16px",
                }}
              >
                Do I need to sign a long-term contract?
              </h1>
              <img src={openFAQ === 5 ? uparrow : downarrow} alt="toggle" />
            </Box>

            {openFAQ === 5 && (
              <p className={styles.subscriptionFAQHeaderDescriptionText}>
                No, you don’t need to sign a long-term contract. You can cancel
                or change your plan at any time.
              </p>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
