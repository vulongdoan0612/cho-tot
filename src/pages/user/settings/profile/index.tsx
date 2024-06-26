import { useEffect, useState } from "react";
import Page from "@/layout/Page";
import { RootState } from "@/redux/store";
import { DatePicker, DatePickerProps, Skeleton, Spin } from "antd";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { ArrowInputIcon } from "@/components/CustomIcons";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import moment from "moment";
import axios from "axios";
import ModalAddressUser from "@/components/Modal/ModalAddressUser";
import ModalCCCCD from "@/components/Modal/ModalCCCD";
import ModalFav from "@/components/Modal/ModalFav";
import { ICommonState } from "@/interfaces/User";
import { defaultCommonState } from "../../../../components/_mock/mock";
import dataFav from "./dataFav.json";
import CustomButton from "@/components/CustomButton";
import { changeProfile } from "@/services/user";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import Setting from "@/layout/Setting";
import limitInputCharacters from "@/utils/limitInput";
import cookie from "cookie";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const User = () => {
  const { account } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [fillAddrCity, setFillAddrCity] = useState(false);
  const [fillAddrWard, setFillAddrWard] = useState(false);
  const [fillAddrDistrict, setFillAddrDistrict] = useState(false);
  const [fillAddrDetail, setFillAddrDetail] = useState(false);
  const [fillIntro, setFillIntro] = useState(false);
  const [fillRemem, setFillRemem] = useState(false);
  const [fillFax, setFillFax] = useState(false);
  const [fillFullAddr, setFillFullAddr] = useState(false);
  const [fillCCCD, setFillCCCD] = useState(false);
  const [fillCCCDFor, setFillCCCDFor] = useState(false);
  const [fillCCCDLocation, setFillCCCDLocation] = useState(false);
  const [fillFullCCCD, setFillFullCCCD] = useState(false);
  const [fillSex, setFillSex] = useState(false);
  const [fillBirth, setFillBirth] = useState(false);
  const [fillFav, setFillFav] = useState(false);
  const [selectItemsFav, setSelectItemsFav] = useState<any>([]);
  const [stateUser, setStateUser] = useState<ICommonState>(defaultCommonState);
  const [spin, setSpin] = useState(false);

  const contentFieldChanagedReason = (data: any) => {
    setStateUser((prevState: any) => ({
      ...prevState,
      introducing: data,
    }));
    if (data !== "") {
      setFillIntro(false);
    }
  };

  const config2 = {
    useSearch: false,
    minHeight: 200,
    spellcheck: false,
    toolbarAdaptive: false,
    toolbarSticky: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    minWidth: null,
    buttons: "bold,italic,underline,eraser,ul,ol,font,fontsize,lineHeight,hr,indent",
    placeholder: "Giới thiệu",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json");
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

  useEffect(() => {
    if (account?.user) {
      setStateUser((prevState) => ({
        ...prevState,
        cityValue: account?.user?.address?.cityValue,
        districtValue: account?.user?.address?.districtValue,
        wardValue: account?.user?.address?.wardValue,
        detailAddress: account?.user?.address?.detailAddress,
        fullAddress: account?.user?.address?.fullAddress,
      }));
    }
  }, [account?.user]);

  useEffect(() => {
    if (account?.user?.address?.city !== null) {
      const selectedCityId = account?.user?.address?.cityValue;
      const selectedCity = stateUser.cities.find((city: any) => city.Id === selectedCityId);
      if (selectedCity) {
        setStateUser((prevState) => ({
          ...prevState,
          districts: selectedCity.Districts,
        }));
      }
    }
  }, [
    account?.user,
    account?.user?.address,
    account?.user?.address?.city,
    account?.user?.address?.district,
    account?.user?.address?.ward,
    stateUser.cities,
  ]);
  useEffect(() => {
    if (stateUser.districts.length > 0) {
      const selectedDistrictId = account?.user?.address?.districtValue;
      const selectedDistrict = stateUser?.districts?.find((district: any) => district.Id === selectedDistrictId);

      if (selectedDistrict) {
        setStateUser((prevState) => ({
          ...prevState,
          wards: selectedDistrict?.Wards,
        }));
      }
    }
  }, [stateUser.districts]);

  useEffect(() => {
    setStateUser((prevState) => ({
      ...prevState,
      fullAddress: "",
    }));
  }, []);

  useEffect(() => {
    if (account?.user?.rememberName) {
      setStateUser((prevState) => ({
        ...prevState,
        rememberName: account?.user?.rememberName,
      }));
    }
  }, [account?.user?.rememberName]);

  useEffect(() => {
    if (account?.user?.birthdate) {
      setStateUser((prevState) => ({
        ...prevState,
        birth: account?.user?.birthdate,
      }));
    }
  }, [account?.user?.birthdate]);

  useEffect(() => {
    if (account?.user?.identifyCard?.CMND || account?.user?.identifyCard?.date || account?.user?.identifyCard?.location) {
      setStateUser((prevState) => ({
        ...prevState,
        cccd: account?.user?.identifyCard?.CMND,
        dateCCCD: dayjs(account?.user?.identifyCard?.date),
        location: account?.user?.identifyCard?.location,
        fullCCCD: account?.user?.identifyCard?.fullCMND,
      }));
    }
  }, [
    account?.user?.identifyCard?.CMND,
    account?.user?.identifyCard?.date,
    account?.user?.identifyCard?.location,
    account?.user?.identifyCard?.fullCMND,
  ]);

  useEffect(() => {
    if (account?.user?.introduction) {
      setStateUser((prevState) => ({
        ...prevState,
        introducing: account?.user?.introduction,
      }));
    }
  }, [account?.user?.introduction]);

  useEffect(() => {
    if (account?.user?.fullname) {
      setStateUser((prevState) => ({
        ...prevState,
        fullName: account?.user?.fullname,
      }));
    }
  }, [account?.user?.fullname]);

  useEffect(() => {
    if (account?.user?.faxNumber) {
      setStateUser((prevState) => ({
        ...prevState,
        numberFax: account?.user?.faxNumber,
      }));
    }
  }, [account?.user?.faxNumber]);

  useEffect(() => {
    if (account?.user?.sex) {
      setStateUser((prevState) => ({
        ...prevState,
        sex: account?.user?.sex,
      }));
    }
  }, [account?.user?.sex]);

  useEffect(() => {
    if (account?.user?.favouriteList) {
      setStateUser((prevState) => ({
        ...prevState,
        selectedItemFav: account?.user?.favouriteList,
      }));
      setSelectItemsFav(account?.user?.favouriteList);
    }
  }, [account?.user?.favouriteList]);

  const updateProfile = async () => {
    const token = localStorage.getItem("access_token");
    try {
      if (stateUser?.introducing === "" || stateUser?.introducing === undefined) {
        setFillIntro(true);
      }
      if (stateUser?.rememberName === "" || stateUser?.rememberName === undefined) {
        setFillRemem(true);
      }
      if (stateUser?.numberFax === "" || stateUser?.numberFax === undefined) {
        setFillFax(true);
      }
      if (selectItemsFav.length === 0 || selectItemsFav === undefined) {
        setFillFav(true);
      }
      if (stateUser.fullCCCD === "") {
        setFillFullCCCD(true);
      }
      if (stateUser.fullAddress === undefined || stateUser.fullAddress === "") {
        setFillFullAddr(true);
      }
      if (stateUser.sex === "") {
        setFillSex(true);
      }
      if (stateUser.birth === "") {
        setFillBirth(true);
      }
      if (
        token &&
        stateUser?.introducing !== "" &&
        stateUser?.introducing !== undefined &&
        stateUser?.rememberName !== "" &&
        stateUser?.rememberName !== undefined &&
        stateUser?.numberFax !== "" &&
        stateUser?.numberFax !== undefined &&
        selectItemsFav.length !== 0 &&
        selectItemsFav !== undefined &&
        stateUser.fullCCCD !== "" &&
        stateUser.fullAddress !== "" &&
        stateUser.fullAddress !== undefined &&
        stateUser.sex !== "" &&
        stateUser.birth !== ""
      ) {
        setSpin(true);
        let wardName = "";
        let city = "";
        let district = "";
        stateUser?.wards?.forEach((item: any) => {
          if (item.Id === stateUser?.wardValue) {
            wardName = item?.Name;
          }
        });
        stateUser?.districts?.forEach((item: any) => {
          if (item.Id === stateUser?.districtValue) {
            district = item?.Name;
          }
        });
        stateUser?.cities?.forEach((item: any) => {
          if (item.Id === stateUser?.cityValue) {
            city = item?.Name;
          }
        });
        const updateProfile = {
          address: {
            city: city,
            district: district,
            ward: wardName,
            cityValue: stateUser.cityValue,
            districtValue: stateUser.districtValue,
            wardValue: stateUser.wardValue,
            detailAddress: stateUser?.detailAddress,
            fullAddress: stateUser?.fullAddress,
          },
          fullname: stateUser.fullName,
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
          setFillIntro(false);
          setFillRemem(false);
          setFillFax(false);
          setFillFav(false);
          setFillFullCCCD(false);
          setFillFullAddr(false);
          setFillSex(false);
          setFillBirth(false);
          setTimeout(() => {
            toast(response.data.message);
            setSpin(false);
            router.push(`/user/${account?.user?._id}`);
          }, 500);
        }
      }
    } catch {
      console.log("error");
    }
  };

  const onChangeDate: DatePickerProps<any>["onChange"] = (date, dateString) => {
    const momentDateCCCD = moment(dateString);
    const formattedDateCCCD = momentDateCCCD.format("YYYY-MM-DD");
    if (formattedDateCCCD === "Invalid date") {
      setStateUser((prevState) => ({
        ...prevState,
        dateCCCD: undefined,
      }));
    } else {
      setStateUser((prevState) => ({
        ...prevState,
        dateCCCD: dayjs(formattedDateCCCD),
      }));
      if (formattedDateCCCD !== "Invalid date" || dateString !== "") {
        setFillCCCDFor(false);
      }
    }
  };

  const onChangeBirth: DatePickerProps<any>["onChange"] = (date, dateString) => {
    const birthDate = moment(dateString);
    const formattedDateBirth = birthDate.format("YYYY-MM-DD");
    setStateUser((prevState: any) => ({
      ...prevState,
      birth: formattedDateBirth,
    }));
    if (formattedDateBirth !== "Invalid date" || dateString !== "") {
      setFillBirth(false);
    }
  };

  const handleCityChange = (event: any) => {
    const selectedCityId = event.target.value;
    const selectedCity = stateUser.cities.find((city: any) => city.Id === selectedCityId);
    if (selectedCity) {
      setStateUser((prevState) => ({
        ...prevState,
        cityValue: event.target.value,
        districts: selectedCity.Districts,
        wards: [],
        districtValue: "",
        wardValue: "",
      }));
      if (event.target.value !== "") {
        setFillAddrCity(false);
      }
    }
  };

  const handleDistrictChange = (event: any) => {
    const selectedDistrictId = event.target.value;
    const selectedDistrict = stateUser.districts.find((district: any) => district?.Id === selectedDistrictId);

    if (selectedDistrict) {
      setStateUser((prevState) => ({
        ...prevState,
        districtValue: event.target.value,
        wards: selectedDistrict?.Wards,
      }));
      if (event.target.value !== "") {
        setFillAddrDistrict(false);
        setStateUser((prevState) => ({
          ...prevState,
          wardValue: "",
        }));
      }
    }
  };

  const handleChangeDetailAddress = (event: any) => {
    const newValue = limitInputCharacters(event?.target?.value, 50);

    setStateUser((prevState) => ({
      ...prevState,
      detailAddress: newValue as string,
    }));
    if (event.target.value !== "") {
      setFillAddrDetail(false);
    }
  };

  const handleCCCD = (event: any) => {
    setStateUser((prevState: any) => ({
      ...prevState,
      cccd: event.target.value as string,
    }));
    if (event.target.value !== "") {
      setFillCCCD(false);
    }
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
    if (event.target.value !== "") {
      setFillCCCDLocation(false);
    }
  };

  const handleChangeWard = (event: SelectChangeEvent) => {
    setStateUser((prevState: any) => ({
      ...prevState,
      wardValue: event.target.value,
    }));
    if (event.target.value !== "") {
      setFillAddrWard(false);
    }
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
    if (stateUser?.wardValue === undefined || stateUser?.wardValue === "") {
      setFillAddrWard(true);
    }
    if (stateUser?.districtValue === undefined || stateUser?.districtValue === "") {
      setFillAddrDistrict(true);
    }
    if (stateUser?.cityValue === undefined || stateUser?.cityValue === "") {
      setFillAddrCity(true);
    }
    if (stateUser?.detailAddress === undefined || stateUser?.detailAddress === "") {
      setFillAddrDetail(true);
    }
    if (
      stateUser?.cities &&
      stateUser?.detailAddress !== undefined &&
      stateUser?.cityValue !== undefined &&
      stateUser?.districtValue !== undefined &&
      stateUser?.wardValue !== undefined &&
      stateUser?.wardValue !== "" &&
      stateUser?.districtValue !== "" &&
      stateUser?.cityValue !== "" &&
      stateUser?.detailAddress !== ""
    ) {
      let wardName = "";
      let city = "";
      let district = "";
      stateUser?.wards?.forEach((item: any) => {
        if (item.Id === stateUser?.wardValue) {
          wardName = item?.Name;
        }
      });
      stateUser?.districts?.forEach((item: any) => {
        if (item.Id === stateUser?.districtValue) {
          district = item?.Name;
        }
      });
      stateUser?.cities?.forEach((item: any) => {
        if (item.Id === stateUser?.cityValue) {
          city = item?.Name;
        }
      });
      const concatenatedAddress = `${stateUser.detailAddress}, ${wardName}, ${district}, ${city}`;
      setStateUser((prevState: any) => ({
        ...prevState,
        fullAddress: concatenatedAddress,
        modalConfirmSwitch: false,
      }));
      if (concatenatedAddress !== "") {
        setFillFullAddr(false);
      }
      setFillAddrWard(false);
      setFillAddrDistrict(false);
      setFillAddrCity(false);
      setFillAddrDetail(false);
    }
  };

  const onFinishCCCD = () => {
    const momentDateCCCD = dayjs(stateUser.dateCCCD);
    const formattedDateCCCD = momentDateCCCD.format("YYYY-MM-DD");
    const concatenatedCCCD = `${stateUser.cccd}, ${formattedDateCCCD}, ${stateUser.location}`;
    if (stateUser.cccd === "" || stateUser.cccd === undefined) {
      setFillCCCD(true);
    }
    if (stateUser.dateCCCD === undefined || stateUser.dateCCCD === "") {
      setFillCCCDFor(true);
    }
    if (stateUser.location === "" || stateUser.location === undefined) {
      setFillCCCDLocation(true);
    }
    if (
      stateUser.location !== "" &&
      stateUser.location !== undefined &&
      stateUser.cccd !== "" &&
      stateUser.cccd !== undefined &&
      stateUser.dateCCCD !== undefined &&
      stateUser.dateCCCD !== "" &&
      stateUser.location !== "" &&
      stateUser.location !== undefined
    ) {
      setStateUser((prevState: any) => ({
        ...prevState,
        fullCCCD: concatenatedCCCD,
        modalConfirmSwitchCCCD: false,
      }));
      setFillCCCDLocation(false);
      setFillCCCDFor(false);
      setFillFullCCCD(false);

      setFillCCCD(false);
    }
  };

  const onFinishFav = () => {
    setStateUser((prevState: any) => ({
      ...prevState,
      modalConfirmSwitchFav: false,
    }));
    setSelectItemsFav(stateUser?.selectedItemFav);
    if (stateUser?.selectedItemFav) {
      setFillFav(false);
    }
  };

  const handleAddFav = (index: any, item: any) => {
    if (stateUser.selectedItemFav.includes(item)) {
      setStateUser((prevState: any) => ({
        ...prevState,
        selectedItemFav: stateUser.selectedItemFav.filter((selectedItem: any) => selectedItem !== item),
      }));
    } else {
      setStateUser((prevState: any) => ({
        ...prevState,
        selectedItemFav: [...stateUser.selectedItemFav, item],
      }));
    }
  };

  const handleChangeFullName = (event: any) => {
    const newValue = limitInputCharacters(event?.target?.value, 50);

    setStateUser((prevState: any) => ({
      ...prevState,
      fullName: newValue,
    }));
  };

  const handleChangeRemember = (event: any) => {
    setStateUser((prevState: any) => ({
      ...prevState,
      rememberName: event.target.value,
    }));
    if (event.target.value !== "") {
      setFillRemem(false);
    }
  };

  const handleChangeNumberFax = (event: any) => {
    setStateUser((prevState: any) => ({
      ...prevState,
      numberFax: event.target.value,
    }));
    if (event.target.value !== "") {
      setFillFax(false);
    }
  };

  const handleChangeSex = (event: SelectChangeEvent) => {
    setStateUser((prevState: any) => ({
      ...prevState,
      sex: event.target.value,
    }));
    if (event.target.value !== "") {
      setFillSex(false);
    }
  };

  return (
    <Page
      style={{ backgroundColor: "#f4f4f4" }}
      title="Chợ Tốt Xe Official Mall - Chợ Tốt - Website Mua Bán, Rao Vặt Trực Tuyến Hàng Đầu Của Người Việt"
    >
      <Setting title="Thông tin cá nhân" active="1">
        {" "}
        <div className="information">
          <span className="title">Hồ sơ cá nhân</span>
          <div className="form-input">
            <div className="first-line input-need-to-custom">
              {" "}
              <div className="fullname ">
                {account?.user === undefined ? (
                  <Skeleton.Input block={true} active size="large"></Skeleton.Input>
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
              <div className={`phone ${account?.user?.phone ? "phone-exit" : "phone-not-exit"}`}>
                {account?.user === undefined ? (
                  <Skeleton.Input block={true} active size="large"></Skeleton.Input>
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
                  </>
                )}
              </div>
            </div>
            {account?.user === undefined ? (
              <Skeleton.Input block={true} active size="large" style={{ height: "48px" }}></Skeleton.Input>
            ) : (
              <div className="second-line input-arrow  input-need-to-custom" onClick={handleModal}>
                <TextField
                  id="filled-multiline-flexible"
                  label="Địa chỉ"
                  className={`fullname ${fillFullAddr ? "warn-border" : ""}`}
                  value={stateUser?.fullAddress}
                  multiline
                  maxRows={4}
                  variant="filled"
                />
                <ArrowInputIcon></ArrowInputIcon>
                {fillFullAddr && <span className="warning">Vui lòng nhập Địa chỉ</span>}
              </div>
            )}

            {account?.user === undefined ? (
              <Skeleton.Input block={true} active size="large" style={{ height: "155px" }}></Skeleton.Input>
            ) : (
              <div className="introducing">
                <div className={`text-area ${fillIntro ? "warn-border" : ""}`}>
                  <JoditEditor
                    config={config2}
                    value={stateUser.introducing}
                    onBlur={(c: any) => {
                      contentFieldChanagedReason(c);
                    }}
                  />
                </div>
                {fillIntro && <span className="warning">Vui lòng nhập Giới thiệu</span>}
              </div>
            )}
            <div className="remember-name input-need-to-custom">
              {account?.user === undefined ? (
                <Skeleton.Input block={true} active size="large"></Skeleton.Input>
              ) : (
                <>
                  <TextField
                    id="filled-multiline-flexible"
                    className={`rembember ${fillRemem ? "warn-border" : ""}`}
                    label="Tên gợi nhớ"
                    value={stateUser.rememberName || account?.user?.rememberName}
                    onChange={handleChangeRemember}
                    multiline
                    maxRows={4}
                    variant="filled"
                  />
                  {fillRemem && <span className="warning">Vui lòng nhập Tên gợi nhớ</span>}
                </>
              )}
              <p className="text">
                https://www.chotot.com/user/<span></span>
              </p>
              <p className="des">Tên gợi nhớ sau khi được cập nhật sẽ không thể thay đổi trong vòng 60 ngày tới.</p>
            </div>
          </div>
        </div>
        <div className="security">
          <span className="title">Thông tin bảo mật</span>
          <p className="des-sec">Những thông tin dưới đây mang tính bảo mật. Chỉ bạn mới có thể thấy và chỉnh sửa những thông tin này.</p>
          <div className="form-input">
            <div className={`email input-need-to-custom ${account?.user?.email !== "" ? "email-exit" : "email-not-exit"}`}>
              <TextField
                className="email"
                id="filled-multiline-flexible"
                label={`${account?.user?.email !== "" ? "Email" : "Thêm email"}`}
                multiline
                maxRows={4}
                variant="filled"
              />
            </div>{" "}
            {account?.user === undefined ? (
              <Skeleton.Input block={true} active size="large"></Skeleton.Input>
            ) : (
              <>
                <div className="second-line input-arrow  input-need-to-custom" onClick={handleModalCCCD}>
                  <TextField
                    className={`fullname ${fillFullCCCD ? "warn-border" : ""}`}
                    id="filled-multiline-flexible"
                    label="CCCD / CMND / Hộ chiếu"
                    value={stateUser.fullCCCD}
                    multiline
                    maxRows={4}
                    variant="filled"
                  />
                  <ArrowInputIcon></ArrowInputIcon>
                  {fillFullCCCD && <span className="warning">Vui lòng nhập CCCD / CMND / Hộ chiếu</span>}
                </div>
              </>
            )}
            {account?.user === undefined ? (
              <Skeleton.Input block={true} active size="large"></Skeleton.Input>
            ) : (
              <div className="fax-number input-need-to-custom">
                <TextField
                  id="filled-multiline-flexible"
                  label="Mã số thuế"
                  className={`fax ${fillFax ? "warn-border" : ""}`}
                  value={stateUser.numberFax}
                  onChange={handleChangeNumberFax}
                  multiline
                  maxRows={4}
                  variant="filled"
                />
                {fillFax && <span className="warning">Vui lòng nhập Mã số thuế</span>}
              </div>
            )}
            {account?.user === undefined ? (
              <Skeleton.Input block={true} active size="large"></Skeleton.Input>
            ) : (
              <div className="second-line input-arrow  input-need-to-custom" onClick={handleModalFav}>
                <TextField
                  id="filled-multiline-flexible"
                  label="Danh mục yêu thích"
                  value={selectItemsFav}
                  onChange={handleFav}
                  multiline
                  className={`fullname ${fillFav ? "warn-border" : ""}`}
                  maxRows={4}
                  variant="filled"
                />
                <ArrowInputIcon></ArrowInputIcon>
                {fillFav && <span className="warning">Vui lòng chọn Danh mục yêu thích</span>}
              </div>
            )}
            {account?.user === undefined ? (
              <Skeleton.Input block={true} active size="large"></Skeleton.Input>
            ) : (
              <div className="bottom">
                <div className="sex">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={stateUser.sex}
                      className={`${fillSex ? "warn-border" : ""}`}
                      label="Giới tính"
                      onChange={handleChangeSex}
                    >
                      <MenuItem value={"Nam"}>Nam</MenuItem>
                      <MenuItem value={"Nữ"}>Nữ</MenuItem>
                      <MenuItem value={"Khác"}>Khác</MenuItem>
                    </Select>
                    {fillSex && <span className="warning">Vui lòng chọn Giới tính</span>}
                  </FormControl>
                </div>
                <div className="birth-date">
                  <div className="date input-need-to-custom">
                    <DatePicker
                      value={stateUser.birth !== "" ? dayjs(stateUser.birth) : null}
                      className={`${fillBirth ? "warn-border" : ""}`}
                      onChange={onChangeBirth}
                      placeholder={"Ngày sinh"}
                    />
                    {fillBirth && <span className="warning">Vui lòng chọn Ngày sinh</span>}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <CustomButton type="submit" className="save-change" onClick={updateProfile}>
          Lưu thay đổi
        </CustomButton>
      </Setting>
      <ModalAddressUser
        fillAddrCity={fillAddrCity}
        fillAddrWard={fillAddrWard}
        fillAddrDistrict={fillAddrDistrict}
        fillAddrDetail={fillAddrDetail}
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
        fillCCCD={fillCCCD}
        fillCCCDFor={fillCCCDFor}
        fillCCCDLocation={fillCCCDLocation}
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
      <Spin spinning={spin} fullscreen></Spin>
    </Page>
  );
};
export const getServerSideProps = async (context: any) => {
  const cookies = context.req.headers.cookie;
  const parsedCookies = cookies ? cookie.parse(cookies) : {};
  const token = parsedCookies["access_token"];

  if (!token) {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
export default User;
