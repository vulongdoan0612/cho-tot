import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CustomModal from "../CustomModal";
import CustomButton from "../CustomButton";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";

const ModalAddressUser = ({
  modalConfirmSwitch,
  handleCancleModal,
  cityValue,
  handleCityChange,
  cities,
  districts,
  districtValue,
  handleDistrictChange,
  wards,
  wardValue,
  handleChangeWard,
  handleChangeDetailAddress,
  detailAddress,
  onFinish,
}: any) => {
  const { account } = useSelector((state: RootState) => state.auth);
  return (
    <CustomModal
      title="Địa chỉ"
      open={modalConfirmSwitch}
      onCancel={handleCancleModal}
      style={{ textAlign: "center", color: "white" }}
      centered
      className="modal-address-user"
    >
      <FormControl sx={{ m: 1, width: "100%" }}>
        <InputLabel
          required
          id="demo-select-small-label"
          className="city-select-label"
        >
          Tỉnh, Thành phố
        </InputLabel>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={
            cityValue 
          }
          label="Tỉnh, Thành phố"
          onChange={(event) => {
            handleCityChange(event);
          }}
        >
          {cities.map((item: any) => (
            <MenuItem key={item.Id} value={item.Id === 0 ? "" : item.Id}>
              {item.Name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        sx={{ m: 1, width: "100%" }}
        disabled={districts.length < 1 ? true : false}
      >
        <InputLabel
          required
          id="demo-select-small-label"
          className="city-select-label"
        >
          Quận, Huyện, Thị xã
        </InputLabel>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={
            districtValue 
          }
          label="Quận, Huyện, Thị xã"
          onChange={handleDistrictChange}
        >
          {districts.map((item: any) => (
            <MenuItem key={item.Id} value={item.Id === 0 ? "" : item.Id}>
              {item.Name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        sx={{ m: 1, width: "100%" }}
        disabled={wards.length < 1 ? true : false}
      >
        <InputLabel
          id="demo-select-small-label"
          className="city-select-label"
          required
        >
          Phường, Xã, Thị trấn
        </InputLabel>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={wardValue}
          label="Quận, Huyện, Thị xã"
          onChange={(event) => handleChangeWard(event)}
        >
          {wards.map((item: any) => {
            return (
              <MenuItem key={item.Id} value={item.Id === 0 ? "" : item.Id}>
                {item.Name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: "100%" }}>
        <TextField
          className="fullname"
          id="filled-multiline-flexible"
          label="Địa chỉ cụ thể"
          multiline
          onChange={(event: any) => {
            handleChangeDetailAddress(event);
          }}
          value={
            detailAddress
          }
          maxRows={4}
          variant="filled"
        />
      </FormControl>
      <CustomButton
        type="submit"
        onClick={onFinish}
        style={{ marginTop: "8px" }}
      >
        Xong
      </CustomButton>
    </CustomModal>
  );
};
export default ModalAddressUser;
