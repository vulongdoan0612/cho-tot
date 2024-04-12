import { InputNumber } from "antd";

const NumberInput = ({
  onChangeNumber,
  min,
  max,
  defaultValue,
  className,
}: any) => {
  return (
    <InputNumber
      className={`number-input ${className}`}
      min={min}
      max={max}
      defaultValue={defaultValue}
      onChange={onChangeNumber}
    />
  );
};
export default NumberInput;
