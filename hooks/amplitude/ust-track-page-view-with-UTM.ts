"use client";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import * as amplitude from "@amplitude/analytics-browser";

/**
 * Amplitude UTM 트래커
 * @returns {{
 *   trackPageView: (logName: string, displayName: string, customEvents?: Record<string, string>) => void,
 *   utmParams: string | undefined
 * }}
 * @description
 * - `trackPageView`: Amplitude에 이벤트를 기록하는 함수
 *   - `logName`: 이벤트 이름
 *   - `displayName`: 이벤트에 표시될 이름
 *   - `customEvents`: 추가로 기록할 사용자 정의 필드 (key-value 형식)
 * - `utmParams`: 현재 페이지의 UTM 파라미터를 쿼리 스트링 형식으로 반환
 *
 * 주요 기능:
 * 1. UTM 파라미터 추출:
 *    - URL에서 UTM 파라미터를 가져오며, 없을 경우 `unknown`을 반환
 * 2. 최초 UTM 파라미터 저장:
 *    - 첫 방문 시 URL의 UTM 파라미터를 로컬 스토리지에 저장
 * 3. UTM 데이터 기록:
 *    - 현재 UTM 파라미터와 로컬 스토리지에 저장된 초기 UTM 파라미터를 Amplitude로 전송
 * 4. 사용자 정의 이벤트 필드:
 *    - 필요한 경우 추가적인 사용자 정의 데이터를 함께 전송
 *
 * 참고: https://amplitude.com/docs/apis
 */

const useTrackPageViewWithUTM = () => {
  const searchParams = useSearchParams();
  const [utmParams, setUtmParams] = useState<string | undefined>(undefined);
  // UTM 파라미터를 파라미터에서 가져오고, 없으면 "unknown" 반환
  const getUTMParam = (key: string): string => {
    return searchParams.get(key) || "unknown";
  };
  // 최초 UTM 파라미터를 로컬 스토리지에 저장
  const storeInitialUTMParams = (utmParams: Record<string, string>) => {
    if (!localStorage.getItem("initial_utm_campaign")) {
      const initialUtmParams: Record<string, string> = {
        initial_utm_campaign: utmParams.utm_campaign,
        initial_utm_source: utmParams.utm_source,
        initial_utm_medium: utmParams.utm_medium,
        initial_utm_content: utmParams.utm_content,
        initial_utm_term: utmParams.utm_term,
      };
      Object.keys(initialUtmParams).forEach((key) => {
        localStorage.setItem(
          key,
          initialUtmParams[key as keyof typeof initialUtmParams] || "unknown",
        );
      });
    }
  };
  // 로컬 스토리지에서 최초 UTM 파라미터 가져오기
  const getInitialUTMParams = () => {
    return {
      initial_utm_campaign:
        localStorage.getItem("initial_utm_campaign") || "unknown",
      initial_utm_source:
        localStorage.getItem("initial_utm_source") || "unknown",
      initial_utm_medium:
        localStorage.getItem("initial_utm_medium") || "unknown",
      initial_utm_content:
        localStorage.getItem("initial_utm_content") || "unknown",
      initial_utm_term: localStorage.getItem("initial_utm_term") || "unknown",
    };
  };
  // UTM 파라미터 추출 및 상태 업데이트
  useEffect(() => {
    if (typeof window === "undefined") return;
    const utmParams = {
      utm_source: getUTMParam("utm_source"),
      utm_term: getUTMParam("utm_term"),
      utm_campaign: getUTMParam("utm_campaign"),
      utm_content: getUTMParam("utm_content"),
      utm_medium: getUTMParam("utm_medium"),
    };
    // UTM 파라미터를 쿼리 스트링 형식으로 변환
    const utmQueryString = Object.entries(utmParams)
      .filter(([, value]) => value !== "unknown")
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    setUtmParams(utmQueryString);
  }, [searchParams]);
  // trackPageView 함수 - customEvent를 동적 객체로 처리
  const trackPageView = useCallback(
    (
      logName: string,
      displayName: string,
      customEvents: Record<string, string> = {},
    ) => {
      if (typeof window === "undefined" || utmParams === undefined) return; // utmParams가 없을 경우 실행하지 않음
      const utmParamsObj = {
        utm_source: getUTMParam("utm_source"),
        utm_term: getUTMParam("utm_term"),
        utm_campaign: getUTMParam("utm_campaign"),
        utm_content: getUTMParam("utm_content"),
        utm_medium: getUTMParam("utm_medium"),
      };
      // 최초 UTM 파라미터 저장
      storeInitialUTMParams(utmParamsObj);
      // 로컬 스토리지에 저장된 최초 UTM 파라미터 가져오기
      const initialUtmParams = getInitialUTMParams();
      // Amplitude에 전송할 데이터 생성
      const data = {
        ...utmParamsObj,
        ...initialUtmParams,
        ...customEvents,
        event_display_name: displayName,
      };
      // Amplitude에 UTM과 최초 UTM 파라미터 전송
      amplitude.track(logName, data);
    },
    [utmParams],
  );
  return { trackPageView, utmParams };
};
export default useTrackPageViewWithUTM;
