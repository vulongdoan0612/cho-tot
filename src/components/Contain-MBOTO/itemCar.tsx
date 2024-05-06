import { Image, InputNumberProps, Skeleton, Tabs, TabsProps } from "antd";
import { useEffect, useState } from "react";
import {
  ChatIcon,
  FavouriteIcon,
  MangeShopIcon,
  TopPostIcon,
} from "../CustomIcons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import formatNumberWithCommas from "@/utils/formatMoneyWithDot";

const ItemCar = ({ posts, spin }: any) => {
  const [inputValue, setInputValue] = useState(1);
  const dispatch = useDispatch();

  const onChange: InputNumberProps["onChange"] = (newValue) => {
    setInputValue(15);
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Tất cả",
      children: (
        <div className="tab-all-type">
          <div className="wrapper-tabs">
            {posts &&
              posts?.data?.map((item: any, index: any) => {
                return (
                  <div className="tab" key={index}>
                    <div className="contain">
                      <Skeleton.Button block active></Skeleton.Button>
                      <div
                        className={`${
                          spin ? "unhidden" : "hidden"
                        } skeleton-custom`}
                      >
                        <Image
                          className={"left-contain-tab"}
                          src={item?.post?.image[0]?.img}
                          alt=""
                          // preview={false}
                          width={128}
                          height={128}
                        ></Image>
                      </div>
                      <div className="right-contain-tab">
                        <Skeleton active />
                        <div
                          className={`${
                            spin ? "unhidden" : "hidden"
                          } skeleton-custom-right`}
                        >
                          <div className="header">
                            <span className="title">{item?.post?.title}</span>
                            <FavouriteIcon></FavouriteIcon>
                          </div>
                          <span className="description">
                            {item?.post?.dateCar} <hr></hr>
                            {item?.post?.km} km <hr></hr>
                            {item?.post?.fuel}
                            {item?.post?.numberBox}
                          </span>
                          <div className="middle">
                            <span className="price">
                              {formatNumberWithCommas(item?.post?.price)} đ
                            </span>
                            <span className="address">
                              <TopPostIcon></TopPostIcon> Tin ưu tiên <hr></hr>
                              {item?.post?.cityValueName}
                            </span>
                          </div>
                          <div className="footer">
                            <div className="user">
                              <div className="user-left">
                                <Image
                                  src="https://xe.chotot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2FclxH5MAniG0kUVnKN1c1tMwNrFmaqF0UUkuTmovdLWU%2Fpreset%3Ashopava%2Fplain%2F5f2af29c77500dd2140ba1030feed7f9-2812881885288510943.jpg&w=1920&q=75"
                                  alt=""
                                  width={24}
                                  height={24}
                                ></Image>
                                <div className="info-user">
                                  <span className="username">
                                    {item?.userInfo?.fullName}
                                  </span>
                                  <div className="sell">
                                    <span className="selled">
                                      {item?.userInfo?.selled} đã bán
                                    </span>
                                    <hr></hr>
                                    <span className="selling">
                                      {item?.userInfo?.selling} đang bán
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <button>
                                <ChatIcon width={20} height={20}></ChatIcon>
                                Chat
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "Cá nhân",
      children: <div className="tab-personal">Cá nhân</div>,
    },
    {
      key: "3",
      label: "Bán chuyên",
      children: <div className="tab-proffesional">Bán chuyên</div>,
    },
  ];
  return (
    <div className="wrapper-item-car">
      <Tabs defaultActiveKey="1" items={items} className="tab-ads" />
    </div>
  );
};
export default ItemCar;
