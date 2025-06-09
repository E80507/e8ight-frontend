import { useCallback } from "react";
import * as amplitude from "@amplitude/analytics-browser";

/**
 * amplitude 이벤트 트래커
 * @param {string} logName
 * @param {string} displayName
 * @param {Record<string, string>} customFields 사용자 정의 이벤트 필드
 * @returns {void}
 * @description https://amplitude.com/docs/apis 참고
 * logName과 displayName으로 amplitude event를 기록하는 함수로 customFields에 {"button_location" :"top"} 등으로 사용
 */

const useTrackEvent = () => {
  const handleTrackEvent = useCallback(
    (
      logName: string,
      displayName: string,
      customFields: Record<string, string> = {},
    ) => {
      const eventData = {
        ...customFields,
        event_display_name: displayName,
      };

      amplitude.track(logName, eventData);
    },
    [],
  );

  return { handleTrackEvent };
};

export default useTrackEvent;
