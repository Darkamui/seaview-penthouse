import { GoogleAnalytics } from "@next/third-parties/google";

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  // Only render if GA ID is configured
  if (!gaId) {
    return null;
  }

  return <GoogleAnalytics gaId={gaId} />;
}
