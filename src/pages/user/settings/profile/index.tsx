import { useEffect, useState } from "react";
import Page from "@/layout/Page";
import { RootState } from "@/redux/store";
import { Breadcrumb, DatePicker, DatePickerProps, Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { parse, format } from "date-fns";
import { ArrowInputIcon } from "@/components/CustomIcons";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import moment from "moment";

import axios from "axios";
import ModalAddressUser from "@/components/Modal/ModalAddressUser";
import ModalCCCCD from "@/components/Modal/ModalCCCD";
import ModalFav from "@/components/Modal/ModalFav";
import { ICommonState } from "@/interfaces/User";
import { defaultCommonState } from "./_mock";
import dataFav from "./dataFav.json";
import CustomButton from "@/components/CustomButton";
import { setAuthenticate } from "@/redux/reducers/auth";
import { changeProfile } from "@/services/user";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import Setting from "@/layout/Setting";
import useDidMountEffect from "@/utils/customUseEffect";

const User = () => {
  const dispatch = useDispatch();

  const [stateUser, setStateUser] = useState<ICommonState>(defaultCommonState);

  const { account } = useSelector((state: RootState) => state.auth);
  const { countdownDuration, loading } = useSelector(
    (state: RootState) => state.countDownLoading
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
        );
        setStateUser((prevState) => ({
          ...prevState,
          cities: response.data,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const updateProfile = async () => {
    const token = localStorage.getItem("access_token");
    try {
      if (token) {
        try {
        } finally {
          const updateProfile = {
            address: {
              city: stateUser?.cityValue,
              district: stateUser?.districtValue,
              ward: stateUser?.wardValue,
              detailAddress: stateUser?.detailAddress,
              fullAddress: stateUser?.fullAddress,
            },
            introduction: stateUser?.introducing,
            rememberName: stateUser?.rememberName,
            identifyCard: {
              CMND: stateUser?.cccd,
              date: stateUser?.dateCCCD,
              location: stateUser?.location,
              fullCMND: stateUser?.fullCCCD,
            },
            faxNumber: stateUser?.numberFax,
            favouriteList: stateUser?.selectedItemFav,
            sex: stateUser?.sex,
            birthdate: stateUser?.birth,
          };
          const response = await changeProfile(String(token), updateProfile);
          if (response.status === 200) {
            toast(response.data.message);
          }
        }
      }
    } catch {
      console.log("error");
    }
  };

  const onChangeDate: DatePickerProps<any>["onChange"] = (date, dateString) => {
    const momentDateCCCD = moment(dateString);
    const formattedDateCCCD = momentDateCCCD.format("YYYY-MM-DD");
    setStateUser((prevState) => ({
      ...prevState,
      dateCCCD: formattedDateCCCD,
    }));
  };

  const onChangeBirth: DatePickerProps<any>["onChange"] = (
    date,
    dateString
  ) => {
    const birthDate = moment(dateString);
    const formattedDateBirth = birthDate.format("YYYY-MM-DD");
    setStateUser((prevState: any) => ({
      ...prevState,
      birth: formattedDateBirth,
    }));
  };
  useEffect(() => {
    if (account) {
      setStateUser((prevState) => ({
        ...prevState,
        cityValue: account?.address?.city,
        districtValue: account?.address?.district,
        wardValue: account?.address?.ward,
        detailAddress: account?.address?.detailAddress,
        fullAddress: account?.address?.fullAddress,
      }));
    }
  }, [account]);
  useEffect(() => {
    if (account?.address?.city !== null) {
      const selectedCityId = account?.address?.city;
      const selectedCity = stateUser.cities.find(
        (city: any) => city.Id === selectedCityId
      );
      if (selectedCity) {
        setStateUser((prevState) => ({
          ...prevState,
          districts: selectedCity.Districts,
        }));
      }
    }
  }, [
    account,
    account?.address,
    account?.address?.city,
    account?.address?.district,
    account?.address?.ward,
  ]);
  useEffect(() => {
    if (stateUser.districts.length > 0) {
      const selectedDistrictId = account?.address?.district;
      const selectedDistrict = stateUser?.districts?.find(
        (district: any) => district.Id === selectedDistrictId
      );

      if (selectedDistrict) {
        setStateUser((prevState) => ({
          ...prevState,
          wards: selectedDistrict?.Wards,
        }));
      }
    }
  }, [stateUser.districts]);

  const handleCityChange = (event: any) => {
    const selectedCityId = event.target.value;
    const selectedCity = stateUser.cities.find(
      (city: any) => city.Id === selectedCityId
    );
    if (selectedCity) {
      setStateUser((prevState) => ({
        ...prevState,
        cityValue: event.target.value,
        districts: selectedCity.Districts,
        wards: [],
        districtValue: "",
        wardValue: "",
      }));
    }
  };
  const handleDistrictChange = (event: any) => {
    const selectedDistrictId = event.target.value;
    const selectedDistrict = stateUser.districts.find(
      (district: any) => district?.Id === selectedDistrictId
    );

    if (selectedDistrict) {
      setStateUser((prevState) => ({
        ...prevState,
        districtValue: event.target.value,
        wards: selectedDistrict?.Wards,
      }));
    }
  };

  const handleChangeDetailAddress = (event: any) => {
    setStateUser((prevState) => ({
      ...prevState,
      detailAddress: event.target.value as string,
    }));
  };
  const handleCCCD = (event: any) => {
    setStateUser((prevState: any) => ({
      ...prevState,
      cccd: event.target.value as string,
    }));
  };
  const handleFav = (event: any) => {
    setStateUser((prevState: any) => ({
      ...prevState,
      selectedItemFav: event.target.value,
    }));
  };
  const handleLocation = (event: any) => {
    setStateUser((prevState: any) => ({
      ...prevState,
      location: event.target.value,
    }));
  };
  const handleChangeWard = (event: SelectChangeEvent) => {
    setStateUser((prevState: any) => ({
      ...prevState,
      wardValue: event.target.value,
    }));
  };
  const handleCancleModal = () => {
    setStateUser((prevState: any) => ({
      ...prevState,
      modalConfirmSwitch: false,
    }));
  };
  const handleCancleModalFav = () => {
    setStateUser((prevState: any) => ({
      ...prevState,
      modalConfirmSwitchFav: false,
    }));
  };
  const handleCancleModalCCCD = () => {
    setStateUser((prevState: any) => ({
      ...prevState,
      modalConfirmSwitchCCCD: false,
    }));
  };

  useEffect(() => {
    if (account?.rememberName) {
      setStateUser((prevState) => ({
        ...prevState,
        rememberName: account?.rememberName,
      }));
    }
  }, [account?.rememberName]);
  useEffect(() => {
    if (account?.birthdate) {
      setStateUser((prevState) => ({
        ...prevState,
        birth: account?.birthdate,
      }));
    }
  }, [account?.birthdate]);
  useEffect(() => {
    if (
      account?.identifyCard?.CMND ||
      account?.identifyCard?.date ||
      account?.identifyCard?.location
    ) {
      setStateUser((prevState) => ({
        ...prevState,
        cccd: account?.identifyCard?.CMND,
        dateCCCD: account?.identifyCard?.date,
        location: account?.identifyCard?.location,
        fullCCCD: account?.identifyCard?.fullCMND,
      }));
    }
  }, [
    account?.identifyCard?.CMND,
    account?.identifyCard?.date,
    account?.identifyCard?.location,
    account?.identifyCard?.fullCMND,
  ]);
  useEffect(() => {
    if (account?.introduction) {
      setStateUser((prevState) => ({
        ...prevState,
        introducing: account?.introduction,
      }));
    }
  }, [account?.introduction]);
  useEffect(() => {
    if (account?.fullname) {
      setStateUser((prevState) => ({
        ...prevState,
        fullName: account?.fullname,
      }));
    }
  }, [account?.fullname]);
  useEffect(() => {
    if (account?.faxNumber) {
      setStateUser((prevState) => ({
        ...prevState,
        numberFax: account?.faxNumber,
      }));
    }
  }, [account?.faxNumber]);
  useEffect(() => {
    if (account?.sex) {
      setStateUser((prevState) => ({
        ...prevState,
        sex: account?.sex,
      }));
    }
  }, [account?.sex]);
  useEffect(() => {
    if (account?.favouriteList) {
      setStateUser((prevState) => ({
        ...prevState,
        selectedItemFav: account?.favouriteList,
      }));
    }
  }, [account?.favouriteList]);
  const handleModal = () => {
    setStateUser((prevState: any) => ({
      ...prevState,
      modalConfirmSwitch: true,
    }));
  };
  const handleModalCCCD = () => {
    setStateUser((prevState: any) => ({
      ...prevState,
      modalConfirmSwitchCCCD: true,
    }));
  };
  const handleModalFav = () => {
    setStateUser((prevState: any) => ({
      ...prevState,
      modalConfirmSwitchFav: true,
    }));
  };
  const onFinish = () => {
    let wardName = "";
    let city = "";
    let district = "";

    stateUser.wards.forEach((item: any) => {
      if (item.Id === stateUser.wardValue) {
        wardName = item.Name;
      }
    });
    stateUser.districts.forEach((item: any) => {
      if (item.Id === stateUser.districtValue) {
        district = item.Name;
      }
    });
    stateUser.cities.forEach((item: any) => {
      if (item.Id === stateUser.cityValue) {
        city = item.Name;
      }
    });
    const concatenatedAddress = `${stateUser.detailAddress} ,${wardName}, ${district}, ${city}`;
    setStateUser((prevState: any) => ({
      ...prevState,
      fullAddress: concatenatedAddress,
    }));

    setStateUser((prevState: any) => ({
      ...prevState,
      modalConfirmSwitch: false,
    }));
  };
  const onFinishCCCD = () => {
    const momentDateCCCD = moment(stateUser.dateCCCD);
    const formattedDateCCCD = momentDateCCCD.format("YYYY-MM-DD");
    const concatenatedCCCD = `${stateUser.cccd}, ${formattedDateCCCD}, ${stateUser.location}`;

    setStateUser((prevState: any) => ({
      ...prevState,
      fullCCCD: concatenatedCCCD,
      modalConfirmSwitchCCCD: false,
    }));
  };
  const onFinishFav = () => {
    setStateUser((prevState: any) => ({
      ...prevState,
      modalConfirmSwitchFav: false,
      selectedItemFav: stateUser?.selectedItemFav,
    }));
  };
  const handleAddFav = (index: any, item: any) => {
    if (stateUser.selectedItemFav.includes(item)) {
      setStateUser((prevState: any) => ({
        ...prevState,
        selectedItemFav: stateUser.selectedItemFav.filter(
          (selectedItem: any) => selectedItem !== item
        ),
      }));
    } else {
      setStateUser((prevState: any) => ({
        ...prevState,
        selectedItemFav: [...stateUser.selectedItemFav, item],
      }));
    }
  };
  const handleChangeFullName = (event: any) => {
    setStateUser((prevState: any) => ({
      ...prevState,
      fullName: event.target.value,
    }));
  };

  const handleChangeIntroducing = (event: any) => {
    setStateUser((prevState: any) => ({
      ...prevState,
      introducing: event.target.value,
    }));
  };
  const handleChangeRemember = (event: any) => {
    setStateUser((prevState: any) => ({
      ...prevState,
      rememberName: event.target.value,
    }));
  };
  const handleChangeNumberFax = (event: any) => {
    setStateUser((prevState: any) => ({
      ...prevState,
      numberFax: event.target.value,
    }));
  };
  const handleChangeSex = (event: SelectChangeEvent) => {
    setStateUser((prevState: any) => ({
      ...prevState,
      sex: event.target.value,
    }));
  };
  return (
    <Page style={{ backgroundColor: "#f4f4f4" }}>
      <Setting title="Thông tin cá nhân" active="1">
        {" "}
        <div className="information">
          <span className="title">Hồ sơ cá nhân</span>
          <div className="form-input">
            <div className="first-line input-need-to-custom">
              {" "}
              <div className="fullname">
                {loading ? (
                  <Skeleton.Input
                    block={true}
                    active
                    size="large"
                  ></Skeleton.Input>
                ) : (
                  <TextField
                    required
                    className="fullname"
                    id="filled-multiline-flexible"
                    label="Họ và tên"
                    multiline
                    onChange={handleChangeFullName}
                    value={stateUser.fullName}
                    maxRows={4}
                    variant="filled"
                  />
                )}
              </div>
              <div
                className={`phone ${
                  account?.phone ? "phone-exit" : "phone-not-exit"
                }`}
              >
                {loading ? (
                  <Skeleton.Input
                    block={true}
                    active
                    size="large"
                  ></Skeleton.Input>
                ) : (
                  <>
                    <TextField
                      required
                      className="phone"
                      disabled={true}
                      id="filled-multiline-flexible"
                      label="Số điện thoại"
                      multiline
                      maxRows={4}
                      variant="filled"
                      defaultValue={account?.phone}
                    />
                    {account?.phone ? (
                      <span className="change-phone">Thay đổi</span>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </div>
            </div>
            {loading ? (
              <Skeleton.Input block={true} active size="large"></Skeleton.Input>
            ) : (
              <div
                className="second-line input-need-to-custom"
                onClick={handleModal}
              >
                <TextField
                  className="fullname"
                  id="filled-multiline-flexible"
                  label="Địa chỉ"
                  value={stateUser.fullAddress}
                  multiline
                  maxRows={4}
                  variant="filled"
                />
                <ArrowInputIcon></ArrowInputIcon>
              </div>
            )}
            {loading ? (
              <Skeleton.Input
                block={true}
                active
                size="large"
                style={{ height: "155px" }}
              ></Skeleton.Input>
            ) : (
              <div className="introducing">
                <TextField
                  className="text-area"
                  id="filled-multiline-flexible"
                  label="Giới thiệu"
                  multiline
                  value={stateUser.introducing}
                  onChange={handleChangeIntroducing}
                  maxRows={4}
                  variant="filled"
                />
              </div>
            )}
            <div className="remember-name input-need-to-custom">
              {loading ? (
                <Skeleton.Input
                  block={true}
                  active
                  size="large"
                ></Skeleton.Input>
              ) : (
                <TextField
                  className="rembember"
                  id="filled-multiline-flexible"
                  label="Tên gợi nhớ"
                  value={stateUser.rememberName || account?.rememberName}
                  onChange={handleChangeRemember}
                  multiline
                  maxRows={4}
                  variant="filled"
                />
              )}
              <p className="text">
                https://www.chotot.com/user/<span>dsadasdsadasd</span>
              </p>
              <p className="des">
                Tên gợi nhớ sau khi được cập nhật sẽ không thể thay đổi trong
                vòng 60 ngày tới.
              </p>
            </div>
          </div>
        </div>
        <div className="security">
          <span className="title">Thông tin bảo mật</span>
          <p className="des-sec">
            Những thông tin dưới đây mang tính bảo mật. Chỉ bạn mới có thể thấy
            và chỉnh sửa những thông tin này.
          </p>
          <div className="form-input">
            <div
              className={`email input-need-to-custom ${
                account?.email !== "" ? "email-exit" : "email-not-exit"
              }`}
            >
              <TextField
                className="email"
                id="filled-multiline-flexible"
                label={`${account?.email !== "" ? "Email" : "Thêm email"}`}
                multiline
                maxRows={4}
                variant="filled"
              />
            </div>
            {loading ? (
              <Skeleton.Input block={true} active size="large"></Skeleton.Input>
            ) : (
              <div
                className="second-line input-arrow"
                onClick={handleModalCCCD}
              >
                <TextField
                  className="fullname"
                  id="filled-multiline-flexible"
                  label="CCCD / CMND / Hộ chiếu"
                  value={stateUser.fullCCCD}
                  multiline
                  maxRows={4}
                  variant="filled"
                />
                <ArrowInputIcon></ArrowInputIcon>
              </div>
            )}
            {loading ? (
              <Skeleton.Input block={true} active size="large"></Skeleton.Input>
            ) : (
              <div className="fax-number input-need-to-custom">
                <TextField
                  className="fax"
                  id="filled-multiline-flexible"
                  label="Mã số thuế"
                  value={stateUser.numberFax}
                  onChange={handleChangeNumberFax}
                  multiline
                  maxRows={4}
                  variant="filled"
                />
              </div>
            )}
            {loading ? (
              <Skeleton.Input block={true} active size="large"></Skeleton.Input>
            ) : (
              <div className="second-line input-arrow" onClick={handleModalFav}>
                <TextField
                  className="fullname"
                  id="filled-multiline-flexible"
                  label="Danh mục yêu thích"
                  value={stateUser.selectedItemFav}
                  onChange={handleFav}
                  multiline
                  maxRows={4}
                  variant="filled"
                />
                <ArrowInputIcon></ArrowInputIcon>
              </div>
            )}
            {loading ? (
              <Skeleton.Input block={true} active size="large"></Skeleton.Input>
            ) : (
              <div className="bottom">
                <div className="sex">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Giới tính
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={stateUser.sex}
                      label="Giới tính"
                      onChange={handleChangeSex}
                    >
                      <MenuItem value={"Nam"}>Nam</MenuItem>
                      <MenuItem value={"Nữ"}>Nữ</MenuItem>
                      <MenuItem value={"Khác"}>Khác</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="birth-date">
                  <div className="date input-need-to-custom">
                    <DatePicker
                      value={
                        stateUser.birth !== "" ? dayjs(stateUser.birth) : null
                      }
                      onChange={onChangeBirth}
                      placeholder={"Ngày sinh"}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <CustomButton
          type="submit"
          className="save-change"
          onClick={updateProfile}
        >
          Lưu thay đổi
        </CustomButton>
      </Setting>
      <ModalAddressUser
        cityValue={stateUser.cityValue}
        districtValue={stateUser.districtValue}
        wardValue={stateUser.wardValue}
        detailAddress={stateUser.detailAddress}
        modalConfirmSwitch={stateUser.modalConfirmSwitch}
        handleCancleModal={handleCancleModal}
        handleCityChange={handleCityChange}
        cities={stateUser.cities}
        districts={stateUser.districts}
        wards={stateUser.wards}
        handleDistrictChange={handleDistrictChange}
        handleChangeWard={handleChangeWard}
        handleChangeDetailAddress={handleChangeDetailAddress}
        onFinish={onFinish}
      ></ModalAddressUser>
      <ModalCCCCD
        modalConfirmSwitchCCCD={stateUser.modalConfirmSwitchCCCD}
        handleCancleModalCCCD={handleCancleModalCCCD}
        handleCCCD={handleCCCD}
        cccd={stateUser.cccd}
        date={stateUser.dateCCCD}
        location={stateUser.location}
        onChangeDate={onChangeDate}
        handleLocation={handleLocation}
        onFinishCCCD={onFinishCCCD}
      ></ModalCCCCD>
      <ModalFav
        selectedItemFav={stateUser.selectedItemFav}
        dataFav={dataFav}
        modalConfirmSwitchFav={stateUser.modalConfirmSwitchFav}
        handleCancleModalFav={handleCancleModalFav}
        activeIndices={stateUser.activeIndices}
        handleAddFav={handleAddFav}
        onFinishFav={onFinishFav}
      ></ModalFav>
    </Page>
  );
};

export default User;
