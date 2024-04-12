import { InputNumber } from "antd";

const NumberInputPrice = ({ onChangePrice, className }: any) => {
  return (
    <InputNumber<number>
      className={`number-input-price ${className}`}
      defaultValue={1000}
      formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      parser={(value) => value?.replace(/\$\s?|(,*)/g, "") as unknown as number}
      onChange={onChangePrice}
    />
  );
};
export default NumberInputPrice;
