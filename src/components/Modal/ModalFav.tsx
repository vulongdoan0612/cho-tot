import CustomModal from "../CustomModal";
import CustomButton from "../CustomButton";
import CustomButtonSelect from "../CustomButtonSelect";

const ModalFav = ({
  modalConfirmSwitchFav,
  handleCancleModalFav,
  handleAddFav,
  selectedItemFav,
  dataFav,
  onFinishFav,
}: any) => {
  return (
    <CustomModal
      title="DANH MỤC YÊU THÍCH"
      open={modalConfirmSwitchFav}
      onCancel={handleCancleModalFav}
      style={{ textAlign: "center", color: "white" }}
      centered
      className="modal-fav"
    >
      <div className="fav-wrapper">
        {dataFav.map((item: string, index: number) => {
          return (
            <button
              key={index}
              onClick={() => handleAddFav(index, item)}
              className={selectedItemFav.includes(item) ? "active" : ""}
            >
              {item}
            </button>
          );
        })}
      </div>
      <CustomButton
        type="submit"
        onClick={onFinishFav}
        style={{ marginTop: "8px" }}
      >
        Xong
      </CustomButton>
    </CustomModal>
  );
};
export default ModalFav;
