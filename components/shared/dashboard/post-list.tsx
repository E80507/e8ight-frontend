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
    <section className="mt-6 flex flex-col tablet:mt-10">
      <p className="mb-6 pretendard-h1-s tablet:mb-10 tablet:pretendard-h1-m">
        최신글
      </p>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-y-[60px] tablet:grid-cols-2 tablet:gap-x-6 tablet:gap-y-10 web:grid-cols-3 web:grid-rows-3">
          {posts.map((post, index) => {
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
                    priority={index < 3}
                  />
                </div>
                <div className="flex flex-col gap-y-2 px-3">
                  <p className="text-label-natural pretendard-body-2">
                    {formattedDate(createdAt, "INPUT_DATE")}
                  </p>
                  <p className="font-pretendard h2-m tablet:h2-l line-clamp-2">
                    {title}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="flex h-[360px] w-full items-center justify-center text-[#C8C9D0] pretendard-subtitle-m tablet:pretendard-subtitle-l">
          작성된 게시글이 없습니다.
        </div>
      )}
    </section>
  );
};

export default PostList;
