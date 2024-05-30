import { Radio } from "antd";
import { ArrowDownIcon, ArrowRightIcon } from "../CustomIcons";
import { useState } from "react";

const ItemModalFilterBrand = ({
  value,
  onChange,
  title,
  data,
  onClick,
}: any) => {
  const [state, setState] = useState(true);
  
  const handleClick = () => {
    setState((prev) => !prev);
  };
  
  return (
    <div className="sit">
      <div className="header" onClick={handleClick}>
        <span>{title}</span>
        <ArrowDownIcon></ArrowDownIcon>
      </div>
      {state && (
        <>
          <div className="body">
            <Radio.Group value={value} onChange={onChange}>
              {value === "" ||
              value === undefined ||
              data.slice(0, 5).some((item: any) => item.brand === value) ? (
                <>
                  {" "}
                  {data.slice(0, 5).map((item: any) => {
                    return (
                      <Radio value={item.brand} key={item.brand}>
                        {" "}
                        <span className="brand-name">{item.brand}</span>
                      </Radio>
                    );
                  })}
                </>
              ) : (
                <>
                  <Radio value={value} key={value}>
                    <span className="brand-name">{value}</span>
                  </Radio>
                  {data.slice(0, 4).map((item: any) => {
                    return (
                      <Radio value={item.brand} key={item.brand}>
                        {" "}
                        <span className="brand-name">{item.brand}</span>
                      </Radio>
                    );
                  })}
                </>
              )}
            </Radio.Group>
          </div>
          <span className="see-all" onClick={onClick}>
            Xem tất cả số chỗ <ArrowRightIcon></ArrowRightIcon>
          </span>
        </>
      )}
    </div>
  );
};
export default ItemModalFilterBrand;
