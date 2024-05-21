import { InputNumber, Slider } from "antd";
import { useEffect, useRef, useState } from "react";
import CustomButton from "../CustomButton";
import { useRemoveQuery, useUpdateQuery } from "@/utils/updateQuery";

const PriceDropdown = ({ openPrice, setState, inputValueMin, inputValueMax, setFilter, filter }: any) => {
  const priceRef: any = useRef(null);
  const updateQuery = useUpdateQuery();
  const removeQuery = useRemoveQuery();
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        priceRef.current &&
        !priceRef.current.contains(event.target) &&
        event?.target?.id !== "button-gia" &&
        event?.target?.id !== "svg-gia"
      ) {
        setState((prevState: any) => ({
          ...prevState,
          openPrice: false,
        }));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openPrice]);

  const onChange: any["onChange"] = (newValue: any) => {
    setState((prevState: any) => ({
      ...prevState,
      inputValueMin: newValue[0],
    }));
    setState((prevState: any) => ({
      ...prevState,
      inputValueMax: newValue[1],
    }));
    if (
      inputValueMax !== undefined &&
      inputValueMax !== "" &&
      newValue[0] !== undefined &&
      newValue[0] !== 0 &&
      inputValueMin !== undefined &&
      inputValueMin !== "" &&
      newValue[1] !== undefined &&
      newValue[1] !== 0
    ) {
      setFilter((prevFilter: any) => ({
        ...prevFilter,
        price: `${newValue[0]}-${newValue[1]}`,
      }));
      setWarning(false);
    } else if (newValue[0] === 0 && inputValueMax !== "" && inputValueMax !== undefined) {
      setFilter((prevFilter: any) => ({
        ...prevFilter,
        price: `max${newValue[1]}`,
      }));
    }
  };

  const onChangeMin = (newValue: any) => {
    setState((prevState: any) => ({
      ...prevState,
      inputValueMin: newValue,
    }));
    console.log(newValue);
    if (newValue === null) {
      setState((prevState: any) => ({
        ...prevState,
        inputValueMin: 0,
      }));
    }
    if (inputValueMax !== undefined && inputValueMax !== "" && newValue !== undefined && newValue !== "") {
      if (Number(newValue) < Number(inputValueMax)) {
        setFilter((prevFilter: any) => ({
          ...prevFilter,
          price: `${newValue}-${inputValueMax}`,
        }));
        setWarning(false);
      } else {
        setWarning(true);
      }
    } else if (newValue === "" && inputValueMax !== "" && inputValueMax !== undefined) {
      setFilter((prevFilter: any) => ({
        ...prevFilter,
        price: `max${inputValueMax}`,
      }));
    } else {
      setFilter((prevFilter: any) => ({
        ...prevFilter,
        price: `min${newValue}`,
      }));
    }
    if (inputValueMax < newValue) {
      setWarning(true);
    } else {
      setWarning(false);
    }
    if (inputValueMax < 10000000) {
      setWarning(true);
    }
  };

  const onChangeMax = (newValue: any) => {
    setState((prevState: any) => ({
      ...prevState,
      inputValueMax: newValue,
    }));
    if (newValue === null) {
      setState((prevState: any) => ({
        ...prevState,
        inputValueMax: 0,
      }));
    }
    if (inputValueMin !== undefined && inputValueMin !== "" && newValue !== undefined && newValue !== "") {
      if (Number(newValue) > Number(inputValueMin)) {
        setFilter((prevFilter: any) => ({
          ...prevFilter,
          price: `${inputValueMin}-${newValue}`,
        }));
        setWarning(false);
      } else {
        setWarning(true);
      }
    } else if (newValue === "" && inputValueMin !== "" && inputValueMin !== undefined) {
      setFilter((prevFilter: any) => ({
        ...prevFilter,
        price: `min${inputValueMin}`,
      }));
    } else {
      setFilter((prevFilter: any) => ({
        ...prevFilter,
        price: `max${newValue}`,
      }));
    }
    if (inputValueMin > newValue) {
      setWarning(true);
    } else {
      setWarning(false);
    }
    if (inputValueMin < 10000000) {
      setWarning(true);
    }
  };

  const handleRenew = () => {
    setState((prevState: any) => ({
      ...prevState,
      openPrice: false,
      inputValueMax: 2000000000,
      inputValueMin: 0,
      priceMin: '',
      priceMax: '',
      valuePriceMin: null,
      valuePriceMax: null,
    }));
    removeQuery("price");
  };

  const handleApply = () => {
    try {
      const queries: any = Object.entries(filter);
      updateQuery(queries);
    } finally {
      setState((prevState: any) => ({
        ...prevState,
        valuePriceMin: inputValueMin,
        valuePriceMax: inputValueMax,
        openPrice: false,
      }));
    }
  };

  return (
    <div ref={priceRef} className="price-slide">
      {warning ? <div className="warning">Vui lòng nhập giá trị trên 10 triệu</div> : <></>}
      <div className="top">
        <span>0</span>
        <Slider
          range
          value={[inputValueMin, inputValueMax]}
          max={2000000000}
          // step={1000000}
          onChange={onChange}
          tooltip={{ formatter: null }}
        />
        <span>2 tỷ</span>
      </div>
      <div className="mid">
        <div className="number">
          <InputNumber<number>
            status={`${warning ? "error" : ""}`}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            parser={(value) => value?.replace(/\$\s?|(,*)/g, "") as unknown as number}
            onChange={onChangeMin}
            value={inputValueMin}
          />
          -
          <InputNumber<number>
            status={`${warning ? "error" : ""}`}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            parser={(value) => value?.replace(/\$\s?|(,*)/g, "") as unknown as number}
            value={inputValueMax}
            onChange={onChangeMax}
          />
        </div>
      </div>
      <div className="buttons-bottom-dropdown-header">
        <CustomButton className="renew" onClick={handleRenew}>
          Xóa lọc
        </CustomButton>
        <CustomButton className={`apply ${warning ? "none-click" : ""}`} onClick={handleApply}>
          Áp dụng
        </CustomButton>
      </div>
    </div>
  );
};
export default PriceDropdown;
