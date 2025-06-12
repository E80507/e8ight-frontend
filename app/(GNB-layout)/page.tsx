import Loading from "@/components/shared/loading/loading";
import { Suspense } from "react";
import HomeClient from "./HomeClient";

const Home = () => {
  return (
    <Suspense fallback={<Loading />}>
      <HomeClient />
    </Suspense>
  );
};

export default Home;
