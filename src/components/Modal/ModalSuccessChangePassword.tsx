import CustomModal from "../CustomModal";
import CustomButton from "../CustomButton";
import { Image } from "antd";

const ModalSuccessChangePassword = ({
  modalPassword,
  handleCancleModalPassword,
  onFinishPassword,
}: any) => {
  return (
    <CustomModal
      title=""
      closable={false}
      open={modalPassword}
      onCancel={handleCancleModalPassword}
      style={{ textAlign: "center", color: "white" }}
      centered
      className="modal-change-password"
    >
      <div className="contain">
        <Image
          src="/images/password_success.png"
          width={64}
          height={88.5}
          alt=""
        ></Image>
        <h1>Đổi mật khẩu mới thành công</h1>
        <span>Giờ đây bạn đã có thể đăng nhập Chợ Tốt với mật khẩu mới.</span>
      </div>
      <CustomButton
        type="submit"
        className="button-finish"
        onClick={onFinishPassword}
        style={{ marginTop: "8px" }}
      >
        Đăng Nhập
      </CustomButton>
    </CustomModal>
  );
};
export default ModalSuccessChangePassword;
