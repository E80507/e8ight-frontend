import { ArtworkDetailRes, ArtworkDirection } from "@/app/api/dto/artwork";
import Image from "next/image";
import Link from "next/link";
import TagText from "./tag-text";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ShortRow from "@/app/_components/table/short-row";
import { usePostArtworkPDF } from "@/hooks/artwork/use-post-artwork-pdf";

interface ArtworkDetailInfoProps {
  data: ArtworkDetailRes;
}

const ArtworkDetailInfo = ({ data }: ArtworkDetailInfoProps) => {
  const isHorizontal = data.imageDirection === ArtworkDirection.HORIZONTAL; // 작품 방향 가로 여부

  // 링크 확인 버튼 핸들러
  const onClickCheckLink = (link: string | null) => {
    if (link) {
      const url =
        link.startsWith("http://") || link.startsWith("https://")
          ? link
          : `http://${link}`;
      window.open(url, "_blank");
    }
  };

  const { onSubmit, loading } = usePostArtworkPDF();

  // PDF 다운로드 핸들러
  const onClickDownloadPDF = () => {
    onSubmit(data.id);
  };
  // todo : 출력 버튼 cta로 빼기
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="heading-4">작품 등록 정보</p>
        <Button
          className="min-w-[116px]"
          loading={loading}
          loadColor="white"
          onClick={onClickDownloadPDF}
          type="button"
          size={"sm"}
          variant={"outline-black"}
        >
          출력 PDF 다운로드
        </Button>
      </div>
      <div>
        <ShortRow size="md" label="작품 이미지" value={""}>
          <Link
            href={data.artworkImage}
            target="_blank"
            className={`relative my-4 flex justify-start ${isHorizontal ? "h-[212px]" : "h-[196px]"}`}
            style={{
              aspectRatio: isHorizontal ? "320/212" : "129/196",
            }}
          >
            <Image src={data.artworkImage} alt="작품 사진" fill />
          </Link>
        </ShortRow>
        <ShortRow
          size="md"
          label="작품 방향"
          value={isHorizontal ? "가로" : "세로"}
        />
        <ShortRow size="md" label="작품 설명" value={""}>
          <div className="w-full py-4">
            <Textarea value={data.description} disabled />
          </div>
        </ShortRow>
        <ShortRow size="md" label="작품 태그" value={""}>
          <TagText tags={data.tags} />
        </ShortRow>
        <ShortRow isLastRow size="md" label="관련 링크" value={""}>
          {data.relatedLink ? (
            <div className="flex items-center gap-2">
              <span>{data.relatedLink}</span>
              <Button
                type="button"
                size={"sm"}
                onClick={() => onClickCheckLink(data.relatedLink)}
                variant={"outline-black"}
              >
                보기
              </Button>
            </div>
          ) : (
            "-"
          )}
        </ShortRow>
      </div>
    </div>
  );
};
export default ArtworkDetailInfo;
