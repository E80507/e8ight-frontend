import DetailClient from "./_components/detail-client";

interface PostDetailPageProps {
  params: {
    id: string;
  };
}

const PostDetailPage = ({ params }: PostDetailPageProps) => {
  return <DetailClient params={params} />;
};

export default PostDetailPage;
