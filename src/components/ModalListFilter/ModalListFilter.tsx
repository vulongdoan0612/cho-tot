import { Input, Radio, RadioChangeEvent } from "antd";
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
  typeModal,
}: any) => {
  const [search, setSearch] = useState("");
  const [dataRender, setDataRender] = useState([]);
  const handleRenew = () => {
    try {
      setSearch("");
      setValueRadioAll("");
      setValueRadio("");
      setDataRender(data);
    } finally {
      handleCancleModal();
    }
  };
  useEffect(() => {
    setDataRender(data);
  }, [data]);
  const handleSearch = (event: any) => {
    const { value } = event.target;
    setSearch(value);
    if (typeModal === "sit") {
      const result = data.filter((item: any) => {
        return item.toString().toLowerCase().includes(value.toString());
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
        return color.toLowerCase().includes(value.toLowerCase());
      });
      setDataRender(result);
    }
    if (typeModal === "country") {
      const result = data.filter((country: any) => {
        return country.toLowerCase().includes(value.toLowerCase());
      });
      setDataRender(result);
    }
    if (typeModal === "formCar") {
      const result = data.filter((form: any) => {
        return form.toLowerCase().includes(value.toLowerCase());
      });
      setDataRender(result);
    }
  };
  const onChangeRadio = (e: RadioChangeEvent) => {
    try {
      setValueRadio(e.target.value);
      setValueRadioAll(e.target.value);
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
          <Input
            placeholder="Nhập tìm số chỗ"
            onChange={handleSearch}
            value={search}
          />{" "}
        </div>
        <div className="sits">
          {dataRender &&
            dataRender.map((item: any, index: any) => {
              return (
                <div key={index} className="sit-item">
                  <Radio.Group value={valueRadioAll} onChange={onChangeRadio}>
                    <Radio
                      value={
                        typeModal === "sit"
                          ? item
                          : typeModal === "brand"
                          ? item.brand
                          : item
                      }
                    >
                      {" "}
                      <span className="sit-name">
                        {typeModal === "sit"
                          ? item
                          : typeModal === "brand"
                          ? item.brand
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
