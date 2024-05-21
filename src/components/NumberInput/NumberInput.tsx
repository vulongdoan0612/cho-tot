import { InputNumber } from "antd";

const NumberInput = ({ onChangeNumber, defaultValue, className, value, placeholder }: any) => {
  return (
    <InputNumber
      className={`number-input ${className}`}
      placeholder={placeholder}
      value={value}
      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      defaultValue={defaultValue}
      onChange={onChangeNumber}
    />
  );
};
export default NumberInput;
