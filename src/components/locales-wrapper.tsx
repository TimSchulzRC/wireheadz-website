"use client";

import React, { createContext, useContext, useState } from "react";

type Locale = {
  lang: string;
  lang_name: string;
  url: string;
};

type LocalesContextType = [
  Locale[],
  React.Dispatch<React.SetStateAction<Locale[]>>,
];

const LocalesContext = createContext<LocalesContextType | undefined>(undefined);

export function useLocales() {
  const ctx = useContext(LocalesContext);
  if (!ctx) throw new Error("useLocales must be used within a LocalesProvider");
  return ctx;
}

export default function LocalesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locales, setLocales] = useState<Locale[]>([]);

  return (
    <LocalesContext.Provider value={[locales, setLocales]}>
      {children}
    </LocalesContext.Provider>
  );
}
