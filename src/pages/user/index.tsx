import { useEffect, useState } from "react";
import Page from "@/layout/Page";
import { RootState } from "@/redux/store";
import { Breadcrumb, DatePickerProps, Skeleton } from "antd";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { ArrowInputIcon } from "@/components/CustomIcons";
import { SelectChangeEvent } from "@mui/material";
import axios from "axios";
import ModalAddressUser from "@/components/Modal/ModalAddressUser";
import ModalCCCCD from "@/components/Modal/ModalCCCD";
import ModalFav from "@/components/Modal/ModalFav";
import { ICommonState } from "@/interfaces/User";
import { defaultCommonState } from "./_mock";
import dataFav from "./dataFav.json";
const User = () => {
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

  const onChangeDate: DatePickerProps["onChange"] = (dateString) => {
    setStateUser((prevState) => ({
      ...prevState,
      date: dateString,
    }));
  };
  const handleCityChange = (event: any) => {
    const selectedCityId = event.target.value;
    const selectedCity = stateUser.cities.find(
      (city: any) => city.Id === selectedCityId
    );

    if (selectedCity) {
      setStateUser((prevState) => ({
        ...prevState,
        cityConcat: selectedCity.Name,
        cityValue: event.target.value,
        districts: selectedCity.Districts || [],
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
        districtConcat: selectedDistrict.Name,
        districtValue: event.target.value,
        wards: selectedDistrict?.Wards,
      }));
    }
  };

  const handleChangeDetailAddress = (event: any) => {
    setStateUser((prevState) => ({
      ...prevState,
      detailAddress: event.target.value,
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
      fullFav: event.target.value,
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
      awardValue: event.target.value,
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
    stateUser.wards.forEach((item: any) => {
      if (item.Id === stateUser.wardValue) {
        wardName = item.Name;
      }
    });
    const concatenatedAddress = `${stateUser.detailAddress}, ${wardName}, ${stateUser.districtConcat}, ${stateUser.cityConcat}`;
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
    const concatenatedCCCD = `${stateUser.cccd}, ${stateUser.date}, ${location}`;
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
      fullFav: stateUser.activeIndices.map((item: any) => item.name),
    }));
    console.log(stateUser.activeIndices);
  };
  const handleAddFav = (index: any, item: any) => {
    const currentIndex = stateUser.activeIndices.indexOf(index);
    let newActiveIndices = [...stateUser.activeIndices];
    if (currentIndex === -1) {
      newActiveIndices.push({ id: index, name: item });
    } else {
      newActiveIndices.splice(currentIndex, 1);
    }
    setStateUser((prevState: any) => ({
      ...prevState,
      activeIndices: newActiveIndices,
    }));
  };
  return (
    <Page style={{ backgroundColor: "#f4f4f4" }}>
      <div className="user-wrapper">
        {" "}
        <Breadcrumb
          className="breadcrumb-user-page"
          separator=">"
          items={[
            {
              title: "Chợ tốt",
            },
            {
              title: `Trang cá nhân của ${account?.user?.fullname}`,
            },
            {
              title: "Thông tin cá nhân",
            },
          ]}
        />
        <span className="title">Thông tin cá nhân</span>
        <div className="container">
          <div className="left">
            <div className="left-content">
              <ul>
                <li>Thông tin cá nhân</li>
                <li>Liên kết mạng xã hội</li>
                <li>Cài đặt tài khoản</li>
                <li>Quản lý lịch sử đăng nhập</li>
              </ul>
            </div>
          </div>
          <div className="right">
            <div className="right-content">
              <div className="information">
                <span className="title">Hồ sơ cá nhân</span>
                <div className="form-input">
                  <div className="first-line input-need-to-custom">
                    {" "}
                    <div className="fullname">
                      <TextField
                        required
                        className="fullname"
                        id="filled-multiline-flexible"
                        label="Họ và tên"
                        multiline
                        maxRows={4}
                        variant="filled"
                      />
                    </div>
                    <div
                      className={`phone ${
                        account?.user?.phone ? "phone-exit" : "phone-not-exit"
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
                            defaultValue={account?.user?.phone}
                          />
                          {account?.user?.phone ? (
                            <span className="change-phone">Thay đổi</span>
                          ) : (
                            <></>
                          )}
                        </>
                      )}
                    </div>
                  </div>

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
                  <div className="introducing">
                    <TextField
                      className="text-area"
                      id="filled-multiline-flexible"
                      label="Giới thiệu"
                      multiline
                      maxRows={4}
                      variant="filled"
                    />
                  </div>
                  <div className="remember-name input-need-to-custom">
                    <TextField
                      className="rembember"
                      id="filled-multiline-flexible"
                      label="Tên gợi nhớ"
                      multiline
                      maxRows={4}
                      variant="filled"
                    />
                    <p className="text">
                      https://www.chotot.com/user/<span>dsadasdsadasd</span>
                    </p>
                    <p className="des">
                      Tên gợi nhớ sau khi được cập nhật sẽ không thể thay đổi
                      trong vòng 60 ngày tới.
                    </p>
                  </div>
                </div>
              </div>
              <div className="security">
                <span className="title">Thông tin bảo mật</span>
                <p className="des-sec">
                  Những thông tin dưới đây mang tính bảo mật. Chỉ bạn mới có thể
                  thấy và chỉnh sửa những thông tin này.
                </p>
                <div className="form-input">
                  <div
                    className={`email input-need-to-custom ${
                      account?.user?.email !== ""
                        ? "email-exit"
                        : "email-not-exit"
                    }`}
                  >
                    <TextField
                      className="email"
                      id="filled-multiline-flexible"
                      label={`${
                        account?.user?.email !== "" ? "Email" : "Thêm email"
                      }`}
                      multiline
                      maxRows={4}
                      variant="filled"
                    />
                  </div>
                  <div className="second-line" onClick={handleModalCCCD}>
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
                  <div className="fax-number input-need-to-custom">
                    <TextField
                      className="fax"
                      id="filled-multiline-flexible"
                      label="Mã số thuế"
                      multiline
                      maxRows={4}
                      variant="filled"
                    />
                  </div>
                  <div className="second-line" onClick={handleModalFav}>
                    <TextField
                      className="fullname"
                      id="filled-multiline-flexible"
                      label="Danh mục yêu thích"
                      value={stateUser.fullFav}
                      onChange={handleFav}
                      multiline
                      maxRows={4}
                      variant="filled"
                    />
                    <ArrowInputIcon></ArrowInputIcon>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <ModalAddressUser
        modalConfirmSwitch={stateUser.modalConfirmSwitch}
        handleCancleModal={handleCancleModal}
        cityValue={stateUser.cityValue}
        handleCityChange={handleCityChange}
        cities={stateUser.cities}
        districts={stateUser.districts}
        districtValue={stateUser.districtValue}
        handleDistrictChange={handleDistrictChange}
        wards={stateUser.wards}
        wardValue={stateUser.wardValue}
        handleChangeWard={handleChangeWard}
        handleChangeDetailAddress={handleChangeDetailAddress}
        detailAddress={stateUser.detailAddress}
        onFinish={onFinish}
      ></ModalAddressUser>
      <ModalCCCCD
        modalConfirmSwitchCCCD={stateUser.modalConfirmSwitchCCCD}
        handleCancleModalCCCD={handleCancleModalCCCD}
        handleCCCD={handleCCCD}
        onChangeDate={onChangeDate}
        handleLocation={handleLocation}
        onFinishCCCD={onFinishCCCD}
      ></ModalCCCCD>
      <ModalFav
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
