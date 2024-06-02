import { TextField } from "@mui/material";
import CustomModal from "../CustomModal";
import CustomButton from "../CustomButton";
import { DatePicker } from "antd";

const ModalCCCCD = ({
  modalConfirmSwitchCCCD,
  handleCancleModalCCCD,
  handleCCCD,
  onChangeDate,
  handleLocation,
  onFinishCCCD,
  location,
  date,
  fillCCCD,
  fillCCCDFor,
  fillCCCDLocation,
  cccd,
}: any) => {
  return (
    <CustomModal
      title="CMND/ CCCD/ HỘ CHIẾU"
      open={modalConfirmSwitchCCCD}
      onCancel={handleCancleModalCCCD}
      style={{ textAlign: "center", color: "white" }}
      centered
      className="modal-cccd"
    >
      <div className="cccd input-need-to-custom">
        <TextField
          className="fullname"
          id="filled-multiline-flexible"
          label="CMND/ CCCD/ Hộ Chiếu"
          multiline
          value={cccd}
          onChange={handleCCCD}
          maxRows={4}
          variant="filled"
        />
        {fillCCCD && <span className="warning">Vui lòng nhập CMND/ CCCD/ Hộ Chiếu</span>}
      </div>
      <div className="date input-need-to-custom">
        <DatePicker onChange={onChangeDate} placeholder={"Ngày cấp"} value={date} />
        {fillCCCDFor && <span className="warning">Vui lòng nhập ngày cấp</span>}
      </div>{" "}
      <div className="date-release input-need-to-custom">
        <TextField
          className="release"
          id="filled-multiline-flexible"
          label="Nơi cấp"
          multiline
          value={location}
          onChange={handleLocation}
          maxRows={4}
          variant="filled"
        />
        {fillCCCDLocation && <span className="warning">Vui lòng nhập nơi cấp</span>}
      </div>
      <CustomButton type="submit" onClick={onFinishCCCD} style={{ marginTop: "8px" }}>
        Xong
      </CustomButton>
    </CustomModal>
  );
};
export default ModalCCCCD;
