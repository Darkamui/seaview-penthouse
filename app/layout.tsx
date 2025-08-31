import type React from "react";

type Props = {
  children: React.ReactNode;
};

// This is the root layout that will redirect to the locale-specific layout
export default function RootLayout({ children }: Props) {
  return children;
}
