import { omit } from "lodash";

interface ICustomButton {
  children?: any;
  className?: string;
  type?: any;
  props?: any;
  style?: any;
  onClick?: any;
}
const CustomButton = ({
  children,
  className,
  type,
  style,
  onClick,
  ...props
}: ICustomButton) => {
  return (
    <button
      type={type}
      className="custom-button"
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default CustomButton;
