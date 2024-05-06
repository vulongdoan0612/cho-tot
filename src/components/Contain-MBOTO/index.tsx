import { Breadcrumb, Pagination, Skeleton } from "antd";
import CustomButtonSelect from "../CustomButtonSelect";
import { ArrowBackIcon } from "../CustomIcons";

import RightFilterMBOTO from "./right";
import BrandSlide from "./brandSlide";
import ItemCar from "./itemCar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {  RootState } from "@/redux/store";
import { useRouter } from "next/router";

const ContainMBOTO = ({
  posts,
  spin,
  pageSize,
  current,

  setState,
  onChangePage,
}: any) => {
  const {  loading } = useSelector(
    (state: RootState) => state.countDownLoading
  );
  const [reCurrent, setReCurrent] = useState(1);
  const router = useRouter();
  const { query } = router;
  useEffect(() => {
    setReCurrent(1);
  }, [query]);
  useEffect(() => {
    setReCurrent(current);
  }, [current]);

  return (
    <div className="wrapper-contain">
      <Breadcrumb
        className="breadcrumb-user-page"
        separator=">"
        items={[
          {
            title: "Chợ tốt xe",
          },
          {
            title: `Ô tô`,
          },
        ]}
      />
      <div className="main-contain">
        <div className="left-contain">
          {loading ? (
            <Skeleton.Button block={true} active size="large"></Skeleton.Button>
          ) : (
            <div className="title-main">
              Mua bán xe ô tô, xe hơi giá tốt cập nhật tháng 04/2024
            </div>
          )}
          {loading ? (
            <Skeleton.Input
              style={{ height: "92px" }}
              block={true}
              active
              size="large"
            ></Skeleton.Input>
          ) : (
            <div className="recommend">
              <div className="title-recommend">Gợi ý khu vực</div>
              <div className="recommend-place">
                <CustomButtonSelect>Tp Hồ Chí Minh</CustomButtonSelect>
                <CustomButtonSelect>Hà Nội</CustomButtonSelect>
                <CustomButtonSelect>Đà Nẵng</CustomButtonSelect>
                <span className="more">
                  Xem thêm <ArrowBackIcon></ArrowBackIcon>
                </span>
              </div>
            </div>
          )}
          {loading ? (
            <Skeleton.Input
              style={{ height: "68px" }}
              block={true}
              active
              size="large"
            ></Skeleton.Input>
          ) : (
            <BrandSlide></BrandSlide>
          )}
          <ItemCar spin={spin} posts={posts}></ItemCar>
          <Pagination
            current={reCurrent}
            pageSize={pageSize}
            onChange={onChangePage}
            total={posts.total}
          />
        </div>
        <RightFilterMBOTO
          setState={setState}
        ></RightFilterMBOTO>
      </div>
    </div>
  );
};
export default ContainMBOTO;
