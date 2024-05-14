import { Radio } from "antd";
import { ArrowDownIcon, ArrowRightIcon } from "../CustomIcons";
import { useState } from "react";

const ItemModalFilterModels = ({ value, onClickRadio, title, data, onClick, valueRadioBrandModal }: any) => {

  const [state, setState] = useState(true);
  
  const handleClick = () => {
    setState((prev) => !prev);
  };

  return (
    <>
      {valueRadioBrandModal && (
        <div className="sit">
          <div className="header" onClick={handleClick}>
            <span>{title}</span>
            <ArrowDownIcon></ArrowDownIcon>
          </div>
          {state && (
            <>
              <div className="body">
                <Radio.Group value={value}>
                  {value === "" || value === undefined || data[0]?.models.slice(0, 5).some((item: any) => item === value) ? (
                    <>
                      {data[0]?.models?.slice(0, 5).map((item: any) => {
                        return (
                          <Radio value={item} key={item} onClick={() => onClickRadio(item)}>
                            {" "}
                            <span className="brand-name">{item}</span>
                          </Radio>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <Radio value={value} key={value}>
                        <span className="brand-name">{value}</span>
                      </Radio>
                      {data[0].models.slice(0, 4).map((item: any) => {
                        return (
                          <Radio value={item} key={item} onClick={() => onClickRadio(item)}>
                            {" "}
                            <span className="brand-name">{item}</span>
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
      )}
    </>
  );
};
export default ItemModalFilterModels;
