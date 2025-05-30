import ShortRow from "@/app/_components/table/short-row";
import { ArtworkDetailRes } from "@/app/api/dto/artwork";
import formattedDate from "@/util/date";
import { handleCommaPoint, handleCommaPrice } from "@/util/price";

interface ArtworkBasicInfoProps {
  data: ArtworkDetailRes;
}

const ArtworkBasicInfo = ({ data }: ArtworkBasicInfoProps) => {
  const photoCount = data.totalSaleCountDetail.PHOTO; // 유광 (반광택) 출력 수
  const cardCount = data.totalSaleCountDetail.CARD; // 카드 출력 수
  const stickerCount = data.totalSaleCountDetail.STICKER; // 무광 (프리미엄 매트) 출력 수
  const totalPrintCountText = `${data.totalSaleCount}건 유광(반광택) ${photoCount} / 무광(프리미엄 매트) ${cardCount} / 유광(고광택 + 점착) ${stickerCount}`;
  return (
    <div className="flex flex-col gap-4">
      <p className="heading-4">작품 기본 정보</p>
      <div>
        <ShortRow size="md" label="작품 번호" value={data.artworkNo} />
        <ShortRow size="md" label="작품 등록일" value={""}>
          <div className="flex gap-2">
            <span>{formattedDate(data.createdAt, "DEFAULT_FULL")}</span>
            <span className="text-[#2A67FF]">
              {formattedDate(data.createdAt)}
            </span>
          </div>
        </ShortRow>
        <ShortRow size="md" label="작품 만료일" value={""}>
          {data.expiresAt ? (
            <div className="flex gap-2">
              <span>{formattedDate(data.expiresAt, "DEFAULT_FULL")}</span>
              <span className="text-[#E85C40]">
                {formattedDate(data.expiresAt)}
              </span>
            </div>
          ) : (
            "-"
          )}
        </ShortRow>
        <ShortRow size="md" label="작가 닉네임" value={data.nickname} />
        <ShortRow
          size="md"
          label="좋아요"
          value={handleCommaPrice(data.likeCount, "개")}
        />
        <ShortRow size="md" label="누적 출력횟수" value={totalPrintCountText} />
        <ShortRow
          size="md"
          label="누적 신고횟수"
          value={handleCommaPrice(data.reportCount, "회")}
        />
        <ShortRow
          size="md"
          label="누적 출력금액"
          value={handleCommaPoint(data.totalSaleRevenue)}
          isLastRow
        />
      </div>
    </div>
  );
};
export default ArtworkBasicInfo;
