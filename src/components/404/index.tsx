import { Image } from "antd";

const NotFound = ({ text, text2 }: any) => {
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
      <span className="text">{text}</span>
      <Image
        src="https://static.chotot.com/storage/empty_state/desktop/404_error.png"
        width={400}
        height={200}
        alt=""
        preview={false}
        className="404"
      ></Image>
      <span className="text-2">{text2}</span>
    </div>
  );
};
export default NotFound;
