import { Input, Radio } from "antd";
import { ArrowBackIcon, SearchIcon } from "../CustomIcons";
import CustomModal from "../CustomModal";
import { useEffect, useState } from "react";

const ModalListFilter = ({
  title,
  modalListAll,
  handleCancleModal,
  data,
  setValueRadioAll,
  valueRadioAll,
  setValueRadio,
  setState,
  typeModal,
  placeholder,
  setFilter,
}: any) => {
  const [search, setSearch] = useState("");
  const [dataRender, setDataRender] = useState([]);

  useEffect(() => {
    setDataRender(data);
    setSearch("");
  }, [data]);

  const handleRenew = () => {
    try {
      setSearch("");
      setValueRadio === "sit"
        ? setState((prevState: any) => ({
            ...prevState,
            valueRadioModal: "",
          }))
        : typeModal === "brand"
        ? setState((prevState: any) => ({
            ...prevState,
            valueRadioBrandModal: "",
          }))
        : typeModal === "color"
        ? setState((prevState: any) => ({
            ...prevState,
            valueRadioColor: "",
          }))
        : typeModal === "country"
        ? setState((prevState: any) => ({
            ...prevState,
            valueRadioCountry: "",
          }))
        : typeModal === "model"
        ? setState((prevState: any) => ({
            ...prevState,
            valueRadioModel: "",
          }))
        : typeModal === "formCar"
        ? setState((prevState: any) => ({
            ...prevState,
            valueRadioFormCar: "",
          }))
        : setState((prevState: any) => ({
            ...prevState,
          }));
      setValueRadioAll === "sit"
        ? setState((prevState: any) => ({
            ...prevState,
            valueRadioAll: "",
          }))
        : typeModal === "brand"
        ? setState((prevState: any) => ({
            ...prevState,
            valueRadioAllBrand: "",
          }))
        : typeModal === "color"
        ? setState((prevState: any) => ({
            ...prevState,
            valueRadioAllColor: "",
          }))
        : typeModal === "country"
        ? setState((prevState: any) => ({
            ...prevState,
            valueRadioAllCountry: "",
          }))
        : typeModal === "model"
        ? setState((prevState: any) => ({
            ...prevState,
            valueRadioAllModel: "",
          }))
        : typeModal === "formCar"
        ? setState((prevState: any) => ({
            ...prevState,
            valueRadioAllFormCar: "",
          }))
        : setState((prevState: any) => ({
            ...prevState,
          }));
      setDataRender(data);
    } finally {
      handleCancleModal();
    }
  };

  const handleSearch = (event: any) => {
    const { value } = event.target;
    setSearch(value);
    if (typeModal === "sit") {
      const result = data.filter((item: any) => {
        return item.item.toString().toLowerCase().includes(value.toString());
      });
      setDataRender(result);
    }
    if (typeModal === "brand") {
      const result = data.filter((brand: any) => {
        return brand.brand.toLowerCase().includes(value.toLowerCase());
      });
      setDataRender(result);
    }
    if (typeModal === "color") {
      const result = data.filter((color: any) => {
        return color.item.toLowerCase().includes(value.toLowerCase());
      });
      setDataRender(result);
    }
    if (typeModal === "country") {
      const result = data.filter((country: any) => {
        return country.item.toLowerCase().includes(value.toLowerCase());
      });
      setDataRender(result);
    }
    if (typeModal === "formCar") {
      const result = data.filter((form: any) => {
        return form.item.toLowerCase().includes(value.toLowerCase());
      });
      setDataRender(result);
    }
    if (typeModal === "model") {
      const result = data.filter((form: any) => {
        return form.toLowerCase().includes(value.toLowerCase());
      });
      setDataRender(result);
    }
  };

  const onChangeRadio = (item: any) => {
    try {
      setValueRadio === "sit"
        ? setState((prevState: any) => ({
            ...prevState,
            valueRadioModal: item.item,
          }))
        : typeModal === "brand"
        ? setState((prevState: any) => ({
            ...prevState,
            valueRadioBrandModal: item.brand,
          }))
        : typeModal === "color"
        ? setState((prevState: any) => ({
            ...prevState,
            valueRadioColor: item.item,
          }))
        : typeModal === "country"
        ? setState((prevState: any) => ({
            ...prevState,
            valueRadioCountry: item.item,
          }))
        : typeModal === "model"
        ? setState((prevState: any) => ({
            ...prevState,
            valueRadioModel: item,
          }))
        : typeModal === "formCar"
        ? setState((prevState: any) => ({
            ...prevState,
            valueRadioFormCar: item.item,
          }))
        : setState((prevState: any) => ({
            ...prevState,
          }));
      setValueRadio === "sit"
        ? setFilter((prevFilter: any) => ({
            ...prevFilter,
            sit: item.value,
          }))
        : typeModal === "brand"
        ? setFilter((prevFilter: any) => ({
            ...prevFilter,
            brand: item.brand,
          }))
        : typeModal === "color"
        ? setFilter((prevFilter: any) => ({
            ...prevFilter,
            color: item.value,
          }))
        : typeModal === "country"
        ? setFilter((prevFilter: any) => ({
            ...prevFilter,
            country: item.value,
          }))
        : typeModal === "model"
        ? setState((prevState: any) => ({
            ...prevState,
            valueRadioModel: item,
          }))
        : typeModal === "formCar"
        ? setState((prevState: any) => ({
            ...prevState,
            valueRadioFormCar: item.item,
          }))
        : setState((prevState: any) => ({
            ...prevState,
          }));
      setValueRadioAll === "sit"
        ? setState((prevState: any) => ({
            ...prevState,
            valueRadioAll: item,
          }))
        : typeModal === "brand"
        ? setState((prevState: any) => ({
            ...prevState,
            valueRadioAllBrand: item.brand,
          }))
        : typeModal === "color"
        ? setState((prevState: any) => ({
            ...prevState,
            valueRadioAllColor: item.item,
          }))
        : typeModal === "country"
        ? setState((prevState: any) => ({
            ...prevState,
            valueRadioAllCountry: item.item,
          }))
        : typeModal === "model"
        ? setState((prevState: any) => ({
            ...prevState,
            valueRadioAllModel: item,
          }))
        : typeModal === "formCar"
        ? setState((prevState: any) => ({
            ...prevState,
            valueRadioAllFormCar: item.item,
          }))
        : setState((prevState: any) => ({
            ...prevState,
          }));
    } finally {
      handleCancleModal();
    }
  };

  const handleBack = () => {
    handleCancleModal();
  };

  return (
    <CustomModal
      open={modalListAll}
      closeIcon={false}
      onCancel={handleCancleModal}
      style={{ textAlign: "center", color: "white" }}
      centered
      className="modal-custom-list-filter"
    >
      <div className="header-search">
        <div onClick={handleBack}>
          <ArrowBackIcon></ArrowBackIcon>
        </div>{" "}
        <span className="title">{title}</span>
        <div onClick={handleRenew} style={{ cursor: "pointer" }}>
          <span className="renew">Xóa lọc</span>
        </div>
      </div>
      <div className="selections-sit">
        {" "}
        <div className="selection">
          <SearchIcon></SearchIcon>
          <Input placeholder={placeholder} onChange={handleSearch} value={search} />{" "}
        </div>
        <div className="sits">
          {dataRender &&
            dataRender.map((item: any, index: any) => {
              return (
                <div key={index} className="sit-item">
                  <Radio.Group value={String(valueRadioAll)}>
                    <Radio
                      value={
                        typeModal === "sit"
                          ? item.item
                          : typeModal === "brand"
                          ? item.brand
                          : typeModal === "formCar"
                          ? item.item
                          : typeModal === "color"
                          ? item.item
                          : typeModal === "country"
                          ? item.item
                          : item
                      }
                      onClick={() => onChangeRadio(item)}
                    >
                      {" "}
                      <span className="sit-name">
                        {typeModal === "sit"
                          ? item.item
                          : typeModal === "brand"
                          ? item.brand
                          : typeModal === "formCar"
                          ? item.item
                          : typeModal === "color"
                          ? item.item
                          : typeModal === "country"
                          ? item.item
                          : item}
                      </span>
                    </Radio>
                  </Radio.Group>
                </div>
              );
            })}
        </div>
      </div>
    </CustomModal>
  );
};
export default ModalListFilter;
