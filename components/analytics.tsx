import { GoogleAnalytics } from "@next/third-parties/google";

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  // Only render in production and if GA ID is configured
  if (process.env.NODE_ENV !== "production" || !gaId) {
    return null;
  }

  return <GoogleAnalytics gaId={gaId} />;
}
