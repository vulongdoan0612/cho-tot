import BrandCarDropdown from "@/components/BrandCarDropdown";
import { ArrowInputIcon, FilterIcon } from "@/components/CustomIcons";
import FindInAreaDropdown from "@/components/FindInAreaDropdown/item";
import Selection from "@/components/FindInAreaDropdown/selection";
import PriceDropdown from "@/components/PriceDropdown";
import SitDropdown from "@/components/SitDropdown";
import { IFilterHeader } from "@/interfaces/User";
import Page from "@/layout/Page";
import axios from "axios";
import { useEffect,  useState } from "react";
import { defaultCommonState } from "./_mock";

const SellingPage = () => {
  const [state, setState] = useState<IFilterHeader>(defaultCommonState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
        );
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
  return (
    <Page style={{ backgroundColor: "#f4f4f4" }}>
      <div className="selling-wrapper">
        <div className="header">
          <div className="filter">
            {" "}
            <FilterIcon></FilterIcon>
            <span>Lọc</span>
          </div>
          <span className="line"></span>

          <div className="filter-right">
            <div className="find-address">
              <div className="find-address-flex">
                <span
                  onClick={handleClickFindAddress}
                  className="button"
                  id="button-toan-quoc"
                >
                  Toàn quốc <ArrowInputIcon id="svg-toan-quoc"></ArrowInputIcon>
                </span>
                {state.openFind && (
                  <FindInAreaDropdown
                    districts={state.districts}
                    setState={setState}
                    selectCity={state.selectCity}
                    districtName={state.districtName}
                    cities={state.cities}
                    cityName={state.cityName}
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
                className="button"
                onClick={handleClickPrice}
                id="button-gia"
              >
                Giá <ArrowInputIcon id="svg-gia"></ArrowInputIcon>
              </span>
              {state.openPrice && (
                <PriceDropdown
                  openPrice={state.openPrice}
                  setState={setState}
                ></PriceDropdown>
              )}
            </div>
            <div className="sit">
              <span
                className="button"
                id="button-so-cho"
                onClick={handleClickSit}
              >
                Số chỗ <ArrowInputIcon id="svg-so-cho"></ArrowInputIcon>
              </span>
              {state.openSit && (
                <SitDropdown
                  valueRadioSit={state.valueRadioSit}
                  setState={setState}
                  state={state}
                ></SitDropdown>
              )}
            </div>
            <div className="brand">
              <span
                className="button"
                id="button-hang-xe"
                onClick={handleClickBrand}
              >
                Hãng xe <ArrowInputIcon id="svg-hang-xe"></ArrowInputIcon>
              </span>
              {state.openBrand && (
                <BrandCarDropdown
                  valueRadioBrand={state.valueRadioBrand}
                  setState={setState}
                  openBrand={state.openBrand}
                ></BrandCarDropdown>
              )}
            </div>
            <div className="brand">
              <span className="button">
                Hãng xe <ArrowInputIcon></ArrowInputIcon>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </Page>
  );
};
export default SellingPage;
