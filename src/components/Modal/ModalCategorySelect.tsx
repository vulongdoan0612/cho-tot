import { TextField } from "@mui/material";
import CustomModal from "../CustomModal";
import CustomButton from "../CustomButton";
import { DatePicker, Skeleton } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import dayjs from "dayjs";
import { ArrowInputIcon } from "../CustomIcons";
const ModalCategorySelect = ({
  modalCategory,
  handleCancleCategory,
  handleSelectCategory,
  category,
}: any) => {
  const trafficList = [
    "Ô tô",
    "Xe máy",
    "Xe tải, xe ben",
    "Xe điện",
    "Xe đạp",
    "Phương tiện khác",
    "Phụ tùng xe",
  ];
  return (
    <CustomModal
      title="Chọn danh mục"
      open={modalCategory}
      onCancel={handleCancleCategory}
      style={{ textAlign: "center", color: "white" }}
      centered
      className="modal-category-select"
    >
      <div className="select input-need-to-custom">
        {trafficList.map((item, index) => (
          <div
            key={index}
            onClick={(e) => handleSelectCategory(item, index)}
            className="select-item"
          >
            <span>{item}</span>
            <ArrowInputIcon></ArrowInputIcon>
          </div>
        ))}
      </div>
    </CustomModal>
  );
};
export default ModalCategorySelect;
