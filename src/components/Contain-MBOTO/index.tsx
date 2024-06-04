import { Breadcrumb, Pagination } from "antd";
import CustomButtonSelect from "../CustomButtonSelect";
import { ArrowBackIcon } from "../CustomIcons";
import RightFilterMBOTO from "./right";
import BrandSlide from "./brandSlide";
import ItemCar from "./itemCar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const ContainMBOTO = ({
  posts,
  spin,
  pageSize,
  current,
  districtName,
  cityName,
  setState,
  onChangePage,
  state,
  setFilter,
  setOpenModal,
  handleChangeTab,
  activeKey,
}: any) => {
  const router = useRouter();
  const { query } = router;
  const [reCurrent, setReCurrent] = useState(1);

  const updateURL = (queryParams: any) => {
    router.push({
      pathname: "/mua-ban-oto",
      query: { ...router.query, ...queryParams },
    });
  };

  useEffect(() => {
    setReCurrent(1);
  }, [query]);

  useEffect(() => {
    setReCurrent(current);
  }, [current]);

  const handleClick = () => {
    setOpenModal(true);
  };

  const handleLink = (item: string) => {
    updateURL({ city: item, district: "" });
  };

  return (
    <div className="wrapper-contain">
      <Breadcrumb
        className="breadcrumb-user-page"
        separator=">"
        items={[
          {
            title: "Chợ tốt xe",
            onClick: () => {
              router.push(`/`);
            },
          },
          {
            title: `Ô tô`,
            onClick: () => {
              router.push("/mua-ban-oto");
            },
          },
          cityName !== ""
            ? {
                title: cityName,
                onClick: () => {
                  router.push(`/mua-ban-oto?city=${state.idCity}`);
                },
              }
            : {},
          districtName !== ""
            ? {
                title: districtName,
                onClick: () => {
                  router.push(`/mua-ban-oto?city=${state.idCity}&district=${state.idDistrict}`);
                },
              }
            : {},
        ]}
      />
      <div className="main-contain">
        <div className="left-contain">
          <div className="title-main">Mua bán xe ô tô, xe hơi giá tốt cập nhật tháng 04/2024</div>

          <div className="recommend">
            <div className="title-recommend">Gợi ý khu vực</div>
            <div className="recommend-place">
              <CustomButtonSelect handleClick={() => handleLink("79")}>Tp Hồ Chí Minh</CustomButtonSelect>
              <CustomButtonSelect handleClick={() => handleLink("01")}>Hà Nội</CustomButtonSelect>
              <CustomButtonSelect handleClick={() => handleLink("48")}>Đà Nẵng</CustomButtonSelect>
              <span className="more" onClick={handleClick}>
                Xem thêm <ArrowBackIcon></ArrowBackIcon>
              </span>
            </div>
          </div>

          <BrandSlide setOpenModal={setOpenModal}></BrandSlide>

          <ItemCar
            activeKey={activeKey}
            spin={spin}
            postBy={state.postBy}
            posts={posts}
            handleChangeTab={handleChangeTab}
            setFilter={setFilter}
          ></ItemCar>
          {!spin && (
            <>
              {" "}
              {posts.total > 0 ? (
                <Pagination
                  current={reCurrent}
                  pageSize={pageSize}
                  onChange={onChangePage}
                  total={posts.total}
                  style={{ paddingBottom: "30px" }}
                />
              ) : (
                <></>
              )}
            </>
          )}
        </div>
        <RightFilterMBOTO setState={setState}></RightFilterMBOTO>
      </div>
    </div>
  );
};
export default ContainMBOTO;
