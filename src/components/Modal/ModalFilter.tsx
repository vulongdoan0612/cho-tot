"use client";

import { Radio, RadioChangeEvent } from "antd";
import { ArrowDownIcon } from "../CustomIcons";
import CustomModal from "../CustomModal";
import { useEffect, useState } from "react";
import brandList from "../RenderFormTraffic/carList.json";
import formCar from "../RenderFormTraffic/formCar.json";
import carSit from "../RenderFormTraffic/carSit.json";

import { TextField } from "@mui/material";
import { onlyNumbers } from "@/utils/onlyNumbers";
import CustomButton from "../CustomButton";
import ModalListFilter from "../ModalListFilter/ModalListFilter";
import ItemModalFilterBrand from "../ItemModalFilter/indexBrands";
import ItemModalFilterSits from "../ItemModalFilter/indexSits";
import ItemModalFilterModels from "../ItemModalFilter/indexModels";
import FilterBy from "../ItemModalFilter/indexFilter";
import { useRemoveQuery, useUpdateQuery } from "@/utils/updateQuery2";
import { useRouter } from "next/router";

const ModalFilter = ({
  handleCancleModal,
  state,
  setState,
  openModal,
}: any) => {
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
  const updateQuery = useUpdateQuery();
  const removeQuery = useRemoveQuery();
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    if (router && router.query && typeof router.query.price === "string") {
      const [lowerPrice, upperPrice] = router.query.price
        .split("-")
        .map((item: string) => parseInt(item));
      setState((prevState: any) => ({
        ...prevState,
        priceMin: lowerPrice,
        priceMax: upperPrice,
      }));
    }
    if (router && router.query && typeof router.query.date === "string") {
      const [dateMin, dateMax] = router.query.date
        .split("-")
        .map((item: string) => parseInt(item));
      setState((prevState: any) => ({
        ...prevState,
        date: dateMin,
        dateMax: dateMax,
      }));
    }
    if (router && router.query && typeof router.query.km === "string") {
      const [kmMin, kmMax] = router.query.km
        .split("-")
        .map((item: string) => parseInt(item));
      setState((prevState: any) => ({
        ...prevState,
        km: kmMin,
        kmMax: kmMax,
      }));
    }
    // setState((prevState: any) => ({
    //   ...prevState,
    //   valueRadioAll: router.query.sit,
    //   valueRadioModal: router.query.sit,
    // }));
    setState((prevState: any) => ({
      ...prevState,
      valueRadioAllBrand: router.query.brand,
      valueRadioBrandModal: router.query.brand,
    }));

    setState((prevState: any) => ({
      ...prevState,
      valueRadioAllFormCar: router.query.form,
      valueRadioFormCar: router.query.form,
    }));
    setState((prevState: any) => ({
      ...prevState,
      valueRadioNumberBox: router.query.numberBox,
    }));
    setState((prevState: any) => ({
      ...prevState,
      valueRadioFuel: router.query.fuel,
    }));
    setState((prevState: any) => ({
      ...prevState,
      valueRadioColor: router.query.color,
      valueRadioAllColor: router.query.color,
    }));
    setState((prevState: any) => ({
      ...prevState,
      valueRadioCountry: router.query.country,
      valueRadioAllCountry: router.query.country,
    }));
    setState((prevState: any) => ({
      ...prevState,
      valueRadioModel: router.query.model,
      valueRadioAllModel: router.query.model,
    }));
    setState((prevState: any) => ({
      ...prevState,
      valueRadioStatus: router.query.status,
    }));
    setState((prevState: any) => ({
      ...prevState,
      valueRadioUser: router.query.post,
    }));

    const filterModel = brandList.filter(
      (item) => item.brand === router.query.brand
    );
    setState((prevState: any) => ({
      ...prevState,
      valueRadioAllModel: router.query.model,
      valueRadioModel: router.query.model,
    }));
    setModels(filterModel);
  }, [router]);

  const [modalListAll, setModalListAll] = useState(false);

  const [models, setModels] = useState<any>([]);
  const [hidden, setHidden] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const handleCancleModalListAll = () => {
    setModalListAll(false);
    setHidden(false);
  };
  const handleModalListAll = (type: string) => {
    try {
      console.log(type, state.valueRadioAll);
      setTypeModal(type);
      setHidden(true);
    } finally {
      setModalListAll(true);
    }
  };

  const onClickRadio = (item: any) => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioAll: item,
      valueRadioModal: item,
    }));
    console.log(item);
    // setSelectedSit(item);
  };
  const onChangeRadioBrand = (e: any) => {
    const filterModel = brandList.filter(
      (item) => item.brand === e.target.value
    );
    setState((prevState: any) => ({
      ...prevState,
      valueRadioAllBrand: e.target.value,
      valueRadioBrandModal: e.target.value,
      valueRadioAllModel: "",
      valueRadioModel: "",
    }));
    console.log(filterModel);
    setModels(filterModel);
  };

  const onChangeRadioFormCar = (item: any) => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioFormCar: item,
      valueRadioAllFormCar: item,
    }));
  };
  const onChangeRadioCountry = (item: any) => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioCountry: item,
      valueRadioAllCountry: item,
    }));
  };
  const onChangeRadioStatus = (e: RadioChangeEvent) => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioStatus: e.target.value,
    }));
  };
  const onChangeRadioUser = (e: RadioChangeEvent) => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioUser: e.target.value,
    }));
  };
  const onChangeRadioColor = (item: any) => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioColor: item,
      valueRadioAllColor: item,
    }));
  };
  const onChangeRadioModel = (item: any) => {
    console.log(item);
    setState((prevState: any) => ({
      ...prevState,
      valueRadioModel: item,
      valueRadioAllModel: item,
    }));
  };
  const onChangeRadioFuel = (e: RadioChangeEvent) => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioFuel: e.target.value,
    }));
  };
  const onChangeRadioNumberBox = (e: RadioChangeEvent) => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioNumberBox: e.target.value,
    }));
  };
  const handleChangeMin = (event: any) => {
    if (onlyNumbers(event.target.value) || event.target.value === "") {
      setState((prevState: any) => ({
        ...prevState,
        date: event.target.value,
      }));
    }
  };
  const handleChangeMax = (event: any) => {
    if (onlyNumbers(event.target.value) || event.target.value === "") {
      setState((prevState: any) => ({
        ...prevState,
        dateMax: event.target.value,
      }));
    }
  };
  const handleChangeKmMin = (event: any) => {
    if (onlyNumbers(event.target.value) || event.target.value === "") {
      setState((prevState: any) => ({
        ...prevState,
        kmMin: event.target.value,
      }));
    }
  };
  const [warnPriceMax, setWarnPriceMax] = useState(false);
  const [warnPriceMin, setWarnPriceMin] = useState(false);

  const handleChangePriceMin = (event: any) => {
    if (onlyNumbers(event.target.value) || event.target.value === "") {
      console.log(event?.target?.value);
      setState((prevState: any) => ({
        ...prevState,
        priceMin: event.target.value,
      }));
    }
    if (Number(event.target.value) < 10000000) {
      setWarnPriceMin(true);
    } else {
      setWarnPriceMin(false);
    }
  };
  const handleChangePriceMax = (event: any) => {
    if (onlyNumbers(event.target.value) || event.target.value === "") {
      setState((prevState: any) => ({
        ...prevState,
        priceMax: event.target.value,
      }));
    }
    if (Number(event.target.value) < 10000000) {
      setWarnPriceMax(true);
    } else {
      setWarnPriceMax(false);
    }
  };

  const handleChangeKmMax = (event: any) => {
    if (onlyNumbers(event.target.value) || event.target.value === "") {
      setState((prevState: any) => ({
        ...prevState,
        kmMax: event.target.value,
      }));
    }
  };

  const removeSit = () => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioModal: "",
    }));
  };
  const removeBrand = () => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioBrandModal: "",
      valueRadioModel: "",
      valueRadioAllModel: "",
    }));
  };
  const removeDate = () => {
    setState((prevState: any) => ({
      ...prevState,
      date: "",
      dateMax: "",
    }));
  };

  const removeKm = () => {
    setState((prevState: any) => ({
      ...prevState,
      kmMin: "",
      kmMax: "",
    }));
  };
  const removePrice = () => {
    setState((prevState: any) => ({
      ...prevState,
      priceMin: "",
      priceMax: "",
    }));
  };
  const removeNumberBox = () => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioNumberBox: "",
    }));
  };
  const removeFuel = () => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioFuel: "",
    }));
  };
  const removeColor = () => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioColor: "",
    }));
  };
  const removeCountry = () => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioCountry: "",
    }));
  };
  const removeModel = () => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioModel: "",
    }));
  };
  const removeFormCar = () => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioFormCar: "",
    }));
  };
  const removeStatus = () => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioStatus: "",
    }));
  };
  const removeUser = () => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioCountry: "",
      valueRadioUser: "",
    }));
  };
  const handleRenew = () => {
    try {
      setState((prevState: any) => ({
        ...prevState,
        valueRadioModal: "",
        valueRadioAll: "",
        valueRadioAllBrand: "",
        valueRadioAllColor: "",
        valueRadioAllCountry: "",
        valueRadioAllModel: "",
        valueRadioAllFormCar: "",
        valueRadioBrandModal: "",
        date: "",
        dateMax: "",
        kmMax: "",
        kmMin: "",
        priceMax: "",
        priceMin: "",
        valueRadioNumberBox: "",
        valueRadioFuel: "",
        valueRadioColor: "",
        valueRadioCountry: "",
        valueRadioModel: "",
        valueRadioFormCar: "",
        valueRadioStatus: "",
        valueRadioUser: "",
      }));
      removeQuery("brand");
      removeQuery("price");
      removeQuery("fuel");
      removeQuery("date");
      removeQuery("km");
      removeQuery("numberBox");
      removeQuery("color");
      removeQuery("country");
      removeQuery("model");
      removeQuery("status");
      removeQuery("post");
    } finally {
      handleCancleModal();
    }
  };

  const [hiddenDate, setHiddenDate] = useState(true);
  const handleHiddenDate = () => {
    setHiddenDate((prev) => !prev);
  };
  const [hiddenPrice, setHiddenPrice] = useState(true);

  const [hiddenKm, setHiddenKm] = useState(true);
  const handleHiddenKm = () => {
    setHiddenKm((prev) => !prev);
  };
  const handleHiddenPrice = () => {
    setHiddenPrice((prev) => !prev);
  };
  const [hiddenNB, setHiddenNB] = useState(true);
  const handleHiddenNB = () => {
    setHiddenNB((prev) => !prev);
  };
  const [hiddenFuel, setHiddenFuel] = useState(true);
  const handleHiddenFuel = () => {
    setHiddenFuel((prev) => !prev);
  };
  const [hiddenSt, setHiddenSt] = useState(true);
  const handleHiddenSt = () => {
    setHiddenSt((prev) => !prev);
  };
  const [hiddenOwner, setHiddenOwner] = useState(true);
  const handleHiddenOwner = () => {
    setHiddenOwner((prev) => !prev);
  };

  const handleApply = () => {
    try {
      if (state.valueRadioModal !== "" && state.valueRadioModal !== undefined) {
        updateQuery("sit", state.valueRadioModal);
      } else {
        removeQuery("sit");
      }
      if (
        state.priceMin !== "" &&
        state.priceMax !== "" &&
        state.priceMin !== undefined &&
        state.priceMax !== undefined
      ) {
        updateQuery("price", `${state.priceMin}-${state.priceMax}`);
      } else {
        removeQuery("price");
      }
      console.log(state.kmMin, state.kmMax);
      if (
        state.kmMin !== "" &&
        state.kmMax !== "" &&
        state.kmMin !== undefined &&
        state.kmMax !== undefined
      ) {
        updateQuery("km", `${state.kmMin}-${state.kmMax}`);
      } else {
        removeQuery("km");
      }
      if (
        state.date !== "" &&
        state.dateMax !== "" &&
        state.dateMax !== undefined &&
        state.date !== undefined
      ) {
        updateQuery("date", `${state.date}-${state.dateMax}`);
      } else {
        removeQuery("date");
      }
      if (
        state.valueRadioNumberBox !== "" &&
        state.valueRadioNumberBox !== undefined
      ) {
        updateQuery("numberBox", state.valueRadioNumberBox);
      } else {
        removeQuery("numberBox");
      }
      if (
        state.valueRadioFormCar !== "" &&
        state.valueRadioFormCar !== undefined
      ) {
        updateQuery("form", state.valueRadioFormCar);
      } else {
        removeQuery("form");
      }
      if (state.valueRadioFuel !== "" && state.valueRadioFuel !== undefined) {
        updateQuery("fuel", state.valueRadioFuel);
      } else {
        removeQuery("fuel");
      }
      if (
        state.valueRadioCountry !== "" &&
        state.valueRadioCountry !== undefined
      ) {
        updateQuery("country", state.valueRadioCountry);
      } else {
        removeQuery("country");
      }
      if (
        state.valueRadioBrandModal !== "" &&
        state.valueRadioBrandModal !== undefined
      ) {
        updateQuery("brand", state.valueRadioBrandModal);
      } else {
        removeQuery("brand");
      }
      if (state.valueRadioModel !== "" && state.valueRadioModel !== undefined) {
        updateQuery("model", state.valueRadioModel);
      } else {
        removeQuery("model");
      }
      if (
        state.valueRadioStatus !== "" &&
        state.valueRadioStatus !== undefined
      ) {
        updateQuery("status", state.valueRadioStatus);
      } else {
        removeQuery("status");
      }
      if (state.valueRadioUser !== "" && state.valueRadioUser !== undefined) {
        updateQuery("post", state.valueRadioUser);
      } else {
        removeQuery("post");
      }

      if (state.valueRadioColor !== "" && state.valueRadioColor !== undefined) {
        updateQuery("color", state.valueRadioColor);
      } else {
        removeQuery("color");
      }
    } finally {
      handleCancleModal();
    }
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
        <ItemModalFilterSits
          title="Số chỗ"
          value={state.valueRadioModal}
          onClickRadio={onClickRadio}
          data={carSit}
          onClick={() => handleModalListAll("sit")}
        ></ItemModalFilterSits>
        <ItemModalFilterBrand
          title="Hãng xe"
          value={state.valueRadioBrandModal}
          onChange={onChangeRadioBrand}
          data={brandList}
          onClick={() => handleModalListAll("brand")}
        ></ItemModalFilterBrand>
        <div className="sit">
          <div className="header" onClick={handleHiddenDate}>
            <span>Năm sản xuất</span>
            <ArrowDownIcon></ArrowDownIcon>
          </div>
          {hiddenDate && (
            <div className="date-produce">
              <div className="body input-need-to-custom">
                <TextField
                  type="number"
                  label="Năm sản xuất tối thiểu"
                  multiline
                  onChange={handleChangeMin}
                  value={state.date}
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
                  value={state.dateMax}
                  maxRows={1}
                  variant="filled"
                />
              </div>
            </div>
          )}
        </div>
        <div className="sit">
          <div className="header" onClick={handleHiddenKm}>
            <span>Số km đã đi</span>
            <ArrowDownIcon></ArrowDownIcon>
          </div>
          {hiddenKm && (
            <div className="date-produce">
              <div className="body input-need-to-custom">
                <TextField
                  type="number"
                  label="Số km đã đi tối thiểu"
                  multiline
                  onChange={handleChangeKmMin}
                  value={state.kmMin}
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
                  value={state.kmMax}
                  maxRows={1}
                  variant="filled"
                />
              </div>
            </div>
          )}
        </div>{" "}
        <div className="sit">
          <div className="header" onClick={handleHiddenPrice}>
            <span>Giá tiền</span>
            <ArrowDownIcon></ArrowDownIcon>
          </div>
          {hiddenPrice && (
            <div className="date-produce">
              <div className="body input-need-to-custom">
                <TextField
                  type="number"
                  label="Giá tiền tối thiểu"
                  multiline
                  onChange={handleChangePriceMin}
                  value={state.priceMin}
                  maxRows={1}
                  variant="filled"
                />
                {warnPriceMin ? <span>Vui lòng nhập trên 10tr</span> : <></>}
              </div>
              -
              <div className="body input-need-to-custom">
                <TextField
                  type="number"
                  label="Giá tiền tối đa"
                  multiline
                  onChange={handleChangePriceMax}
                  value={state.priceMax}
                  maxRows={1}
                  variant="filled"
                />
                {warnPriceMax ? <span>Vui lòng nhập trên 10tr</span> : <></>}
              </div>
            </div>
          )}
        </div>
        <div className="sit">
          <div className="header" onClick={handleHiddenNB}>
            <span>Hộp số</span>
            <ArrowDownIcon></ArrowDownIcon>
          </div>
          {hiddenNB && (
            <div className="body">
              <Radio.Group
                value={state.valueRadioNumberBox}
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
          )}
        </div>
        <div className="sit">
          <div className="header" onClick={handleHiddenFuel}>
            <span>Nhiên liệu</span>
            <ArrowDownIcon></ArrowDownIcon>
          </div>
          {hiddenFuel && (
            <div className="body">
              <Radio.Group
                value={state.valueRadioFuel}
                onChange={onChangeRadioFuel}
              >
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
          )}
        </div>
        <ItemModalFilterSits
          title="Màu sắc"
          value={state.valueRadioColor}
          onClickRadio={onChangeRadioColor}
          data={dataColor}
          onClick={() => handleModalListAll("color")}
        ></ItemModalFilterSits>
        <ItemModalFilterSits
          title="Xuất xứ"
          value={state.valueRadioCountry}
          onClickRadio={onChangeRadioCountry}
          data={dataCountry}
          onClick={() => handleModalListAll("country")}
        ></ItemModalFilterSits>
        <ItemModalFilterModels
          title="Dòng xe"
          value={state.valueRadioModel}
          onClickRadio={onChangeRadioModel}
          data={models}
          onClick={() => handleModalListAll("model")}
          valueRadioBrandModal={state.valueRadioBrandModal}
        ></ItemModalFilterModels>
        <ItemModalFilterSits
          title="Kiểu dáng"
          value={state.valueRadioFormCar}
          onClickRadio={onChangeRadioFormCar}
          data={formCar}
          onClick={() => handleModalListAll("formCar")}
        ></ItemModalFilterSits>
        <div className="sit">
          <div className="header" onClick={handleHiddenSt}>
            <span>Tình trạng</span>
            <ArrowDownIcon></ArrowDownIcon>
          </div>
          {hiddenSt && (
            <div className="body">
              <Radio.Group
                value={state.valueRadioStatus}
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
          )}
        </div>
        <div className="sit">
          <div className="header" onClick={handleHiddenOwner}>
            <span>Đăng bởi</span>
            <ArrowDownIcon></ArrowDownIcon>
          </div>
          {hiddenOwner && (
            <div className="body">
              <Radio.Group
                value={state.valueRadioUser}
                onChange={onChangeRadioUser}
              >
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
          )}
        </div>
      </div>
      <FilterBy
        valueRadioModal={state.valueRadioModal}
        valueRadioBrandModal={state.valueRadioBrandModal}
        date={state.date}
        dateMax={state.dateMax}
        kmMin={state.kmMin}
        kmMax={state.kmMax}
        priceMin={state.priceMin}
        priceMax={state.priceMax}
        valueRadioNumberBox={state.valueRadioNumberBox}
        valueRadioFuel={state.valueRadioFuel}
        valueRadioColor={state.valueRadioColor}
        valueRadioCountry={state.valueRadioCountry}
        valueRadioModel={state.valueRadioModel}
        valueRadioFormCar={state.valueRadioFormCar}
        valueRadioStatus={state.valueRadioStatus}
        valueRadioUser={state.valueRadioUser}
        removeSit={removeSit}
        removeBrand={removeBrand}
        removePrice={removePrice}
        removeDate={removeDate}
        removeKm={removeKm}
        removeNumberBox={removeNumberBox}
        removeFuel={removeFuel}
        removeColor={removeColor}
        removeCountry={removeCountry}
        removeModel={removeModel}
        removeFormCar={removeFormCar}
        removeStatus={removeStatus}
        removeUser={removeUser}
      ></FilterBy>

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
            ? carSit
            : typeModal === "brand"
            ? brandList
            : typeModal === "color"
            ? dataColor
            : typeModal === "country"
            ? dataCountry
            : typeModal === "model"
            ? models[0]?.models
            : typeModal === "formCar"
            ? formCar
            : ""
        }
        setValueRadio={typeModal}
        setState={setState}
        typeModal={typeModal}
        setValueRadioAll={typeModal}
        valueRadioAll={
          typeModal === "sit"
            ? state.valueRadioAll
            : typeModal === "brand"
            ? state.valueRadioAllBrand
            : typeModal === "color"
            ? state.valueRadioAllColor
            : typeModal === "country"
            ? state.valueRadioAllCountry
            : typeModal === "model"
            ? state.valueRadioAllModel
            : typeModal === "formCar"
            ? state.valueRadioAllFormCar
            : state.valueRadioAll
        }
      ></ModalListFilter>
    </CustomModal>
  );
};
export default ModalFilter;
