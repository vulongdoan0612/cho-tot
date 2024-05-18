import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const combineConversationSummary = (allConversation: any, allConversationSummary: any, account: any) => {
  return allConversation
    .map((convo: any) => {
      const summary = allConversationSummary.find((summary: any) => summary.idRoom === convo?.idRoom);
      let hidden = false;

      if (account?.user?._id === convo.userSend) {
        hidden = summary?.hiddenSend || false;
      } else if (account?.user?._id === convo.userReceive) {
        hidden = summary?.hiddenReceive || false;
      }

      // Ẩn data nếu hidden là true
      if (hidden) {
        return null;
      }

      return {
        ...convo,
        userReceivePop: summary ? summary.userReceivePop : null,
        userSendPop: summary ? summary.userSendPop : null,

        lastText: summary ? summary.lastText : null,
        lastTextToNow: summary ? summary.lastTextToNow : null,
      };
    })
    .filter((conversation: any) => conversation !== null);
};

export default combineConversationSummary;
