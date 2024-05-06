import { InputNumber, Slider } from "antd";
import { useEffect, useRef, useState } from "react";
import CustomButton from "../CustomButton";
import { useRouter } from "next/router";

const PriceDropdown = ({
  openPrice,
  setState,
  inputValueMin,
  inputValueMax,
}: any) => {
  const priceRef: any = useRef(null); 
  const [warning, setWarning] = useState(false);
  const router = useRouter();

  const onChange: any["onChange"] = (newValue: any) => {
    if (newValue) {
      setState((prevState: any) => ({
        ...prevState,
        inputValueMin: newValue[0],
      }));
    }
    if (newValue) {
      setState((prevState: any) => ({
        ...prevState,
        inputValueMax: newValue[1],
      }));
    }
  };
  const onChangeMin = (newValue: any) => {
    setState((prevState: any) => ({
      ...prevState,
      inputValueMin: newValue,
    }));
    if (inputValueMax < newValue) {
      setWarning(true);
    } else {
      setWarning(false);
    }
  };
  const onChangeMax = (newValue: any) => {
    setState((prevState: any) => ({
      ...prevState,
      inputValueMax: newValue,
    }));
    if (inputValueMin > newValue) {
      setWarning(true);
    } else {
      setWarning(false);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        priceRef.current &&
        !priceRef.current.contains(event.target) &&
        event?.target?.id !== "button-gia" && // Check if
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
  const handleRenew = () => {
    setState((prevState: any) => ({
      ...prevState,
      openPrice: false,
      inputValueMax: 2000000000,
      inputValueMin: 0,
      valuePriceMin: null,
      valuePriceMax: null,
    }));
    removeQueries(["price"]);
  };
  const handleApply = () => {
    setState((prevState: any) => ({
      ...prevState,
      valuePriceMin: inputValueMin,
      valuePriceMax: inputValueMax,
      openPrice: false,
    }));
    updateURL({ price: `${inputValueMin}-${inputValueMax}` });
  };
  const removeQueries = (keysToRemove: string[]) => {
    const updatedQuery = { ...router.query };
    keysToRemove.forEach((key) => {
      delete updatedQuery[key];
    });
    router.push({
      pathname: "/mua-ban-oto",
      query: updatedQuery,
    });
  };
  const updateURL = (queryParams: any) => {
    router.push({
      pathname: "/mua-ban-oto",
      query: { ...router.query, ...queryParams },
    });
  };
  return (
    <div ref={priceRef} className="price-slide">
      <div className="top">
        <span>0</span>
        <Slider
          range
          value={[inputValueMin, inputValueMax]}
          // defaultValue={[inputValueMin, inputValueMax]}
          max={2000000000}
          step={1000000}
          onChange={onChange}
          tooltip={{ formatter: null }}
        />
        <span>2 tỷ</span>
      </div>
      <div className="mid">
        <div className="number">
          <InputNumber<number>
            status={`${warning ? "error" : ""}`}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) =>
              value?.replace(/\$\s?|(,*)/g, "") as unknown as number
            }
            onChange={onChangeMin}
            value={inputValueMin}
          />
          -
          <InputNumber<number>
            status={`${warning ? "error" : ""}`}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) =>
              value?.replace(/\$\s?|(,*)/g, "") as unknown as number
            }
            value={inputValueMax}
            onChange={onChangeMax}
          />
        </div>
        {warning ? (
          <div className="warning">Vui lòng nhập số từ thấp tới cao</div>
        ) : (
          <></>
        )}
      </div>
      <div className="buttons-bottom-dropdown-header">
        <CustomButton className="renew" onClick={handleRenew}>
          Xóa lọc
        </CustomButton>
        <CustomButton className="apply" onClick={handleApply}>
          Áp dụng
        </CustomButton>
      </div>
    </div>
  );
};
export default PriceDropdown;
