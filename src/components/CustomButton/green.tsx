
interface ICustomButton {
  children?: any;
  className?: string;
  type?: any;
  props?: any;
  style?: any;
  onClick?: any;
}
const CustomButtonGreen = ({ children, className, type, style, onClick, ...props }: ICustomButton) => {
  return (
    <button type={type} className={`custom-button-green ${className}`} style={style} onClick={onClick}>
      {children}
    </button>
  );
};
export default CustomButtonGreen;
