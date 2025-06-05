import { apiFetch } from "@/util/fetch";
import { SubscribeResponse } from "./dto/subscribe";

export const postSubscribe = async (
  email: string,
): Promise<SubscribeResponse> => {
  const now = new Date();
  const formatDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

  return apiFetch("/google-spread", {
    method: "POST",
    body: JSON.stringify({
      type: "newsletter",
      values: [[formatDate, email]],
    }),
  });
};
