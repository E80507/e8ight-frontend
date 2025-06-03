"use client";

import PostContainer from "./table/_components/pc/post-container";
import MobilePostContainer from "./table/_components/mobile/post-container";

const AdminPage = () => {
  return (
    <>
      {/* pc 화면 */}
      <PostContainer />

      {/* 모바일 화면  */}
      <MobilePostContainer />
    </>
  );
};

export default AdminPage;
