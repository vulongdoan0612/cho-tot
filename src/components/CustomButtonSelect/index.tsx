const CustomButtonSelect = ({
  children,
  handleClick,
  className,
  index,
  isActive,
}: any) => {
  return (
    <button
      onClick={handleClick}
      className={`${className} custom-button-select ${
        isActive ? "active-button-select" : ""
      }`}
      key={index}
    >
      {children}
    </button>
  );
};
export default CustomButtonSelect;
