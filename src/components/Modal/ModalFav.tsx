import CustomModal from "../CustomModal";
import CustomButton from "../CustomButton";

const ModalFav = ({
  modalConfirmSwitchFav,
  handleCancleModalFav,
  activeIndices,
  handleAddFav,
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
          console.log(item, index);
          return (
            <button
              key={index}
              onClick={() => handleAddFav(index, item)}
              className={
                activeIndices.some((activeItem: any) => activeItem.id === index)
                  ? "active"
                  : ""
              }
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
