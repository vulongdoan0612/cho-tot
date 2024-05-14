import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import brandList from "./carList.json";
import { DatePicker, DatePickerProps } from "antd";
import dayjs from "dayjs";
import CustomButtonSelect from "../CustomButtonSelect";
import NumberInput from "../NumberInput/NumberInput";
import NumberInputPrice from "../NumberInputPrice/NumberInputPrice";
import TitlePostSell from "../TitlePostSell/TitlePostSell";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { defaultCommonState } from "./_mock";
import { ICommonStateFillFormRenderCar, ICommonStateFormRenderCar } from "@/interfaces/User";
import moment from "moment";
import { onlyNumbers } from "@/utils/onlyNumbers";
import { defaultCommonStateFill } from "./_fill";
import { colorsCar, countriesCar, formsCar, sitsCar } from "../Contain-MBOTO/_mock";

const RenderOto = ({ handleWarning, fileList }: any) => {

  const { dataPost } = useSelector((state: RootState) => state.postSell);
  const [stateFill, setStateFill] = useState<ICommonStateFillFormRenderCar>(defaultCommonStateFill);
  const [stateForm, setStateForm] = useState<ICommonStateFormRenderCar>(defaultCommonState);

  useEffect(() => {
    const selectedModels = brandList.find((item: any) => item.brand === dataPost?.post?.value)?.models || [];
    setStateForm((prevState) => ({
      ...prevState,
      models: selectedModels,
      value: dataPost?.post?.value,
      color: dataPost?.post?.color,
      model: dataPost?.post?.model,
      carNumber: dataPost?.post?.carNumber,
      owner: dataPost?.post?.owner,
      country: dataPost?.post?.country,
      sit: dataPost?.post?.sit,
      activeButton: dataPost?.post?.activeButton,
      accessories: dataPost?.post?.accessories,
      registry: dataPost?.post?.registry,
      numberBox: dataPost?.post?.numberBox,
      status: dataPost?.post?.status,
      form: dataPost?.post?.form,
      price: dataPost?.post?.price,
      km: dataPost?.post?.km,
    }));
  }, [
    dataPost?.post?.accessories,
    dataPost?.post?.activeButton,
    dataPost?.post?.carNumber,
    dataPost?.post?.color,
    dataPost?.post?.country,
    dataPost?.post?.model,
    dataPost?.post?.form,
    dataPost?.post?.km,
    dataPost?.post?.numberBox,
    dataPost?.post?.owner,
    dataPost?.post?.price,
    dataPost?.post?.registry,
    dataPost?.post?.sit,
    dataPost?.post?.status,
    dataPost?.post?.value,
  ]);

  useEffect(() => {
    if (dataPost?.post?.dateCar) {
      setStateForm((prevState) => ({
        ...prevState,
        dateCar: dataPost?.post?.dateCar,
      }));
    }
  }, [dataPost?.post?.dateCar]);

  const handleChangeCountry = (event: SelectChangeEvent) => {
    setStateForm((prevState) => ({
      ...prevState,
      country: event?.target?.value,
    }));
    if (event?.target?.value !== "") {
      setStateFill((prevState: any) => ({
        ...prevState,
        fillCountry: false,
      }));
    }
  };

  const handleChangeSit = (event: SelectChangeEvent) => {
    setStateForm((prevState) => ({
      ...prevState,
      sit: event?.target?.value,
    }));
    if (event?.target?.value !== "") {
      setStateFill((prevState: any) => ({
        ...prevState,
        fillSit: false,
      }));
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    const selectedModels = brandList.find((item: any) => item.brand === event?.target.value)?.models || [];
    setStateForm((prevState) => ({
      ...prevState,
      models: selectedModels,
      value: event?.target.value as string,
    }));
    if (event?.target?.value !== "") {
      setStateFill((prevState: any) => ({
        ...prevState,
        fillBrand: false,
      }));
    }
  };

  const handleChangeModels = (event: SelectChangeEvent) => {
    setStateForm((prevState) => ({
      ...prevState,
      model: event?.target?.value,
    }));
    if (event?.target?.value !== "") {
      setStateFill((prevState: any) => ({
        ...prevState,
        fillModel: false,
      }));
    }
  };

  const handleChangeColor = (event: SelectChangeEvent) => {
    setStateForm((prevState) => ({
      ...prevState,
      color: event?.target?.value,
    }));
    if (event?.target?.value !== "") {
      setStateFill((prevState: any) => ({
        ...prevState,
        fillColor: false,
      }));
    }
  };

  const onChange: DatePickerProps<any>["onChange"] = (date: any, dateString: any) => {
    const momentDateCCCD = moment(dateString);
    const formattedDateCCCD = momentDateCCCD.format("YYYY");
    setStateForm((prevState) => ({
      ...prevState,
      dateCar: String(formattedDateCCCD),
    }));
    if (dateString !== "" || formattedDateCCCD !== "Invalid date") {
      setStateFill((prevState: any) => ({
        ...prevState,
        fillDate: false,
      }));
    }
  };

  const handleChangeCarNumber = (event: any) => {
    if (onlyNumbers(event?.target?.value) || event?.target?.value === "") {
      setStateForm((prevState) => ({
        ...prevState,
        carNumber: event?.target?.value,
      }));
    }
    if (event?.target?.value !== "") {
      setStateFill((prevState: any) => ({
        ...prevState,
        fillCarN: false,
      }));
    }
  };

  const handleChangeOwner = (event: SelectChangeEvent) => {
    setStateForm((prevState) => ({
      ...prevState,
      owner: event?.target?.value,
    }));
    if (event?.target?.value !== "") {
      setStateFill((prevState: any) => ({
        ...prevState,
        fillOwner: false,
      }));
    }
  };

  const onChangeNumber = (value: number) => {
    if (onlyNumbers(value) || value === 0) {
      setStateForm((prevState) => ({
        ...prevState,
        km: Number(value),
      }));
    }
    if (value === 0) {
      setStateForm((prevState) => ({
        ...prevState,
        km: 0,
      }));
    }
    if (String(value) !== "") {
      setStateFill((prevState: any) => ({
        ...prevState,
        fillKm: false,
      }));
    }
  };

  const onChangePrice = (value: any) => {
    if (onlyNumbers(value) || value === "") {
      setStateForm((prevState) => ({
        ...prevState,
        price: value,
      }));
    }
    if (value === null || value === "") {
      setStateForm((prevState) => ({
        ...prevState,
        price: 0,
      }));
    }
    if (String(value) !== "") {
      setStateFill((prevState: any) => ({
        ...prevState,
        fillPrice: false,
      }));
    }
  };

  const handleFuel = (fuelType: any) => {
    setStateForm((prevState) => ({
      ...prevState,
      activeButton: fuelType,
    }));
    if (fuelType !== undefined) {
      setStateFill((prevState: any) => ({
        ...prevState,
        fillFuel: false,
      }));
    }
  };

  const handleAccessories = (accessories: any) => {
    setStateForm((prevState) => ({
      ...prevState,
      accessories: accessories,
    }));
    if (accessories !== undefined) {
      setStateFill((prevState: any) => ({
        ...prevState,
        fillAcces: false,
      }));
    }
  };

  const handleRegistry = (registry: any) => {
    setStateForm((prevState) => ({
      ...prevState,
      registry: registry,
    }));
    if (registry !== undefined) {
      setStateFill((prevState: any) => ({
        ...prevState,
        fillRegis: false,
      }));
    }
  };

  const handleNumberBox = (NumberBox: any) => {
    setStateForm((prevState) => ({
      ...prevState,
      numberBox: NumberBox,
    }));
    if (NumberBox !== undefined) {
      setStateFill((prevState: any) => ({
        ...prevState,
        fillNumberB: false,
      }));
    }
  };

  const handleChangeForm = (event: SelectChangeEvent) => {
    setStateForm((prevState) => ({
      ...prevState,
      form: event?.target?.value,
    }));
    if (event?.target?.value !== undefined) {
      setStateFill((prevState: any) => ({
        ...prevState,
        fillForm: false,
      }));
    }
  };

  const handleStatus = (status: any) => {
    setStateForm((prevState) => ({
      ...prevState,
      status: status,
    }));
    if (status !== "") {
      setStateFill((prevState: any) => ({
        ...prevState,
        fillStatus: false,
      }));
    }
  };
  
  return (
    <div className="detail-information-car">
      <span className="title">Thông tin chi tiết</span>
      <div className="detail-information">
        <span className="status">
          <span>Tình trạng</span>
          <div className="wrap-buttons">
            <div className="buttons">
              <CustomButtonSelect handleClick={() => handleStatus("Đã sử dụng")} isActive={stateForm.status === "Đã sử dụng"}>
                Đã sử dụng
              </CustomButtonSelect>
              <CustomButtonSelect handleClick={() => handleStatus("Mới")} isActive={stateForm.status === "Mới"}>
                Mới
              </CustomButtonSelect>
            </div>
            {stateFill.fillStatus && <div className="warning-fill">Vui lòng nhập tình trạng</div>}
          </div>
        </span>
        <div className="gap">
          <FormControl sx={{ m: 1, width: "100%" }}>
            <InputLabel required id="demo-select-small-label" className="city-select-label">
              Hãng xe{" "}
            </InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              className={stateFill.fillBrand ? "warn-border" : ""}
              value={stateForm?.value}
              label="Hãng xe"
              onChange={handleChange}
            >
              {brandList.map((item, index) => (
                <MenuItem key={index} value={item?.brand}>
                  {item?.brand}
                </MenuItem>
              ))}
            </Select>
            {stateFill.fillBrand && <div className="warning-fill">Vui lòng chọn Hãng xe</div>}
          </FormControl>
          <FormControl sx={{ m: 1, width: "100%" }}>
            <InputLabel required id="demo-select-small-label" className="city-select-label">
              Dòng xe
            </InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              className={stateFill.fillModel ? "warn-border" : ""}
              value={stateForm?.model}
              disabled={stateForm?.value ? false : true}
              label="Dòng xe"
              onChange={handleChangeModels}
            >
              {stateForm?.models.map((item: any, index: number) => {
                return (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
            {stateFill.fillModel && <div className="warning-fill">Vui lòng chọn Dòng xe</div>}
          </FormControl>
          <div className="wrap-date">
            <DatePicker
              onChange={onChange}
              picker="year"
              value={stateForm.dateCar !== "" ? dayjs(stateForm.dateCar) : null}
              className={stateFill.fillDate ? "warn-border" : ""}
              placeholder="Năm sản xuất"
            />{" "}
            {stateFill.fillDate && <div className="warning-fill">Vui lòng chọn năm sản xuất</div>}
          </div>
        </div>
        <div className="number-box">
          <span>Hộp số</span>
          <div className="wrap-buttons">
            <div className="buttons">
              <CustomButtonSelect handleClick={() => handleNumberBox("Tự động")} isActive={stateForm?.numberBox === "Tự động"}>
                Tự động
              </CustomButtonSelect>
              <CustomButtonSelect handleClick={() => handleNumberBox("Số sàn")} isActive={stateForm?.numberBox === "Số sàn"}>
                Số sàn
              </CustomButtonSelect>
              <CustomButtonSelect handleClick={() => handleNumberBox("Bán tự động")} isActive={stateForm?.numberBox === "Bán tự động"}>
                Bán tự động
              </CustomButtonSelect>
            </div>
            {stateFill.fillNumberB && <div className="warning-fill">Vui lòng chọn Hộp số</div>}
          </div>
        </div>
        <div className="fuel">
          <span>Nhiên liệu</span>

          <div className="wrap-buttons">
            <div className="buttons">
              <CustomButtonSelect handleClick={() => handleFuel("Xăng")} isActive={stateForm?.activeButton === "Xăng"}>
                Xăng
              </CustomButtonSelect>
              <CustomButtonSelect handleClick={() => handleFuel("Dầu")} isActive={stateForm?.activeButton === "Dầu"}>
                Dầu
              </CustomButtonSelect>
              <CustomButtonSelect handleClick={() => handleFuel("Động cơ Hybrid")} isActive={stateForm?.activeButton === "Động cơ Hybrid"}>
                Động cơ Hybrid
              </CustomButtonSelect>
              <CustomButtonSelect handleClick={() => handleFuel("Điện")} isActive={stateForm?.activeButton === "Điện"}>
                Điện
              </CustomButtonSelect>
            </div>
            {stateFill.fillFuel && <div className="warning-fill">Vui lòng chọn Nhiên liệu</div>}
          </div>
        </div>
        <div className="gap">
          <div className="display-flex">
            <FormControl sx={{ m: 1, width: "100%" }}>
              <InputLabel required id="demo-select-small-label" className="city-select-label">
                Xuất xứ
              </InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className={stateFill.fillCountry ? "warn-border" : ""}
                value={stateForm?.country}
                label="Dòng xe"
                onChange={handleChangeCountry}
              >
                {countriesCar.map((item: any, index: number) => {
                  return (
                    <MenuItem key={index} value={item.item}>
                      {item.item}
                    </MenuItem>
                  );
                })}
              </Select>
              {stateFill.fillCountry && <div className="warning-fill">Vui lòng chọn Xuất xứ</div>}
            </FormControl>
            <FormControl sx={{ m: 1, width: "100%" }}>
              <InputLabel required id="demo-select-small-label" className="city-select-label">
                Kiểu dáng
              </InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={stateForm?.form}
                className={stateFill.fillForm ? "warn-border" : ""}
                label="Dòng xe"
                onChange={handleChangeForm}
              >
                {formsCar.map((item: any, index: number) => {
                  return (
                    <MenuItem key={index} value={item.item}>
                      {item.item}
                    </MenuItem>
                  );
                })}
              </Select>
              {stateFill.fillForm && <div className="warning-fill">Vui lòng chọn Kiểu dáng</div>}
            </FormControl>
          </div>
          <div className="display-flex">
            <FormControl sx={{ m: 1, width: "100%" }}>
              <InputLabel required id="demo-select-small-label" className="city-select-label">
                Số chỗ
              </InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={stateForm?.sit}
                className={stateFill.fillSit ? "warn-border" : ""}
                label="Số chỗ"
                onChange={handleChangeSit}
              >
                {sitsCar.map((item: any, index: number) => {
                  return (
                    <MenuItem key={index} value={item.value}>
                      {item.item}
                    </MenuItem>
                  );
                })}
              </Select>
              {stateFill.fillSit && <div className="warning-fill">Vui lòng chọn Số chỗ</div>}
            </FormControl>
            <FormControl sx={{ m: 1, width: "100%" }}>
              <InputLabel required id="demo-select-small-label" className="city-select-label">
                Màu sắc
              </InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={stateForm?.color}
                className={stateFill.fillColor ? "warn-border" : ""}
                label="Dòng xe"
                onChange={handleChangeColor}
              >
                {colorsCar.map((item: any, index: number) => {
                  return (
                    <MenuItem key={index} value={item.item}>
                      {item.item}
                    </MenuItem>
                  );
                })}
              </Select>
              {stateFill.fillColor && <div className="warning-fill">Vui lòng chọn Màu sắc</div>}
            </FormControl>
          </div>
          <div className="display-flex">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2px",
                width: "100%",
              }}
            >
              <TextField
                required
                id="filled-multiline-flexible"
                label="Biển số xe"
                multiline
                className={`car-number input-need-to-custom ${stateFill.fillCarN ? "warn-border" : ""}`}
                onChange={handleChangeCarNumber}
                value={stateForm?.carNumber}
                maxRows={4}
                variant="filled"
              />
              {stateFill.fillCarN && <div className="warning-fill">Vui lòng chọn Biển số xe</div>}
            </div>
            <FormControl sx={{ m: 1, width: "100%" }}>
              <InputLabel required id="demo-select-small-label" className="city-select-label">
                Số đời chủ
              </InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={stateForm?.owner}
                className={stateFill.fillOwner ? "warn-border" : ""}
                label="Số đời chủ"
                onChange={handleChangeOwner}
              >
                <MenuItem key={0} value="1 chủ">
                  1 chủ
                </MenuItem>
                <MenuItem key={1} value="> 1 chủ">
                  &gt; 1 chủ
                </MenuItem>
              </Select>
              {stateFill.fillOwner && <div className="warning-fill">Vui lòng chọn Số đời chủ</div>}
            </FormControl>
          </div>
          <div className="display-flex">
            <div className="accessories">
              <span>Có phụ kiện đi kèm</span>
              <div className="wrap-buttons">
                <div className="buttons">
                  <CustomButtonSelect handleClick={() => handleAccessories("Có")} isActive={stateForm?.accessories === "Có"}>
                    Có
                  </CustomButtonSelect>
                  <CustomButtonSelect handleClick={() => handleAccessories("Không")} isActive={stateForm?.accessories === "Không"}>
                    Không
                  </CustomButtonSelect>
                </div>{" "}
                {stateFill.fillAcces && <div className="warning-fill">Vui lòng chọn phụ kiện đi kèm</div>}
              </div>
            </div>
            <div className="registry">
              <span>Còn hạn đăng kiểm</span>
              <div className="wrap-buttons">
                <div className="buttons">
                  <CustomButtonSelect handleClick={() => handleRegistry("Có")} isActive={stateForm?.registry === "Có"}>
                    Có
                  </CustomButtonSelect>
                  <CustomButtonSelect handleClick={() => handleRegistry("Không")} isActive={stateForm?.registry === "Không"}>
                    Không
                  </CustomButtonSelect>
                </div>
                {stateFill.fillRegis && <div className="warning-fill">Vui lòng chọn hạn đăng kiểm</div>}
              </div>
            </div>
          </div>
        </div>
        <div className="gap">
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <NumberInput
              value={stateForm?.km}
              placeholder="Km đã đi"
              className={`number-input-form ${stateFill.fillKm ? "warn-border" : ""}`}
              onChangeNumber={onChangeNumber}
            ></NumberInput>
            {stateFill.fillKm && <div className="warning-fill">Vui lòng nhập Km đã đi</div>}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <NumberInputPrice
              placeholder="Giá xe"
              value={stateForm?.price}
              onChangePrice={onChangePrice}
              className={`${stateFill.fillPrice ? "warn-border" : ""}`}
            ></NumberInputPrice>
            {stateFill.fillPrice && <div className="warning-fill">Vui lòng nhập Giá xe</div>}
          </div>
        </div>
      </div>
      <TitlePostSell
        stateFill={stateFill}
        setStateFill={setStateFill}
        value={stateForm?.value}
        color={stateForm?.color}
        handleWarning={handleWarning}
        price={stateForm?.price}
        dateCar={stateForm?.dateCar}
        carNumber={stateForm?.carNumber}
        owner={stateForm?.owner}
        form={stateForm?.form}
        model={stateForm?.model}
        country={stateForm?.country}
        sit={stateForm?.sit}
        fileList={fileList}
        activeButton={stateForm?.activeButton}
        accessories={stateForm?.accessories}
        registry={stateForm?.registry}
        km={stateForm?.km}
        numberBox={stateForm?.numberBox}
        status={stateForm?.status}
      ></TitlePostSell>
    </div>
  );
};
export default RenderOto;
