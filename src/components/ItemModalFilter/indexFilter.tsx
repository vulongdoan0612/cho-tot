import formatNumberWithCommas from "@/utils/formatMoneyWithDot";
import { DeleteFilterIcon } from "../CustomIcons";

const FilterBy = ({
  valueRadioModal,
  valueRadioBrandModal,
  date,
  dateMax,
  kmMin,
  kmMax,
  priceMin,
  priceMax,
  valueRadioNumberBox,
  valueRadioFuel,
  valueRadioColor,
  valueRadioCountry,
  valueRadioModel,
  valueRadioFormCar,
  valueRadioStatus,
  valueRadioUser,
  removeSit,
  removeBrand,
  removeDate,
  removeKm,
  removeNumberBox,
  removeFuel,
  removeColor,
  removeCountry,
  removeModel,
  removeFormCar,
  removeStatus,
  removeUser,
  removePrice,
}: any) => {
  return (
    <>
      {" "}
      {valueRadioModal ||
      valueRadioBrandModal ||
      date ||
      dateMax ||
      kmMin ||
      kmMax ||
      priceMin ||
      priceMax ||
      valueRadioNumberBox ||
      valueRadioFuel ||
      valueRadioColor ||
      valueRadioCountry ||
      valueRadioModel ||
      valueRadioFormCar ||
      valueRadioStatus ||
      valueRadioUser ? (
        <div className="filter-list">
          <div className="filter">
            <span className="filter-by">Lọc theo:</span>
            {valueRadioModal && (
              <span className="text" onClick={removeSit}>
                Số chỗ: {valueRadioModal} <DeleteFilterIcon></DeleteFilterIcon>
              </span>
            )}
            {valueRadioBrandModal && (
              <span className="text" onClick={removeBrand}>
                {valueRadioBrandModal} <DeleteFilterIcon></DeleteFilterIcon>
              </span>
            )}
            {date || dateMax ? (
              <span className="text" onClick={removeDate}>
                {dateMax ? "" : "Từ"}
                {date ? "" : "Đến"} Năm: {date} - {dateMax}
                <DeleteFilterIcon></DeleteFilterIcon>
              </span>
            ) : (
              <></>
            )}
            {kmMin || kmMax ? (
              <span className="text" onClick={removeKm}>
                {kmMax ? "" : "Từ"}
                {kmMin ? "" : "Đến"} {kmMin ? `${formatNumberWithCommas(kmMin)} km` : ""} {kmMin && kmMax ? " - " : ""}
                {kmMax ? `${formatNumberWithCommas(kmMax)} km` : ""}
                <DeleteFilterIcon></DeleteFilterIcon>
              </span>
            ) : (
              <></>
            )}{" "}
            {priceMin || priceMax ? (
              <span className="text" onClick={removePrice}>
                {priceMax ? "" : "Từ"}
                {priceMin ? "" : "Đến"} {priceMin ? `${formatNumberWithCommas(priceMin)} đ` : ""} {priceMin && priceMax ? " - " : ""}
                {priceMax ? `${formatNumberWithCommas(priceMax)} đ` : ""}
                <DeleteFilterIcon></DeleteFilterIcon>
              </span>
            ) : (
              <></>
            )}
            {valueRadioNumberBox && (
              <span className="text" onClick={removeNumberBox}>
                {valueRadioNumberBox} <DeleteFilterIcon></DeleteFilterIcon>
              </span>
            )}
            {valueRadioFuel && (
              <span className="text" onClick={removeFuel}>
                {valueRadioFuel} <DeleteFilterIcon></DeleteFilterIcon>
              </span>
            )}
            {valueRadioColor && (
              <span className="text" onClick={removeColor}>
                {valueRadioColor} <DeleteFilterIcon></DeleteFilterIcon>
              </span>
            )}
            {valueRadioCountry && (
              <span className="text" onClick={removeCountry}>
                {valueRadioCountry} <DeleteFilterIcon></DeleteFilterIcon>
              </span>
            )}{" "}
            {valueRadioModel && (
              <span className="text" onClick={removeModel}>
                {valueRadioModel} <DeleteFilterIcon></DeleteFilterIcon>
              </span>
            )}
            {valueRadioFormCar && (
              <span className="text" onClick={removeFormCar}>
                {valueRadioFormCar} <DeleteFilterIcon></DeleteFilterIcon>
              </span>
            )}
            {valueRadioStatus && (
              <span className="text" onClick={removeStatus}>
                {valueRadioStatus} <DeleteFilterIcon></DeleteFilterIcon>
              </span>
            )}{" "}
            {valueRadioUser && (
              <span className="text" onClick={removeUser}>
                {valueRadioUser} <DeleteFilterIcon></DeleteFilterIcon>
              </span>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default FilterBy;
