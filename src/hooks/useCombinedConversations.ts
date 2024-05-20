import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const combineConversationSummary = (allConversation: any, allConversationSummary: any, account: any) => {
  const combinedConversations = allConversationSummary.map((summary:any) => {
    const convo = allConversation.find((convo:any) => convo?.idRoom === summary.idRoom);
    let hidden = false;

    if (account?.user?._id === convo?.userSend) {
      hidden = summary?.hiddenSend || false;
    } else if (account?.user?._id === convo?.userReceive) {
      hidden = summary?.hiddenReceive || false;
    }

    // Ẩn data nếu hidden là true
    if (hidden) {
      return null;
    }

    return {
      ...convo,
      userReceivePop: summary?.userReceivePop,
      userSendPop: summary?.userSendPop,
      lastText: summary?.lastText,
      lastTextToNow: summary?.lastTextToNow,
    };
  });

  return combinedConversations.filter((conversation: any) => conversation !== null);
};

export default combineConversationSummary;
