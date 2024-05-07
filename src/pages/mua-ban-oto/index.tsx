"use-client";
import { ArrowInputIcon, FilterIcon, TickIcon } from "@/components/CustomIcons";
import FindInAreaDropdown from "@/components/FindInAreaDropdown/item";
import Selection from "@/components/FindInAreaDropdown/selection";
import PriceDropdown from "@/components/PriceDropdown";
import SitDropdown from "@/components/SitDropdown";
import { IFilterHeader } from "@/interfaces/User";
import Page from "@/layout/Page";
import axios from "axios";
import { useEffect, useState } from "react";
import { defaultCommonState } from "./_mock";
import ModalFilter from "@/components/Modal/ModalFilter";
import ContainMBOTO from "@/components/Contain-MBOTO";
import formatMoney from "@/utils/formatMoney";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/router";
import { useFetchPosts } from "@/hooks/useFetchPosts";
import BrandCarDropdown from "@/components/BrandCarDropdown";
import brandList from "../../components/BrandCarDropdown/brandList.json";

const SellingPage = () => {
  const router = useRouter();
  const [spin, setSpin] = useState(false);
  const [pageSize, setPagesize] = useState(5);
  const [current, setCurrent] = useState(1);
  const { posts } = useSelector((state: RootState) => state.postsData);

  const [state, setState] = useState<IFilterHeader>(defaultCommonState);
  const [filterFind, setFilterFind] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [filter, setFilter] = useState<any>({
    sit: "",
    brand: "",
    country: "",
    form: "",
    color: "",
    numberBox: "",
    fuel: "",
    model: "",
    status: "",
    post: "",
    date: "",
    price: "",
    km: "",
  });
  useFetchPosts({
    setCurrent,
    current: current,
    pageSize: pageSize,
    body: router,
    setSpin,
  });

  useEffect(() => {
    if (!router.isReady) return;
    if (router.query.price === "un200tr") {
      setState((prevState: any) => ({
        ...prevState,
        valuePriceMin: 0,
        inputValueMin: 0,
        inputValueMax: 200000000,
        valuePriceMax: 200000000,
        priceMin: 0,
        priceMax: 200000000,
      }));
    } else if (router.query.price === "200tr-300tr") {
      setState((prevState: any) => ({
        ...prevState,
        valuePriceMin: 200000000,
        inputValueMin: 200000000,
        inputValueMax: 300000000,
        valuePriceMax: 300000000,
        priceMin: 200000000,
        priceMax: 300000000,
      }));
    } else if (router.query.price === "300tr-400tr") {
      setState((prevState: any) => ({
        ...prevState,
        valuePriceMin: 300000000,
        inputValueMin: 300000000,
        inputValueMax: 400000000,
        valuePriceMax: 400000000,
        priceMin: 300000000,
        priceMax: 400000000,
      }));
    } else if (router.query.price === "400tr-500tr") {
      setState((prevState: any) => ({
        ...prevState,
        valuePriceMin: 400000000,
        inputValueMin: 400000000,
        inputValueMax: 500000000,
        valuePriceMax: 500000000,
        priceMin: 400000000,
        priceMax: 500000000,
      }));
    } else if (router.query.price === "500tr-600tr") {
      setState((prevState: any) => ({
        ...prevState,
        valuePriceMin: 500000000,
        inputValueMin: 500000000,
        inputValueMax: 600000000,
        valuePriceMax: 600000000,
        priceMin: 500000000,
        priceMax: 600000000,
      }));
    } else if (router.query.price === "600tr-700tr") {
      setState((prevState: any) => ({
        ...prevState,
        valuePriceMin: 600000000,
        inputValueMin: 600000000,
        inputValueMax: 700000000,
        valuePriceMax: 700000000,
        priceMin: 600000000,
        priceMax: 700000000,
      }));
    } else if (router.query.price === "700tr-800tr") {
      setState((prevState: any) => ({
        ...prevState,
        valuePriceMin: 700000000,
        inputValueMin: 700000000,
        inputValueMax: 800000000,
        valuePriceMax: 800000000,
        priceMin: 700000000,
        priceMax: 800000000,
      }));
    } else if (router.query.price === "800tr-1t") {
      setState((prevState: any) => ({
        ...prevState,
        valuePriceMin: 800000000,
        inputValueMin: 800000000,
        inputValueMax: 1000000000,
        valuePriceMax: 1000000000,
        priceMin: 800000000,
        priceMax: 1000000000,
      }));
    } else if (router.query.price === "1t-2t") {
      setState((prevState: any) => ({
        ...prevState,
        valuePriceMin: 1000000000,
        inputValueMin: 1000000000,
        inputValueMax: 2000000000,
        valuePriceMax: 2000000000,
        priceMin: 1000000000,
        priceMax: 2000000000,
      }));
    } else if (router.query.price === "up2t") {
      setState((prevState: any) => ({
        ...prevState,
        valuePriceMin: 2000000000,
        inputValueMin: 2000000000,
        inputValueMax: 0,
        valuePriceMax: 0,
        priceMin: 2000000000,
        priceMax: 0,
      }));
    } else if (router && router.query && typeof router.query.price === "string") {
      const priceParams = router.query.price.split("-");
      let lowerPrice: any, upperPrice: any;
      if (priceParams.length === 1) {
        const match = priceParams[0].match(/(min|max)(\d+)/);
        if (match) {
          if (match[1] === "min") {
            lowerPrice = parseInt(match[2]);
            setState((prevState: any) => ({
              ...prevState,
              valuePriceMin: lowerPrice,
              valuePriceMax: 0,
              inputValueMax: 0,
              inputValueMin: lowerPrice,
              priceMin: lowerPrice,
              priceMax: 0,
            }));
          } else if (match[1] === "max") {
            upperPrice = parseInt(match[2]);
            setState((prevState: any) => ({
              ...prevState,
              valuePriceMin: 0,
              valuePriceMax: upperPrice,
              inputValueMax: upperPrice,
              inputValueMin: 0,
              priceMin: 0,
              priceMax: upperPrice,
            }));
          }
        }
      } else if (priceParams.length === 2) {
        lowerPrice = parseInt(priceParams[0]);
        upperPrice = parseInt(priceParams[1]);
        setState((prevState: any) => ({
          ...prevState,
          valuePriceMin: lowerPrice,
          valuePriceMax: upperPrice,
          inputValueMax: upperPrice,
          inputValueMin: lowerPrice,
          priceMin: lowerPrice,
          priceMax: upperPrice,
        }));
      }
    } else if (router.query.price === undefined) {
      setState((prevState: any) => ({
        ...prevState,
        valuePriceMin: null,
        valuePriceMax: null,
        inputValueMax: 0,
        inputValueMin: 0,
      }));
    }
    if (router.query.sit === "2") {
      setState((prevState: any) => ({
        ...prevState,
        valueRadioSit: 2,
        valueRadioAll: router.query.sit,
        valueRadioModal: router.query.sit,
      }));
    } else if (router.query.sit === "4") {
      setState((prevState: any) => ({
        ...prevState,
        valueRadioSit: 4,
        valueRadioAll: router.query.sit,
        valueRadioModal: router.query.sit,
      }));
    } else if (router.query.sit === "5") {
      setState((prevState: any) => ({
        ...prevState,
        valueRadioSit: 5,
        valueRadioAll: router.query.sit,
        valueRadioModal: router.query.sit,
      }));
    } else if (router.query.sit === "6") {
      setState((prevState: any) => ({
        ...prevState,
        valueRadioSit: 6,
        valueRadioAll: router.query.sit,
        valueRadioModal: router.query.sit,
      }));
    } else if (router.query.sit === "7") {
      setState((prevState: any) => ({
        ...prevState,
        valueRadioSit: 7,
        valueRadioAll: router.query.sit,
        valueRadioModal: router.query.sit,
      }));
    } else if (router.query.sit === "8") {
      setState((prevState: any) => ({
        ...prevState,
        valueRadioSit: 8,
        valueRadioAll: router.query.sit,
        valueRadioModal: router.query.sit,
      }));
    } else if (router.query.sit === "9") {
      setState((prevState: any) => ({
        ...prevState,
        valueRadioSit: 9,
        valueRadioAll: router.query.sit,
        valueRadioModal: router.query.sit,
      }));
    } else if (router.query.sit === "10") {
      setState((prevState: any) => ({
        ...prevState,
        valueRadioSit: 10,
        valueRadioAll: router.query.sit,
        valueRadioModal: router.query.sit,
      }));
    } else if (router.query.sit === "12") {
      setState((prevState: any) => ({
        ...prevState,
        valueRadioSit: 12,
        valueRadioAll: router.query.sit,
        valueRadioModal: router.query.sit,
      }));
    } else if (router.query.sit === "14") {
      setState((prevState: any) => ({
        ...prevState,
        valueRadioSit: 14,
        valueRadioAll: router.query.sit,
        valueRadioModal: router.query.sit,
      }));
    } else if (router.query.sit === "16") {
      setState((prevState: any) => ({
        ...prevState,
        valueRadioSit: 16,
        valueRadioAll: router.query.sit,
        valueRadioModal: router.query.sit,
      }));
    } else if (router.query.sit === undefined) {
      setState((prevState: any) => ({
        ...prevState,
        valueRadioSit: "",
      }));
    }
    if (router.query.city && state?.cities) {
      const selectedCity = state?.cities?.find((city: any) => city.Id === router.query.city);
      setState((prevState: any) => ({
        ...prevState,
        idCity: selectedCity?.Id,
        selectCity: selectedCity?.Name,
        cityName: selectedCity?.Name,
        valueRadio: selectedCity?.Name,
        districts: selectedCity?.Districts,
      }));
      setFilterFind(selectedCity?.Name);
    }

    if (router.query.brand !== "" && router.query.brand !== undefined) {
      setState((prevState: any) => ({
        ...prevState,
        valueRadioBrand: router.query.brand,
        valueRadioAllBrand: router.query.brand,
        valueRadioBrandModal: router.query.brand,
      }));
    } else if (router.query.brand === undefined) {
      setState((prevState: any) => ({
        ...prevState,
        valueRadioBrand: "",
      }));
    }
  }, [
    router.isReady,
    router.query.city,
    router.query.price,
    router.query.district,
    router.query.sit,
    router.query.brand,
    state?.cities,
    router,
  ]);

  useEffect(() => {
    if (state?.districts?.length > 0 && router.query.district) {
      const selectedDistrict = state?.districts?.find((district: any) => district.Id === router.query.district);
      setState((prevState: any) => ({
        ...prevState,
        idDistrict: selectedDistrict?.Id,
        districtName: selectedDistrict?.Name,
        valueRadioDistrict: selectedDistrict?.Name,
      }));
      setFilterFind(selectedDistrict?.Name || state.cityName);
    }
  }, [state?.districts, router.query.district, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json");
        setState((prevState) => ({
          ...prevState,
          cities: response.data,
          searchResult: response?.data,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    if (state.openFind) {
      setState((prevState: any) => ({
        ...prevState,
        openFind: true,
      }));
    } else {
      setState((prevState: any) => ({
        ...prevState,
        openFind: false,
      }));
    }
  }, [state.openFind]);

  useEffect(() => {
    if (state.openPrice) {
      setState((prevState: any) => ({
        ...prevState,
        openPrice: true,
      }));
    } else {
      setState((prevState: any) => ({
        ...prevState,
        openPrice: false,
      }));
    }
  }, [state.openPrice]);
  useEffect(() => {
    if (state.openSit) {
      setState((prevState: any) => ({
        ...prevState,
        openSit: true,
      }));
    } else {
      setState((prevState: any) => ({
        ...prevState,
        openSit: false,
      }));
    }
  }, [state.openSit]);
  const handleClickFindAddress = () => {
    setState((prevState: any) => ({
      ...prevState,
      openFind: !prevState.openFind,
    }));
    if (state.openSearchCity && !state.openFind) {
      setState((prevState: any) => ({
        ...prevState,
        openFind: false,
        openSearchCity: false,
      }));
    }
    if (state.openSearchDistrict && !state.openFind) {
      setState((prevState: any) => ({
        ...prevState,
        openFind: false,
        openSearchDistrict: false,
      }));
    }
  };

  const handleClickPrice = () => {
    setState((prevState: any) => ({
      ...prevState,
      openPrice: !prevState.openPrice,
    }));
  };
  const handleClickSit = () => {
    setState((prevState: any) => ({
      ...prevState,
      openSit: !prevState.openSit,
    }));
  };
  const handleClickBrand = () => {
    setState((prevState: any) => ({
      ...prevState,
      openBrand: !prevState.openBrand,
    }));
  };
  const handleFilterModal = () => {
    setOpenModal(true);
  };

  const handleCancleModal = () => {
    setOpenModal(false);
  };
  const onChangePage = (page: number) => {
    setCurrent(page);
  };
  return (
    <Page style={{ backgroundColor: "#f4f4f4" }}>
      <div className="selling-wrapper">
        <div className="header">
          <div className="filter" onClick={handleFilterModal}>
            {" "}
            <div className="icon">
              <FilterIcon
                style={{ cursor: "pointer" }}
                className={
                  state.valueRadioModal ||
                  state.valueRadioBrandModal ||
                  state.date ||
                  state.dateMax ||
                  state.kmMin ||
                  state.kmMax ||
                  state.priceMin ||
                  state.priceMax ||
                  state.valueRadioNumberBox ||
                  state.valueRadioFuel ||
                  state.valueRadioColor ||
                  state.valueRadioCountry ||
                  state.valueRadioModel ||
                  state.valueRadioFormCar ||
                  state.valueRadioStatus ||
                  state.valueRadioUser
                    ? "active-filter-svg"
                    : ""
                }
              ></FilterIcon>
              {state.valueRadioModal ||
              state.valueRadioBrandModal ||
              state.date ||
              state.dateMax ||
              state.kmMin ||
              state.kmMax ||
              state.priceMin ||
              state.priceMax ||
              state.valueRadioNumberBox ||
              state.valueRadioFuel ||
              state.valueRadioColor ||
              state.valueRadioCountry ||
              state.valueRadioModel ||
              state.valueRadioFormCar ||
              state.valueRadioStatus ||
              state.valueRadioUser ? (
                <TickIcon className="tick"></TickIcon>
              ) : (
                <></>
              )}
            </div>
            <span
              style={{ cursor: "pointer" }}
              className={
                state.valueRadioModal ||
                state.valueRadioBrandModal ||
                state.date ||
                state.dateMax ||
                state.kmMin ||
                state.kmMax ||
                state.priceMin ||
                state.priceMax ||
                state.valueRadioNumberBox ||
                state.valueRadioFuel ||
                state.valueRadioColor ||
                state.valueRadioCountry ||
                state.valueRadioModel ||
                state.valueRadioFormCar ||
                state.valueRadioStatus ||
                state.valueRadioUser
                  ? "active-filter"
                  : ""
              }
            >
              Lọc
            </span>
          </div>
          <span className="line"></span>

          <div className="filter-right">
            <div className="find-address">
              <div className="find-address-flex">
                <span
                  onClick={handleClickFindAddress}
                  className={`button ${filterFind !== "" ? "active-filter-button" : ""}`}
                  id="button-toan-quoc"
                >
                  {filterFind !== "" ? filterFind : "Toàn quốc"}
                  <ArrowInputIcon id="svg-toan-quoc"></ArrowInputIcon>
                </span>
                {state.openFind && (
                  <FindInAreaDropdown
                    setFilterFind={setFilterFind}
                    districts={state.districts}
                    setState={setState}
                    selectCity={state.selectCity}
                    districtName={state.districtName}
                    cities={state.cities}
                    cityName={state.cityName}
                    idCity={state.idCity}
                    idDistrict={state.idDistrict}
                    openFind={state.openFind}
                  ></FindInAreaDropdown>
                )}
                <Selection
                  openFind={state.openFind}
                  setState={setState}
                  searchResultDistrict={state.searchResultDistrict}
                  valueRadioDistrict={state.valueRadioDistrict}
                  valueRadio={state.valueRadio}
                  cities={state.cities}
                  districts={state.districts}
                  openSearchCity={state.openSearchCity}
                  searchResult={state.searchResult}
                  openSearchDistrict={state.openSearchDistrict}
                ></Selection>
              </div>
            </div>
            <div className="price">
              {" "}
              <span
                className={`button ${
                  state.valuePriceMin === 0 && state.valuePriceMax !== null && state.valuePriceMax !== 0
                    ? "active-filter-button"
                    : state.valuePriceMin !== 0 && state.valuePriceMin !== null
                    ? "active-filter-button"
                    : ""
                }`}
                onClick={handleClickPrice}
                id="button-gia"
              >
                {(state.valuePriceMin === 0 || state.valuePriceMin === null) && state.valuePriceMax !== null && state.valuePriceMax !== 0
                  ? `Đến ${formatMoney(state.valuePriceMax)}`
                  : // state.valuePriceMin === 2000000000 &&
                  //   state.valuePriceMax === 0 &&
                  //   state.inputValueMin === 2000000000 &&
                  //   state.inputValueMax === 0
                  (state.valuePriceMax === 0 || state.valuePriceMax === null) && state.valuePriceMin !== null && state.valuePriceMin !== 0
                  ? `Từ ${formatMoney(state.valuePriceMin)}`
                  : state.valuePriceMin !== 0 && state.valuePriceMin !== null
                  ? `${formatMoney(state.valuePriceMin)} - ${formatMoney(state.valuePriceMax)}`
                  : state.valuePriceMax === null && state.valuePriceMin === null
                  ? "Giá"
                  : "Giá"}
                <ArrowInputIcon id="svg-gia"></ArrowInputIcon>
              </span>
              {state.openPrice && (
                <PriceDropdown
                  setFilter={setFilter}
                  filter={filter}
                  inputValueMin={state.inputValueMin}
                  inputValueMax={state.inputValueMax}
                  openPrice={state.openPrice}
                  setState={setState}
                ></PriceDropdown>
              )}
            </div>
            <div className="sit">
              <span
                className={`button ${state.valueRadioSit !== "" && state.valueRadioSit !== undefined ? "active-filter-button" : ""}`}
                id="button-so-cho"
                onClick={handleClickSit}
              >
                {state.valueRadioSit !== "" && state.valueRadioSit !== undefined ? `${state.valueRadioSit} chỗ` : "Số chỗ"}{" "}
                <ArrowInputIcon id="svg-so-cho"></ArrowInputIcon>
              </span>
              {state.openSit && <SitDropdown valueRadioSit={state.valueRadioSit} setState={setState} state={state}></SitDropdown>}
            </div>
            <div className="brand">
              <span
                className={`button ${state.valueRadioBrand !== "" ? "active-filter-button" : ""}`}
                id="button-hang-xe"
                onClick={handleClickBrand}
              >
                {state.valueRadioBrand !== "" ? `${state.valueRadioBrand}` : "Hãng xe"} <ArrowInputIcon id="svg-hang-xe"></ArrowInputIcon>
              </span>
              {state.openBrand && (
                <BrandCarDropdown
                  valueRadioBrand={state.valueRadioBrand}
                  setState={setState}
                  openBrand={state.openBrand}
                ></BrandCarDropdown>
              )}
            </div>
          </div>
        </div>
        <ContainMBOTO
          spin={spin}
          pageSize={pageSize}
          posts={posts}
          setState={setState}
          setPagesize={setPagesize}
          setCurrent={setCurrent}
          onChangePage={onChangePage}
          current={current}
        ></ContainMBOTO>
      </div>
      <ModalFilter
        setState={setState}
        handleCancleModal={handleCancleModal}
        state={state}
        openModal={openModal}
        setFilter={setFilter}
        filter={filter}
      ></ModalFilter>
      {/* <Spin spinning={spin} fullscreen={true}></Spin> */}
    </Page>
  );
};
export default SellingPage;
