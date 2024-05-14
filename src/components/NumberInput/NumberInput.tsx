import { InputNumber } from "antd";

const NumberInput = ({
  onChangeNumber,
  defaultValue,
  className,
  value,
  placeholder
}: any) => {
  return (
    <InputNumber
      className={`number-input ${className}`}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      onChange={onChangeNumber}
    />
  );
};
export default NumberInput;
