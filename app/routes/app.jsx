import { json } from "@remix-run/node";
import {
  Link,
  Outlet,
  useLoaderData,
  useRouteError,
  useLocation,
} from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { NavMenu } from "@shopify/app-bridge-react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import { authenticate } from "../shopify.server";
import enTranslations from "@shopify/polaris/locales/en.json";
// const enTranslations = require('@shopify/polaris/locales/en.json')
import "../global.css";


export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return json({ apiKey: process.env.SHOPIFY_API_KEY || "" });
};

export default function App() {
  const { apiKey } = useLoaderData();

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const currentTab = searchParams.get("tab") || "earnpoints";

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey} i18n={enTranslations}>
      <NavMenu>
        <Link to="/app" rel="home">
          Home
        </Link>
        <Link to="/app/getstarted">Get started</Link>
        <Link to={`/app/rewardsprogram?tab=${currentTab}`}>
          Rewards Program
        </Link>
        <Link to="/app/customer">Customers</Link>
        <Link to="/app/analytics">Analytics</Link>
        <Link to="/app/activity">Activity</Link>
        <Link to="/app/subscription">Subscription</Link>
        <Link to="/app/setting">Settings</Link>
      </NavMenu>
      <Outlet />
    </AppProvider>
  );
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
