import { Radio } from "antd";
import { ArrowDownIcon, ArrowRightIcon } from "../CustomIcons";
import { useState } from "react";
import { useRouter } from "next/router";

const ItemModalFilterSits = ({
  value,
  onClickRadio,
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
            <Radio.Group value={value}>
              {value === "" ||
              value === undefined ||
              data.slice(0, 5).includes(value) ? (
                data.slice(0, 5).map((item: any, index: any) => (
                  <Radio
                    value={item}
                    key={index}
                    onClick={() => onClickRadio(item)}
                  >
                    {" "}
                    <span className="brand-name">{item}</span>
                  </Radio>
                ))
              ) : (
                <>
                  <Radio value={value} key={value}>
                    <span className="brand-name">{value}</span>
                  </Radio>
                  {data.slice(0, 4).map((item: any, index: any) => (
                    <Radio
                      value={item}
                      key={index}
                      onClick={() => onClickRadio(item)}
                    >
                      {" "}
                      <span className="brand-name">{item}</span>
                    </Radio>
                  ))}
                </>
              )}
            </Radio.Group>
          </div>
          <span
            className="see-all"
            //   onClick={() => handleModalListAll("sit")}
            onClick={onClick}
          >
            Xem tất cả số chỗ <ArrowRightIcon></ArrowRightIcon>
          </span>
        </>
      )}
    </div>
  );
};
export default ItemModalFilterSits;
