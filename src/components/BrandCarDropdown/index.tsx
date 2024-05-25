import { Input, Radio, RadioChangeEvent } from "antd";
import { SearchIcon } from "../CustomIcons";
import { useEffect, useRef, useState } from "react";
import brandList from "../RenderFormTraffic/carList.json";
import { useRemoveQuery } from "@/utils/updateQuery";
import { useRouter } from "next/router";
const BrandCarDropdown = ({ openBrand, setState, valueRadioBrand }: any) => {
  const router = useRouter();
  const removeQuery = useRemoveQuery();
  const brandRef: any = useRef(null);
  const [searchBrand, setSearchBrand] = useState("");
  const [dataRender, setDataRender] = useState<any>([]);

  const updateURL = (queryParams: any) => {
    router.push({
      pathname: "/mua-ban-oto",
      query: { ...router.query, ...queryParams },
    });
  };

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
  }, [openBrand, setState]);

  useEffect(() => {
    setDataRender(brandList);
  }, []);

  const handleSearchBrand = (event: any) => {
    const { value } = event.target;
    setSearchBrand(value);
    const result = brandList.filter((brand: any, index) => {
      return brand.brand.toLowerCase().includes(value.toLowerCase());
    });
    setDataRender(result);
  };

  const handleRenew = () => {
    try {
      setSearchBrand("");
      setState((prevState: any) => ({
        ...prevState,
        valueRadioBrand: "",
        valueRadioBrandModal: "",
      }));
      setDataRender(brandList);
    } finally {
      setState((prevState: any) => ({
        ...prevState,
        openBrand: false,
      }));
      removeQuery("brand");
    }
  };

  const onChangeRadio = (e: RadioChangeEvent) => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioBrand: e.target.value,
      openBrand: false,
      valueRadioBrandModal: e.target.value,
    }));
    updateURL({ brand: e.target.value });
  };

  return (
    <>
      <div className={`brand-select`} ref={brandRef}>
        <div className="header-search">
          <span className="title">Hãng xe</span>
          <div onClick={handleRenew} style={{ cursor: "pointer" }}>
            <span className="renew">Xóa lọc</span>
          </div>
        </div>
        <div className="selections-brand">
          {" "}
          <div className="selection">
            <SearchIcon></SearchIcon>
            <Input placeholder="Nhập tìm hãng xe" onChange={handleSearchBrand} value={searchBrand} />{" "}
          </div>
          <div className="brands">
            {dataRender?.map((item: any, index: any) => {
              return (
                <div key={index} className="brand-item">
                  <Radio.Group value={valueRadioBrand} onChange={onChangeRadio}>
                    <Radio value={item.brand}>
                      {" "}
                      <span className="brand-name">{item.brand}</span>
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
