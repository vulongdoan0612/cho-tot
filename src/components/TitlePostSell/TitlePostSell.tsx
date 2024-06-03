import { SelectChangeEvent, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import CustomButtonSelect from "../CustomButtonSelect";
import ModalAddressUser from "../Modal/ModalAddressUser";
import { ArrowInputIcon } from "../CustomIcons";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import CustomButton from "../CustomButton";
import axios from "axios";
import { EditPostFormSellCheck, PostFormSellCheck } from "@/services/formPost";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { ICommonStateFormRenderCarPost } from "@/interfaces/User";
import { defaultCommonState } from "./mock";
import getCityValueName from "@/utils/getCityValueName";
import getDistrictValueName from "@/utils/getDistrictValueName";
import getWardValueName from "@/utils/getWardValueName";
import limitInputCharacters from "@/utils/limitInput";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const TitlePostSell = ({
  value,
  color,
  carNumber,
  fileList,
  dateCar,
  handleWarning,
  owner,
  form,
  country,
  sit,
  activeButton,
  accessories,
  registry,
  numberBox,
  price,
  km,
  model,
  status,
  setStateFill,
  stateFill,
}: any) => {
  const router = useRouter();
  const { id } = router.query;
  const { dataPost } = useSelector((state: RootState) => state.postSell);
  const { account } = useSelector((state: RootState) => state.auth);
  const [statePost, setStatePost] = useState<ICommonStateFormRenderCarPost>(defaultCommonState);
  const [fillAddrCity, setFillAddrCity] = useState(false);
  const [fillAddrWard, setFillAddrWard] = useState(false);
  const [fillAddrDistrict, setFillAddrDistrict] = useState(false);
  const [fillAddrDetail, setFillAddrDetail] = useState(false);

  const config2 = {
    useSearch: false,
    minHeight: 200,
    spellcheck: false,
    toolbarAdaptive: false,
    toolbarSticky: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    minWidth: null,
    buttons: "bold,italic,underline,eraser,ul,ol,font,fontsize,lineHeight,hr,indent",
    placeholder: "Giới thiệu",
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json");
        setStatePost((prevState) => ({
          ...prevState,
          cities: response.data,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!id) {
      setStatePost((prevState) => ({
        ...prevState,
        cityValue: account?.user?.address?.cityValue,
        districtValue: account?.user?.address?.districtValue,
        wardValue: account?.user?.address?.wardValue,
        detailAddress: account?.user?.address?.detailAddress,
        fullAddress: account?.user?.address?.fullAddress,
      }));

      if (account?.user?.address?.city !== null && statePost?.cities.length > 0) {
        const selectedCityId = account?.user?.address?.cityValue;
        const selectedCity = statePost?.cities.find((city: any) => city.Id === selectedCityId);
        setStatePost((prevState) => ({
          ...prevState,
          cityValueName: selectedCity?.Name,
        }));
        if (selectedCity) {
          setStatePost((prevState) => ({
            ...prevState,
            districts: selectedCity?.Districts,
          }));
        }
      }
    }
  }, [
    account,
    account?.user,
    account?.user?.address,
    account?.user?.address?.cityValue,
    account?.user?.address?.districtValue,
    account?.user?.address?.wardValue,
    statePost?.cities,
    id,
  ]);

  useEffect(() => {
    if (!id) {
      if (statePost?.districts.length > 0) {
        const selectedDistrictId = account?.user?.address?.districtValue;
        const selectedDistrict = statePost?.districts.find((district: any) => district.Id === selectedDistrictId);
        setStatePost((prevState) => ({
          ...prevState,
          districtValueName: selectedDistrict?.Name,
        }));
        if (selectedDistrict) {
          setStatePost((prevState) => ({
            ...prevState,
            wards: selectedDistrict?.Wards,
          }));
        }
      }
    }
  }, [statePost?.districts]);

  useEffect(() => {
    if (id) {
      setStatePost((prevState) => ({
        ...prevState,
        cityValue: dataPost?.post?.cityValue,
        districtValue: dataPost?.post?.districtValue,
        wardValue: dataPost?.post?.wardValue,
        detailAddress: dataPost?.post?.detailAddress,
        fullAddress: dataPost?.post?.fullAddress,
      }));
      if (dataPost?.post?.cityValue !== null) {
        const selectedCityId = dataPost?.post?.cityValue;
        const selectedCity = statePost?.cities.find((city: any) => city.Id === selectedCityId);
        if (selectedCity) {
          setStatePost((prevState) => ({
            ...prevState,
            districts: selectedCity.Districts,
          }));
        }
      }
    }
  }, [
    dataPost,
    dataPost?.post?.cityValue,
    dataPost?.post?.detailAddress,
    dataPost?.post?.districtValue,
    dataPost?.post?.fullAddress,
    dataPost?.post?.wardValue,
    statePost?.cities,
    id,
  ]);

  useEffect(() => {
    if (id) {
      if (statePost?.districts.length > 0) {
        const selectedDistrictId = dataPost?.post?.districtValue;
        const selectedDistrict = statePost?.districts.find((district: any) => district.Id === selectedDistrictId);
        if (selectedDistrict) {
          setStatePost((prevState) => ({
            ...prevState,
            wards: selectedDistrict?.Wards,
          }));
        }
      }
    }
  }, [statePost?.districts]);

  useEffect(() => {
    if (dataPost?.post) {
      setStatePost((prevState) => ({
        ...prevState,
        title: dataPost?.post?.title,
        introducing: dataPost?.post?.introducing,
        person: dataPost?.post?.person,
      }));
    }
  }, [dataPost?.post, dataPost?.post?.wardValue]);

  const isEmptyHTML = (input: any) => {
    const tempDiv: any = document.createElement("div");
    tempDiv.innerHTML = input;
    return !tempDiv.textContent.trim() && !tempDiv.querySelector("img, video, audio, iframe, object, embed");
  };

  const handleChangeTitle = (event: any) => {
    const newValue = limitInputCharacters(event?.target?.value, 100);
    setStatePost((prevState) => ({
      ...prevState,
      title: newValue,
    }));
    if (event?.target.value !== "") {
      setStateFill((prevState: any) => ({
        ...prevState,
        fillTitle: false,
      }));
    }
  };

  const contentFieldChanagedReason = (data: any) => {
    setStatePost((prevState) => ({
      ...prevState,
      introducing: data,
    }));
    if (!isEmptyHTML(data)) {
      setStateFill((prevState: any) => ({
        ...prevState,
        fillIntro: false,
      }));
    }
  };

  const handlePerson = (person: any) => {
    setStatePost((prevState) => ({
      ...prevState,
      person: person,
    }));
    if (person !== "") {
      setStateFill((prevState: any) => ({
        ...prevState,
        fillYouR: false,
      }));
    }
  };

  const handleCancleModal = () => {
    setStatePost((prevState) => ({
      ...prevState,
      modalConfirmSwitch: false,
    }));
  };

  const handleModal = () => {
    setStatePost((prevState) => ({
      ...prevState,
      modalConfirmSwitch: true,
    }));
  };

  const handleCityChange = (event: any) => {
    const selectedCityId = event.target.value;
    const selectedCity = statePost?.cities.find((city: any) => city.Id === selectedCityId);
    if (selectedCity) {
      setStatePost((prevState) => ({
        ...prevState,
        cityValue: event.target.value,
        districts: selectedCity.Districts || [],
        wards: [],
        districtValue: "",
        wardValue: "",
      }));
      if (event.target.value !== "") {
        setFillAddrCity(false);
      }
    }
  };

  const handleDistrictChange = (event: any) => {
    const selectedDistrictId = event.target.value;
    const selectedDistrict = statePost?.districts.find((district: any) => district?.Id === selectedDistrictId);

    if (selectedDistrict) {
      setStatePost((prevState) => ({
        ...prevState,
        districtValue: event.target.value,
        wards: selectedDistrict?.Wards,
      }));
      if (event.target.value !== "") {
        setFillAddrDistrict(false);
        setStatePost((prevState) => ({
          ...prevState,
          wardValue: "",
        }));
      }
    }
  };

  const handleChangeWard = (event: SelectChangeEvent) => {
    setStatePost((prevState) => ({
      ...prevState,
      wardValue: event.target.value,
    }));
    if (event.target.value !== "") {
      setFillAddrWard(false);
    }
  };

  const handleChangeDetailAddress = (event: any) => {
    const newValue = limitInputCharacters(event?.target?.value, 50);

    setStatePost((prevState) => ({
      ...prevState,
      detailAddress: newValue as string,
    }));
    if (event.target.value !== "") {
      setFillAddrDetail(false);
    }
  };

  const handleAddress = (e: any) => {
    console.log(e.target.value);
  };

  const onFinish = () => {
    if (statePost?.wardValue === undefined || statePost?.wardValue === "") {
      setFillAddrWard(true);
    }
    if (statePost?.districtValue === undefined || statePost?.districtValue === "") {
      setFillAddrDistrict(true);
    }
    if (statePost?.cityValue === undefined || statePost?.cityValue === "") {
      setFillAddrCity(true);
    }
    if (statePost?.detailAddress === undefined || statePost?.detailAddress === "") {
      setFillAddrDetail(true);
    }
    if (
      statePost?.detailAddress !== undefined &&
      statePost?.cityValue !== undefined &&
      statePost?.districtValue !== undefined &&
      statePost?.wardValue !== undefined &&
      statePost?.wardValue !== "" &&
      statePost?.districtValue !== "" &&
      statePost?.cityValue !== "" &&
      statePost?.detailAddress !== ""
    ) {
      let wardName = "";
      let city = "";
      let district = "";

      statePost?.wards.forEach((item: any) => {
        if (item.Id === statePost?.wardValue) {
          wardName = item.Name;
        }
      });
      statePost?.districts.forEach((item: any) => {
        if (item.Id === statePost?.districtValue) {
          district = item.Name;
        }
      });
      statePost?.cities.forEach((item: any) => {
        if (item.Id === statePost?.cityValue) {
          city = item.Name;
        }
      });
      const concatenatedAddress = `${statePost?.detailAddress} ,${wardName}, ${district}, ${city}`;
      setStatePost((prevState) => ({
        ...prevState,
        fullAddress: concatenatedAddress,
        modalConfirmSwitch: false,
      }));
      setStateFill((prevState: any) => ({
        ...prevState,
        fillAddress: false,
      }));
      setFillAddrWard(false);
      setFillAddrDistrict(false);
      setFillAddrCity(false);
      setFillAddrDetail(false);
    }
  };

  const postSell = async () => {
    const token = localStorage.getItem("access_token");
    const uuid = uuidv4();
    try {
      if (status === undefined) {
        setStateFill((prevState: any) => ({
          ...prevState,
          fillStatus: true,
        }));
      }
      if (value === undefined) {
        setStateFill((prevState: any) => ({
          ...prevState,
          fillBrand: true,
        }));
      }
      if (color === undefined) {
        setStateFill((prevState: any) => ({
          ...prevState,
          fillColor: true,
        }));
      }
      if ((carNumber === undefined || carNumber === "") && status === "Đã sử dụng") {
        setStateFill((prevState: any) => ({
          ...prevState,
          fillCarN: true,
        }));
      }
      if (owner === undefined && status === "Đã sử dụng") {
        setStateFill((prevState: any) => ({
          ...prevState,
          fillOwner: true,
        }));
      }
      if (price === undefined) {
        setStateFill((prevState: any) => ({
          ...prevState,
          fillPrice: true,
        }));
      }
      if (country === undefined) {
        setStateFill((prevState: any) => ({
          ...prevState,
          fillCountry: true,
        }));
      }
      if (model === undefined) {
        setStateFill((prevState: any) => ({
          ...prevState,
          fillModel: true,
        }));
      }
      if (sit === undefined) {
        setStateFill((prevState: any) => ({
          ...prevState,
          fillSit: true,
        }));
      }
      if (activeButton === undefined) {
        setStateFill((prevState: any) => ({
          ...prevState,
          fillFuel: true,
        }));
      }
      if (accessories === undefined) {
        setStateFill((prevState: any) => ({
          ...prevState,
          fillAcces: true,
        }));
      }
      if (registry === undefined) {
        setStateFill((prevState: any) => ({
          ...prevState,
          fillRegis: true,
        }));
      }
      if (numberBox === undefined) {
        setStateFill((prevState: any) => ({
          ...prevState,
          fillNumberB: true,
        }));
      }
      if (dateCar === "") {
        setStateFill((prevState: any) => ({
          ...prevState,
          fillDate: true,
        }));
      }
      if (statePost?.title === "") {
        setStateFill((prevState: any) => ({
          ...prevState,
          fillTitle: true,
        }));
      }
      if (isEmptyHTML(statePost?.introducing)) {
        setStateFill((prevState: any) => ({
          ...prevState,
          fillIntro: true,
        }));
      }
      if ((km === undefined || km === 0) && status === "Đã sử dụng") {
        setStateFill((prevState: any) => ({
          ...prevState,
          fillKm: true,
        }));
      }
      if (form === undefined) {
        setStateFill((prevState: any) => ({
          ...prevState,
          fillForm: true,
        }));
      }
      if (owner === "" && status === "Đã sử dụng") {
        setStateFill((prevState: any) => ({
          ...prevState,
          fillOwner: true,
        }));
      }
      if (statePost?.fullAddress === undefined || statePost?.fullAddress === "") {
        setStateFill((prevState: any) => ({
          ...prevState,
          fillAddress: true,
        }));
      }
      if (statePost?.person === "") {
        setStateFill((prevState: any) => ({
          ...prevState,
          fillYouR: true,
        }));
      }
      if (
        token &&
        status !== undefined &&
        value !== undefined &&
        color !== undefined &&
        (status === "Mới" ? carNumber === undefined || carNumber === "" : carNumber !== undefined && carNumber !== "") &&
        (status === "Mới" ? owner === undefined || owner === "" : owner !== undefined && owner !== "") &&
        price !== undefined &&
        country !== undefined &&
        model !== undefined &&
        sit !== undefined &&
        activeButton !== undefined &&
        accessories !== undefined &&
        registry !== undefined &&
        numberBox !== undefined &&
        dateCar !== "" &&
        statePost?.title !== "" &&
        statePost?.introducing !== "" &&
        (status === "Mới" ? km === undefined || km === 0 : km !== undefined && km !== 0) &&
        form !== undefined &&
        statePost?.person !== "" &&
        statePost?.fullAddress !== undefined &&
        statePost?.fullAddress !== ""
      ) {
        const postForm = {
          postId: uuid,
          value,
          color,
          carNumber: status === "Mới" ? "" : carNumber,
          owner: status === "Mới" ? "" : owner,
          price,
          country,
          model,
          sit,
          activeButton,
          accessories,
          registry,
          numberBox,
          status,
          dateCar,
          title: statePost?.title,
          introducing: statePost?.introducing,
          km: status === "Mới" ? 0 : km,
          form,
          person: statePost?.person,
          detailAddress: statePost?.detailAddress,
          fullAddress: statePost?.fullAddress,
          districtValueName: getDistrictValueName(statePost?.fullAddress),
          wardValueName: getWardValueName(statePost?.fullAddress),
          cityValueName: getCityValueName(statePost?.fullAddress),
          cityValue: statePost?.cityValue,
          districtValue: statePost?.districtValue,
          wardValue: statePost?.wardValue,
        };
        if (fileList && !id) {
          if (fileList.length === 0) {
            handleWarning();
          } else {
            setStatePost((prevState) => ({
              ...prevState,
              spin: true,
            }));
            const response = await PostFormSellCheck(String(token), {
              postForm,
              image: fileList,
            });
            if (response?.data?.status) {
              setStateFill((prevState: any) => ({
                ...prevState,
                fillStatus: false,
              }));
              setStateFill((prevState: any) => ({
                ...prevState,
                fillBrand: false,
              }));
              setStateFill((prevState: any) => ({
                ...prevState,
                fillColor: false,
              }));
              setStateFill((prevState: any) => ({
                ...prevState,
                fillCarN: false,
              }));
              setStateFill((prevState: any) => ({
                ...prevState,
                fillOwner: false,
              }));
              setStateFill((prevState: any) => ({
                ...prevState,
                fillOwner: false,
              }));
              setStateFill((prevState: any) => ({
                ...prevState,
                fillYouR: false,
              }));
              setStateFill((prevState: any) => ({
                ...prevState,
                fillCountry: false,
              }));
              setStateFill((prevState: any) => ({
                ...prevState,
                fillCountry: false,
              }));
              setStateFill((prevState: any) => ({
                ...prevState,
                fillModel: false,
              }));
              setStateFill((prevState: any) => ({
                ...prevState,
                fillSit: false,
              }));
              setStateFill((prevState: any) => ({
                ...prevState,
                fillFuel: false,
              }));
              setStateFill((prevState: any) => ({
                ...prevState,
                fillAcces: false,
              }));
              setStateFill((prevState: any) => ({
                ...prevState,
                fillRegis: false,
              }));
              setStateFill((prevState: any) => ({
                ...prevState,
                fillNumberB: false,
              }));
              setStateFill((prevState: any) => ({
                ...prevState,
                fillDate: false,
              }));
              setStateFill((prevState: any) => ({
                ...prevState,
                fillTitle: false,
              }));
              setStateFill((prevState: any) => ({
                ...prevState,
                fillIntro: false,
              }));
              setStateFill((prevState: any) => ({
                ...prevState,
                fillKm: false,
              }));
              setStateFill((prevState: any) => ({
                ...prevState,
                fillForm: false,
              }));
              setStateFill((prevState: any) => ({
                ...prevState,
                fillOwner: false,
              }));
              setStateFill((prevState: any) => ({
                ...prevState,
                fillAddress: false,
              }));

              setTimeout(() => {
                setStatePost((prevState) => ({
                  ...prevState,
                  spin: false,
                }));
              }, 1000);
              setTimeout(() => {
                toast(response?.data?.message, { autoClose: 500 });
              }, 1001);
              if (response?.data?.status === "SUCCESS") {
                setTimeout(() => {
                  router.push(`/dashboard/view-post?id=${uuid}`);
                }, 2000);
              }
            }
          }
        } else if (fileList && id) {
          const postFormEdit = {
            value,
            postId: dataPost?.postId,
            color,
            carNumber,
            owner,
            price,
            country,
            model,
            sit,
            activeButton,
            accessories,
            registry,
            numberBox,
            status,
            dateCar,
            title: statePost?.title,
            introducing: statePost?.introducing,
            km,
            form,
            districtValueName: getDistrictValueName(statePost?.fullAddress),
            wardValueName: getWardValueName(statePost?.fullAddress),
            cityValueName: getCityValueName(statePost?.fullAddress),
            person: statePost?.person,
            detailAddress: statePost?.detailAddress,
            fullAddress: statePost?.fullAddress,
            cityValue: statePost?.cityValue,
            districtValue: statePost?.districtValue,
            wardValue: statePost?.wardValue,
          };
          setStatePost((prevState) => ({
            ...prevState,
            spin: true,
          }));
          const response = await EditPostFormSellCheck(String(token), {
            postFormEdit,
            image: { fileList },
          });
          if (response?.data?.status) {
            setStateFill((prevState: any) => ({
              ...prevState,
              fillStatus: false,
            }));
            setStateFill((prevState: any) => ({
              ...prevState,
              fillBrand: false,
            }));
            setStateFill((prevState: any) => ({
              ...prevState,
              fillColor: false,
            }));
            setStateFill((prevState: any) => ({
              ...prevState,
              fillCarN: false,
            }));
            setStateFill((prevState: any) => ({
              ...prevState,
              fillOwner: false,
            }));
            setStateFill((prevState: any) => ({
              ...prevState,
              fillPrice: false,
            }));
            setStateFill((prevState: any) => ({
              ...prevState,
              fillCountry: false,
            }));
            setStateFill((prevState: any) => ({
              ...prevState,
              fillCountry: false,
            }));
            setStateFill((prevState: any) => ({
              ...prevState,
              fillModel: false,
            }));
            setStateFill((prevState: any) => ({
              ...prevState,
              fillSit: false,
            }));
            setStateFill((prevState: any) => ({
              ...prevState,
              fillFuel: false,
            }));
            setStateFill((prevState: any) => ({
              ...prevState,
              fillAcces: false,
            }));
            setStateFill((prevState: any) => ({
              ...prevState,
              fillRegis: false,
            }));
            setStateFill((prevState: any) => ({
              ...prevState,
              fillNumberB: false,
            }));
            setStateFill((prevState: any) => ({
              ...prevState,
              fillDate: false,
            }));
            setStateFill((prevState: any) => ({
              ...prevState,
              fillTitle: false,
            }));
            setStateFill((prevState: any) => ({
              ...prevState,
              fillIntro: false,
            }));
            setStateFill((prevState: any) => ({
              ...prevState,
              fillKm: false,
            }));
            setStateFill((prevState: any) => ({
              ...prevState,
              fillForm: false,
            }));
            setStateFill((prevState: any) => ({
              ...prevState,
              fillOwner: false,
            }));
            setStateFill((prevState: any) => ({
              ...prevState,
              fillAddress: false,
            }));
            setStatePost((prevState) => ({
              ...prevState,
              spin: true,
            }));
            setTimeout(() => {
              setStatePost((prevState) => ({
                ...prevState,
                spin: false,
              }));
            }, 1000);
            setTimeout(() => {
              toast(response?.data?.message, { autoClose: 500 });
            }, 1001);

            if (response?.data?.status === "SUCCESS") {
              setTimeout(() => {
                router.push(`/dashboard/view-post?id=${dataPost?.postId}&edit=yes`);
              }, 2000);
            }
          }
        }
      }
    } catch (err) {
      console.log("error", err);
    }
  };
  return (
    <div className="title-post-sell-wrapper">
      <span className="title">Tiêu đề tin đăng và Mô tả chi tiết</span>
      <div className="title-field">
        <TextField
          required
          id="filled-multiline-flexible"
          label="Tiêu đề tin đăng"
          multiline
          className={`car-number input-need-to-custom ${stateFill.fillTitle ? "warn-border" : ""}`}
          onChange={handleChangeTitle}
          value={statePost?.title}
          maxRows={4}
          variant="filled"
        />
        {stateFill.fillTitle && <div className="warning-fill"> Vui lòng nhập Tiêu đề tin đăng</div>}
      </div>
      <div className="introducing" style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <div className={`text-area ${stateFill.fillIntro ? "warn-border" : ""}`}>
          <JoditEditor
            config={config2}
            value={statePost?.introducing}
            onBlur={(c: any) => {
              contentFieldChanagedReason(c);
            }}
          />
        </div>
        <span>0/50 kí tự</span>
        {stateFill.fillIntro && <div className="warning-fill">Vui lòng nhập Giới thiệu</div>}
      </div>
      <span className="title title-infor">Thông tin người bán</span>
      <span className="you-are">Bạn là</span>
      <div className="display-flex" style={{ marginBottom: "4px" }}>
        <CustomButtonSelect handleClick={() => handlePerson("Cá nhân")} isActive={statePost?.person === "Cá nhân"}>
          Cá nhân
        </CustomButtonSelect>
        <CustomButtonSelect handleClick={() => handlePerson("Bán chuyên")} isActive={statePost?.person === "Bán chuyên"}>
          Bán chuyên
        </CustomButtonSelect>
      </div>
      {stateFill.fillYouR && <div className="warning-fill"> Vui lòng chọn</div>}

      <div className="address input-need-to-custom" onClick={handleModal}>
        <TextField
          id="filled-multiline-flexible"
          label="Địa chỉ"
          value={statePost?.fullAddress}
          multiline
          className={`fullname ${stateFill.fillAddress ? "warn-border" : ""}`}
          onChange={(e) => handleAddress(e)}
          maxRows={4}
          variant="filled"
        />
        <ArrowInputIcon></ArrowInputIcon>
        {stateFill.fillAddress && (
          <div className="warning-fill" style={{ marginTop: "4px" }}>
            Vui nhập địa chỉ
          </div>
        )}
      </div>
      <div className="finish">
        <CustomButton className="post" onClick={postSell}>
          {id ? "Sửa tin" : "Đăng tin"}
        </CustomButton>
      </div>

      <ModalAddressUser
        fillAddrCity={fillAddrCity}
        fillAddrWard={fillAddrWard}
        fillAddrDistrict={fillAddrDistrict}
        fillAddrDetail={fillAddrDetail}
        cityValue={statePost?.cityValue}
        districtValue={statePost?.districtValue}
        wardValue={statePost?.wardValue}
        detailAddress={statePost?.detailAddress}
        modalConfirmSwitch={statePost?.modalConfirmSwitch}
        handleCancleModal={handleCancleModal}
        handleCityChange={handleCityChange}
        cities={statePost?.cities}
        districts={statePost?.districts}
        wards={statePost?.wards}
        handleDistrictChange={handleDistrictChange}
        handleChangeWard={handleChangeWard}
        handleChangeDetailAddress={handleChangeDetailAddress}
        onFinish={onFinish}
      ></ModalAddressUser>

      <Spin spinning={statePost?.spin} fullscreen />
    </div>
  );
};
export default TitlePostSell;
