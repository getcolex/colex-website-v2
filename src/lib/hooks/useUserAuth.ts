import { useMutation } from "@tanstack/react-query";
import {
  initiateEmailLogin,
  initiateMobileLogin,
  updateProfile,
  verifyEmailLogin,
  verifyMobileLogin,
} from "@/lib/api/auth";
import { ProfileData } from "@/store/useAppStore";

export const useInitiateEmailLogin = () =>
  useMutation({
    mutationFn: (email: string) => initiateEmailLogin(email),
  });

export const useVerifyEmailLogin = () =>
  useMutation({
    mutationFn: ({ token, otp }: { otp: string; token: string }) =>
      verifyEmailLogin(otp, token),
  });

export const useInitiateMobileLogin = () =>
  useMutation({
    mutationFn: (mobile: string) => initiateMobileLogin(mobile),
  });

export const useVerifyMobileLogin = () =>
  useMutation({
    mutationFn: ({
      otp,
      token,
      mobile,
      profileData,
    }: {
      otp: string;
      token: string;
      mobile: string;
      profileData: ProfileData;
    }) => verifyMobileLogin(otp, token, mobile, profileData),
  });

export const useUpdateProfile = () =>
  useMutation({
    mutationFn: (data: ProfileData) => updateProfile(data),
  });
