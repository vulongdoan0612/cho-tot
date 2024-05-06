const CustomButtonSelect = ({
  children,
  handleClick,
  index,
  isActive,
}: any) => {
  return (
    <button
      onClick={handleClick}
      className={`custom-button-select ${
        isActive ? "active-button-select" : ""
      }`}
      key={index}
    >
      {children}
    </button>
  );
};
export default CustomButtonSelect;
