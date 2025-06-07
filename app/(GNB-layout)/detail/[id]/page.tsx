"use client";

import DetailContent from "./_components/detail-content";

interface DetailPageProps {
  params: { id: string };
}

export default function Page({ params }: DetailPageProps) {
  return <DetailContent params={params} />;
}
