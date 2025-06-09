import Image from "next/image";
import formattedDate from "@/util/date";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  category: string;
  author: string;
  mainImage: string;
  tags: string[];
  keywords: string[];
  linkUrl: string;
  fileUrls: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

interface PostListProps {
  posts: Post[];
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <section className="mt-6 flex flex-col  tablet:mt-10">
      <p className="mb-6 tablet:pretendard-h1-m pretendard-h1-s tablet:mb-10">
        최신글
      </p>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-y-[60px] tablet:grid-cols-2 tablet:gap-x-6 tablet:gap-y-10 web:grid-cols-3 web:grid-rows-3">
          {posts.map((post) => {
            const { id, thumbnail, title, createdAt } = post;
            return (
              <Link key={id} href={`/detail/${id}`} className="w-full">
                <div className="relative mb-4 aspect-[3/2] w-full">
                  <Image
                    src={thumbnail}
                    alt={title}
                    fill
                    className="rounded-[20px] object-cover"
                    sizes="(max-width: 600px) 100vw, (max-width: 1025px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-col gap-y-2 px-3">
                  <p className="text-label-natural pretendard-body-2">
                    {formattedDate(createdAt, "INPUT_DATE")}
                  </p>
                  <p className="font-pretendard h2-m tablet:h2-l">{title}</p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-[#A7A9B4]tablet:pretendard-body-1 pretendard-body-3">
          작성된 게시글이 없습니다.
        </div>
      )}
    </section>
  );
};

export default PostList;
