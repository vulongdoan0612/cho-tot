import ContainPD from "@/components/Contain-PD";
import Page from "@/layout/Page";
import { useState } from "react";

const PostId = () => {
  const [title, setTitle] = useState("");
  return (
    <Page style={{ backgroundColor: "#f4f4f4" }} title={title}>
      <div className="wrapper-post-detail">
        <ContainPD setTitle={setTitle}></ContainPD>
      </div>
    </Page>
  );
};
export default PostId;
