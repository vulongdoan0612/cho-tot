import { Image } from "antd";
import { useEffect, useRef, useState } from "react";
import CustomButtonSelect from "../CustomButtonSelect";
import { TextField } from "@mui/material";
import { ArrowInputNormalIcon } from "../CustomIcons";
import CustomButton from "../CustomButton";

const FindInAreaDropdown = ({
  openFind,
  cityName,
  selectCity,
  cities,
  districts,
  districtName,
  setState,
}: any) => {
  const [districtValue, setDistrictValue] = useState<any>([]);
  const wrapperRef: any = useRef(null);

  const handleChangeSelect = (status: any, event: any) => {
    setState((prevState: any) => ({
      ...prevState,
      districtName: "",
      selectCity: status,
    }));
    event.preventDefault();
    const selectedCity: any = cities.find((city: any) =>
      city.Name.includes(status)
    );
    setState((prevState: any) => ({
      ...prevState,
      valueRadio: selectedCity.Name,
    }));
    if (selectedCity) {
      setState((prevState: any) => ({
        ...prevState,
        cityName: selectedCity.Name,
        districts: selectedCity.Districts,
        searchResultDistrict: selectedCity.Districts,
      }));
      setDistrictValue(districtValue);
    }
  };

  const handleOpenSearchCity = () => {
    setState((prevState: any) => ({
      ...prevState,
      openSearchCity: true,
      openFind: false,
      searchResult: cities,
    }));
  };
  const handleOpenSearchDistrict = () => {
    setState((prevState: any) => ({
      ...prevState,
      openSearchDistrict: true,
      openFind: false,
      searchResultDistrict: districts,
    }));
  };
  const handleApply = () => {
    try {
      setState((prevState: any) => ({
        ...prevState,
        districtName: "",
        cityName: "",
        selectCity: "",
      }));
    } finally {
      setState((prevState: any) => ({
        ...prevState,
        openFind: false,
      }));
    }
  };
  const handleRenew = () => {
    try {
      setState((prevState: any) => ({
        ...prevState,
        districtName: "",
        selectCity: "",
        cityName: "",
      }));
    } finally {
      setState((prevState: any) => ({
        ...prevState,
        openFind: false,
      }));
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target) &&
        event?.target?.id !== "button-toan-quoc" &&
        event?.target?.id !== "svg-toan-quoc"
      ) {
        setState((prevState: any) => ({
          ...prevState,
          openFind: false,
          openSearchCity: false,
        }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openFind]);
  return (
    <>
      <div
        className={` ${openFind ? "visible" : ""} 
      find-in-area-dropdown`}
        ref={wrapperRef}
      >
        <div className="item-dropdown">
          <div className="header-drop">
            <Image
              src="https://static.chotot.com/storage/icons/svg/city.svg"
              alt=""
              width={20}
              preview={false}
              height={20}
            ></Image>
            <span>Tìm kiếm theo khu vực</span>
          </div>
          <div className="select-city">
            <CustomButtonSelect
              handleClick={(event: any) =>
                handleChangeSelect("Hồ Chí Minh", event)
              }
              isActive={selectCity.includes("Hồ Chí Minh")}
            >
              Hồ Chí Minh
            </CustomButtonSelect>

            <CustomButtonSelect
              handleClick={(event: any) => handleChangeSelect("Hà Nội", event)}
              isActive={selectCity.includes("Hà Nội")}
            >
              Hà Nội
            </CustomButtonSelect>

            <CustomButtonSelect
              handleClick={(event: any) => handleChangeSelect("Đà Nẵng", event)}
              isActive={selectCity.includes("Đà Nẵng")}
            >
              Đà Nẵng
            </CustomButtonSelect>
          </div>
          <div className="select-place">
            <div
              className="select-city select-need-custom   input-need-to-custom"
              onClick={handleOpenSearchCity}
            >
              <TextField
                required
                className="city"
                id="filled-multiline-flexible"
                label="Chọn tỉnh thành"
                multiline
                value={cityName}
                maxRows={4}
                variant="filled"
              />
              <ArrowInputNormalIcon></ArrowInputNormalIcon>
            </div>
            <div
              className={`select-district select-need-custom input-need-to-custom ${
                cityName ? "" : "disable-select-district"
              }`}
              onClick={handleOpenSearchDistrict}
            >
              <TextField
                required
                disabled={cityName ? false : true}
                className="district"
                id="filled-multiline-flexible"
                label="Chọn quận huyện"
                multiline
                value={districtName}
                maxRows={4}
                variant="filled"
              />
              <ArrowInputNormalIcon></ArrowInputNormalIcon>
            </div>
          </div>
          <div className="buttons-bottom-dropdown-header">
            <CustomButton className="renew" onClick={handleRenew}>
              Xóa Lọc
            </CustomButton>
            <CustomButton className="apply" onClick={handleApply}>
              Áp dụng
            </CustomButton>
          </div>
        </div>
      </div>
    </>
  );
};
export default FindInAreaDropdown;
