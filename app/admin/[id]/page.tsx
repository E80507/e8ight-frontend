"use client";

import dynamic from "next/dynamic";

const AdminDetailContent = dynamic(
  () => import("./_components/admin-detail-content"),
  {
    ssr: false,
  },
);

interface AdminDetailPageProps {
  params: { id: string };
}

export default function Page({ params }: AdminDetailPageProps) {
  return <AdminDetailContent params={params} />;
}
