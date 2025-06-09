"use client";

import { useEffect } from "react";
import * as amplitude from "@amplitude/analytics-browser";
import { v4 as uuidv4 } from "uuid";

const AmplitudeInitialiser = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const key = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

    amplitude.init(String(key), {
      autocapture: {
        pageViews: false,
        formInteractions: false,
        sessions: false,
      },
    });

    let userId = localStorage.getItem("amplitudeUserId");

    if (!userId) {
      userId = uuidv4();
      localStorage.setItem("amplitudeUserId", userId);
    }

    // Amplitude에 userId 설정
    amplitude.setUserId(userId);
  }, []);

  return null;
};

export default AmplitudeInitialiser;
