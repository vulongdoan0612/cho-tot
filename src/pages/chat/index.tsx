import { useFetchAllConversation } from "@/hooks/useFetchConversation";
import { useFetchAllConversationSummary } from "@/hooks/useFetchConversationSummary";
import Page from "@/layout/Page";
import { fetchAllConversation, fetchAllConversationSummary, fetchConversation } from "@/redux/reducers/chat";
import { formatDistanceToNow, parseISO } from "date-fns";
import { AppDispatch, RootState, store } from "@/redux/store";
import { getConversation, hiddenFalseMessage, hiddenMessage, postMessage } from "@/services/chat";
import formatISOToCustomDate from "@/utils/convertDate";
import formatISOToTime from "@/utils/convertTime";
import formatNumberWithCommas from "@/utils/formatMoneyWithDot";
import { limitTextDescription, limitTextTitle, limitTextTitle2, limitTextUserChat } from "@/utils/limitText";
import { MenuItem, Select } from "@mui/material";
import { Badge, Checkbox, Dropdown, Image, Input, MenuProps, Skeleton, Space, Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import useWebSocket from "react-use-websocket";
import { vi } from "date-fns/locale";
import { CloseIcon, HiddenEyeIcon, UserAvatarIcon, UserAvatarProfileIcon } from "@/components/CustomIcons";
import CustomButton from "@/components/CustomButton";
import combineConversationSummary from "@/hooks/useCombinedConversations";
import { useRouter } from "next/router";
import useDidMountEffect from "@/utils/customUseEffect";
import { fetchDataUser } from "@/redux/reducers/auth";
import { GetServerSideProps } from "next";

const { TextArea } = Input;

const Chat = () => {
  const { lastJsonMessage }: any = useWebSocket("ws://localhost:8085");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { allConversation, conversation, allConversationSummary } = useSelector((state: RootState) => state.chat);
  const { account, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const conversationRef: any = useRef(null);
  const [search, setSearch] = useState("");
  const [typeChat, setTypeChat] = useState("all");
  const [typeText, setTypeText] = useState("");
  const [hiddenChat, setHiddenChat] = useState(false);
  const [hiddenChatList, setHiddenChatList] = useState<any>([]);
  const [skeleton, setSkeleton] = useState(false);
  const [skeleton2, setSkeleton2] = useState(false);
  const [countHidden, setCountHidden] = useState(0);
  const [conversationFetched, setConversationFetched] = useState(false);

  useFetchAllConversation();
  useFetchAllConversationSummary();
  const formatTimeToNowInVietnamese = (isoDate: any) => {
    return formatDistanceToNow(parseISO(isoDate), { addSuffix: true, locale: vi });
  };

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.push("/login");
  //   }
  // }, [isAuthenticated, router]);
  useDidMountEffect(() => {
    if (router?.query?.currentRoom && allConversationSummary.length > 0 && !conversationFetched) {
      const currentChat = allConversationSummary.find((item: any) => item.postId === router.query.currentRoom);
      if (currentChat) {
        dispatch(fetchConversation({ idRoom: currentChat.idRoom }));
        setConversationFetched(true);
      }
    }
  }, [router?.query?.currentRoom, allConversationSummary, dispatch, conversationFetched]);
  useEffect(() => {
    if (lastJsonMessage?.idRoom === conversation.idRoom && lastJsonMessage?.action === "post-message") {
      dispatch(fetchConversation({ idRoom: conversation.idRoom }));
      dispatch(fetchAllConversationSummary({ typeChat: typeChat }));
      combineConversationSummary(allConversation, allConversationSummary, account);
    }
    if (lastJsonMessage?.idRoom !== conversation.idRoom && lastJsonMessage?.action === "post-message") {
      dispatch(fetchAllConversationSummary({ typeChat: typeChat }));
      combineConversationSummary(allConversation, allConversationSummary, account);
    }
    if (lastJsonMessage?.action === "create-room") {
      if (lastJsonMessage?.userSend === account?.user?._id || lastJsonMessage?.userReceive === account?.user?._id) {
        dispatch(fetchConversation({ idRoom: conversation.idRoom }));
        dispatch(fetchAllConversationSummary({ typeChat: typeChat }));
        combineConversationSummary(allConversation, allConversationSummary, account);
        dispatch(fetchAllConversation({ search: search, typeChat: typeChat }));
        setSkeleton(true);
        setTimeout(() => {
          setSkeleton(false);
        }, 200);
      }
    }
  }, [lastJsonMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messagesRoom?.message]);

  const handleSearchSit = (e: any) => {
    setSearch(e.target.value);
    dispatch(fetchAllConversation({ search: e.target.value, typeChat: typeChat }));
  };

  const scrollToBottom = () => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  };

  const handleTypeChange = (e: any) => {
    setTypeChat(e.target.value);
    dispatch(fetchAllConversation({ search: typeText, typeChat: e.target.value }));
    dispatch(fetchAllConversationSummary({ typeChat: e.target.value }));
    combineConversationSummary(allConversation, allConversationSummary, account);
    setSkeleton(true);
    setTimeout(() => {
      setSkeleton(false);
    }, 200);
  };

  const handleChangeText = (e: any) => {
    setTypeText(e.target.value);
  };

  const onEnter = async (e: any) => {
    if (e.key === "Enter") {
      const token = localStorage.getItem("access_token");
      try {
        const data = { text: typeText, idRoom: conversation.idRoom };
        await postMessage(String(token), data);
      } finally {
        setTypeText("");
      }
    }
  };

  const handleHidden = async () => {
    const accessToken = localStorage.getItem("access_token");
    const idRoom = {
      hiddenChatList,
    };
    await hiddenMessage(String(accessToken), idRoom);
    dispatch(fetchAllConversation({ search: typeText, typeChat: typeChat }));
    dispatch(fetchAllConversationSummary({ typeChat: typeChat }));
    combineConversationSummary(allConversation, allConversationSummary, account);
    setHiddenChat(false);
    setHiddenChatList([]);
    setCountHidden(0);
    setSkeleton(true);
    setTimeout(() => {
      setSkeleton(false);
    }, 200);
  };
  const handleSend = async () => {
    const token = localStorage.getItem("access_token");
    const data = { text: typeText, idRoom: conversation.idRoom };
    await postMessage(String(token), data);

    setTypeText("");
  };

  const handleSelectRoom = (item: any) => {
    if (hiddenChat) {
    }
    router.push(`/chat?currentRoom=${item.postId}`);
    dispatch(fetchConversation({ idRoom: item.idRoom }));
    setSkeleton2(true);
    setTimeout(() => {
      dispatch(fetchAllConversationSummary({ typeChat: typeChat }));
      setSkeleton2(false);
    }, 200);
  };
  const handleSendRec = async (e: any) => {
    const messageText = e.target.getAttribute("data-value");
    const token = localStorage.getItem("access_token");
    const data = { text: messageText, idRoom: conversation.idRoom };
    await postMessage(String(token), data);

    setTypeText("");
  };

  const handleHiddenChat = () => {
    setHiddenChat((prev) => !prev);
  };

  const onChangeHiddenChat = (e: any, item: any) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setHiddenChatList([...hiddenChatList, { idRoom: item.idRoom, userReceive: item.userReceive, userSend: item.userSend }]); // Thêm idRoom vào hiddenChatList

      setCountHidden(countHidden + 1);
    } else {
      setHiddenChatList(hiddenChatList.filter((roomId: string) => roomId !== item.idRoom)); // Loại bỏ idRoom khỏi hiddenChatList

      setCountHidden(countHidden - 1);
    }
  };

  const handleCloseHidden = () => {
    setHiddenChat(false);
    setCountHidden(0);
    setHiddenChatList([]);
  };
  const hiddenByDot = async () => {
    try {
      // setHiddenChatList([...hiddenChatList, { idRoom: item.idRoom, userReceive: item.userReceive, userSend: item.userSend }]);
      const accessToken = localStorage.getItem("access_token");
      await hiddenMessage(String(accessToken), {
        hiddenChatList: [{ idRoom: conversation.idRoom, userReceive: conversation.userReceive, userSend: conversation.userSend }],
      });
    } finally {
      setHiddenChat(false);
      dispatch(fetchAllConversation({ search: typeText, typeChat: typeChat }));
      dispatch(fetchAllConversationSummary(typeChat));
      combineConversationSummary(allConversation, allConversationSummary, account);
      setSkeleton(true);
      setTimeout(() => {
        setSkeleton(false);
      }, 200);
    }
  };
  const hiddenFalseByDot = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      await hiddenFalseMessage(String(accessToken), { idRoom: conversation.idRoom });
    } finally {
      dispatch(fetchAllConversation({ search: typeText, typeChat: typeChat }));
      dispatch(fetchAllConversationSummary(typeChat));
      combineConversationSummary(allConversation, allConversationSummary, account);
      setSkeleton(true);
      setTimeout(() => {
        setSkeleton(false);
      }, 200);
    }
  };
  const handleSeeProfile = () => {
    if (account?.user?._id === conversation.userReceive) {
      router.push(`/user/${conversation.userSend}`);
    } else {
      router.push(`/user/${conversation.userReceive}`);
    }
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <span className="check-profile" onClick={handleSeeProfile}>
          <UserAvatarIcon></UserAvatarIcon>Xem hồ sơ
        </span>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        <span className="check-profile">
          {(account?.user?._id === conversation.userReceive && conversation.hiddenReceive === true) ||
          (account?.user?._id === conversation.userSend && conversation.hiddenSend === true) ? (
            <div onClick={hiddenFalseByDot}>
              {" "}
              <HiddenEyeIcon></HiddenEyeIcon>Bỏ ẩn hội thoại
            </div>
          ) : (account?.user?._id === conversation.userReceive && conversation.hiddenReceive === false) ||
            (account?.user?._id === conversation.userSend && conversation.hiddenSend === false) ? (
            <div onClick={hiddenByDot}>
              {" "}
              <HiddenEyeIcon></HiddenEyeIcon>Ẩn hội thoại
            </div>
          ) : (
            <div onClick={hiddenByDot}>
              {" "}
              <HiddenEyeIcon></HiddenEyeIcon>Ẩn hội thoại
            </div>
          )}
          {/* {conversation?.hidden ? (
            <div onClick={hiddenFalseByDot}>
              {" "}
              <HiddenEyeIcon></HiddenEyeIcon>Bỏ ẩn hội thoại
            </div>
          ) : (
            <div onClick={hiddenByDot}>
              {" "}
              <HiddenEyeIcon></HiddenEyeIcon>Ẩn hội thoại
            </div>
          )} */}
        </span>
      ),
      key: "1",
    },
  ];
  const cancleSelect = () => {
    setHiddenChat(false);
    setHiddenChatList([]);
  };
  return (
    <Page style={{ backgroundColor: "#f4f4f4" }}>
      {allConversation.length > 0 || typeChat === "hidden" || typeChat === "all" ? (
        <div className="chat-wrapper">
          <div className="left">
            {hiddenChat ? (
              <div className="hidden-top">
                {" "}
                <Image
                  src="https://chat.chotot.com/icons/close.svg"
                  width={16}
                  height={16}
                  alt=""
                  preview={false}
                  onClick={handleCloseHidden}
                ></Image>{" "}
                Đã chọn <span className="count-hidden">({countHidden})</span>
              </div>
            ) : (
              <>
                <div className="search">
                  <Input placeholder="Nhập ít nhất 3 ký tự để bắt đầu tìm kiếm" onChange={handleSearchSit} value={search}></Input>
                </div>
                <div className="type">
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={typeChat}
                    defaultValue="all"
                    placeholder="Tất cả"
                    label="Tỉnh, Thành phố"
                    onChange={(event) => {
                      handleTypeChange(event);
                    }}
                  >
                    <MenuItem key={0} value="all">
                      Tất cả
                    </MenuItem>
                    <MenuItem key={1} value="hidden">
                      Tin nhắn đã ẩn
                    </MenuItem>
                  </Select>
                </div>
              </>
            )}
            {skeleton ? (
              <Skeleton.Input style={{ height: "506.5px", width: "372.39px" }} block={true} active size="large"></Skeleton.Input>
            ) : (
              <div className="list-room">
                {combineConversationSummary(allConversation, allConversationSummary, account).length > 0 ? (
                  <>
                    {" "}
                    {combineConversationSummary(allConversation, allConversationSummary, account)?.map((item: any, index: string) => {
                      const lastTextToNow = item.lastTextToNow ? formatTimeToNowInVietnamese(item.lastTextToNow) : "";
                      return (
                        <div className="item-room" key={index} onClick={() => handleSelectRoom(item)}>
                          <div className="left-item-room">
                            {hiddenChat ? <Checkbox onChange={(e) => onChangeHiddenChat(e, item)}></Checkbox> : <></>}
                            <div className="avatar">
                              <Badge
                                dot={
                                  account?.user?._id === item?.userSend?._id
                                    ? item.userReceivePop
                                    : account?.user?._id === item?.userReceive?._id
                                    ? item.userSendPop
                                    : item.userSendPop
                                }
                              >
                                <Image
                                  src={
                                    account?.user?._id === item?.userSend?._id
                                      ? item.userReceive?.avatar || "images/empty-avatar.jpg"
                                      : account?.user?._id === item?.userReceive?._id
                                      ? item.userSend?.avatar || "images/empty-avatar.jpg"
                                      : item.userSend?.avatar || "images/empty-avatar.jpg"
                                  }
                                  alt=""
                                  width={46}
                                  height={46}
                                  preview={false}
                                ></Image>
                              </Badge>
                            </div>
                            <div className="car-info">
                              <span className="username">
                                {account?.user?._id === item?.userSend?._id ? (
                                  <>{limitTextUserChat(item?.userReceive?.fullname)}</>
                                ) : account?.user?._id === item?.userSend?.id ? (
                                  <>{limitTextUserChat(item?.userSend?.fullname)}</>
                                ) : (
                                  <>{limitTextUserChat(item?.userSend?.fullname)}</>
                                )}
                                <span className="time"> - {lastTextToNow}</span>
                              </span>
                              <span className="descript">{limitTextTitle(item?.post?.title)}</span>
                              <span className="text">{item.lastText || "No messages yet"}</span>
                            </div>
                          </div>
                          <div className="car">
                            <Image src={item?.post?.image[0]?.img} width={60} height={60} alt="" preview={false}></Image>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div className="null-chat">Không có đoạn chat nào</div>
                )}
              </div>
            )}

            {hiddenChat || typeChat === "hidden" ? (
              <>
                {countHidden > 0 ? (
                  <div className="hidden-option">
                    <CustomButton onClick={cancleSelect}>Hủy</CustomButton>
                    <CustomButton onClick={handleHidden}>Ẩn</CustomButton>
                  </div>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                {combineConversationSummary(allConversation, allConversationSummary, account).length > 0 ? (
                  <div className="hidden-chat">
                    <button onClick={handleHiddenChat}>
                      <HiddenEyeIcon></HiddenEyeIcon>Ẩn hội thoại
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
          <div className="right">
            {conversation.length === 0 ? (
              <div className="null-room">
                <Image src="https://chat.chotot.com/emptyRoom2.png" alt="" width={400} height={320} preview={false}></Image>
                <span>Mẹo! Chat giúp làm sáng tỏ thêm thông tin, tăng hiệu quả mua bán</span>
              </div>
            ) : (
              <>
                <div className="top">
                  <div className="header">
                    <div className="user-info">
                      {skeleton2 ? (
                        <Skeleton.Input style={{ height: "30px", width: "129px" }} block={true} active size="large"></Skeleton.Input>
                      ) : (
                        <>
                          <Image
                            src={
                              account?.user?._id === conversation?.userSend?._id
                                ? conversation?.userSendInfo?.avatar || "images/empty-avatar.jpg"
                                : account?.user?._id === conversation?.userReceiveInfo?._id
                                ? conversation?.userReceiveInfo?.avatar || "images/empty-avatar.jpg"
                                : conversation?.userReceiveInfo?.avatar || "images/empty-avatar.jpg"
                            }
                            alt=""
                            width={30}
                            height={30}
                            preview={false}
                          ></Image>
                          {account?.user?._id === conversation.userReceive ? (
                            <>{conversation?.userSendInfo?.fullName}</>
                          ) : (
                            <>{conversation?.userReceiveInfo?.fullName}</>
                          )}
                        </>
                      )}
                    </div>
                    <Dropdown menu={{ items }} trigger={["click"]} className="dropdown-chat">
                      <a onClick={(e) => e.preventDefault()}>
                        <Space>
                          <Image
                            src="https://chat.chotot.com/icons/moreVertical.svg"
                            alt=""
                            width={24}
                            height={57}
                            preview={false}
                            style={{ cursor: "pointer" }}
                          ></Image>
                        </Space>
                      </a>
                    </Dropdown>
                  </div>
                  <div className="car-info">
                    {skeleton2 ? (
                      <Skeleton.Input style={{ height: "50px", width: "129px" }} block={true} active size="large"></Skeleton.Input>
                    ) : (
                      <>
                        <Image
                          src={conversation?.formPostChecks[0]?.post?.image[0]?.img}
                          alt=""
                          width={50}
                          height={50}
                          preview={false}
                        ></Image>
                        <div className="car-price">
                          <span>{limitTextTitle2(conversation?.formPostChecks[0]?.post?.title)}</span>
                          <span>{formatNumberWithCommas(conversation?.formPostChecks[0]?.post?.price)} đ</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="middle" ref={conversationRef}>
                  {skeleton2 ? (
                    <Skeleton.Input style={{ height: "430px", width: "558" }} block={true} active size="large"></Skeleton.Input>
                  ) : (
                    <>
                      {conversation?.messagesRoom?.message?.map((item: any, index: number) => {
                        return (
                          <>
                            {item?.firstTextDate !== null ? (
                              <div className="date-message">{formatISOToCustomDate(item.firstTextDate)}</div>
                            ) : (
                              ""
                            )}
                            <span key={index} className={`text-message ${item?.userId === account?.user?._id ? "send" : "receive"}`}>
                              <span>{item.text}</span>
                              <span className="time">{formatISOToTime(item.time)}</span>
                            </span>
                          </>
                        );
                      })}
                    </>
                  )}
                </div>
                <div className="bottom">
                  <div className="recommend">
                    <ul>
                      <li onClick={(e) => handleSendRec(e)} data-value={"Xe này còn không ạ?"}>
                        Xe này còn không ạ?
                      </li>
                      <li onClick={(e) => handleSendRec(e)} data-value={"Xe chính chủ hay được uỷ quyền ạ?"}>
                        Xe chính chủ hay được uỷ quyền ạ?
                      </li>
                      <li onClick={(e) => handleSendRec(e)} data-value={"Giá xe có thể thương lượng được không ạ?"}>
                        Giá xe có thể thương lượng được không ạ?
                      </li>
                      <li onClick={(e) => handleSendRec(e)} data-value={"Xe có còn bảo hiểm không?"}>
                        Xe có còn bảo hiểm không?
                      </li>
                      <li onClick={(e) => handleSendRec(e)} data-value={"Xe đã qua bao nhiêu đời chủ?"}>
                        Xe đã qua bao nhiêu đời chủ?
                      </li>
                      <li onClick={(e) => handleSendRec(e)} data-value={"Tình trạng sửa chữa như thế nào?"}>
                        Tình trạng sửa chữa như thế nào?
                      </li>
                      <li onClick={(e) => handleSendRec(e)} data-value={"Xe đã đi được bao nhiêu KM rồi ạ?"}>
                        Xe đã đi được bao nhiêu KM rồi ạ?
                      </li>
                      <li onClick={(e) => handleSendRec(e)} data-value={"Có hỗ trợ vay ngân hàng không bạn?"}>
                        Có hỗ trợ vay ngân hàng không bạn?
                      </li>
                      <li onClick={(e) => handleSendRec(e)} data-value={"Mình ra hãng kiểm tra xe được không?"}>
                        Mình ra hãng kiểm tra xe được không?
                      </li>
                      <li onClick={(e) => handleSendRec(e)} data-value={"Gọi video xem xe được không bạn?"}>
                        Gọi video xem xe được không bạn?
                      </li>
                    </ul>
                  </div>
                  <div className="send-text">
                    <TextArea
                      placeholder="Nhập tin nhắn"
                      value={typeText}
                      autoSize
                      onChange={(e) => handleChangeText(e)}
                      onKeyDown={onEnter}
                    />
                    {typeText !== "" ? (
                      <Image
                        src="https://static.chotot.com/storage/chotot-icons/svg/send-orange.svg"
                        width={25}
                        height={20}
                        preview={false}
                        alt=""
                        onClick={handleSend}
                      ></Image>
                    ) : (
                      <Image
                        src="https://static.chotot.com/storage/chotot-icons/svg/send-gray.svg"
                        width={25}
                        height={20}
                        preview={false}
                        alt=""
                      ></Image>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="back-main">
          <div className="type">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={typeChat}
              defaultValue="all"
              placeholder="Tất cả"
              label="Tỉnh, Thành phố"
              onChange={(event) => {
                handleTypeChange(event);
              }}
            >
              <MenuItem key={0} value="all">
                Tất cả
              </MenuItem>
              <MenuItem key={1} value="hidden">
                Tin nhắn đã ẩn
              </MenuItem>
            </Select>
          </div>
          <Image src="https://chat.chotot.com/emptyState.svg" width={252} height={180} preview={false} alt="">
            {" "}
          </Image>
          <h5>Bạn chưa có cuộc trò chuyện nào!</h5>
          <p>Trải nghiệm chat để làm rõ thông tin về mặt hàng trước khi bắt đầu thực hiện mua bán</p>
          <a href="/">
            <CustomButton>Về trang chủ</CustomButton>
          </a>
        </div>
      )}
    </Page>
  );
};


export default Chat;
