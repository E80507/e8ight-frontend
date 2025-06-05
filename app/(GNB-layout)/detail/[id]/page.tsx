import dynamic from "next/dynamic";

const DetailContent = dynamic(() => import("./_components/detail-content"), {
  ssr: false,
});

interface DetailPageProps {
  params: { id: string };
}

export default function Page({ params }: DetailPageProps) {
  return <DetailContent params={params} />;
}
