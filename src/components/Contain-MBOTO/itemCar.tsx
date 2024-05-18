import { Image, Skeleton, Tabs, TabsProps } from "antd";
import { AddedFavouritePostIcon, ChatIcon, FavouriteIcon, TopPostIcon } from "../CustomIcons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import formatNumberWithCommas from "@/utils/formatMoneyWithDot";
import { useRouter } from "next/router";
import { useFetchFavListMain } from "@/hooks/useFetchFavListMain";
import { addFavPost, removeFavPost } from "@/services/favPost";
import { fetchDataFavListMain, fetchDataPosts } from "@/redux/reducers/posts";
import useWebSocket from "react-use-websocket";
import { useEffect } from "react";

const ItemCar = ({ posts, spin }: any) => {
  const router = useRouter();
  const { favPostListMain } = useSelector((state: RootState) => state.postsData);
  const dispatch: AppDispatch = useDispatch();

  useFetchFavListMain();

  const handleRouter = (item: any) => {
    router.push(`/${item?.post?.slug}/${item?.postId}`);
  };
  
  const handleRemoveFavPost = async (postId: string) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const updateField = {
        postId: postId,
      };
      try {
        await removeFavPost(String(token), updateField);
      } finally {
        dispatch(fetchDataFavListMain());
      }
    }
  };

  const handleAddFavPost = async (postId: string) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const updateField = {
        postId: postId,
      };
      try {
        await addFavPost(String(token), updateField);
      } finally {
        dispatch(fetchDataFavListMain());
      }
    }
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Tất cả",
      children: (
        <div className="tab-all-type">
          <div className="wrapper-tabs">
            {posts &&
              posts?.data?.map((item: any, index: number) => {
                const isFavorite = favPostListMain?.favPost?.postFavList?.some((favItem: any) => favItem.postId === item.postId);
                return (
                  <div className="tab" key={index} onClick={() => handleRouter(item)}>
                    <div className="contain">
                      <Skeleton.Button block active></Skeleton.Button>
                      <div className={`${spin ? "unhidden" : "hidden"} skeleton-custom`}>
                        <Image className={"left-contain-tab"} src={item?.post?.image[0]?.img} alt="" width={128} height={128}></Image>
                      </div>
                      <div className="right-contain-tab">
                        <Skeleton active />
                        <div className={`${spin ? "unhidden" : "hidden"} skeleton-custom-right`}>
                          <div className="header">
                            <span className="title">{item?.post?.title}</span>
                            {isFavorite ? (
                              <div className="add-fav">
                                <AddedFavouritePostIcon
                                  onClick={() => handleRemoveFavPost(item?.postId)}
                                  className="fav"
                                ></AddedFavouritePostIcon>
                              </div>
                            ) : (
                              <FavouriteIcon onClick={() => handleAddFavPost(item?.postId)}></FavouriteIcon>
                            )}
                          </div>
                          <span className="description">
                            {item?.post?.dateCar} <hr></hr>
                            {item?.post?.km} km <hr></hr>
                            {item?.post?.fuel}
                            {item?.post?.numberBox}
                          </span>
                          <div className="middle">
                            <span className="price">{formatNumberWithCommas(item?.post?.price)} đ</span>
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
                                  <span className="username">{item?.userInfo?.fullName}</span>
                                  <div className="sell">
                                    <span className="selled">{item?.userInfo?.selled} đã bán</span>
                                    <hr></hr>
                                    <span className="selling">{item?.userInfo?.selling} đang bán</span>
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
