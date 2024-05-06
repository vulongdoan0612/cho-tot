import { InputNumber } from "antd";

const NumberInput = ({
  onChangeNumber,
  min,
  max,
  defaultValue,
  className,
  value,
  placeholder
}: any) => {
  return (
    <InputNumber
      className={`number-input ${className}`}
      // min={min}
      // max={max}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      onChange={onChangeNumber}
    />
  );
};
export default NumberInput;
