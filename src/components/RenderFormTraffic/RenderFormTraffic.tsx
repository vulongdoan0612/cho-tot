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
import dayjs, { Dayjs } from "dayjs";
import carsit from "./carsit.json";
import CustomButtonSelect from "../CustomButtonSelect";
import NumberInput from "../NumberInput/NumberInput";
import NumberInputPrice from "../NumberInputPrice/NumberInputPrice";
import TitlePostSell from "../TitlePostSell/TitlePostSell";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { defaultCommonState } from "./_mock";
import { ICommonStateFormRenderCar } from "@/interfaces/User";
import moment from "moment";
import { useRouter } from "next/router";

const RenderOto = ({ handleWarning, fileList }: any) => {
  const { dataPost } = useSelector((state: RootState) => state.postSell);
  const dispatch = useDispatch<AppDispatch>();
  const [stateForm, setStateForm] =
    useState<ICommonStateFormRenderCar>(defaultCommonState);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    const selectedModels =
      brandList.find((item: any) => item.brand === dataPost?.post?.value)
        ?.models || [];

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
  };
  const handleChangeSit = (event: SelectChangeEvent) => {
    setStateForm((prevState) => ({
      ...prevState,
      sit: event?.target?.value,
    }));
  };
  const handleChange = (event: SelectChangeEvent) => {
    const selectedModels =
      brandList.find((item: any) => item.brand === event?.target.value)
        ?.models || [];
    setStateForm((prevState) => ({
      ...prevState,
      models: selectedModels,
      value: event?.target.value as string,
    }));
  };
  const handleChangeModels = (event: SelectChangeEvent) => {
    setStateForm((prevState) => ({
      ...prevState,
      model: event?.target?.value,
    }));
  };
  const handleChangeColor = (event: SelectChangeEvent) => {
    setStateForm((prevState) => ({
      ...prevState,
      color: event?.target?.value,
    }));
  };
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    const momentDateCCCD = moment(dateString);
    const formattedDateCCCD = momentDateCCCD.format("YYYY");
    setStateForm((prevState) => ({
      ...prevState,
      dateCar: formattedDateCCCD,
    }));
  };
  const handleChangeCarNumber = (event: any) => {
    setStateForm((prevState) => ({
      ...prevState,
      carNumber: event?.target?.value,
    }));
  };
  const handleChangeOwner = (event: SelectChangeEvent) => {
    setStateForm((prevState) => ({
      ...prevState,
      owner: event?.target?.value,
    }));
  };

  const onChangeNumber: InputNumberProps["onChange"] = (value) => {
    setStateForm((prevState) => ({
      ...prevState,
      km: String(value),
    }));
  };
  const onChangePrice: InputNumberProps["onChange"] = (value) => {
    setStateForm((prevState) => ({
      ...prevState,
      price: String(value),
    }));
  };
  const handleFuel = (fuelType: any) => {
    setStateForm((prevState) => ({
      ...prevState,
      activeButton: fuelType,
    }));
  };
  const handleAccessories = (accessories: any) => {
    setStateForm((prevState) => ({
      ...prevState,
      accessories: accessories,
    }));
  };
  const handleRegistry = (registry: any) => {
    setStateForm((prevState) => ({
      ...prevState,
      registry: registry,
    }));
  };
  const handleNumberBox = (NumberBox: any) => {
    setStateForm((prevState) => ({
      ...prevState,
      numberBox: NumberBox,
    }));
  };
  const handleChangeForm = (event: SelectChangeEvent) => {
    setStateForm((prevState) => ({
      ...prevState,
      form: event?.target?.value,
    }));
  };
  const handleStatus = (status: any) => {
    setStateForm((prevState) => ({
      ...prevState,
      status: status,
    }));
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
              isActive={stateForm.status === "Đã sử dụng"}
            >
              Đã sử dụng
            </CustomButtonSelect>
            <CustomButtonSelect
              handleClick={() => handleStatus("Mới")}
              isActive={stateForm.status === "Mới"}
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
              value={stateForm?.model}
              disabled={stateForm?.value ? false : true}
              label="Dòng xe"
              onChange={handleChangeModels}
            >
              {stateForm?.models.map((item: any, index: any) => {
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
            value={stateForm.dateCar !== "" ? dayjs(stateForm.dateCar) : null}
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
              isActive={stateForm?.numberBox === "Tự động"}
            >
              Tự động
            </CustomButtonSelect>
            <CustomButtonSelect
              handleClick={() => handleNumberBox("Số sàn")}
              isActive={stateForm?.numberBox === "Số sàn"}
            >
              Số sàn
            </CustomButtonSelect>
            <CustomButtonSelect
              handleClick={() => handleNumberBox("Bán tự động")}
              isActive={stateForm?.numberBox === "Bán tự động"}
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
              isActive={stateForm?.activeButton === "Xăng"}
            >
              Xăng
            </CustomButtonSelect>
            <CustomButtonSelect
              handleClick={() => handleFuel("Dầu")}
              isActive={stateForm?.activeButton === "Dầu"}
            >
              Dầu
            </CustomButtonSelect>
            <CustomButtonSelect
              handleClick={() => handleFuel("Động cơ Hybrid")}
              isActive={stateForm?.activeButton === "Động cơ Hybrid"}
            >
              Động cơ Hybrid
            </CustomButtonSelect>
            <CustomButtonSelect
              handleClick={() => handleFuel("Điện")}
              isActive={stateForm?.activeButton === "Điện"}
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
                value={stateForm?.country}
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
                value={stateForm?.form}
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
                value={stateForm?.sit}
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
                value={stateForm?.color}
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
              value={stateForm?.carNumber}
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
                value={stateForm?.owner}
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
                  isActive={stateForm?.accessories === "Có"}
                >
                  Có
                </CustomButtonSelect>
                <CustomButtonSelect
                  handleClick={() => handleAccessories("Không")}
                  isActive={stateForm?.accessories === "Không"}
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
                  isActive={stateForm?.registry === "Có"}
                >
                  Có
                </CustomButtonSelect>
                <CustomButtonSelect
                  handleClick={() => handleRegistry("Không")}
                  isActive={stateForm?.registry === "Không"}
                >
                  Không
                </CustomButtonSelect>
              </div>
            </div>
          </div>
        </div>
        <div className="gap">
          <NumberInput
            value={stateForm?.km}
            className="number-input-form"
            onChangeNumber={onChangeNumber}
          ></NumberInput>
          <NumberInputPrice
            value={stateForm?.price}
            onChangePrice={onChangePrice}
            className=""
          ></NumberInputPrice>
        </div>
      </div>
      <TitlePostSell
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
