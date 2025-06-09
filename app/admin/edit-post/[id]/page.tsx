import EditPostClient from "./_components/edit-post-client";

interface EditPostPageProps {
  params: {
    id: string;
  };
}

const EditPostPage = ({ params }: EditPostPageProps) => {
  return <EditPostClient params={params} />;
};

export default EditPostPage;
