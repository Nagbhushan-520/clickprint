/**
 * SHIM: no subscriptions. Everything is free — nothing is ever paywalled.
 */
"use client";

export const usePaywall = () => {
  return {
    isLoading: false,
    shouldBlock: false,
    triggerPaywall: () => {},
  };
};
