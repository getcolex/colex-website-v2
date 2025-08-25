import { trackButtonClick } from "./gtag";

export const getEarlyAccess = (location: string) => {
  trackButtonClick("Book a demo", location.toLowerCase());
  
  const phoneNumber = "+919945075889";
  const message = "Hello! I would like to inquire about your product.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;
  
  window.open(whatsappUrl, "_blank");
};