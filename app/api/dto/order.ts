import { ArtworkCategory } from "./artwork";
import { PrintStatus } from "./delivery";
export interface OrderRes {
  purchasedArtworkId: string; // 구매한 작품 아이디
  createdAt: string;
  updatedAt: string;
  deliveryNo: string; // 배송 번호
  artworkNo: string; // 작품 번호
  email: string; // 배송 신청한 회원 이메일
  printCategory: ArtworkCategory; // 굿즈 유형 (스티커 | 사진 | 카드)
  quantity: number; // 출력 수량
  printStatus: PrintStatus; // 출력 상태
}
