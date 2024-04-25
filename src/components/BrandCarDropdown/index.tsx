import { Input, Radio, RadioChangeEvent } from "antd";
import { SearchIcon } from "../CustomIcons";
import { useEffect, useRef, useState } from "react";
import data from "./brandList.json";
const BrandCarDropdown = ({ openBrand, setState, valueRadioBrand }: any) => {
  const brandRef: any = useRef(null); 
  const [searchBrand, setSearchBrand] = useState("");
  const [dataRender, setDataRender] = useState<any>([]);
  console.log(openBrand);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        brandRef.current &&
        !brandRef.current.contains(event.target) &&
        event?.target?.id !== "button-hang-xe" &&
        event?.target?.id !== "svg-hang-xe"
      ) {
        setState((prevState: any) => ({
          ...prevState,
          openBrand: false,
        }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openBrand]);
  useEffect(() => {
    setDataRender(data);
  }, []);
  const handleSearchBrand = (event: any) => {
    const { value } = event.target;
    setSearchBrand(value);
    const result = data.filter((brand: any) => {
      return brand.toLowerCase().includes(value.toLowerCase());
    });
    setDataRender(result);
  };
  const handleRenew = () => {
    setSearchBrand("");
    setState((prevState: any) => ({
      ...prevState,
      valueRadioBrand: "",
    }));
    setDataRender(data);
  };
  const onChangeRadio = (e: RadioChangeEvent) => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioBrand: e.target.value,
      openBrand: false,
    }));
  };
  return (
    <>
      <div className={`brand-select`} ref={brandRef}>
        <div className="header-search">
          <span className="title">Số chỗ</span>
          <div onClick={handleRenew} style={{ cursor: "pointer" }}>
            <span className="renew">Xóa lọc</span>
          </div>
        </div>
        <div className="selections-brand">
          {" "}
          <div className="selection">
            <SearchIcon></SearchIcon>
            <Input
              placeholder="Nhập tìm số chỗ"
              onChange={handleSearchBrand}
              value={searchBrand}
            />{" "}
          </div>
          <div className="brands">
            {dataRender.map((item: any, index: any) => {
              return (
                <div key={index} className="brand-item">
                  <Radio.Group value={valueRadioBrand} onChange={onChangeRadio}>
                    <Radio value={item}>
                      {" "}
                      <span className="brand-name">{item}</span>
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
export default BrandCarDropdown;
