"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PostFormSchema } from "@/schema/post";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import CustomCheckboxField from "@/components/shared/form/custom-checkbox-field";
import { FormMessage } from "@/components/ui/form";
import {
  createKeyword,
  createTag,
  deleteKeyword,
  deleteTag,
} from "@/app/api/admin";
import { mutate } from "swr";
import { cn } from "@/lib/utils";

export interface OptionItem {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface ManageModalProps {
  modalType: "tags" | "keywords";
  form: UseFormReturn<z.infer<typeof PostFormSchema>>;
  setModalType: (modalType: "tags" | "keywords" | null) => void;
  options: OptionItem[];
}

const ManageModal = ({
  modalType,
  form,
  setModalType,
  options: defaultOptions,
}: ManageModalProps) => {
  const [options, setOptions] = useState<OptionItem[]>([]);
  const [originalOptions, setOriginalOptions] = useState<OptionItem[]>([]);
  const [originalSelected, setOriginalSelected] = useState<string[]>([]);
  const [isSetting, setIsSetting] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [addedItems, setAddedItems] = useState<string[]>([]);
  const [deletedItemIds, setDeletedItemIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (modalType) {
      setOptions(defaultOptions);
      setOriginalOptions(defaultOptions);
      setOriginalSelected(form.getValues(modalType) || []);
    }
  }, [modalType]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) handleCancel();
  };

  const handleCancel = () => {
    setOptions(originalOptions);
    form.setValue(modalType, originalSelected);
    setIsSetting(false);
    setIsAdding(false);
    setAddedItems([]);
    setDeletedItemIds([]);
    setModalType(null);
  };

  const handleAddItem = () => {
    const trimmed = newItem.trim();
    if (!trimmed) return;

    if (trimmed.length < 2 || trimmed.length >= 15) {
      setError("내용을 최소 2자 이상 15자 미만 입력해주세요.");
      return;
    }

    if (options.some((item) => item.content === trimmed)) {
      setError("이미 존재하는 항목입니다.");
      return;
    }

    const newOption: OptionItem = {
      id: `temp-id-${Date.now()}`,
      content: trimmed,
      createdAt: "",
      updatedAt: "",
      deletedAt: null,
    };

    setOptions((prev) => [...prev, newOption]);
    setAddedItems((prev) => [...prev, trimmed]);

    const selected = form.getValues(modalType) || [];
    if (!selected.includes(trimmed)) {
      form.setValue(modalType, [...selected, trimmed]);
    }

    setNewItem("");
    setError(null);
    setIsAdding(false);
  };

  const handleDeleteItem = (id: string) => {
    const item = options.find((o) => o.id === id);
    if (!item) return;

    setOptions((prev) => prev.filter((o) => o.id !== id));
    if (!id.startsWith("temp-id")) {
      setDeletedItemIds((prev) => [...prev, id]);
    }

    const selected = form.getValues(modalType) || [];
    form.setValue(
      modalType,
      selected.filter((v) => v !== item.content),
    );
  };

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      for (const content of addedItems) {
        if (modalType === "tags") await createTag({ content });
        else await createKeyword({ content });
      }

      for (const id of deletedItemIds) {
        if (modalType === "tags") await deleteTag({ id });
        else await deleteKeyword({ id });
      }

      mutate(modalType);

      const selectedItems = options.filter((item) =>
        form.getValues(modalType)?.includes(item.content),
      );
      form.setValue(
        modalType,
        selectedItems.map((item) => item.content),
      );

      setIsSetting(false);
      setIsAdding(false);
      setAddedItems([]);
      setDeletedItemIds([]);
      setModalType(null);
    } catch (err) {
      console.error("저장 실패", err);
      setError("저장 중 오류가 발생했습니다.");
    }
  };

  const data = form.watch(modalType);

  return (
    <div
      className="fixed inset-0 z-[102] flex items-center justify-center bg-black/60"
      onClick={handleBackdropClick}
    >
      <div
        className="flex w-[calc(100%-24px)] max-w-[383px] flex-col gap-y-6 rounded-[20px] bg-white px-5 py-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <p className="pretendard-h1-r">
            {modalType === "tags" ? "태그 관리" : "검색 키워드"}
          </p>
          {isSetting ? (
            <div className="flex gap-x-2">
              <Button
                size="md"
                className="w-[57px]"
                variant="outline"
                onClick={handleCancel}
              >
                취소
              </Button>
              <Button size="md" className="w-[57px]" onClick={handleSave}>
                저장
              </Button>
            </div>
          ) : (
            <Button
              size="md"
              className="w-[65px]"
              variant="outline"
              onClick={() => setIsSetting(true)}
            >
              설정
            </Button>
          )}
        </div>

        {data?.length === 0 && options.length === 0 && !isAdding && (
          <p className="text-center text-label-assistive pretendard-body-2">
            추가된 {modalType === "tags" ? "태그" : "검색어"}가 없습니다.
          </p>
        )}

        {options.length > 0 && (
          <div className="flex flex-col gap-y-6">
            {options.map((item) => (
              <div
                key={item.content}
                className={cn(
                  "flex items-center justify-between gap-x-2",
                  !isSetting && "pointer-events-none",
                )}
              >
                <CustomCheckboxField
                  form={form}
                  name={modalType}
                  value={item.content}
                  label={item.content}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (isSetting) handleDeleteItem(item.id);
                  }}
                  className="whitespace-nowrap text-label-assistive pretendard-body-2"
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        )}

        {isSetting && isAdding && (
          <div className="flex flex-col gap-y-2">
            <div className="flex gap-2">
              <div className="size-5">
                <CustomCheckboxField
                  form={form}
                  name={modalType}
                  value={newItem}
                />
              </div>
              <label htmlFor={modalType} className="w-full">
                <input
                  id={modalType}
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  className={`flex w-full rounded-md border border-black/10 px-4 py-3 transition-colors pretendard-body-2 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#8B909C] focus-visible:border-black focus-visible:outline-none focus-visible:ring-0 disabled:mt-3 disabled:cursor-not-allowed disabled:bg-black/10 disabled:text-black/40 ${
                    error
                      ? "border-error ring-1 focus-visible:border-error"
                      : ""
                  }`}
                  placeholder={`새로운 ${modalType === "tags" ? "태그" : "검색어"} 입력해주세요.`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddItem();
                    }
                  }}
                />
              </label>
            </div>
            <FormMessage className="ml-6 pretendard-subtitle-s">
              {error}
            </FormMessage>
          </div>
        )}

        <Button
          size="lg"
          variant="outline"
          disabled={!isSetting}
          className="w-full pretendard-subtitle-l"
          onClick={(e) => {
            e.preventDefault();
            if (!isAdding) {
              setIsAdding(true);
              return;
            }

            handleAddItem();
          }}
        >
          {!isSetting ? "선택완료" : "추가하기"}
        </Button>
      </div>
    </div>
  );
};

export default ManageModal;
