import { apiFetch } from "@/util/fetch";
import { SubscribeResponse } from "./dto/subscribe";

export const postSubscribe = async (
  email: string,
  ): Promise<SubscribeResponse> => {
    return apiFetch("/subscribe", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  };