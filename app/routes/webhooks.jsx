import { authenticate } from "../shopify.server";
import db from "../db.server";

export const action = async ({ request }) => {
  const { topic, shop, session, admin } = await authenticate.webhook(request);

  if (!admin && topic !== "SHOP_REDACT") {
    // The admin context isn't returned if the webhook fired after a shop was uninstalled.
    // The SHOP_REDACT webhook will be fired up to 48 hours after a shop uninstalls the app.
    // Because of this, no admin context is available.
    throw new Response();
  }

  // The topics handled here should be declared in the shopify.app.toml.
  // More info: https://shopify.dev/docs/apps/build/cli-for-apps/app-configuration
  switch (topic) {
    case "APP_UNINSTALLED":
      if (session) {
        await db.session.deleteMany({ where: { shop } });
      }

      break;
    case "CUSTOMERS_DATA_REQUEST":
      await handleCustomerDataRequest(shop);
      break;

    case "CUSTOMERS_REDACT":
      await handleCustomerDataErasure(shop);
      break;

    case "SHOP_REDACT":
      await handleShopDataErasure(shop);
      break;
    default:
      throw new Response("Unhandled webhook topic", { status: 404 });
  }

  throw new Response();
};

async function handleCustomerDataRequest(shop) {
  console.log(`Received customer data request for shop: ${shop}`);
}

async function handleCustomerDataErasure(shop) {
  console.log(`Erasing customer data for shop: ${shop}`);
  await db.customer.deleteMany({ where: { shop } }); 
}

async function handleShopDataErasure(shop) {
  console.log(`Erasing shop data for shop: ${shop}`);
  await db.shop.deleteMany({ where: { shop } }); 
}
