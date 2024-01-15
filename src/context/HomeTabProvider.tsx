"use client";

import { createContext, ReactNode, useState } from "react";

type ContextValue = "rec" | "fol";
export const HomeTabContext = createContext<{
  tab: ContextValue;
  setTab: (value: ContextValue) => void;
}>({
  tab: "rec",
  setTab: (value: ContextValue) => {},
});

type Props = { children: ReactNode };
export default function HomeTabProvider({ children }: Props) {
  const [tab, setTab] = useState<ContextValue>("rec");

  return (
    <HomeTabContext.Provider value={{ tab, setTab }}>
      {children}
    </HomeTabContext.Provider>
  );
}
