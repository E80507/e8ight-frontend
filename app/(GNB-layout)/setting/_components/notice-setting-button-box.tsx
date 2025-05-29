import { Button } from "@/components/ui/button";
import { useState } from "react";
import ServiceNoticeAddModal from "./service-notice-add-modal";
import { useDeleteServiceNotice } from "@/hooks/setting/use-delete-service-notice";
import { SETTING_PAGE } from "@/constants/path";
import { usePatchServiceNoticeStatus } from "@/hooks/setting/use-patch-service-notice-status";
import { ServiceNoticeRes } from "@/app/api/dto/setting";

interface NoticeSettingButtonBoxProps {
  selectedIds: string[];
  totalData: ServiceNoticeRes[];
}

const NoticeSettingButtonBox = ({
  selectedIds,
  totalData,
}: NoticeSettingButtonBoxProps) => {
  const isDisabled = selectedIds.length === 0;
  const [modal, setModal] = useState(false); // 공지 생성 모달 노출 여부
  const { onDelete, deleteLoading } = useDeleteServiceNotice();
  const { onSubmit, loading, visibleLoading } = usePatchServiceNoticeStatus();

  // 리셋 핸들러
  const handleReset = () => (window.location.href = SETTING_PAGE);

  // 공지 등록 핸들러
  const onClickAddNotice = () => setModal(true);

  // 공지 삭제 핸들러
  const onClickDelete = () => {
    onDelete(selectedIds, handleReset);
  };

  // 공지 해제 핸들러
  const onClickInvisible = () => {
    onSubmit(false, selectedIds, handleReset);
  };

  // 공지 노출 핸들러
  const onClickVisible = () => {
    // 선택된 아이디를 가진 배열
    const selectedData = totalData.filter((data) =>
      selectedIds.includes(data.id),
    );

    // 이미지가 없는 데이터가 있을 경우 반환
    if (selectedData.some((data) => !data.file)) {
      return alert("노출될 공지는 반드시 이미지를 포함해야 해요");
    }

    if (selectedIds.length > 3) {
      return alert("노출될 공지는 최대 3개까지 등록 가능해요");
    }
    onSubmit(true, selectedIds, handleReset);
  };
  return (
    <div className="flex items-center gap-2">
      {modal && <ServiceNoticeAddModal setModal={setModal} />}
      <Button
        className="min-w-[70px]"
        onClick={onClickDelete}
        loadColor="white"
        loading={deleteLoading}
        disabled={isDisabled}
        variant={"outline"}
        size={"sm"}
        type="button"
      >
        공지 삭제
      </Button>
      <Button
        className="min-w-[70px]"
        onClick={onClickAddNotice}
        variant={"outline"}
        size={"sm"}
        type="button"
      >
        공지 등록
      </Button>
      <Button
        loading={loading}
        onClick={onClickInvisible}
        className="min-w-[70px]"
        disabled={isDisabled}
        variant={"outline"}
        size={"sm"}
        type="button"
        loadColor="white"
      >
        공지 해제
      </Button>
      <Button
        loading={visibleLoading}
        onClick={onClickVisible}
        className="min-w-[70px]"
        disabled={isDisabled}
        variant={"outline"}
        size={"sm"}
        type="button"
        loadColor="white"
      >
        공지 노출
      </Button>
    </div>
  );
};
export default NoticeSettingButtonBox;
