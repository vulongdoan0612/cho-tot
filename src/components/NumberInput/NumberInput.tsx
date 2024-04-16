import { InputNumber } from "antd";

const NumberInput = ({
  onChangeNumber,
  min,
  max,
  defaultValue,
  className,
  value,
}: any) => {
  return (
    <InputNumber
      className={`number-input ${className}`}
      min={min}
      max={max}
      value={value}
      defaultValue={defaultValue}
      onChange={onChangeNumber}
    />
  );
};
export default NumberInput;
