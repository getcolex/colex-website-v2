import { API_ROUTES } from "@/lib/config";
import api from "../axios";
import { ProfileData } from "@/store/useAppStore";

export async function initiateEmailLogin(email: string) {
  const response = await api.post(API_ROUTES.EMAIL_INITIATE, { email });
  console.log(response.data);
  return response.data;
}

export async function verifyEmailLogin(otp: string, token: string) {
  const response = await api.post(API_ROUTES.EMAIL_VERIFY, { otp, token });
  return response.data;
}

export async function initiateMobileLogin(mobile: string) {
  const response = await api.post(API_ROUTES.MOBILE_INITIATE, { mobile });
  return response.data;
}

export async function verifyMobileLogin(
  otp: string,
  token: string,
  mobile: string,
  profileData: ProfileData
) {
  const response = await api.post(API_ROUTES.MOBILE_VERIFY, {
    mobile,
    otp,
    profile_data: profileData,
    token,
  });
  return response.data;
}

export async function updateProfile(data: ProfileData) {
  const response = await api.post(API_ROUTES.UPDATE_PROFILE, {
    profile_data: data,
  });
  return response.data;
}
