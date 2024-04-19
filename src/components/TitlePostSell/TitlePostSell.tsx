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
import { defaultCommonState } from "./_mock";
import convertToSlug from "@/utils/convertToSlug";

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
}: any) => {
  const { dataPost } = useSelector((state: RootState) => state.postSell);
  const [statePost, setStatePost] =
    useState<ICommonStateFormRenderCarPost>(defaultCommonState);

  const { account } = useSelector((state: RootState) => state.auth);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
        );
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
        cityValue: account?.address?.city,
        districtValue: account?.address?.district,
        wardValue: account?.address?.ward,
        detailAddress: account?.address?.detailAddress,
        fullAddress: account?.address?.fullAddress,
      }));

      if (account?.address?.city !== null && statePost?.cities.length > 0) {
        const selectedCityId = account?.address?.city;
        const selectedCity = statePost?.cities.find(
          (city: any) => city.Id === selectedCityId
        );
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
    account?.address,
    account?.address?.city,
    account?.address?.district,
    account?.address?.ward,
    statePost?.cities,
    id,
  ]);
  useEffect(() => {
    if (!id) {
      if (statePost?.districts.length > 0) {
        const selectedDistrictId = account?.address?.district;
        const selectedDistrict = statePost?.districts.find(
          (district: any) => district.Id === selectedDistrictId
        );
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
  ///////////////////////////////////////////////
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
        const selectedCity = statePost?.cities.find(
          (city: any) => city.Id === selectedCityId
        );
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
        const selectedDistrict = statePost?.districts.find(
          (district: any) => district.Id === selectedDistrictId
        );
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

  const handleChangeTitle = (event: any) => {
    setStatePost((prevState) => ({
      ...prevState,
      title: event?.target.value,
    }));
  };
  const handleChangeIntroducing = (event: any) => {
    setStatePost((prevState) => ({
      ...prevState,
      introducing: event?.target.value,
    }));
  };
  const handlePerson = (person: any) => {
    setStatePost((prevState) => ({
      ...prevState,
      person: person,
    }));
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
    const selectedCity = statePost?.cities.find(
      (city: any) => city.Id === selectedCityId
    );
    if (selectedCity) {
      setStatePost((prevState) => ({
        ...prevState,
        cityValue: event.target.value,
        districts: selectedCity.Districts || [],
        wards: [],
        districtValue: "",
        wardValue: "",
      }));
    }
  };
  const handleDistrictChange = (event: any) => {
    const selectedDistrictId = event.target.value;
    const selectedDistrict = statePost?.districts.find(
      (district: any) => district?.Id === selectedDistrictId
    );

    if (selectedDistrict) {
      setStatePost((prevState) => ({
        ...prevState,
        districtValue: event.target.value,
        wards: selectedDistrict?.Wards,
      }));
    }
  };
  const handleChangeWard = (event: SelectChangeEvent) => {
    setStatePost((prevState) => ({
      ...prevState,
      wardValue: event.target.value,
    }));
  };
  const handleChangeDetailAddress = (event: any) => {
    setStatePost((prevState) => ({
      ...prevState,
      detailAddress: event.target.value as string,
    }));
  };
  const onFinish = () => {
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
  };
  const postSell = async () => {
    const token = localStorage.getItem("access_token");
    const uuid = uuidv4();
    try {
      if (token) {
        const postForm = {
          postId: uuid,
          value,
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
          person: statePost?.person,
          detailAddress: statePost?.detailAddress,
          fullAddress: statePost?.fullAddress,
          districtValueName: convertToSlug(statePost?.districtValueName),
          cityValueName: convertToSlug(statePost?.cityValueName),
          cityValue: statePost?.cityValue,
          districtValue: statePost?.districtValue,
          wardValue: statePost?.wardValue,
        };
        if (fileList && !id) {
          if (fileList.length === 0) {
            handleWarning();
          } else {
            const response = await PostFormSellCheck(String(token), {
              postForm,
              image: fileList,
            });
            if (response?.data?.status) {
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
            person: statePost?.person,
            detailAddress: statePost?.detailAddress,
            fullAddress: statePost?.fullAddress,
            districtValueName: convertToSlug(statePost?.districtValueName),
            cityValueName: convertToSlug(statePost?.cityValueName),
            cityValue: statePost?.cityValue,
            districtValue: statePost?.districtValue,
            wardValue: statePost?.wardValue,
          };
          const response = await EditPostFormSellCheck(String(token), {
            postFormEdit,
            image: { fileList },
          });
          if (response?.data?.status) {
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
                router.push(
                  `/dashboard/view-post?id=${dataPost?.postId}&edit=yes`
                );
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
          className="car-number input-need-to-custom"
          id="filled-multiline-flexible"
          label="Tiêu đề tin đăng"
          multiline
          onChange={handleChangeTitle}
          value={statePost?.title}
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
          value={statePost?.introducing}
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
          isActive={statePost?.person === "Cá nhân"}
        >
          Cá nhân
        </CustomButtonSelect>
        <CustomButtonSelect
          handleClick={() => handlePerson("Bán chuyên")}
          isActive={statePost?.person === "Bán chuyên"}
        >
          Bán chuyên
        </CustomButtonSelect>
      </div>

      <div className="address input-need-to-custom" onClick={handleModal}>
        <TextField
          className="fullname"
          id="filled-multiline-flexible"
          label="Địa chỉ"
          value={statePost?.fullAddress}
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
