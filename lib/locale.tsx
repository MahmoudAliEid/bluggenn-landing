"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import en from "../messages/en.json";
import ar from "../messages/ar.json";

type Locale = "en" | "ar";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  messages: typeof en | typeof ar;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const messages = { en, ar };

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window !== "undefined") {
      const savedLocale = localStorage.getItem("locale") as Locale;
      return savedLocale && ["en", "ar"].includes(savedLocale)
        ? savedLocale
        : "en";
    }
    return "en";
  });

  const updateLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", newLocale);
    }
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = messages[locale];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  return (
    <LocaleContext.Provider
      value={{ locale, setLocale: updateLocale, t, messages: messages[locale] }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
