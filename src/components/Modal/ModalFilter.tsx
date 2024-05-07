import { Radio, RadioChangeEvent } from "antd";
import { ArrowDownIcon } from "../CustomIcons";
import CustomModal from "../CustomModal";
import { useEffect, useState } from "react";
import brandList from "../RenderFormTraffic/carList.json";
import carSit from "../RenderFormTraffic/carSit.json";
import numberBoxList from "./numberBox.json";
import user from "./user.json";

import { TextField } from "@mui/material";
import { onlyNumbers } from "@/utils/onlyNumbers";
import CustomButton from "../CustomButton";
import ModalListFilter from "../ModalListFilter/ModalListFilter";
import ItemModalFilterBrand from "../ItemModalFilter/indexBrands";
import ItemModalFilterSits from "../ItemModalFilter/indexSits";
import ItemModalFilterModels from "../ItemModalFilter/indexModels";
import FilterBy from "../ItemModalFilter/indexFilter";
import { useRemoveQuery, useUpdateQuery } from "@/utils/updateQuery";
import { useRouter } from "next/router";
import convertToSlug from "@/utils/convertToSlug";
import { colorsCar, countriesCar, formsCar, fuelCar, postCar, statusCar } from "./_mock";
import ItemModalFilterForm from "../ItemModalFilter/indexForm";
import { numberBox } from "../Contain-MBOTO/_mock";

const ModalFilter = ({ handleCancleModal, state, setState, openModal, setFilter, filter }: any) => {
  const [modalListAll, setModalListAll] = useState(false);
  const [warnPriceMax, setWarnPriceMax] = useState(false);
  const [warnPriceMin, setWarnPriceMin] = useState(false);
  const [warnPriceMax2, setWarnPriceMax2] = useState(false);
  const [warnPriceMin2, setWarnPriceMin2] = useState(false);
  const [warnKmMin, setWarnKmMin] = useState(false);
  const [warnKmMax, setWarnKmMax] = useState(false);
  const [warnDateMin, setWarnDateMin] = useState(false);
  const [warnDateMax, setWarnDateMax] = useState(false);
  const [models, setModels] = useState<any>([]);
  const [hiddenDate, setHiddenDate] = useState(true);
  const [hiddenPrice, setHiddenPrice] = useState(true);
  const [hiddenNB, setHiddenNB] = useState(true);
  const [hiddenKm, setHiddenKm] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [hiddenFuel, setHiddenFuel] = useState(true);
  const [hiddenSt, setHiddenSt] = useState(true);
  const [hiddenOwner, setHiddenOwner] = useState(true);
  const [typeModal, setTypeModal] = useState("");
  const updateQuery = useUpdateQuery();
  const removeQuery = useRemoveQuery();

  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;

    if (router && router.query && typeof router.query.date === "string") {
      const dateParams = router.query.date.split("-");
      let dateMin: any, dateMax: any;

      if (dateParams.length === 1) {
        const match = dateParams[0].match(/(min|max)(\d+)/);
        if (match) {
          if (match[1] === "min") {
            dateMin = parseInt(match[2]);
          } else if (match[1] === "max") {
            dateMax = parseInt(match[2]);
          }
        }
      } else if (dateParams.length === 2) {
        dateMin = parseInt(dateParams[0]);
        dateMax = parseInt(dateParams[1]);
      }

      setState((prevState: any) => ({
        ...prevState,
        date: dateMin !== undefined ? dateMin : prevState.date,
        dateMax: dateMax !== undefined ? dateMax : prevState.dateMax,
      }));
    }
    if (router && router.query && typeof router.query.km === "string") {
      const kmParams = router.query.km.split("-");
      let kmMin: any, kmMax: any;

      if (kmParams.length === 1) {
        const match = kmParams[0].match(/(min|max)(\d+)/);
        if (match) {
          if (match[1] === "min") {
            kmMin = parseInt(match[2]);
          } else if (match[1] === "max") {
            kmMax = parseInt(match[2]);
          }
        }
      } else if (kmParams.length === 2) {
        kmMin = parseInt(kmParams[0]);
        kmMax = parseInt(kmParams[1]);
      }

      setState((prevState: any) => ({
        ...prevState,
        km: kmMin !== undefined ? kmMin : prevState.km,
        kmMax: kmMax !== undefined ? kmMax : prevState.kmMax,
      }));
    }
    const formFilter: any = formsCar.find((item) => {
      return item.value === router.query.form;
    });
    setState((prevState: any) => ({
      ...prevState,
      valueRadioAllFormCar: formFilter?.item,
      valueRadioFormCar: formFilter?.item,
    }));

    setState((prevState: any) => ({
      ...prevState,
      valueRadioNumberBox: router.query.numberBox,
    }));
    const fuelFilter: any = fuelCar.find((item) => {
      return item.value === router.query.fuel;
    });
    setState((prevState: any) => ({
      ...prevState,
      valueRadioFuel: fuelFilter?.item,
    }));
    const colorFilter: any = colorsCar.find((item) => {
      return item.value === router.query.color;
    });
    setState((prevState: any) => ({
      ...prevState,
      valueRadioColor: colorFilter?.item,
      valueRadioAllColor: colorFilter?.item,
    }));
    const countryFilter: any = countriesCar.find((item) => {
      return item.value === router.query.country;
    });
    setState((prevState: any) => ({
      ...prevState,
      valueRadioCountry: countryFilter?.item,
      valueRadioAllCountry: countryFilter?.item,
    }));

    setState((prevState: any) => ({
      ...prevState,
      valueRadioModel: router.query.model,
      valueRadioAllModel: router.query.model,
    }));
    const statusFilter: any = statusCar.find((item) => {
      return item.value === router.query.status;
    });
    setState((prevState: any) => ({
      ...prevState,
      valueRadioStatus: statusFilter?.item,
    }));
    const postFilter: any = postCar.find((item) => {
      return item.value === router.query.post;
    });
    setState((prevState: any) => ({
      ...prevState,
      valueRadioUser: postFilter?.item,
    }));

    const filterModel = brandList.filter((item) => item.brand === router.query.brand);
    setState((prevState: any) => ({
      ...prevState,
      valueRadioAllModel: router.query.model,
      valueRadioModel: router.query.model,
    }));

    setFilter((prevFilter: any) => ({
      ...prevFilter,
      sit: String(router.query.sit),
      brand: String(router.query.brand),
      country: String(router.query.country),
      form: String(router.query.form),
      color: String(router.query.color),
      numberBox: String(router.query.numberBox),
      fuel: String(router.query.fuel),
      model: String(router.query.model),
      status: String(router.query.status),
      post: String(router.query.post),
      date: String(router.query.date),
      km: String(router.query.km),
      price: String(router.query.price),
    }));
    setModels(filterModel);
  }, [router]);

  const handleCancleModalListAll = () => {
    setModalListAll(false);
    setHidden(false);
  };
  const handleModalListAll = (type: string) => {
    try {
      setTypeModal(type);
      setHidden(true);
    } finally {
      setModalListAll(true);
    }
  };

  const onClickRadio = (item: any) => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioAll: item,
      valueRadioModal: item,
    }));
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      sit: item,
    }));
  };
  const onChangeRadioBrand = (e: any) => {
    const filterModel = brandList.filter((item) => item.brand === e.target.value);
    setState((prevState: any) => ({
      ...prevState,
      valueRadioAllBrand: e.target.value,
      valueRadioBrandModal: e.target.value,
      valueRadioAllModel: "",
      valueRadioModel: "",
    }));
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      brand: e.target.value,
    }));
    setModels(filterModel);
  };

  const onChangeRadioFormCar = (item: any, value: string) => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioFormCar: item,
      valueRadioAllFormCar: item,
    }));
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      form: value,
    }));
  };
  const onChangeRadioCountry = (item: any, value: string) => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioCountry: item,
      valueRadioAllCountry: item,
    }));
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      country: value,
    }));
  };
  const onChangeRadioStatus = (item: any, value: string) => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioStatus: item,
    }));
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      status: value,
    }));
  };
  const onChangeRadioUser = (item: any, value: string) => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioUser: item,
    }));
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      post: value,
    }));
  };
  const onChangeRadioColor = (item: any, value: string) => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioColor: item,
      valueRadioAllColor: item,
    }));
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      color: value,
    }));
  };
  const onChangeRadioModel = (item: any) => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioModel: item,
      valueRadioAllModel: item,
    }));
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      model: item,
    }));
  };
  const onChangeRadioFuel = (item: string, value: string) => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioFuel: item,
    }));
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      fuel: value,
    }));
  };
  const onChangeRadioNumberBox = (item: any, value: any) => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioNumberBox: item,
    }));
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      numberBox: value,
    }));
  };
  const handleChangeMin = (event: any) => {
    if (onlyNumbers(event.target.value) || event.target.value === "") {
      setState((prevState: any) => ({
        ...prevState,
        date: event.target.value,
      }));
      if (state.dateMax !== undefined && state.dateMax !== "" && event?.target?.value !== undefined && event?.target?.value !== "") {
        if (Number(event.target.value) < Number(state.dateMax)) {
          setFilter((prevFilter: any) => ({
            ...prevFilter,
            date: `${event.target.value}-${state.dateMax}`,
          }));
          setWarnDateMax(false);
          setWarnDateMin(false);
        } else {
          setWarnDateMin(true);
        }
      } else if (event.target.value === "" && state.dateMax !== "" && state.dateMax !== undefined) {
        setFilter((prevFilter: any) => ({
          ...prevFilter,
          date: `max${state.dateMax}`,
        }));
      } else {
        setFilter((prevFilter: any) => ({
          ...prevFilter,
          date: `min${event.target.value}`,
        }));
      }
    }
    if (event.target.value === "" && state.dateMax === "") {
      setFilter((prevFilter: any) => ({
        ...prevFilter,
        date: "",
      }));
    }
  };
  const handleChangeMax = (event: any) => {
    if (onlyNumbers(event?.target?.value) || event?.target?.value === "") {
      setState((prevState: any) => ({
        ...prevState,
        dateMax: event?.target?.value,
      }));
      if (state.date !== undefined && state.date !== "" && event?.target?.value !== undefined && event?.target?.value !== "") {
        if (Number(event.target.value) > Number(state.date)) {
          setFilter((prevFilter: any) => ({
            ...prevFilter,
            date: `${state.date}-${event?.target?.value}`,
          }));
          setWarnDateMax(false);
          setWarnDateMin(false);
        } else {
          setWarnDateMax(true);
        }
      } else if (event?.target?.value === "" && state.date !== "" && state.date !== undefined) {
        setFilter((prevFilter: any) => ({
          ...prevFilter,
          date: `min${state.date}`,
        }));
      } else {
        setFilter((prevFilter: any) => ({
          ...prevFilter,
          date: `max${event?.target?.value}`,
        }));
      }
    }
    if (event.target.value === "" && state.date === "") {
      setFilter((prevFilter: any) => ({
        ...prevFilter,
        date: "",
      }));
    }
  };
  const handleChangeKmMin = (event: any) => {
    if (onlyNumbers(event.target.value) || event.target.value === "") {
      setState((prevState: any) => ({
        ...prevState,
        kmMin: event.target.value,
      }));
      if (state.kmMax !== undefined && state.kmMax !== "" && event?.target?.value !== undefined && event?.target?.value !== "") {
        if (Number(event.target.value) < Number(state.kmMax)) {
          setFilter((prevFilter: any) => ({
            ...prevFilter,
            km: `${event.target.value}-${state.kmMax}`,
          }));
          setWarnKmMax(false);

          setWarnKmMin(false);
        } else {
          setWarnKmMin(true);
        }
      } else if (event.target.value === "" && state.kmMax !== "" && state.kmMax !== undefined) {
        setFilter((prevFilter: any) => ({
          ...prevFilter,
          km: `max${state.kmMax}`,
        }));
      } else {
        setFilter((prevFilter: any) => ({
          ...prevFilter,
          km: `min${event.target.value}`,
        }));
      }
    }
    if (event.target.value === "" && state.kmMax === "") {
      setFilter((prevFilter: any) => ({
        ...prevFilter,
        km: "",
      }));
    }
  };
  const handleChangeKmMax = (event: any) => {
    if (onlyNumbers(event?.target?.value) || event?.target?.value === "") {
      setState((prevState: any) => ({
        ...prevState,
        kmMax: event?.target?.value,
      }));
      if (state.kmMin !== undefined && state.kmMin !== "" && event?.target?.value !== undefined && event?.target?.value !== "") {
        if (Number(event.target.value) > Number(state.kmMin)) {
          setFilter((prevFilter: any) => ({
            ...prevFilter,
            km: `${state.kmMin}-${event?.target?.value}`,
          }));
          setWarnKmMin(false);
          setWarnKmMax(false);
        } else {
          setWarnKmMax(true);
        }
      } else if (event?.target?.value === "" && state.kmMin !== "" && state.kmMin !== undefined) {
        setFilter((prevFilter: any) => ({
          ...prevFilter,
          km: `min${state.kmMin}`,
        }));
      } else {
        setFilter((prevFilter: any) => ({
          ...prevFilter,
          km: `max${event?.target?.value}`,
        }));
      }
    }
    if (event.target.value === "" && state.kmMin === "") {
      setFilter((prevFilter: any) => ({
        ...prevFilter,
        km: "",
      }));
    }
  };
  const handleChangePriceMin = (event: any) => {
    if (onlyNumbers(event.target.value) || event.target.value === "") {
      setState((prevState: any) => ({
        ...prevState,
        price: event.target.value,
      }));
      if (state.priceMax !== undefined && state.priceMax !== "" && event?.target?.value !== undefined && event?.target?.value !== "") {
        if (Number(event.target.value) < Number(state.priceMax)) {
          setFilter((prevFilter: any) => ({
            ...prevFilter,
            price: `${event.target.value}-${state.priceMax}`,
          }));
          setWarnPriceMax2(false);
          setWarnPriceMin2(false);
        } else {
          setWarnPriceMin2(true);
        }
      } else if (event.target.value === "" && state.priceMax !== "" && state.priceMax !== undefined) {
        setFilter((prevFilter: any) => ({
          ...prevFilter,
          price: `max${state.priceMax}`,
        }));
      } else {
        setFilter((prevFilter: any) => ({
          ...prevFilter,
          price: `min${event.target.value}`,
        }));
      }
    }
    if (Number(event.target.value) < 10000000) {
      setWarnPriceMin(true);
    } else {
      setWarnPriceMin(false);
    }
  };
  const handleChangePriceMax = (event: any) => {
    if (onlyNumbers(event?.target?.value) || event?.target?.value === "") {
      setState((prevState: any) => ({
        ...prevState,
        priceMax: event?.target?.value,
      }));
      if (state.priceMin !== undefined && state.priceMin !== "" && event?.target?.value !== undefined && event?.target?.value !== "") {
        if (Number(event.target.value) > Number(state.priceMin)) {
          setFilter((prevFilter: any) => ({
            ...prevFilter,
            price: `${state.priceMin}-${event?.target?.value}`,
          }));
          setWarnPriceMax2(false);
          setWarnPriceMin2(false);
        } else {
          setWarnPriceMax2(true);
        }
      } else if (event?.target?.value === "" && state.priceMin !== "" && state.priceMin !== undefined) {
        setFilter((prevFilter: any) => ({
          ...prevFilter,
          price: `min${state.priceMin}`,
        }));
      } else {
        setFilter((prevFilter: any) => ({
          ...prevFilter,
          price: `max${event?.target?.value}`,
        }));
      }
    }
    if (event.target.value === "" && state.priceMin === "") {
      setFilter((prevFilter: any) => ({
        ...prevFilter,
        price: "",
      }));
    }

    if (Number(event.target.value) < 10000000) {
      setWarnPriceMax(true);
    } else {
      setWarnPriceMax(false);
    }
  };

  const removeSit = () => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioModal: "",
    }));
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      sit: "",
    }));
  };
  const removeBrand = () => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioBrandModal: "",
      valueRadioModel: "",
      valueRadioAllModel: "",
    }));
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      brand: "",
    }));
  };
  const removeDate = () => {
    setState((prevState: any) => ({
      ...prevState,
      date: "",
      dateMax: "",
    }));
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      date: "",
    }));
  };

  const removeKm = () => {
    setState((prevState: any) => ({
      ...prevState,
      kmMin: "",
      kmMax: "",
    }));
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      km: "",
    }));
  };
  const removePrice = () => {
    setState((prevState: any) => ({
      ...prevState,
      priceMin: "",
      priceMax: "",
    }));
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      price: "",
    }));
  };
  const removeNumberBox = () => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioNumberBox: "",
    }));
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      numberBox: "",
    }));
  };
  const removeFuel = () => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioFuel: "",
    }));
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      fuel: "",
    }));
  };
  const removeColor = () => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioColor: "",
    }));
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      color: "",
    }));
  };
  const removeCountry = () => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioCountry: "",
    }));
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      country: "",
    }));
  };
  const removeModel = () => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioModel: "",
    }));
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      model: "",
    }));
  };
  const removeFormCar = () => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioFormCar: "",
    }));
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      form: "",
    }));
  };
  const removeStatus = () => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioStatus: "",
    }));
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      status: "",
    }));
  };
  const removeUser = () => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioUser: "",
    }));
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      post: "",
    }));
  };
  const handleHiddenDate = () => {
    setHiddenDate((prev) => !prev);
  };
  const handleHiddenKm = () => {
    setHiddenKm((prev) => !prev);
  };
  const handleHiddenPrice = () => {
    setHiddenPrice((prev) => !prev);
  };
  const handleHiddenNB = () => {
    setHiddenNB((prev) => !prev);
  };
  const handleHiddenFuel = () => {
    setHiddenFuel((prev) => !prev);
  };
  const handleHiddenSt = () => {
    setHiddenSt((prev) => !prev);
  };
  const handleHiddenOwner = () => {
    setHiddenOwner((prev) => !prev);
  };
  const handleRenew = () => {
    try {
      setState((prevState: any) => ({
        ...prevState,
        valueRadioModal: "",
        valueRadioAll: "",
        valueRadioAllBrand: "",
        valueRadioAllColor: "",
        valueRadioAllCountry: "",
        valueRadioAllModel: "",
        valueRadioAllFormCar: "",
        valueRadioBrandModal: "",
        date: "",
        dateMax: "",
        kmMax: "",
        kmMin: "",
        priceMax: "",
        priceMin: "",
        valueRadioNumberBox: "",
        valueRadioFuel: "",
        valueRadioColor: "",
        valueRadioCountry: "",
        valueRadioModel: "",
        valueRadioFormCar: "",
        valueRadioStatus: "",
        valueRadioUser: "",
      }));
      // Tạo một URL mới mà không có query parameters
      const urlWithoutQuery = {
        pathname: router.pathname,
      };

      // Cập nhật URL mà không reload trang
      router.replace(urlWithoutQuery, undefined, { shallow: true });
      // removeQuery("brand");
      // removeQuery("price");
      // removeQuery("fuel");
      // removeQuery("date");
      // removeQuery("km");
      // removeQuery("form");
      // removeQuery("date");
      // removeQuery("km");
      // removeQuery("price");

      // removeQuery("sit");
      // removeQuery("numberBox");
      // removeQuery("color");
      // removeQuery("country");
      // removeQuery("model");
      // removeQuery("status");
      // removeQuery("post");
      setFilter((prevFilter: any) => ({
        ...prevFilter,
        sit: "",
        country: "",
        form: "",
        color: "",
        numberBox: "",
        fuel: "",
        model: "",
        status: "",
        post: "",
      }));
      // const queries: any = Object.entries(filter);

      // updateQuery(queries);
    } finally {
      handleCancleModal();
    }
  };

  const handleApply = () => {
    try {
      if (!warnPriceMax && !warnPriceMin && !warnKmMin && !warnKmMax && !warnPriceMin2 && !warnPriceMax2) {
        const queries: any = Object.entries(filter);
        updateQuery(queries);
      }
    } finally {
      if (!warnPriceMax && !warnPriceMin && !warnKmMin && !warnKmMax && !warnPriceMin2 && !warnPriceMax2) {
        handleCancleModal();
      }
    }
  };
  return (
    <CustomModal
      className={`wrapper-modal-filter ${hidden ? "hidden-wrapper-modal-filter" : ""}`}
      title="Lọc nâng cao"
      open={openModal}
      onCancel={handleCancleModal}
      centered
    >
      <div className="wrapper-content">
        <ItemModalFilterSits
          title="Số chỗ"
          value={state.valueRadioModal}
          onClickRadio={onClickRadio}
          data={carSit}
          onClick={() => handleModalListAll("sit")}
        ></ItemModalFilterSits>
        <ItemModalFilterBrand
          title="Hãng xe"
          value={state.valueRadioBrandModal}
          onChange={onChangeRadioBrand}
          data={brandList}
          onClick={() => handleModalListAll("brand")}
        ></ItemModalFilterBrand>
        <div className="sit">
          <div className="header" onClick={handleHiddenDate}>
            <span>Năm sản xuất</span>
            <ArrowDownIcon></ArrowDownIcon>
          </div>
          {hiddenDate && (
            <div className="date-produce">
              <div className="body input-need-to-custom">
                <TextField
                  type="number"
                  label="Năm sản xuất tối thiểu"
                  multiline
                  onChange={handleChangeMin}
                  value={state.date}
                  maxRows={1}
                  variant="filled"
                />{" "}
                {warnDateMin ? <span>Vui lòng nhập bé hơn</span> : <></>}
              </div>
              -
              <div className="body input-need-to-custom">
                <TextField
                  type="number"
                  label="Năm sản xuất tối đa"
                  multiline
                  onChange={handleChangeMax}
                  value={state.dateMax}
                  maxRows={1}
                  variant="filled"
                />{" "}
                {warnDateMax ? <span>Vui lòng nhập lớn hơn</span> : <></>}
              </div>
            </div>
          )}
        </div>
        <div className="sit">
          <div className="header" onClick={handleHiddenKm}>
            <span>Số km đã đi</span>
            <ArrowDownIcon></ArrowDownIcon>
          </div>
          {hiddenKm && (
            <div className="date-produce">
              <div className="body input-need-to-custom">
                <TextField
                  type="number"
                  label="Số km đã đi tối thiểu"
                  multiline
                  onChange={handleChangeKmMin}
                  value={state.kmMin}
                  maxRows={1}
                  variant="filled"
                />
                {warnKmMin ? <span>Vui lòng nhập bé hơn</span> : <></>}
              </div>
              -
              <div className="body input-need-to-custom">
                <TextField
                  type="number"
                  label="Số km đã đi tối đa"
                  multiline
                  onChange={handleChangeKmMax}
                  value={state.kmMax}
                  maxRows={1}
                  variant="filled"
                />{" "}
                {warnKmMax ? <span>Vui lòng nhập lớn hơn</span> : <></>}
              </div>
            </div>
          )}
        </div>{" "}
        <div className="sit">
          <div className="header" onClick={handleHiddenPrice}>
            <span>Giá tiền</span>
            <ArrowDownIcon></ArrowDownIcon>
          </div>
          {hiddenPrice && (
            <div className="date-produce">
              <div className="body input-need-to-custom">
                <TextField
                  type="number"
                  label="Giá tiền tối thiểu"
                  multiline
                  onChange={handleChangePriceMin}
                  value={state.price}
                  maxRows={1}
                  variant="filled"
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {warnPriceMin ? <span>Vui lòng nhập trên 10tr</span> : <></>}
                  {warnPriceMin2 ? <span>Vui lòng nhập bé hơn</span> : <></>}
                </div>
              </div>
              -
              <div className="body input-need-to-custom">
                <TextField
                  type="number"
                  label="Giá tiền tối đa"
                  multiline
                  onChange={handleChangePriceMax}
                  value={state.priceMax}
                  maxRows={1}
                  variant="filled"
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {" "}
                  {warnPriceMax ? <span>Vui lòng nhập trên 10tr</span> : <></>} {warnPriceMax2 ? <span>Vui lòng nhập lớn hơn</span> : <></>}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="sit">
          <div className="header" onClick={handleHiddenNB}>
            <span>Hộp số</span>
            <ArrowDownIcon></ArrowDownIcon>
          </div>
          {hiddenNB && (
            <div className="body">
              <Radio.Group value={state.valueRadioNumberBox}>
                {numberBox.map((item: any, index: any) => {
                  return (
                    <Radio value={item.item} key={index} onClick={() => onChangeRadioNumberBox(item.item, item.value)}>
                      {" "}
                      <span className="brand-name">{item.item}</span>
                    </Radio>
                  );
                })}
              </Radio.Group>
            </div>
          )}
        </div>
        <div className="sit">
          <div className="header" onClick={handleHiddenFuel}>
            <span>Nhiên liệu</span>
            <ArrowDownIcon></ArrowDownIcon>
          </div>
          {hiddenFuel && (
            <div className="body">
              <Radio.Group value={state.valueRadioFuel}>
                {fuelCar.map((item, index) => {
                  return (
                    <Radio value={item.item} key={index} onClick={() => onChangeRadioFuel(item.item, item.value)}>
                      {" "}
                      <span className="brand-name">{item.item}</span>
                    </Radio>
                  );
                })}
              </Radio.Group>
            </div>
          )}
        </div>
        <ItemModalFilterForm
          title="Màu sắc"
          value={state.valueRadioColor}
          onClickRadio={onChangeRadioColor}
          data={colorsCar}
          onClick={() => handleModalListAll("color")}
        ></ItemModalFilterForm>
        <ItemModalFilterForm
          title="Xuất xứ"
          value={state.valueRadioCountry}
          onClickRadio={onChangeRadioCountry}
          data={countriesCar}
          onClick={() => handleModalListAll("country")}
        ></ItemModalFilterForm>
        <ItemModalFilterModels
          title="Dòng xe"
          value={state.valueRadioModel}
          onClickRadio={onChangeRadioModel}
          data={models}
          onClick={() => handleModalListAll("model")}
          valueRadioBrandModal={state.valueRadioBrandModal}
        ></ItemModalFilterModels>
        <ItemModalFilterForm
          title="Kiểu dáng"
          value={state.valueRadioFormCar}
          onClickRadio={onChangeRadioFormCar}
          data={formsCar}
          onClick={() => handleModalListAll("formCar")}
        ></ItemModalFilterForm>
        <div className="sit">
          <div className="header" onClick={handleHiddenSt}>
            <span>Tình trạng</span>
            <ArrowDownIcon></ArrowDownIcon>
          </div>
          {hiddenSt && (
            <div className="body">
              <Radio.Group value={state.valueRadioStatus}>
                {statusCar.map((item, index) => {
                  return (
                    <Radio value={item.item} onClick={(e: any) => onChangeRadioStatus(item.item, item.value)} key={index}>
                      {" "}
                      <span className="brand-name">{item.item}</span>
                    </Radio>
                  );
                })}
              </Radio.Group>
            </div>
          )}
        </div>
        <div className="sit">
          <div className="header" onClick={handleHiddenOwner}>
            <span>Đăng bởi</span>
            <ArrowDownIcon></ArrowDownIcon>
          </div>
          {hiddenOwner && (
            <div className="body">
              <Radio.Group value={state.valueRadioUser}>
                {postCar.map((item, index) => {
                  return (
                    <Radio value={item.item} key={index} onClick={() => onChangeRadioUser(item.item, item.value)}>
                      {" "}
                      <span className="brand-name">{item.item}</span>
                    </Radio>
                  );
                })}
              </Radio.Group>
            </div>
          )}
        </div>
      </div>
      <FilterBy
        valueRadioModal={state.valueRadioModal}
        valueRadioBrandModal={state.valueRadioBrandModal}
        date={state.date}
        dateMax={state.dateMax}
        kmMin={state.kmMin}
        kmMax={state.kmMax}
        priceMin={state.priceMin}
        priceMax={state.priceMax}
        valueRadioNumberBox={state.valueRadioNumberBox}
        valueRadioFuel={state.valueRadioFuel}
        valueRadioColor={state.valueRadioColor}
        valueRadioCountry={state.valueRadioCountry}
        valueRadioModel={state.valueRadioModel}
        valueRadioFormCar={state.valueRadioFormCar}
        valueRadioStatus={state.valueRadioStatus}
        valueRadioUser={state.valueRadioUser}
        removeSit={removeSit}
        removeBrand={removeBrand}
        removePrice={removePrice}
        removeDate={removeDate}
        removeKm={removeKm}
        removeNumberBox={removeNumberBox}
        removeFuel={removeFuel}
        removeColor={removeColor}
        removeCountry={removeCountry}
        removeModel={removeModel}
        removeFormCar={removeFormCar}
        removeStatus={removeStatus}
        removeUser={removeUser}
      ></FilterBy>

      <div className="wrapper-filter">
        <div className="buttons">
          <CustomButton onClick={handleRenew}>Xóa lọc</CustomButton>
          <CustomButton onClick={handleApply}>Áp dụng</CustomButton>
        </div>
      </div>
      <ModalListFilter
        title="Số chỗ"
        modalListAll={modalListAll}
        handleCancleModal={handleCancleModalListAll}
        setFilter={setFilter}
        data={
          typeModal === "sit"
            ? carSit
            : typeModal === "brand"
            ? brandList
            : typeModal === "color"
            ? colorsCar
            : typeModal === "country"
            ? countriesCar
            : typeModal === "model"
            ? models[0]?.models
            : typeModal === "formCar"
            ? formsCar
            : ""
        }
        setValueRadio={typeModal}
        setState={setState}
        typeModal={typeModal}
        setValueRadioAll={typeModal}
        valueRadioAll={
          typeModal === "sit"
            ? state.valueRadioAll
            : typeModal === "brand"
            ? state.valueRadioAllBrand
            : typeModal === "color"
            ? state.valueRadioAllColor
            : typeModal === "country"
            ? state.valueRadioAllCountry
            : typeModal === "model"
            ? state.valueRadioAllModel
            : typeModal === "formCar"
            ? state.valueRadioAllFormCar
            : state.valueRadioAll
        }
      ></ModalListFilter>
    </CustomModal>
  );
};
export default ModalFilter;
