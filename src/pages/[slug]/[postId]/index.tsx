import ContainPD from "@/components/Contain-PD";
import Page from "@/layout/Page";
import { useRouter } from "next/router";

const PostId = () => {
  const router = useRouter();
  const { query } = router;
  return (
    <Page style={{ backgroundColor: "#f4f4f4" }}>
      <div className="wrapper-post-detail">
        <ContainPD></ContainPD>
      </div>
    </Page>
  );
};
export default PostId;
