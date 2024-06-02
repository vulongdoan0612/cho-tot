import { Input, Radio, RadioChangeEvent } from "antd";
import { ArrowBackIcon, SearchIcon } from "../CustomIcons";
import { useEffect, useRef } from "react";

const Selection = ({
  openFind,
  cities,
  districts,
  openSearchCity,
  searchResult,
  openSearchDistrict,
  valueRadioDistrict,
  valueRadio,
  setState,
  searchResultDistrict,
  searchCity,
  setSearchCity,
  searchDistrict,
  setSearchDistrict,
}: any) => {
  const districtRef: any = useRef(null);
  const cityRef: any = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        cityRef.current &&
        !cityRef.current.contains(event.target) &&
        !openFind &&
        openSearchCity &&
        event?.target?.id !== "button-toan-quoc" &&
        event?.target?.id !== "svg-toan-quoc"
      ) {
        setState((prevState: any) => ({
          ...prevState,
          openFind: false,
          openSearchCity: false,
        }));
        setSearchCity("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openFind, openSearchCity]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        districtRef.current &&
        !districtRef.current.contains(event.target) &&
        !openFind &&
        openSearchDistrict &&
        event?.target?.id !== "button-toan-quoc" &&
        event?.target?.id !== "svg-toan-quoc"
      ) {
        setState((prevState: any) => ({
          ...prevState,
          openFind: false,
          openSearchDistrict: false,
        }));
        setSearchDistrict("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openFind, openSearchDistrict]);

  const handleOpenSearchCity = () => {
    setState((prevState: any) => ({
      ...prevState,
      openFind: true,
      openSearchCity: false,
    }));
    setSearchCity("");
  };

  const handleOpenSearchDistrict = () => {
    setState((prevState: any) => ({
      ...prevState,
      openFind: true,
      openSearchDistrict: false,
    }));
    setSearchDistrict("");
  };

  const handleSearchCity = (event: any) => {
    const { value } = event.target;
    const result = cities.filter((city: any) => city.Name.toLowerCase().includes(value.toLowerCase()));
    setSearchCity(value);
    setState((prevState: any) => ({
      ...prevState,
      searchResult: result,
    }));
  };

  const onChangeRadio = (e: RadioChangeEvent) => {
    try {
      const selectedCity: any = cities.find((city: any) => city.Name.includes(e.target.value));
      setState((prevState: any) => ({
        ...prevState,
        districtName: "",
        selectCity: selectedCity.Name,
        valueRadio: selectedCity.Name,
      }));

      if (selectedCity) {
        setState((prevState: any) => ({
          ...prevState,
          cityName: selectedCity.Name,
          districts: selectedCity.Districts,
          searchResultDistrict: selectedCity.Districts,
          idCity: selectedCity.Id,
        }));
      }
    } finally {
      setState((prev: any) => ({
        ...prev,
        openFind: true,
        openSearchCity: false,
      }));
    }
  };

  const onChangeRadioDistrict = (e: RadioChangeEvent) => {
    const selectedCity: any = districts.find((district: any) => district.Name.includes(e.target.value));
    setState((prevState: any) => ({
      ...prevState,
      openSearchDistrict: false,
      openFind: true,
      valueRadioDistrict: selectedCity.Name,
      idDistrict: selectedCity.Id,
    }));
    if (selectedCity) {
      setState((prevState: any) => ({
        ...prevState,
        districtName: selectedCity.Name,
      }));
    }
  };

  const handleSearchDistrict = (event: any) => {
    const { value } = event.target;
    setSearchDistrict(value);
    const result = districts.filter((district: any) => district.Name.toLowerCase().includes(value.toLowerCase()));
    setState((prevState: any) => ({
      ...prevState,
      searchResultDistrict: result,
    }));
  };

  return (
    <>
      <div className={`city-select ${openSearchCity ? "visible-city" : ""}`} ref={cityRef}>
        <div className="header-search">
          <div onClick={handleOpenSearchCity} style={{ cursor: "pointer" }}>
            <ArrowBackIcon></ArrowBackIcon>
          </div>
          <span className="title">Chọn tỉnh thành</span>
        </div>
        <div className="selections-city">
          {" "}
          <div className="selection">
            <SearchIcon></SearchIcon>
            <Input placeholder="Nhập tìm tỉnh thành" onChange={handleSearchCity} value={searchCity} />{" "}
          </div>
          <div className="cities">
            {searchResult.map((item: any, index: number) => {
              return (
                <div key={index} className="city-item" onChange={(e: any) => onChangeRadio(e)}>
                  <Radio.Group value={valueRadio}>
                    <Radio value={item.Name}>
                      {" "}
                      <span className="city-name">{item.Name}</span>
                    </Radio>
                  </Radio.Group>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={`district-select ${openSearchDistrict ? "visible-district" : ""}`} ref={districtRef}>
        <div className="header-search">
          <div onClick={handleOpenSearchDistrict} style={{ cursor: "pointer" }}>
            <ArrowBackIcon></ArrowBackIcon>
          </div>
          <span className="title">Chọn quận huyện</span>
        </div>
        <div className="selections-district">
          {" "}
          <div className="selection">
            <SearchIcon></SearchIcon>
            <Input placeholder="Nhập tìm tỉnh thành" onChange={handleSearchDistrict} value={searchDistrict} />{" "}
          </div>
          <div className="districts">
            {searchResultDistrict &&
              searchResultDistrict?.map((item: any, index: number) => {
                return (
                  <div key={index} className="district-item">
                    <Radio.Group onChange={onChangeRadioDistrict} value={valueRadioDistrict}>
                      <Radio value={item.Name}>
                        {" "}
                        <span className="district-name">{item.Name}</span>
                      </Radio>
                    </Radio.Group>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};
export default Selection;
