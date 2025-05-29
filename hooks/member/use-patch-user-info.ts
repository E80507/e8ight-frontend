import { useState } from "react";
import { toast } from "../use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MemberRes } from "@/app/api/dto/member";
import { userPatchSchema } from "@/schema/member";
import { patchUserInfo } from "@/app/api/member";

export const usePatchUserInfo = (
  id: string,
  savedData: MemberRes,
  isArtist: boolean,
) => {
  const [loading, setLoading] = useState(false); // 로딩 상태
  const form = useForm<z.infer<typeof userPatchSchema>>({
    resolver: zodResolver(userPatchSchema),
    defaultValues: {
      memo: savedData.memo ?? undefined,
      isBlocked: String(savedData.isBlocked),
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    // 저장된 메모가 없을 경우 null이므로 data.memo가 없을 경우(undefined)와 통일
    const trimmedSavedMemo = savedData.memo ?? undefined;
    console.log(
      trimmedSavedMemo,
      data.memo,
      savedData.isBlocked,
      data.isBlocked,
    );
    if (
      trimmedSavedMemo === data.memo &&
      String(savedData.isBlocked) === String(data.isBlocked)
    ) {
      return alert("변경된 정보가 없습니다.");
    }
    setLoading(true);

    try {
      // 0.4초 대기
      await new Promise((resolve) => setTimeout(resolve, 400));

      // 작가일 경우 isBlocked 제거
      let trimmedData = isArtist ? { memo: data.memo } : data;
      await patchUserInfo(id, isArtist, trimmedData);
      alert("회원 정보가 변경되었어요");
    } catch (err: unknown) {
      console.error(err);
      if (!err) return;
      toast({
        title: "잠시 후 다시 시도해주세요",
      });
    } finally {
      setLoading(false);
    }
  });

  return { onSubmit, form, loading };
};
