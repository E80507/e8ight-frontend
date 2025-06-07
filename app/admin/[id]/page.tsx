import AdminDetailClient from "./_components/admin-detail-client";

interface AdminDetailProps {
  params: {
    id: string;
  };
}

const AdminDetail = ({ params }: AdminDetailProps) => {
  return <AdminDetailClient params={params} />;
};

export default AdminDetail;
