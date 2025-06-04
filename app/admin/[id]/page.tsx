import { AdminDetailContent } from "./_components/admin-detail-content";

interface AdminDetailPageProps {
  params: { id: string };
}

export default async function Page({ params }: AdminDetailPageProps) {
  return <AdminDetailContent params={params} />;
}
