import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import brandList from "./carList.json";
import countries from "./country.json";
import formCar from "./formCar.json";
import colorCar from "./color.json";
import {
  DatePicker,
  DatePickerProps,
  InputNumber,
  InputNumberProps,
} from "antd";
import dayjs from "dayjs";
import carsit from "./carsit.json";
import CustomButtonSelect from "../CustomButtonSelect";
import NumberInput from "../NumberInput/NumberInput";
import NumberInputPrice from "../NumberInputPrice/NumberInputPrice";
import TitlePostSell from "../TitlePostSell/TitlePostSell";

const RenderOto = () => {
  const [value, setValue] = useState("");
  const [color, setColor] = useState<any>("");
  const [carNumber, setCarNumber] = useState<any>("");
  const [owner, setOwner] = useState<any>("");
  const [country, setCountry] = useState<any>("");
  const [sit, setSit] = useState<any>("");
  const [activeButton, setActiveButton] = useState("");
  const [accessories, setAccessories] = useState("");
  const [registry, setRegistry] = useState("");
  const [numberBox, setNumberBox] = useState("");
  const [status, setStatus] = useState("");
  const [models, setModels] = useState<any>([]);
  const [model, setModel] = useState<any>([]);
  const [form, setForm] = useState<any>("");
  const [price, setPrice] = useState<any>("");
  const [km, setKm] = useState<any>("");

  const handleChangeCountry = (event: SelectChangeEvent) => {
    setCountry(event?.target?.value);
  };
  const handleChangeSit = (event: SelectChangeEvent) => {
    setSit(event?.target?.value);
  };
  const handleChange = (event: SelectChangeEvent) => {
    const selectedModels =
      brandList.find((item: any) => item.brand === event?.target.value)
        ?.models || [];
    setModels(selectedModels);
    setValue(event?.target.value as string);
  };
  const handleChangeModels = (event: SelectChangeEvent) => {
    setModel(event?.target.value);
  };
  const handleChangeColor = (event: SelectChangeEvent) => {
    setColor(event?.target.value);
  };
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };
  const handleChangeCarNumber = (event: any) => {
    setCarNumber(event?.target.value);
  };
  const handleChangeOwner = (event: SelectChangeEvent) => {
    setOwner(event?.target?.value);
  };

  const onChangeNumber: InputNumberProps["onChange"] = (value) => {
    console.log(value);
    setKm(value);
  };
  const onChangePrice: InputNumberProps["onChange"] = (value) => {
    console.log(value);
    setPrice(value);
  };
  const handleFuel = (fuelType: any) => {
    setActiveButton(fuelType);
  };
  const handleAccessories = (accessories: any) => {
    setAccessories(accessories);
  };
  const handleRegistry = (registry: any) => {
    setRegistry(registry);
  };
  const handleNumberBox = (NumberBox: any) => {
    setNumberBox(NumberBox);
  };
  const handleChangeForm = (event: SelectChangeEvent) => {
    setForm(event?.target?.value);
  };
  const handleStatus = (status: any) => {
    setStatus(status);
  };
  return (
    <div className="detail-information-car">
      <span className="title">Thông tin chi tiết</span>
      <div className="detail-information">
        <span className="status">
          <span>Tình trạng</span>
          <div className="buttons">
            <CustomButtonSelect
              handleClick={() => handleStatus("Đã sử dụng")}
              isActive={status === "Đã sử dụng"}
            >
              Đã sử dụng
            </CustomButtonSelect>
            <CustomButtonSelect
              handleClick={() => handleStatus("Mới")}
              isActive={status === "Mới"}
            >
              Mới
            </CustomButtonSelect>
          </div>
        </span>
        <div className="gap">
          <FormControl sx={{ m: 1, width: "100%" }}>
            <InputLabel
              required
              id="demo-select-small-label"
              className="city-select-label"
            >
              Hãng xe{" "}
            </InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
              label="Hãng xe"
              onChange={handleChange}
            >
              {brandList.map((item, index) => (
                <MenuItem key={index} value={item?.brand}>
                  {item?.brand}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: "100%" }}>
            <InputLabel
              required
              id="demo-select-small-label"
              className="city-select-label"
            >
              Dòng xe
            </InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={model}
              disabled={value ? false : true}
              label="Dòng xe"
              onChange={handleChangeModels}
            >
              {models.map((item: any, index: any) => {
                return (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <DatePicker
            onChange={onChange}
            picker="year"
            placeholder="Năm sản xuất"
            minDate={dayjs("1990")}
            maxDate={dayjs("2024")}
          />
        </div>
        <div className="number-box">
          <span>Hộp số</span>
          <div className="buttons">
            <CustomButtonSelect
              handleClick={() => handleNumberBox("Tự động")}
              isActive={numberBox === "Tự động"}
            >
              Tự động
            </CustomButtonSelect>
            <CustomButtonSelect
              handleClick={() => handleNumberBox("Số sàn")}
              isActive={numberBox === "Số sàn"}
            >
              Số sàn
            </CustomButtonSelect>
            <CustomButtonSelect
              handleClick={() => handleNumberBox("Bán tự động")}
              isActive={numberBox === "Bán tự động"}
            >
              Bán tự động
            </CustomButtonSelect>
          </div>
        </div>
        <div className="fuel">
          <span>Nhiên liệu</span>

          <div className="buttons">
            <CustomButtonSelect
              handleClick={() => handleFuel("Xăng")}
              isActive={activeButton === "Xăng"}
            >
              Xăng
            </CustomButtonSelect>
            <CustomButtonSelect
              handleClick={() => handleFuel("Dầu")}
              isActive={activeButton === "Dầu"}
            >
              Dầu
            </CustomButtonSelect>
            <CustomButtonSelect
              handleClick={() => handleFuel("Động cơ Hybrid")}
              isActive={activeButton === "Động cơ Hybrid"}
            >
              Động cơ Hybrid
            </CustomButtonSelect>
            <CustomButtonSelect
              handleClick={() => handleFuel("Điện")}
              isActive={activeButton === "Điện"}
            >
              Điện
            </CustomButtonSelect>
          </div>
        </div>
        <div className="gap">
          <div className="display-flex">
            <FormControl sx={{ m: 1, width: "100%" }}>
              <InputLabel
                required
                id="demo-select-small-label"
                className="city-select-label"
              >
                Xuất xứ
              </InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={country}
                label="Dòng xe"
                onChange={handleChangeCountry}
              >
                {countries.map((item: any, index: any) => {
                  return (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: "100%" }}>
              <InputLabel
                required
                id="demo-select-small-label"
                className="city-select-label"
              >
                Kiểu dáng
              </InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={form}
                label="Dòng xe"
                onChange={handleChangeForm}
              >
                {formCar.map((item: any, index: any) => {
                  return (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="display-flex">
            <FormControl sx={{ m: 1, width: "100%" }}>
              <InputLabel
                required
                id="demo-select-small-label"
                className="city-select-label"
              >
                Số chỗ
              </InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sit}
                label="Số chỗ"
                onChange={handleChangeSit}
              >
                {carsit.map((item: any, index: any) => {
                  return (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: "100%" }}>
              <InputLabel
                required
                id="demo-select-small-label"
                className="city-select-label"
              >
                Màu sắc
              </InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={color}
                label="Dòng xe"
                onChange={handleChangeColor}
              >
                {colorCar.map((item: any, index: any) => {
                  return (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="display-flex">
            <TextField
              required
              className="car-number input-need-to-custom"
              id="filled-multiline-flexible"
              label="Biển số xe"
              multiline
              onChange={handleChangeCarNumber}
              value={carNumber}
              maxRows={4}
              variant="filled"
            />
            <FormControl sx={{ m: 1, width: "100%" }}>
              <InputLabel
                required
                id="demo-select-small-label"
                className="city-select-label"
              >
                Số đời chủ
              </InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={owner}
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
            </FormControl>
          </div>
          <div className="display-flex">
            <div className="accessories">
              <span>Có phụ kiện đi kèm</span>
              <div className="buttons">
                <CustomButtonSelect
                  handleClick={() => handleAccessories("Có")}
                  isActive={accessories === "Có"}
                >
                  Có
                </CustomButtonSelect>
                <CustomButtonSelect
                  handleClick={() => handleAccessories("Không")}
                  isActive={accessories === "Không"}
                >
                  Không
                </CustomButtonSelect>
              </div>
            </div>
            <div className="registry">
              <span>Còn hạn đăng kiểm</span>
              <div className="buttons">
                <CustomButtonSelect
                  handleClick={() => handleRegistry("Có")}
                  isActive={registry === "Có"}
                >
                  Có
                </CustomButtonSelect>
                <CustomButtonSelect
                  handleClick={() => handleRegistry("Không")}
                  isActive={registry === "Không"}
                >
                  Không
                </CustomButtonSelect>
              </div>
            </div>
          </div>
        </div>
        <div className="gap">
          <NumberInput
            className="number-input-form"
            defaultValue={0}
            onChangeNumber={onChangeNumber}
          ></NumberInput>
          <NumberInputPrice
            onChangePrice={onChangePrice}
            className=""
          ></NumberInputPrice>
        </div>
      </div>
      <TitlePostSell
        value={value}
        color={color}
        price={price}
        carNumber={carNumber}
        owner={owner}
        country={country}
        sit={sit}
        activeButton={activeButton}
        accessories={accessories}
        registry={registry}
        km={km}
        numberBox={numberBox}
        status={status}
      ></TitlePostSell>
    </div>
  );
};
export default RenderOto;
