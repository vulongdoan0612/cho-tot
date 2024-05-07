import { Input, Radio, RadioChangeEvent } from "antd";
import { SearchIcon } from "../CustomIcons";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

const SitDropdown = ({ setState, valueRadioSit, state }: any) => {
  const sitRef: any = useRef(null); // Ref for FindInAreaDropdown
  const [searchSit, setSearchSit] = useState("");
  const router = useRouter();
  // useEffect(() => {
  //   if (!router.isReady) return;
  //   setState((prevState: any) => ({
  //     ...prevState,
  //     valueRadioSit: router.query.sit,
  //   }));
  // }, [router]);
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
  const [dataRender, setDataRender] = useState<any>([]);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        sitRef.current &&
        !sitRef.current.contains(event.target) &&
        event?.target?.id !== "button-so-cho" &&
        event?.target?.id !== "svg-so-cho"
      ) {
        setState((prevState: any) => ({
          ...prevState,
          openSit: false,
        }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [state.openSit]);
  const data = [2, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, "Khác"];
  const handleRenew = () => {
    try {
      setSearchSit("");
      setState((prevState: any) => ({
        ...prevState,
        valueRadioSit: "",
      }));
      setDataRender(data);
    } finally {
      setState((prevState: any) => ({
        ...prevState,
        openSit: false,
      }));
      // removeQueries(["sit"]);
    }
  };
  useEffect(() => {
    setDataRender(data);
  }, []);
  const handleSearchSit = (event: any) => {
    const { value } = event.target;
    setSearchSit(value);
    const result = data.filter((sit: any) => {
      return sit.toString().includes(value);
    });
    setDataRender(result);
  };
  const onChangeRadio = (e: RadioChangeEvent) => {
    setState((prevState: any) => ({
      ...prevState,
      valueRadioSit: e.target.value,
      openSit: false,
      valueRadioModal: e.target.value,
    }));

    updateURL({ sit: String(e.target.value) });
  };
  return (
    <>
      {" "}
      <div className={`sit-select`} ref={sitRef}>
        <div className="header-search">
          <span className="title">Số chỗ</span>
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
              onChange={handleSearchSit}
              value={searchSit}
            />{" "}
          </div>
          <div className="sits">
            {dataRender.map((item: any, index: any) => {
              return (
                <div key={index} className="sit-item">
                  <Radio.Group value={valueRadioSit} onChange={onChangeRadio}>
                    <Radio value={item}>
                      {" "}
                      <span className="sit-name">{item}</span>
                    </Radio>
                  </Radio.Group>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default SitDropdown;
