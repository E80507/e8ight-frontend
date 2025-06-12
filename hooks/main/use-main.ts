"use client";

import { useEffect, useState } from "react";
import {
  AMPLITUDE_EVENT_DISPLAY_NAME,
  AMPLITUDE_EVENT_LOG_NAME,
} from "@/constants/amplitude";
import useTrackPageView from "@/hooks/amplitude/ust-track-page-view-with-UTM";

export default function useMain() {
  const { trackPageView } = useTrackPageView();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    trackPageView(
      AMPLITUDE_EVENT_LOG_NAME.LANDING_PAGE_VIEW,
      AMPLITUDE_EVENT_DISPLAY_NAME.LANDING_PAGE_VIEW,
    );
  }, [trackPageView]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, []);
  return { loading };
}
