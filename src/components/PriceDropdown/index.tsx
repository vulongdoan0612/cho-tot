import { InputNumber, Slider } from "antd";
import { useEffect, useRef, useState } from "react";
import CustomButton from "../CustomButton";

const PriceDropdown = ({ openPrice, setState }: any) => {
  const priceRef: any = useRef(null); // Ref for FindInAreaDropdown
  const [inputValueMin, setInputValueMin] = useState(0);
  const [inputValueMax, setInputValueMax] = useState(2000000000);
  const [warning, setWarning] = useState(false);

  const onChange: any["onChange"] = (newValue: any) => {
    if (newValue) {
      setInputValueMin(newValue[0]);
    }
    if (newValue) {
      setInputValueMax(newValue[1]);
    }
  };
  const onChangeMin = (newValue: any) => {
    setInputValueMin(newValue);
    if (inputValueMax < newValue) {
      setWarning(true);
    } else {
      setWarning(false);
    }
  };
  const onChangeMax = (newValue: any) => {
    setInputValueMax(newValue);
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
    setInputValueMin(0);
    setInputValueMax(0);
    setState((prevState: any) => ({
      ...prevState,
      openPrice: false,
    }));
  };
  const handleApply = () => {
    setInputValueMin(0);

    setInputValueMax(0);
    setState((prevState: any) => ({
      ...prevState,
      openPrice: false,
    }));
  };
  return (
    <div ref={priceRef} className="price-slide">
      <div className="top">
        <span>0</span>
        <Slider
          range
          value={[inputValueMin, inputValueMax]}
          defaultValue={[inputValueMin, inputValueMax]}
          max={2000000000}
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
