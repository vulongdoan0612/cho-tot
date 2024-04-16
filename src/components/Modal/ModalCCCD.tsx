import { TextField } from "@mui/material";
import CustomModal from "../CustomModal";
import CustomButton from "../CustomButton";
import { DatePicker, Skeleton } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import dayjs from "dayjs";
const ModalCCCCD = ({
  modalConfirmSwitchCCCD,
  handleCancleModalCCCD,
  handleCCCD,
  onChangeDate,
  handleLocation,
  onFinishCCCD,
  location,
  date,
  cccd,
}: any) => {
  const { account } = useSelector((state: RootState) => state.auth);
  const { countdownDuration, loading } = useSelector(
    (state: RootState) => state.countDownLoading
  );
  return (
    <CustomModal
      title="CMND/ CCCD/ HỘ CHIẾU"
      open={modalConfirmSwitchCCCD}
      onCancel={handleCancleModalCCCD}
      style={{ textAlign: "center", color: "white" }}
      centered
      className="modal-cccd"
    >
      {loading ? (
        <Skeleton.Input block={true} active size="large"></Skeleton.Input>
      ) : (
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
        </div>
      )}
      <div className="date input-need-to-custom">
        <DatePicker
          onChange={onChangeDate}
          placeholder={"Ngày cấp"}
          value={dayjs(date)}
        />
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
      </div>
      <CustomButton
        type="submit"
        onClick={onFinishCCCD}
        style={{ marginTop: "8px" }}
      >
        Xong
      </CustomButton>
    </CustomModal>
  );
};
export default ModalCCCCD;
