import { Image } from "antd";

const NullChat = () => {
  return (
    <div className="wrapper-not-found">
      <div className="top">
        <Image
          src="https://static.chotot.com/storage/marketplace/transparent_logo.png"
          alt=""
          width={165}
          height={60}
          preview={false}
        ></Image>
      </div>
      <span className="text">Bạn chưa có cuộc trò chuyện nào!</span>
      <Image
        src="https://static.chotot.com/storage/empty_state/desktop/404_error.png"
        width={400}
        height={200}
        alt=""
        preview={false}
        className="404"
      ></Image>
      <span className="text-2">Trải nghiệm chat để làm rõ thông tin về mặt hàng trước khi bắt đầu thực hiện mua bán</span>
    </div>
  );
};
export default NullChat;
