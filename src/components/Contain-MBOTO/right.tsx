import { useEffect, useState } from "react";
import { ArrowDownIcon } from "../CustomIcons";
import { cities, forms, fuels, numberBox, prices, sits } from "./_mock";
import { useRouter } from "next/router";

const RightFilterMBOTO = ({ setState }: any) => {
  const [filterSeeMoreForm, setFilterSeeMoreForm] = useState(false);
  const [filterSeeMoreSit, setFilterSeeMoreSit] = useState(false);
  const [filterSeeMoreCity, setFilterSeeMoreCity] = useState(false);
  const router = useRouter();

  const [filterSeeMorePrice, setFilterSeeMorePrice] = useState(false);
  const [filterStatus, setFilterStatus] = useState(true);
  const [filterSit, setFilterSit] = useState(true);
  const [filterCity, setFilterCity] = useState(true);

  const [filterFuel, setFilterFuel] = useState(true);
  const [filterNumberBox, setFilterNumberBox] = useState(true);

  const [filterPrice, setFilterPrice] = useState(true);
  const [filterForm, setFilterForm] = useState(true);

  const handleFilterSeeMorePrice = () => {
    setFilterSeeMorePrice((prev) => !prev);
  };
  const handleFilterSeeMoreCity = () => {
    setFilterSeeMoreCity((prev) => !prev);
  };
  const handleFilterSeeMoreForm = () => {
    setFilterSeeMoreForm((prev) => !prev);
  };
  const handleFilterSeeMoreSit = () => {
    setFilterSeeMoreSit((prev) => !prev);
  };
  const handleFilterForm = () => {
    setFilterForm((prev) => !prev);
  };
  const handleFilterPrice = () => {
    setFilterPrice((prev) => !prev);
  };
  const handleFilterStatus = () => {
    setFilterStatus((prev) => !prev);
  };
  const handleFilterSit = () => {
    setFilterSit((prev) => !prev);
  };
  const handleFilterCity = () => {
    setFilterCity((prev) => !prev);
  };
  const handleFilterFuel = () => {
    setFilterFuel((prev) => !prev);
  };
  const handleFilterNumberBox = () => {
    setFilterNumberBox((prev) => !prev);
  };
  const queryPrice = (item: any) => {
    updateURL({ price: item });
  };
  const queryForm = (item: any) => {
    updateURL({ form: item });
  };
  const querySit = (item: any) => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioModal: item,
    }));
    updateURL({ sit: item });
  };
  const queryFuel = (item: any) => {
    updateURL({ fuel: item });
  };
  const queryNumberBox = (item: any) => {
    updateURL({ numberBox: item });
  };
  const removeQueries = (keysToRemove: string[]) => {
    const updatedQuery = { ...router.query };
    keysToRemove.forEach((key) => {
      delete updatedQuery[key];
    });
    router.push({
      pathname: "/mua-ban-oto",
      query: updatedQuery,
    });
  };
  const updateURL = (queryParams: any) => {
    router.push({
      pathname: "/mua-ban-oto",
      query: { ...router.query, ...queryParams },
    });
  };
  const queryCity = (item: any) => {
    updateURL({ city: item });
  };
  return (
    <div className="right-contain">
      <div className="filter-status">
        <span
          onClick={handleFilterStatus}
          className="title-filter prevent-select"
        >
          Lọc theo tình trạng{" "}
          <ArrowDownIcon
            className={filterStatus ? "" : "rotate"}
          ></ArrowDownIcon>
        </span>
        {filterStatus && (
          <div className="list">
            <span>Đã sử dụng</span>
            <span>Mới</span>
          </div>
        )}
      </div>{" "}
      {!router.query.price && (
        <div className="filter-status">
          <span
            onClick={handleFilterPrice}
            className="title-filter prevent-select"
          >
            Lọc theo giá{" "}
            <ArrowDownIcon
              className={filterPrice ? "" : "rotate"}
            ></ArrowDownIcon>
          </span>
          {filterPrice && (
            <div className="list">
              {prices.slice(0, 5).map((item, index) => {
                return (
                  <span key={index} onClick={() => queryPrice(item.value)}>
                    {item.item}
                  </span>
                );
              })}
              {filterSeeMorePrice ? (
                prices.slice(5, 10).map((item, index) => {
                  return (
                    <span key={index} onClick={() => queryPrice(item.value)}>
                      {item.item}
                    </span>
                  );
                })
              ) : (
                <></>
              )}
              <div className="see-more" onClick={handleFilterSeeMorePrice}>
                Xem thêm{" "}
                <ArrowDownIcon
                  className={filterSeeMorePrice ? "rotate" : ""}
                ></ArrowDownIcon>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="filter-status">
        <span
          onClick={handleFilterForm}
          className="title-filter prevent-select"
        >
          Lọc theo kiểu dáng{" "}
          <ArrowDownIcon className={filterForm ? "" : "rotate"}></ArrowDownIcon>
        </span>
        {filterForm && (
          <div className="list">
            {forms.slice(0, 5).map((item, index) => {
              return (
                <span key={index} onClick={() => queryForm(item.value)}>
                  {item.item}
                </span>
              );
            })}
            {filterSeeMoreForm ? (
              forms.slice(5, 8).map((item, index) => {
                return (
                  <span key={index} onClick={() => queryForm(item.value)}>
                    {item.item}
                  </span>
                );
              })
            ) : (
              <></>
            )}
            <div className="see-more" onClick={handleFilterSeeMoreForm}>
              Xem thêm{" "}
              <ArrowDownIcon
                className={filterSeeMoreForm ? "rotate" : ""}
              ></ArrowDownIcon>
            </div>
          </div>
        )}
      </div>
      {!router.query.sit && (
        <div className="filter-status">
          <span
            onClick={handleFilterSit}
            className="title-filter prevent-select"
          >
            Lọc theo số chỗ{" "}
            <ArrowDownIcon
              className={filterSit ? "" : "rotate"}
            ></ArrowDownIcon>
          </span>
          {filterSit && (
            <div className="list">
              {sits.slice(0, 6).map((item, index) => {
                return (
                  <span key={index} onClick={() => querySit(item.value)}>
                    {item.item}
                  </span>
                );
              })}
              {filterSeeMoreSit ? (
                sits.slice(6, 12).map((item, index) => {
                  return (
                    <span key={index} onClick={() => querySit(item.value)}>
                      {item.item}
                    </span>
                  );
                })
              ) : (
                <></>
              )}
              <div className="see-more" onClick={handleFilterSeeMoreSit}>
                Xem thêm{" "}
                <ArrowDownIcon
                  className={filterSeeMoreSit ? "rotate" : ""}
                ></ArrowDownIcon>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="filter-status">
        <span
          onClick={handleFilterFuel}
          className="title-filter prevent-select"
        >
          Lọc theo nhiên liệu{" "}
          <ArrowDownIcon className={filterFuel ? "" : "rotate"}></ArrowDownIcon>
        </span>
        {filterFuel && (
          <div className="list">
            {fuels.map((item, index) => {
              return (
                <span key={index} onClick={() => queryFuel(item.value)}>
                  {item.item}
                </span>
              );
            })}
          </div>
        )}
      </div>
      <div className="filter-status">
        <span
          onClick={handleFilterNumberBox}
          className="title-filter prevent-select"
        >
          Lọc theo hộp số{" "}
          <ArrowDownIcon
            className={filterNumberBox ? "" : "rotate"}
          ></ArrowDownIcon>
        </span>
        {filterNumberBox && (
          <div className="list">
            {numberBox.map((item, index) => {
              return (
                <span key={index} onClick={() => queryNumberBox(item.value)}>
                  {item.item}
                </span>
              );
            })}
          </div>
        )}
      </div>
      {!router.query.city && (
        <div className="filter-status">
          <span
            onClick={handleFilterCity}
            className="title-filter prevent-select"
          >
            Mua bán ô tô{" "}
            <ArrowDownIcon
              className={filterCity ? "" : "rotate"}
            ></ArrowDownIcon>
          </span>
          {filterCity && (
            <div className="list">
              {cities.slice(0, 6).map((item: any, index: any) => {
                return (
                  <span key={index} onClick={() => queryCity(item.value)}>
                    {item.item}
                  </span>
                );
              })}
              {filterSeeMoreCity ? (
                cities.slice(6, 20).map((item: any, index: any) => {
                  return (
                    <span key={index} onClick={() => queryCity(item.value)}>
                      {item.item}
                    </span>
                  );
                })
              ) : (
                <></>
              )}
              <div className="see-more" onClick={handleFilterSeeMoreCity}>
                Xem thêm{" "}
                <ArrowDownIcon
                  className={filterSeeMoreCity ? "rotate" : ""}
                ></ArrowDownIcon>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default RightFilterMBOTO;