import { AdminRes, AdminCategory } from "./dto/admin";

const mockTechBlogList: AdminRes[] = [
  {
    techBlogId: "blog_001",
    createdAt: new Date().toISOString(),
    title: "디지털 트윈 기술의 미래",
    category: AdminCategory.LIBRARY,
    writer: "John Doe",
  },
  {
    techBlogId: "blog_002",
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 하루 전
    title: "AI와 메타버스의 융합",
    category: AdminCategory.INSIGHT,
    writer: "Jane Smith",
  },
  {
    techBlogId: "blog_003",
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 이틀 전
    title: "스마트 시티 구현 사례",
    category: AdminCategory.DX,
    writer: "Kim Min Su",
  },
  {
    techBlogId: "blog_004",
    createdAt: new Date(Date.now() - 259200000).toISOString(), // 3일 전
    title: "산업용 IoT 플랫폼",
    category: AdminCategory.DOWNLOADS,
    writer: "Lee Ji Eun",
  },
];

// 테크 블로그 목록 조회
export const getTechBlogList = async (
  year: number,
  month: number,
  day: number,
): Promise<AdminRes[]> => {
  return mockTechBlogList;
  
  // 실제 API 호출 코드 (주석 처리)
  /*
  try {
    const res = await apiFetch(
      `/admin/tech-blog/list?year=${year}&month=${month}&day=${day}`,
    );
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("테크 블로그 목록 조회에 실패했습니다.");
  }
  */
};
