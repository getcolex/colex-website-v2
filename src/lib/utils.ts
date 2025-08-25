import { event } from "./gtag";

export const getEarlyAccess = (source?: string) => {
  event({
    action: "click_early_access_button",
    category: "engagement",
    label: `Get Early Access Clicked${source ? ` - ${source}` : ""}`,
  });
  
  const phoneNumber = "+919945075889";
  const message = "Hello! I would like to inquire about your product.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;
  
  window.open(whatsappUrl, "_blank");
};