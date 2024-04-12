import { SelectChangeEvent, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import CustomButtonSelect from "../CustomButtonSelect";
import ModalAddressUser from "../Modal/ModalAddressUser";
import { ArrowInputIcon } from "../CustomIcons";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import CustomButton from "../CustomButton";
import axios from "axios";
import { PostFormSellCheck } from "@/services/formPost";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import convertToSlug from "@/utils/convertToSlug";

const TitlePostSell = ({
  value,
  color,
  carNumber,
  owner,
  country,
  sit,
  activeButton,
  accessories,
  registry,
  numberBox,
  price,
  km,
  status,
}: any) => {
  const { account } = useSelector((state: RootState) => state.auth);
  const [spin, setSpin] = useState(false);

  const [title, setTitle] = useState<any>("");
  const [introducing, setIntroducing] = useState<any>("");
  const [person, setPerson] = useState<any>("");
  const [detailAddress, setDetailAddress] = useState<any>("");
  const [modalConfirmSwitch, setModalConfirmSwitch] = useState(false);
  const [wards, setWards] = useState<any>([]);
  const [districts, setDistricts] = useState<any>([]);
  const [cities, setCities] = useState<any>([]);
  const [fullAddress, setFullAddress] = useState("");
  const [cityValue, setCityValue] = useState<any>("");
  const [wardValue, setWardValue] = useState("");
  const [districtValue, setDistrictValue] = useState<any>("");
  const [cityValueName, setCityValueName] = useState("");
  const [districtValueName, setDistrictValueName] = useState<any>("");
  const [slug, setSlug] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
        );
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    try {
      if (account?.address?.city !== null) {
        const selectedCityId = account?.address?.city;
        const selectedCity = cities.find(
          (city: any) => city.Id === selectedCityId
        );
        if (selectedCity) {
          setCityValueName(selectedCity?.Name);

          setDistricts(selectedCity.Districts);
          setWards([]);
        }
      }
    } finally {
      if (
        account?.address?.city !== null &&
        account?.address?.district !== null &&
        districts
      ) {
        const selectedDistrictId = account?.address?.district;

        const selectedDistrict = districts.find(
          (district: any) => district.Id === selectedDistrictId
        );
        if (selectedDistrict) {
          setDistrictValueName(selectedDistrict?.Name);
          setWards(selectedDistrict?.Wards);
        }
      }
    }
  }, [account?.address, cities, districts]);
  useEffect(() => {
    if (account?.address) {
      setCityValue(account?.address?.city);
      setDistrictValue(account?.address?.district);
      setWardValue(account?.address?.ward);
      setDetailAddress(account?.address?.detailAddress);
      setFullAddress(account?.address?.fullAddress);
    }
  }, [account?.address]);
  const handleChangeTitle = (event: any) => {
    setTitle(event?.target.value);
  };
  const handleChangeIntroducing = (event: any) => {
    setIntroducing(event?.target?.value);
  };
  const handlePerson = (person: any) => {
    setPerson(person);
  };
  const handleCancleModal = () => {
    setModalConfirmSwitch(false);
  };
  const handleModal = () => {
    setModalConfirmSwitch(true);
  };
  const handleCityChange = (event: any) => {
    const selectedCityId = event.target.value;
    const selectedCity = cities.find((city: any) => city.Id === selectedCityId);
    if (selectedCity) {
      setCityValue(event.target.value);
      setDistricts(selectedCity.Districts || []);
      setWards([]);
      setDistrictValue("");
      setWardValue("");
    }
  };
  const handleDistrictChange = (event: any) => {
    const selectedDistrictId = event.target.value;
    const selectedDistrict = districts.find(
      (district: any) => district?.Id === selectedDistrictId
    );

    if (selectedDistrict) {
      setDistrictValue(event.target.value);
      setWards(selectedDistrict?.Wards);
    }
  };
  const handleChangeWard = (event: SelectChangeEvent) => {
    setWardValue(event.target.value);
  };
  const handleChangeDetailAddress = (event: any) => {
    setDetailAddress(event.target.value as string);
  };
  const onFinish = () => {
    let wardName = "";
    let city = "";
    let district = "";

    wards.forEach((item: any) => {
      if (item.Id === wardValue) {
        wardName = item.Name;
      }
    });
    districts.forEach((item: any) => {
      if (item.Id === districtValue) {
        district = item.Name;
      }
    });
    cities.forEach((item: any) => {
      if (item.Id === cityValue) {
        city = item.Name;
      }
    });
    const concatenatedAddress = `${detailAddress} ,${wardName}, ${district}, ${city}`;
    setFullAddress(concatenatedAddress);
    setModalConfirmSwitch(false);
  };
  const postSell = async () => {
    const token = localStorage.getItem("access_token");
    const uuid = uuidv4();

    try {
      if (token) {
        try {
        } finally {
          const postForm = {
            postId: uuid,
            value,
            color,
            carNumber,
            owner,
            price,
            country,
            sit,
            activeButton,
            accessories,
            registry,
            numberBox,
            status,
            title,
            introducing,
            km,
            person,
            fullAddress,
            districtValueName: convertToSlug(districtValueName),
            cityValueName: convertToSlug(cityValueName),
          };
          const response = await PostFormSellCheck(String(token), postForm);
          if (response?.data?.status) {
            setSpin(true);
            setTimeout(() => {
              setSpin(false);
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
      }
    } catch {
      console.log("error");
    }
  };

  return (
    <div className="title-post-sell-wrapper">
      <span className="title">Tiêu đề tin đăng và Mô tả chi tiết</span>
      <div className="title-field">
        <TextField
          required
          className="car-number input-need-to-custom"
          id="filled-multiline-flexible"
          label="Tiêu đề tin đăng"
          multiline
          onChange={handleChangeTitle}
          value={title}
          maxRows={4}
          variant="filled"
        />
        <span>0/50 kí tự</span>
      </div>
      <div className="introducing">
        <TextField
          className="text-area"
          id="filled-multiline-flexible"
          label="Giới thiệu"
          multiline
          value={introducing}
          onChange={handleChangeIntroducing}
          maxRows={4}
          variant="filled"
        />
      </div>
      <span className="title title-infor">Thông tin người bán</span>
      <span className="you-are">Bạn là</span>
      <div className="display-flex">
        <CustomButtonSelect
          handleClick={() => handlePerson("Cá nhân")}
          isActive={person === "Cá nhân"}
        >
          Cá nhân
        </CustomButtonSelect>
        <CustomButtonSelect
          handleClick={() => handlePerson("Bán chuyên")}
          isActive={person === "Bán chuyên"}
        >
          Bán chuyên
        </CustomButtonSelect>
      </div>

      <div className="address input-need-to-custom" onClick={handleModal}>
        <TextField
          className="fullname"
          id="filled-multiline-flexible"
          label="Địa chỉ"
          value={fullAddress}
          multiline
          maxRows={4}
          variant="filled"
        />
        <ArrowInputIcon></ArrowInputIcon>
      </div>
      <div className="finish">
        <CustomButton className="preview">Xem trước</CustomButton>
        <CustomButton className="post" onClick={postSell}>
          Đăng tin
        </CustomButton>
      </div>

      <ModalAddressUser
        cityValue={cityValue}
        districtValue={districtValue}
        wardValue={wardValue}
        detailAddress={detailAddress}
        modalConfirmSwitch={modalConfirmSwitch}
        handleCancleModal={handleCancleModal}
        handleCityChange={handleCityChange}
        cities={cities}
        districts={districts}
        wards={wards}
        handleDistrictChange={handleDistrictChange}
        handleChangeWard={handleChangeWard}
        handleChangeDetailAddress={handleChangeDetailAddress}
        onFinish={onFinish}
      ></ModalAddressUser>
      <Spin spinning={spin} fullscreen />
    </div>
  );
};
export default TitlePostSell;
