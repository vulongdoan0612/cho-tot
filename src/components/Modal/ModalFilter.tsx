import { Radio, RadioChangeEvent } from "antd";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  DeleteFilterIcon,
} from "../CustomIcons";
import CustomModal from "../CustomModal";
import { useEffect, useState } from "react";
import brandList from "../RenderFormTraffic/carList.json";
import formCar from "../RenderFormTraffic/formCar.json";
import { TextField } from "@mui/material";
import { onlyNumbers } from "@/utils/onlyNumbers";
import CustomButton from "../CustomButton";
import ModalListFilter from "../ModalListFilter/ModalListFilter";

const ModalFilter = ({ handleCancleModal, openModal }: any) => {
  const dataSitAll = [2, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, "Khác"];
  const dataColor = [
    "Trắng",
    "Đen",
    "Bạc",
    "Cam",
    "Đỏ",
    "Xanh",
    "Vàng",
    "Hồng",
    "Xám",
    "Nâu",
    "Màu khác",
  ];
  const dataCountry = [
    "Việt Nam",
    "Ấn Độ",
    "Hàn Quốc",
    "Thái Lan",
    "Nhật Bản",
    "Trung Quốc",
    "Mỹ",
    "Đức",
    "Đài Loan",
    "Nước khác",
  ];
  const [valueRadioAll, setValueRadioAll] = useState("");
  const [valueRadioAllBrand, setValueRadioAllBrand] = useState("");
  const [valueRadioAllColor, setValueRadioAllColor] = useState("");
  const [valueRadioAllCountry, setValueRadioAllCountry] = useState("");
  const [valueRadioAllModel, setValueRadioAllModel] = useState("");
  const [valueRadioAllFormCar, setValueRadioAllFormCar] = useState("");

  const [valueRadio, setValueRadio] = useState("");
  const [valueRadioFormCar, setValueRadioFormCar] = useState("");
  const [valueRadioCountry, setValueRadioCountry] = useState("");

  const [modalListAll, setModalListAll] = useState(false);

  const [valueRadioStatus, setValueRadioStatus] = useState("");

  const [valueRadioUser, setValueRadioUser] = useState("");

  const [valueRadioFuel, setValueRadioFuel] = useState("");
  const [valueRadioColor, setValueRadioColor] = useState("");
  const [valueRadioModel, setValueRadioModel] = useState("");

  const [valueRadioNumberBox, setValueRadioNumberBox] = useState("");

  const [date, setDate] = useState("");
  const [dateMax, setDateMax] = useState("");

  const [kmMin, setKmMin] = useState("");
  const [kmMax, setKmMax] = useState("");

  const [valueRadioBrand, setValueRadioBrand] = useState("");
  const [models, setModels] = useState<any>([]);
  const [hidden, setHidden] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const handleCancleModalListAll = () => {
    setModalListAll(false);
    setHidden(false);
  };
  const handleModalListAll = (type: string) => {
    try {
      setTypeModal(type);
      setHidden(true);
    } finally {
      setModalListAll(true);
    }
  };
  const onChangeRadio = (e: RadioChangeEvent) => {
    setValueRadioAll(e.target.value);
    setValueRadio(e.target.value);
  };
  const onChangeRadioBrand = (e: any) => {
    setValueRadioBrand(e.target.value);
    const filterModel = brandList.filter(
      (item) => item.brand === e.target.value
    );
    setValueRadioAllBrand(e.target.value);

    setModels(filterModel);
  };

  const onChangeRadioFormCar = (e: RadioChangeEvent) => {
    setValueRadioFormCar(e.target.value);
    setValueRadioAllFormCar(e.target.value);
  };
  const onChangeRadioCountry = (e: RadioChangeEvent) => {
    setValueRadioCountry(e.target.value);
    setValueRadioAllCountry(e.target.value);
  };
  const onChangeRadioStatus = (e: RadioChangeEvent) => {
    setValueRadioStatus(e.target.value);
  };
  const onChangeRadioUser = (e: RadioChangeEvent) => {
    setValueRadioUser(e.target.value);
  };
  const onChangeRadioColor = (e: RadioChangeEvent) => {
    setValueRadioColor(e.target.value);
    setValueRadioAllColor(e.target.value);
  };
  const onChangeRadioModel = (e: RadioChangeEvent) => {
    setValueRadioModel(e.target.value);
    setValueRadioAllModel(e.target.value);
  };
  const onChangeRadioFuel = (e: RadioChangeEvent) => {
    setValueRadioFuel(e.target.value);
  };
  const onChangeRadioNumberBox = (e: RadioChangeEvent) => {
    setValueRadioNumberBox(e.target.value);
  };
  const handleChangeMin = (event: any) => {
    if (onlyNumbers(event.target.value) || event.target.value === "") {
      setDate(event.target.value);
    }
  };
  const handleChangeMax = (event: any) => {
    if (onlyNumbers(event.target.value) || event.target.value === "") {
      setDateMax(event.target.value);
    }
  };
  const handleChangeKmMin = (event: any) => {
    if (onlyNumbers(event.target.value) || event.target.value === "") {
      setKmMin(event.target.value);
    }
  };
  const handleChangeKmMax = (event: any) => {
    if (onlyNumbers(event.target.value) || event.target.value === "") {
      setKmMax(event.target.value);
    }
  };

  const removeSit = () => {
    setValueRadio("");
  };
  const removeBrand = () => {
    setValueRadioBrand("");
  };
  const removeDate = () => {
    setDate("");
    setDateMax("");
  };

  const removeKm = () => {
    setKmMax("");
    setKmMin("");
  };
  const removeNumberBox = () => {
    setValueRadioNumberBox("");
  };
  const removeFuel = () => {
    setValueRadioFuel("");
  };
  const removeColor = () => {
    setValueRadioColor("");
  };
  const removeCountry = () => {
    setValueRadioCountry("");
  };
  const removeModel = () => {
    setValueRadioModel("");
  };
  const removeFormCar = () => {
    setValueRadioFormCar("");
  };
  const removeStatus = () => {
    setValueRadioStatus("");
  };
  const removeUser = () => {
    setValueRadioUser("");
  };
  const handleRenew = () => {
    setValueRadio("");
    setValueRadioAll("");
    setValueRadioBrand("");
    setDate("");
    setDateMax("");
    setKmMax("");
    setKmMin("");
    setValueRadioNumberBox("");
    setValueRadioFuel("");
    setValueRadioColor("");
    setValueRadioCountry("");
    setValueRadioModel("");
    setValueRadioFormCar("");
    setValueRadioStatus("");
    setValueRadioUser("");
  };
  const handleApply = () => {
    console.log(
      valueRadio,
      valueRadioAll,
      valueRadioBrand,
      date,
      dateMax,
      kmMax,
      kmMin,
      valueRadioNumberBox,
      valueRadioFuel,
      valueRadioColor,
      valueRadioCountry,
      valueRadioModel,
      valueRadioFormCar,
      valueRadioStatus,
      valueRadioUser
    );
  };
  return (
    <CustomModal
      className={`wrapper-modal-filter ${
        hidden ? "hidden-wrapper-modal-filter" : ""
      }`}
      title="Lọc nâng cao"
      open={openModal}
      onCancel={handleCancleModal}
      centered
    >
      <div className="wrapper-content">
        <div className="sit">
          <div className="header">
            <span>Số chỗ</span>
            <ArrowDownIcon></ArrowDownIcon>
          </div>
          <div className="body">
            <Radio.Group value={valueRadio} onChange={onChangeRadio}>
              {valueRadio === "" ||
              dataSitAll.slice(0, 5).includes(valueRadio) ? (
                dataSitAll.slice(0, 5).map((item, index) => (
                  <Radio value={item} key={index}>
                    {" "}
                    <span className="brand-name">{item}</span>
                  </Radio>
                ))
              ) : (
                <>
                  <Radio value={valueRadio} key={valueRadio}>
                    <span className="brand-name">{valueRadio}</span>
                  </Radio>
                  {dataSitAll.slice(0, 4).map((item, index) => (
                    <Radio value={item} key={index}>
                      {" "}
                      <span className="brand-name">{item}</span>
                    </Radio>
                  ))}
                </>
              )}
            </Radio.Group>
          </div>
          <span className="see-all" onClick={() => handleModalListAll("sit")}>
            Xem tất cả số chỗ <ArrowRightIcon></ArrowRightIcon>
          </span>
        </div>
        <div className="sit">
          <div className="header">
            <span>Hãng xe</span>
            <ArrowDownIcon></ArrowDownIcon>
          </div>
          <div className="body">
            <Radio.Group value={valueRadioBrand} onChange={onChangeRadioBrand}>
              {valueRadioBrand === "" ||
              brandList
                .slice(0, 5)
                .some((item) => item.brand === valueRadioBrand) ? (
                <>
                  {" "}
                  {brandList.slice(0, 5).map((item) => {
                    return (
                      <Radio value={item.brand} key={item.brand}>
                        {" "}
                        <span className="brand-name">{item.brand}</span>
                      </Radio>
                    );
                  })}
                </>
              ) : (
                <>
                  <Radio value={valueRadioBrand} key={valueRadioBrand}>
                    <span className="brand-name">{valueRadioBrand}</span>
                  </Radio>
                  {brandList.slice(0, 4).map((item) => {
                    return (
                      <Radio value={item.brand} key={item.brand}>
                        {" "}
                        <span className="brand-name">{item.brand}</span>
                      </Radio>
                    );
                  })}
                </>
              )}
            </Radio.Group>
          </div>
          <span className="see-all" onClick={() => handleModalListAll("brand")}>
            Xem tất cả hãng xe <ArrowRightIcon></ArrowRightIcon>
          </span>
        </div>
        <div className="sit">
          <div className="header">
            <span>Năm sản xuất</span>
            <ArrowDownIcon></ArrowDownIcon>
          </div>
          <div className="date-produce">
            <div className="body input-need-to-custom">
              <TextField
                type="number"
                label="Năm sản xuất tối thiểu"
                multiline
                onChange={handleChangeMin}
                value={date}
                maxRows={1}
                variant="filled"
              />
            </div>
            -
            <div className="body input-need-to-custom">
              <TextField
                type="number"
                label="Năm sản xuất tối đa"
                multiline
                onChange={handleChangeMax}
                value={dateMax}
                maxRows={1}
                variant="filled"
              />
            </div>
          </div>
        </div>
        <div className="sit">
          <div className="header">
            <span>Số km đã đi</span>
            <ArrowDownIcon></ArrowDownIcon>
          </div>
          <div className="date-produce">
            <div className="body input-need-to-custom">
              <TextField
                type="number"
                label="Số km đã đi tối thiểu"
                multiline
                onChange={handleChangeKmMin}
                value={kmMin}
                maxRows={1}
                variant="filled"
              />
            </div>
            -
            <div className="body input-need-to-custom">
              <TextField
                type="number"
                label="Số km đã đi tối đa"
                multiline
                onChange={handleChangeKmMax}
                value={kmMax}
                maxRows={1}
                variant="filled"
              />
            </div>
          </div>
        </div>
        <div className="sit">
          <div className="header">
            <span>Hộp số</span>
            <ArrowDownIcon></ArrowDownIcon>
          </div>
          <div className="body">
            <Radio.Group
              value={valueRadioNumberBox}
              onChange={onChangeRadioNumberBox}
            >
              <Radio value="Tự động">
                {" "}
                <span className="brand-name">Tự động</span>
              </Radio>
              <Radio value="Số sàn">
                {" "}
                <span className="brand-name">Số sàn</span>
              </Radio>
              <Radio value="Bán tự động">
                {" "}
                <span className="brand-name">Bán tự động</span>
              </Radio>
            </Radio.Group>
          </div>
        </div>
        <div className="sit">
          <div className="header">
            <span>Nhiên liệu</span>
            <ArrowDownIcon></ArrowDownIcon>
          </div>
          <div className="body">
            <Radio.Group value={valueRadioFuel} onChange={onChangeRadioFuel}>
              <Radio value="Xăng">
                {" "}
                <span className="brand-name">Xăng</span>
              </Radio>
              <Radio value="Dấu">
                {" "}
                <span className="brand-name">Dấu</span>
              </Radio>
              <Radio value="Động cơ Hybrid">
                {" "}
                <span className="brand-name">Động cơ Hybrid</span>
              </Radio>
              <Radio value="Điện">
                {" "}
                <span className="brand-name">Điện</span>
              </Radio>
            </Radio.Group>
          </div>
        </div>
        <div className="sit">
          <div className="header">
            <span>Màu sắc</span>
            <ArrowDownIcon></ArrowDownIcon>
          </div>
          <div className="body">
            <Radio.Group value={valueRadioColor} onChange={onChangeRadioColor}>
              {valueRadioColor === "" ||
              dataColor.slice(0, 5).includes(valueRadioColor) ? (
                dataColor.slice(0, 5).map((item, index) => (
                  <Radio value={item} key={index}>
                    {" "}
                    <span className="brand-name">{item}</span>
                  </Radio>
                ))
              ) : (
                <>
                  <Radio value={valueRadioColor} key={valueRadioColor}>
                    <span className="brand-name">{valueRadioColor}</span>
                  </Radio>
                  {dataColor.slice(0, 4).map((item, index) => (
                    <Radio value={item} key={index}>
                      {" "}
                      <span className="brand-name">{item}</span>
                    </Radio>
                  ))}
                </>
              )}
            </Radio.Group>
          </div>
          <span className="see-all" onClick={() => handleModalListAll("color")}>
            Xem tất cả màu sắc <ArrowRightIcon></ArrowRightIcon>
          </span>
        </div>
        <div className="sit">
          <div className="header">
            <span>Xuất xứ</span>
            <ArrowDownIcon></ArrowDownIcon>
          </div>
          <div className="body">
            <Radio.Group
              value={valueRadioCountry}
              onChange={onChangeRadioCountry}
            >
              {valueRadioCountry === "" ||
              dataCountry.slice(0, 5).includes(valueRadioCountry) ? (
                dataCountry.slice(0, 5).map((item, index) => (
                  <Radio value={item} key={index}>
                    {" "}
                    <span className="brand-name">{item}</span>
                  </Radio>
                ))
              ) : (
                <>
                  <Radio value={valueRadioCountry} key={valueRadioCountry}>
                    <span className="brand-name">{valueRadioCountry}</span>
                  </Radio>
                  {dataCountry.slice(0, 4).map((item, index) => (
                    <Radio value={item} key={index}>
                      {" "}
                      <span className="brand-name">{item}</span>
                    </Radio>
                  ))}
                </>
              )}
            </Radio.Group>
          </div>
          <span
            className="see-all"
            onClick={() => handleModalListAll("country")}
          >
            Xem tất cả xuất xứ<ArrowRightIcon></ArrowRightIcon>
          </span>
        </div>
        {valueRadioBrand && (
          <div className="sit">
            <div className="header">
              <span>Dòng xe</span>
              <ArrowDownIcon></ArrowDownIcon>
            </div>
            <div className="body">
              <Radio.Group
                value={valueRadioModel}
                onChange={onChangeRadioModel}
              >
                {/* {models[0].models.slice(0, 5).map((item: any, index: any) => {
                  return (
                    <Radio value={item} key={index}>
                      {" "}
                      <span className="brand-name">{item}</span>
                    </Radio>
                  );
                })} */}
                {valueRadioModel === "" ||
                models[0].models
                  .slice(0, 5)
                  .some((item: any) => item === valueRadioModel) ? (
                  <>
                    {" "}
                    {models[0].models.slice(0, 5).map((item: any) => {
                      return (
                        <Radio value={item} key={item}>
                          {" "}
                          <span className="brand-name">{item}</span>
                        </Radio>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <Radio value={valueRadioModel} key={valueRadioModel}>
                      <span className="brand-name">{valueRadioModel}</span>
                    </Radio>
                    {models[0].models.slice(0, 5).map((item: any) => {
                      return (
                        <Radio value={item} key={item}>
                          {" "}
                          <span className="brand-name">{item}</span>
                        </Radio>
                      );
                    })}
                  </>
                )}
              </Radio.Group>
            </div>
            <span
              className="see-all"
              onClick={() => handleModalListAll("model")}
            >
              Xem tất cả dòng xe <ArrowRightIcon></ArrowRightIcon>
            </span>
          </div>
        )}
        <div className="sit">
          <div className="header">
            <span>Kiểu dáng</span>
            <ArrowDownIcon></ArrowDownIcon>
          </div>
          <div className="body">
            <Radio.Group
              value={valueRadioFormCar}
              onChange={onChangeRadioFormCar}
            >
              {valueRadioFormCar === "" ||
              formCar.slice(0, 5).includes(valueRadioFormCar) ? (
                formCar.slice(0, 5).map((item, index) => (
                  <Radio value={item} key={index}>
                    {" "}
                    <span className="brand-name">{item}</span>
                  </Radio>
                ))
              ) : (
                <>
                  <Radio value={valueRadioFormCar} key={valueRadioFormCar}>
                    <span className="brand-name">{valueRadioFormCar}</span>
                  </Radio>
                  {formCar.slice(0, 4).map((item, index) => (
                    <Radio value={item} key={index}>
                      {" "}
                      <span className="brand-name">{item}</span>
                    </Radio>
                  ))}
                </>
              )}
            </Radio.Group>
          </div>
          <span
            className="see-all"
            onClick={() => handleModalListAll("formCar")}
          >
            Xem tất cả kiểu dáng <ArrowRightIcon></ArrowRightIcon>
          </span>
        </div>
        <div className="sit">
          <div className="header">
            <span>Tình trạng</span>
            <ArrowDownIcon></ArrowDownIcon>
          </div>
          <div className="body">
            <Radio.Group
              value={valueRadioStatus}
              onChange={onChangeRadioStatus}
            >
              <Radio value="Đã sử dụng">
                {" "}
                <span className="brand-name">Đã sử dụng</span>
              </Radio>{" "}
              <Radio value="Mới">
                {" "}
                <span className="brand-name">Mới</span>
              </Radio>
            </Radio.Group>
          </div>
        </div>
        <div className="sit">
          <div className="header">
            <span>Đăng bởi</span>
            <ArrowDownIcon></ArrowDownIcon>
          </div>
          <div className="body">
            <Radio.Group value={valueRadioUser} onChange={onChangeRadioUser}>
              <Radio value="Cá nhân">
                {" "}
                <span className="brand-name">Cá nhân</span>
              </Radio>
              <Radio value="Bán chuyên">
                {" "}
                <span className="brand-name">Bán chuyên</span>
              </Radio>
              <Radio value="Đối Tác Chợ Tốt">
                {" "}
                <span className="brand-name">Đối Tác Chợ Tốt</span>
              </Radio>
            </Radio.Group>
          </div>
        </div>
      </div>
      {valueRadio ||
      valueRadioBrand ||
      date ||
      dateMax ||
      kmMin ||
      kmMax ||
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
            {valueRadio && (
              <span className="text" onClick={removeSit}>
                Số chỗ: {valueRadio} <DeleteFilterIcon></DeleteFilterIcon>
              </span>
            )}
            {valueRadioBrand && (
              <span className="text" onClick={removeBrand}>
                {valueRadioBrand} <DeleteFilterIcon></DeleteFilterIcon>
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
                {kmMin ? "" : "Đến"} {kmMin ? `${kmMin} km` : ""} -{" "}
                {kmMax ? `${kmMax} km` : ""}
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

      <div className="wrapper-filter">
        <div className="buttons">
          <CustomButton onClick={handleRenew}>Xóa lọc</CustomButton>
          <CustomButton onClick={handleApply}>Áp dụng</CustomButton>
        </div>
      </div>
      <ModalListFilter
        title="Số chỗ"
        modalListAll={modalListAll}
        handleCancleModal={handleCancleModalListAll}
        data={
          typeModal === "sit"
            ? dataSitAll
            : typeModal === "brand"
            ? brandList
            : typeModal === "color"
            ? dataColor
            : typeModal === "country"
            ? dataCountry
            : typeModal === "model"
            ? models[0].models
            : typeModal === "formCar"
            ? formCar
            : ""
        }
        setValueRadio={
          typeModal === "sit"
            ? setValueRadio
            : typeModal === "brand"
            ? setValueRadioBrand
            : typeModal === "color"
            ? setValueRadioColor
            : typeModal === "country"
            ? setValueRadioCountry
            : typeModal === "model"
            ? setValueRadioModel
            : typeModal === "formCar"
            ? setValueRadioFormCar
            : setValueRadio
        }
        typeModal={typeModal}
        setValueRadioAll={
          typeModal === "sit"
            ? setValueRadioAll
            : typeModal === "brand"
            ? setValueRadioAllBrand
            : typeModal === "color"
            ? setValueRadioAllColor
            : typeModal === "country"
            ? setValueRadioAllCountry
            : typeModal === "model"
            ? setValueRadioAllModel
            : typeModal === "formCar"
            ? setValueRadioAllFormCar
            : setValueRadioAll
        }
        valueRadioAll={
          typeModal === "sit"
            ? valueRadioAll
            : typeModal === "brand"
            ? valueRadioAllBrand
            : typeModal === "color"
            ? valueRadioAllColor
            : typeModal === "country"
            ? valueRadioAllCountry
            : typeModal === "model"
            ? valueRadioAllModel
            : typeModal === "formCar"
            ? valueRadioAllFormCar
            : valueRadioAll
        }
      ></ModalListFilter>
    </CustomModal>
  );
};
export default ModalFilter;
