import { Image, Skeleton, Spin, Tabs, TabsProps } from "antd";
import { AddedFavouritePostIcon, ChatIcon, FavouriteIcon, TopPostIcon } from "../CustomIcons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import formatNumberWithCommas from "@/utils/formatMoneyWithDot";
import { useRouter } from "next/router";
import { useFetchFavListMain } from "@/hooks/useFetchFavListMain";
import { addFavPost, removeFavPost } from "@/services/favPost";
import { fetchDataFavListMain } from "@/redux/reducers/posts";
import { createConversation } from "@/services/chat";
import timeAgo from "@/utils/timeAgo";
import Link from "next/link";
import { useEffect, useState } from "react";

const ItemCar = ({ posts, spin, handleChangeTab, postBy, activeKey }: any) => {
  const router = useRouter();
  const { account } = useSelector((state: RootState) => state.auth);
  const { favPostListMain } = useSelector((state: RootState) => state.postsData);
  const [spinFirst, setSpinFirst] = useState(true);
  const dispatch: AppDispatch = useDispatch();
  useFetchFavListMain();
  useEffect(() => {
    if (posts.status === "SUCCESS") {
      setSpinFirst(false);
    }
  }, [posts]);
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
  const handleChat = async (postId: any) => {
    const accessToken: any = localStorage.getItem("access_token");
    const data = {
      postId: postId,
    };
    const res = await createConversation(accessToken, data);

    if (res.status === 200) {
      router.push(`/chat?currentRoom=${postId}`);
    }
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Tất cả",
      children: (
        <>
          {spinFirst ? (
            <Spin spinning={spinFirst}></Spin>
          ) : (
            <div className="tab-all-type">
              <div className="wrapper-tabs">
                {posts?.total > 0 ? (
                  <>
                    {posts &&
                      posts?.data?.map((item: any, index: number) => {
                        const isFavorite = favPostListMain?.favPost?.postFavList?.some((favItem: any) => favItem.postId === item.postId);
                        return (
                          <div className="tab" key={index}>
                            {item?.prioritize === "15.71" || item?.prioritize === "26.51" ? (
                              <div className="contain-prioritize">
                                <Skeleton.Button block active></Skeleton.Button>
                                <Link href={`/${item?.post?.slug}/${item?.postId}`}>
                                  <div
                                    className={`${spin ? "unhidden" : "hidden"} skeleton-custom image-gallery`}
                                    // onClick={() => handleRouter(item)}
                                  >
                                    <Image
                                      className={"left-contain-tab"}
                                      src={item?.post?.image[0]?.img}
                                      preview={false}
                                      alt=""
                                      width={365.19}
                                      height={222}
                                    ></Image>
                                    <div className="image-gallery-right">
                                      {" "}
                                      <Image
                                        className={"left-contain-tab"}
                                        src={item?.post?.image[1]?.img}
                                        preview={false}
                                        alt=""
                                        width={242.78}
                                        height={109}
                                      ></Image>{" "}
                                      <Image
                                        className={"left-contain-tab"}
                                        src={item?.post?.image[2]?.img}
                                        preview={false}
                                        alt=""
                                        width={119.39}
                                        height={109}
                                      ></Image>{" "}
                                      <div className="last-img">
                                        <Image
                                          className={"left-contain-tab"}
                                          src={item?.post?.image[3]?.img}
                                          preview={false}
                                          alt=""
                                          width={119.39}
                                          height={109}
                                        ></Image>
                                        <div className="background">+{item.post.image.length - 4}</div>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                                <div className="right-contain-tab">
                                  <Skeleton active />
                                  <div className={`${spin ? "unhidden" : "hidden"} skeleton-custom-right`}>
                                    <Link href={`/${item?.post?.slug}/${item?.postId}`}>
                                      <div
                                        className="header"
                                        // onClick={() => handleRouter(item)}
                                      >
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
                                    </Link>
                                    <Link href={`/${item?.post?.slug}/${item?.postId}`}>
                                      <span
                                        className="description"
                                        // onClick={() => handleRouter(item)}
                                      >
                                        {item?.post?.dateCar}
                                        {item?.post?.km === 0 ? (
                                          <></>
                                        ) : (
                                          <>
                                            {" "}
                                            <hr></hr>
                                            {formatNumberWithCommas(item?.post?.km)} km
                                          </>
                                        )}
                                        <hr></hr>
                                        {item?.post?.fuel}
                                        {item?.post?.numberBox}
                                      </span>
                                    </Link>
                                    <Link href={`/${item?.post?.slug}/${item?.postId}`}>
                                      <div
                                        className="middle"
                                        // onClick={() => handleRouter(item)}
                                      >
                                        <span className="price">{formatNumberWithCommas(item?.post?.price)} đ</span>
                                        <span className="address">
                                          {item?.prioritize === "26.51" ? (
                                            <span
                                              style={{ fontWeight: "600", display: "flex", alignItems: "center", alignContent: "stretch" }}
                                            >
                                              {" "}
                                              <TopPostIcon></TopPostIcon> Tin nổi bật + Đẩy tin
                                            </span>
                                          ) : item?.prioritize === "14.73" ? (
                                            <span
                                              style={{ fontWeight: "600", display: "flex", alignItems: "center", alignContent: "stretch" }}
                                            >
                                              <TopPostIcon></TopPostIcon> Đẩy tin thường
                                            </span>
                                          ) : item?.prioritize === "15.71" ? (
                                            <span
                                              style={{ fontWeight: "600", display: "flex", alignItems: "center", alignContent: "stretch" }}
                                            >
                                              {" "}
                                              <TopPostIcon></TopPostIcon> Tin nổi bật - Nhiều hình ảnh
                                            </span>
                                          ) : (
                                            <>{timeAgo(item?.date)}</>
                                          )}
                                          <hr></hr>
                                          {item?.post?.cityValueName}
                                        </span>
                                      </div>
                                    </Link>
                                    <div className="footer">
                                      <div className="user">
                                        <Link href={`/${item?.post?.slug}/${item?.postId}`}>
                                          <div
                                            className="user-left"
                                            // onClick={() => handleRouter(item)}
                                          >
                                            <Image
                                              src={item?.userInfo?.avatar === null ? "/images/empty-avatar.jpg" : item?.userInfo?.avatar}
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
                                        </Link>
                                        {item?.userId !== account?.user?._id ? (
                                          <button onClick={() => handleChat(item?.postId)}>
                                            <ChatIcon width={20} height={20}></ChatIcon>
                                            Chat
                                          </button>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="contain">
                                <Skeleton.Button block active></Skeleton.Button>
                                <div
                                  className={`${spin ? "unhidden" : "hidden"} skeleton-custom`}
                                  // onClick={() => handleRouter(item)}
                                >
                                  <Link href={`/${item?.post?.slug}/${item?.postId}`}>
                                    <Image
                                      className={"left-contain-tab"}
                                      src={item?.post?.image[0]?.img}
                                      alt=""
                                      width={128}
                                      height={128}
                                    ></Image>
                                  </Link>
                                </div>
                                <div className="right-contain-tab">
                                  <Skeleton active />
                                  <div className={`${spin ? "unhidden" : "hidden"} skeleton-custom-right`}>
                                    <Link href={`/${item?.post?.slug}/${item?.postId}`}>
                                      <div
                                        className="header"
                                        // onClick={() => handleRouter(item)}
                                      >
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
                                    </Link>
                                    <Link href={`/${item?.post?.slug}/${item?.postId}`}>
                                      <span
                                        className="description"
                                        // onClick={() => handleRouter(item)}
                                      >
                                        {item?.post?.dateCar}
                                        {item?.post?.km === 0 ? (
                                          <></>
                                        ) : (
                                          <>
                                            {" "}
                                            <hr></hr>
                                            {formatNumberWithCommas(item?.post?.km)} km
                                          </>
                                        )}
                                        <hr></hr>
                                        {item?.post?.fuel}
                                        {item?.post?.numberBox}
                                      </span>
                                    </Link>
                                    <Link href={`/${item?.post?.slug}/${item?.postId}`}>
                                      <div
                                        className="middle"
                                        // onClick={() => handleRouter(item)}
                                      >
                                        <span className="price">{formatNumberWithCommas(item?.post?.price)} đ</span>
                                        <span className="address">
                                          {item?.prioritize === "26.51" ? (
                                            <span
                                              style={{ fontWeight: "600", display: "flex", alignItems: "center", alignContent: "stretch" }}
                                            >
                                              {" "}
                                              <TopPostIcon></TopPostIcon> Tin nổi bật + Đẩy tin
                                            </span>
                                          ) : item?.prioritize === "14.73" ? (
                                            <span
                                              style={{ fontWeight: "600", display: "flex", alignItems: "center", alignContent: "stretch" }}
                                            >
                                              <TopPostIcon></TopPostIcon> Đẩy tin thường
                                            </span>
                                          ) : item?.prioritize === "15.71" ? (
                                            <span
                                              style={{ fontWeight: "600", display: "flex", alignItems: "center", alignContent: "stretch" }}
                                            >
                                              {" "}
                                              <TopPostIcon></TopPostIcon> Tin nổi bật - Nhiều hình ảnh
                                            </span>
                                          ) : (
                                            <>{timeAgo(item?.date)}</>
                                          )}
                                          <hr></hr>
                                          {item?.post?.cityValueName}
                                        </span>
                                      </div>
                                    </Link>
                                    <div className="footer">
                                      <div className="user">
                                        <Link href={`/${item?.post?.slug}/${item?.postId}`}>
                                          <div
                                            className="user-left"
                                            // onClick={() => handleRouter(item)}
                                          >
                                            <Image
                                              src={item?.userInfo?.avatar === null ? "/images/empty-avatar.jpg" : item?.userInfo?.avatar}
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
                                        </Link>
                                        {item?.userId !== account?.user?._id ? (
                                          <button onClick={() => handleChat(item?.postId)}>
                                            <ChatIcon width={20} height={20}></ChatIcon>
                                            Chat
                                          </button>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </>
                ) : (
                  <div className="null-post" style={{ paddingTop: "20px" }}>
                    <Image
                      src="https://static.chotot.com/storage/ads-dashboard/svg/empty-frame.svg"
                      alt=""
                      width={308}
                      height={200}
                      preview={false}
                    ></Image>
                    <span className="title">Không tìm thấy tin đăng</span>
                    <span className="desc">Hiện tại không có tin đăng nào cho trạng thái lọc này</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      ),
    },
    {
      key: "2",
      label: "Cá nhân",
      children: (
        <div className="tab-all-type">
          <div className="wrapper-tabs">
            {posts?.total > 0 ? (
              <>
                {posts &&
                  posts?.data?.map((item: any, index: number) => {
                    const isFavorite = favPostListMain?.favPost?.postFavList?.some((favItem: any) => favItem.postId === item.postId);
                    return (
                      <div className="tab" key={index}>
                        {item?.prioritize === "15.71" || item?.prioritize === "26.51" ? (
                          <div className="contain-prioritize">
                            <Skeleton.Button block active></Skeleton.Button>
                            <Link href={`/${item?.post?.slug}/${item?.postId}`}>
                              <div
                                className={`${spin ? "unhidden" : "hidden"} skeleton-custom image-gallery`}
                                // onClick={() => handleRouter(item)}
                              >
                                <Image
                                  className={"left-contain-tab"}
                                  src={item?.post?.image[0]?.img}
                                  preview={false}
                                  alt=""
                                  width={365.19}
                                  height={222}
                                ></Image>
                                <div className="image-gallery-right">
                                  {" "}
                                  <Image
                                    className={"left-contain-tab"}
                                    src={item?.post?.image[1]?.img}
                                    preview={false}
                                    alt=""
                                    width={242.78}
                                    height={109}
                                  ></Image>{" "}
                                  <Image
                                    className={"left-contain-tab"}
                                    src={item?.post?.image[2]?.img}
                                    preview={false}
                                    alt=""
                                    width={119.39}
                                    height={109}
                                  ></Image>{" "}
                                  <div className="last-img">
                                    <Image
                                      className={"left-contain-tab"}
                                      src={item?.post?.image[3]?.img}
                                      preview={false}
                                      alt=""
                                      width={119.39}
                                      height={109}
                                    ></Image>
                                    <div className="background">+{item.post.image.length - 4}</div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                            <div className="right-contain-tab">
                              <Skeleton active />
                              <div className={`${spin ? "unhidden" : "hidden"} skeleton-custom-right`}>
                                <Link href={`/${item?.post?.slug}/${item?.postId}`}>
                                  <div
                                    className="header"
                                    // onClick={() => handleRouter(item)}
                                  >
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
                                </Link>
                                <Link href={`/${item?.post?.slug}/${item?.postId}`}>
                                  <span
                                    className="description"
                                    // onClick={() => handleRouter(item)}
                                  >
                                    {item?.post?.dateCar}
                                    {item?.post?.km === 0 ? (
                                      <></>
                                    ) : (
                                      <>
                                        {" "}
                                        <hr></hr>
                                        {formatNumberWithCommas(item?.post?.km)} km
                                      </>
                                    )}
                                    <hr></hr>
                                    {item?.post?.fuel}
                                    {item?.post?.numberBox}
                                  </span>
                                </Link>
                                <Link href={`/${item?.post?.slug}/${item?.postId}`}>
                                  <div
                                    className="middle"
                                    // onClick={() => handleRouter(item)}
                                  >
                                    <span className="price">{formatNumberWithCommas(item?.post?.price)} đ</span>
                                    <span className="address">
                                      {item?.prioritize === "26.51" ? (
                                        <span style={{ fontWeight: "600", display: "flex", alignItems: "center", alignContent: "stretch" }}>
                                          {" "}
                                          <TopPostIcon></TopPostIcon> Tin nổi bật + Đẩy tin
                                        </span>
                                      ) : item?.prioritize === "14.73" ? (
                                        <span style={{ fontWeight: "600", display: "flex", alignItems: "center", alignContent: "stretch" }}>
                                          <TopPostIcon></TopPostIcon> Đẩy tin thường
                                        </span>
                                      ) : item?.prioritize === "15.71" ? (
                                        <span style={{ fontWeight: "600", display: "flex", alignItems: "center", alignContent: "stretch" }}>
                                          {" "}
                                          <TopPostIcon></TopPostIcon> Tin nổi bật - Nhiều hình ảnh
                                        </span>
                                      ) : (
                                        <>{timeAgo(item?.date)}</>
                                      )}
                                      <hr></hr>
                                      {item?.post?.cityValueName}
                                    </span>
                                  </div>
                                </Link>
                                <div className="footer">
                                  <div className="user">
                                    <Link href={`/${item?.post?.slug}/${item?.postId}`}>
                                      <div
                                        className="user-left"
                                        // onClick={() => handleRouter(item)}
                                      >
                                        <Image
                                          src={item?.userInfo?.avatar === null ? "/images/empty-avatar.jpg" : item?.userInfo?.avatar}
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
                                    </Link>
                                    {item?.userId !== account?.user?._id ? (
                                      <button onClick={() => handleChat(item?.postId)}>
                                        <ChatIcon width={20} height={20}></ChatIcon>
                                        Chat
                                      </button>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="contain">
                            <Skeleton.Button block active></Skeleton.Button>
                            <div
                              className={`${spin ? "unhidden" : "hidden"} skeleton-custom`}
                              // onClick={() => handleRouter(item)}
                            >
                              <Link href={`/${item?.post?.slug}/${item?.postId}`}>
                                <Image
                                  className={"left-contain-tab"}
                                  src={item?.post?.image[0]?.img}
                                  alt=""
                                  width={128}
                                  height={128}
                                ></Image>
                              </Link>
                            </div>
                            <div className="right-contain-tab">
                              <Skeleton active />
                              <div className={`${spin ? "unhidden" : "hidden"} skeleton-custom-right`}>
                                <Link href={`/${item?.post?.slug}/${item?.postId}`}>
                                  <div
                                    className="header"
                                    // onClick={() => handleRouter(item)}
                                  >
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
                                </Link>
                                <Link href={`/${item?.post?.slug}/${item?.postId}`}>
                                  <span
                                    className="description"
                                    // onClick={() => handleRouter(item)}
                                  >
                                    {item?.post?.dateCar}
                                    {item?.post?.km === 0 ? (
                                      <></>
                                    ) : (
                                      <>
                                        {" "}
                                        <hr></hr>
                                        {formatNumberWithCommas(item?.post?.km)} km
                                      </>
                                    )}
                                    <hr></hr>
                                    {item?.post?.fuel}
                                    {item?.post?.numberBox}
                                  </span>
                                </Link>
                                <Link href={`/${item?.post?.slug}/${item?.postId}`}>
                                  <div
                                    className="middle"
                                    // onClick={() => handleRouter(item)}
                                  >
                                    <span className="price">{formatNumberWithCommas(item?.post?.price)} đ</span>
                                    <span className="address">
                                      {item?.prioritize === "26.51" ? (
                                        <span style={{ fontWeight: "600", display: "flex", alignItems: "center", alignContent: "stretch" }}>
                                          {" "}
                                          <TopPostIcon></TopPostIcon> Tin nổi bật + Đẩy tin
                                        </span>
                                      ) : item?.prioritize === "14.73" ? (
                                        <span style={{ fontWeight: "600", display: "flex", alignItems: "center", alignContent: "stretch" }}>
                                          <TopPostIcon></TopPostIcon> Đẩy tin thường
                                        </span>
                                      ) : item?.prioritize === "15.71" ? (
                                        <span style={{ fontWeight: "600", display: "flex", alignItems: "center", alignContent: "stretch" }}>
                                          {" "}
                                          <TopPostIcon></TopPostIcon> Tin nổi bật - Nhiều hình ảnh
                                        </span>
                                      ) : (
                                        <>{timeAgo(item?.date)}</>
                                      )}
                                      <hr></hr>
                                      {item?.post?.cityValueName}
                                    </span>
                                  </div>
                                </Link>
                                <div className="footer">
                                  <div className="user">
                                    <Link href={`/${item?.post?.slug}/${item?.postId}`}>
                                      <div
                                        className="user-left"
                                        // onClick={() => handleRouter(item)}
                                      >
                                        <Image
                                          src={item?.userInfo?.avatar === null ? "/images/empty-avatar.jpg" : item?.userInfo?.avatar}
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
                                    </Link>
                                    {item?.userId !== account?.user?._id ? (
                                      <button onClick={() => handleChat(item?.postId)}>
                                        <ChatIcon width={20} height={20}></ChatIcon>
                                        Chat
                                      </button>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </>
            ) : (
              <div className="null-post" style={{ paddingTop: "20px" }}>
                <Image
                  src="https://static.chotot.com/storage/ads-dashboard/svg/empty-frame.svg"
                  alt=""
                  width={308}
                  height={200}
                  preview={false}
                ></Image>
                <span className="title">Không tìm thấy tin đăng</span>
                <span className="desc">Hiện tại không có tin đăng nào cho trạng thái lọc này</span>
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "3",
      label: "Bán chuyên",
      children: (
        <div className="tab-all-type">
          <div className="wrapper-tabs">
            {posts?.total > 0 ? (
              <>
                {posts &&
                  posts?.data?.map((item: any, index: number) => {
                    const isFavorite = favPostListMain?.favPost?.postFavList?.some((favItem: any) => favItem.postId === item.postId);
                    return (
                      <div className="tab" key={index}>
                        {item?.prioritize === "15.71" || item?.prioritize === "26.51" ? (
                          <div className="contain-prioritize">
                            <Skeleton.Button block active></Skeleton.Button>
                            <Link href={`/${item?.post?.slug}/${item?.postId}`}>
                              <div
                                className={`${spin ? "unhidden" : "hidden"} skeleton-custom image-gallery`}
                                // onClick={() => handleRouter(item)}
                              >
                                <Image
                                  className={"left-contain-tab"}
                                  src={item?.post?.image[0]?.img}
                                  preview={false}
                                  alt=""
                                  width={365.19}
                                  height={222}
                                ></Image>
                                <div className="image-gallery-right">
                                  {" "}
                                  <Image
                                    className={"left-contain-tab"}
                                    src={item?.post?.image[1]?.img}
                                    preview={false}
                                    alt=""
                                    width={242.78}
                                    height={109}
                                  ></Image>{" "}
                                  <Image
                                    className={"left-contain-tab"}
                                    src={item?.post?.image[2]?.img}
                                    preview={false}
                                    alt=""
                                    width={119.39}
                                    height={109}
                                  ></Image>{" "}
                                  <div className="last-img">
                                    <Image
                                      className={"left-contain-tab"}
                                      src={item?.post?.image[3]?.img}
                                      preview={false}
                                      alt=""
                                      width={119.39}
                                      height={109}
                                    ></Image>
                                    <div className="background">+{item.post.image.length - 4}</div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                            <div className="right-contain-tab">
                              <Skeleton active />
                              <div className={`${spin ? "unhidden" : "hidden"} skeleton-custom-right`}>
                                <Link href={`/${item?.post?.slug}/${item?.postId}`}>
                                  <div
                                    className="header"
                                    // onClick={() => handleRouter(item)}
                                  >
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
                                </Link>
                                <Link href={`/${item?.post?.slug}/${item?.postId}`}>
                                  <span
                                    className="description"
                                    // onClick={() => handleRouter(item)}
                                  >
                                    {item?.post?.dateCar}
                                    {item?.post?.km === 0 ? (
                                      <></>
                                    ) : (
                                      <>
                                        {" "}
                                        <hr></hr>
                                        {formatNumberWithCommas(item?.post?.km)} km
                                      </>
                                    )}
                                    <hr></hr>
                                    {item?.post?.fuel}
                                    {item?.post?.numberBox}
                                  </span>
                                </Link>
                                <Link href={`/${item?.post?.slug}/${item?.postId}`}>
                                  <div
                                    className="middle"
                                    // onClick={() => handleRouter(item)}
                                  >
                                    <span className="price">{formatNumberWithCommas(item?.post?.price)} đ</span>
                                    <span className="address">
                                      {item?.prioritize === "26.51" ? (
                                        <span style={{ fontWeight: "600", display: "flex", alignItems: "center", alignContent: "stretch" }}>
                                          {" "}
                                          <TopPostIcon></TopPostIcon> Tin nổi bật + Đẩy tin
                                        </span>
                                      ) : item?.prioritize === "14.73" ? (
                                        <span style={{ fontWeight: "600", display: "flex", alignItems: "center", alignContent: "stretch" }}>
                                          <TopPostIcon></TopPostIcon> Đẩy tin thường
                                        </span>
                                      ) : item?.prioritize === "15.71" ? (
                                        <span style={{ fontWeight: "600", display: "flex", alignItems: "center", alignContent: "stretch" }}>
                                          {" "}
                                          <TopPostIcon></TopPostIcon> Tin nổi bật - Nhiều hình ảnh
                                        </span>
                                      ) : (
                                        <>{timeAgo(item?.date)}</>
                                      )}
                                      <hr></hr>
                                      {item?.post?.cityValueName}
                                    </span>
                                  </div>
                                </Link>
                                <div className="footer">
                                  <div className="user">
                                    <Link href={`/${item?.post?.slug}/${item?.postId}`}>
                                      <div
                                        className="user-left"
                                        // onClick={() => handleRouter(item)}
                                      >
                                        <Image
                                          src={item?.userInfo?.avatar === null ? "/images/empty-avatar.jpg" : item?.userInfo?.avatar}
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
                                    </Link>
                                    {item?.userId !== account?.user?._id ? (
                                      <button onClick={() => handleChat(item?.postId)}>
                                        <ChatIcon width={20} height={20}></ChatIcon>
                                        Chat
                                      </button>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="contain">
                            <Skeleton.Button block active></Skeleton.Button>
                            <div
                              className={`${spin ? "unhidden" : "hidden"} skeleton-custom`}
                              // onClick={() => handleRouter(item)}
                            >
                              <Link href={`/${item?.post?.slug}/${item?.postId}`}>
                                <Image
                                  className={"left-contain-tab"}
                                  src={item?.post?.image[0]?.img}
                                  alt=""
                                  width={128}
                                  height={128}
                                ></Image>
                              </Link>
                            </div>
                            <div className="right-contain-tab">
                              <Skeleton active />
                              <div className={`${spin ? "unhidden" : "hidden"} skeleton-custom-right`}>
                                <Link href={`/${item?.post?.slug}/${item?.postId}`}>
                                  <div
                                    className="header"
                                    // onClick={() => handleRouter(item)}
                                  >
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
                                </Link>
                                <Link href={`/${item?.post?.slug}/${item?.postId}`}>
                                  <span
                                    className="description"
                                    // onClick={() => handleRouter(item)}
                                  >
                                    {item?.post?.dateCar}
                                    {item?.post?.km === 0 ? (
                                      <></>
                                    ) : (
                                      <>
                                        {" "}
                                        <hr></hr>
                                        {formatNumberWithCommas(item?.post?.km)} km
                                      </>
                                    )}
                                    <hr></hr>
                                    {item?.post?.fuel}
                                    {item?.post?.numberBox}
                                  </span>
                                </Link>
                                <Link href={`/${item?.post?.slug}/${item?.postId}`}>
                                  <div
                                    className="middle"
                                    // onClick={() => handleRouter(item)}
                                  >
                                    <span className="price">{formatNumberWithCommas(item?.post?.price)} đ</span>
                                    <span className="address">
                                      {item?.prioritize === "26.51" ? (
                                        <span style={{ fontWeight: "600", display: "flex", alignItems: "center", alignContent: "stretch" }}>
                                          {" "}
                                          <TopPostIcon></TopPostIcon> Tin nổi bật + Đẩy tin
                                        </span>
                                      ) : item?.prioritize === "14.73" ? (
                                        <span style={{ fontWeight: "600", display: "flex", alignItems: "center", alignContent: "stretch" }}>
                                          <TopPostIcon></TopPostIcon> Đẩy tin thường
                                        </span>
                                      ) : item?.prioritize === "15.71" ? (
                                        <span style={{ fontWeight: "600", display: "flex", alignItems: "center", alignContent: "stretch" }}>
                                          {" "}
                                          <TopPostIcon></TopPostIcon> Tin nổi bật - Nhiều hình ảnh
                                        </span>
                                      ) : (
                                        <>{timeAgo(item?.date)}</>
                                      )}
                                      <hr></hr>
                                      {item?.post?.cityValueName}
                                    </span>
                                  </div>
                                </Link>
                                <div className="footer">
                                  <div className="user">
                                    <Link href={`/${item?.post?.slug}/${item?.postId}`}>
                                      <div
                                        className="user-left"
                                        // onClick={() => handleRouter(item)}
                                      >
                                        <Image
                                          src={item?.userInfo?.avatar === null ? "/images/empty-avatar.jpg" : item?.userInfo?.avatar}
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
                                    </Link>
                                    {item?.userId !== account?.user?._id ? (
                                      <button onClick={() => handleChat(item?.postId)}>
                                        <ChatIcon width={20} height={20}></ChatIcon>
                                        Chat
                                      </button>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </>
            ) : (
              <div className="null-post" style={{ paddingTop: "20px" }}>
                <Image
                  src="https://static.chotot.com/storage/ads-dashboard/svg/empty-frame.svg"
                  alt=""
                  width={308}
                  height={200}
                  preview={false}
                ></Image>
                <span className="title">Không tìm thấy tin đăng</span>
                <span className="desc">Hiện tại không có tin đăng nào cho trạng thái lọc này</span>
              </div>
            )}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="wrapper-item-car">
      <Tabs items={items} activeKey={activeKey} onChange={handleChangeTab} className="tab-ads" />
    </div>
  );
};
export default ItemCar;
