import { axios } from "@/utils/axios";
export const PostFormSellCheck = async (accessToken: string, data: any) => {
  const formData = new FormData();
  if (data.image && data.image.length > 0) {
    data.image.forEach((image: any, index: number) => {
      formData.append(`image`, image.originFileObj);
    });
  }
  formData.append(`wardValueName`, data?.postForm?.wardValueName);

  formData.append(`postId`, data?.postForm?.postId);
  formData.append(`value`, data?.postForm?.value);
  formData.append(`color`, data?.postForm?.color);
  formData.append(`model`, data?.postForm?.model);
  formData.append(`dateCar`, data?.postForm?.dateCar);
  formData.append(`form`, data?.postForm?.form);
  formData.append(`carNumber`, data?.postForm?.carNumber);
  formData.append(`owner`, data?.postForm?.owner);
  formData.append(`price`, data?.postForm?.price);
  formData.append(`country`, data?.postForm?.country);
  formData.append(`sit`, data?.postForm?.sit);
  formData.append(`activeButton`, data?.postForm?.activeButton);
  formData.append(`accessories`, data?.postForm?.accessories);
  formData.append(`registry`, data?.postForm?.registry);
  formData.append(`numberBox`, data?.postForm?.numberBox);
  formData.append(`status`, data?.postForm?.status);
  formData.append(`title`, data?.postForm?.title);
  formData.append(`introducing`, data?.postForm?.introducing);
  formData.append(`km`, data?.postForm?.km);
  formData.append(`person`, data?.postForm?.person);
  formData.append(`fullAddress`, data?.postForm?.fullAddress);
  formData.append(`districtValueName`, data?.postForm?.districtValueName);
  formData.append(`cityValueName`, data?.postForm?.cityValueName);
  formData.append(`cityValue`, data?.postForm?.cityValue);
  formData.append(`wardValue`, data?.postForm?.wardValue);
  formData.append(`districtValue`, data?.postForm?.districtValue);
  formData.append(`detailAddress`, data?.postForm?.detailAddress);

  const config = {
    method: "POST",
    url: `/post-form-sell-check`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: accessToken,
    },
    data: formData,
  };

  return axios(config);
};
export const getPost = async (accessToken: string, data: any) => {
  const config = {
    method: "POST",
    url: `/get-post`,
    headers: {
      Authorization: accessToken,
    },
    data: data,
  };
  return axios(config);
};
export const getPostCheck = async (accessToken: string, data: any) => {
  const config = {
    method: "POST",
    url: `/get-post-check`,
    headers: {
      Authorization: accessToken,
    },
    data: data,
  };
  return axios(config);
};
export const hiddenPost = async (accessToken: string, data: any) => {
  const config = {
    method: "PUT",
    url: `/hidden-post`,
    headers: {
      Authorization: accessToken,
    },
    data: data,
  };
  return axios(config);
};

export const getPostCheckList = async (accessToken: string) => {
  const config = {
    method: "POST",
    url: `/get-post-check-list-accept`,
    headers: {
      Authorization: accessToken,
    },
  };
  return axios(config);
};
export const getPostRefuseList = async (accessToken: string) => {
  const config = {
    method: "POST",
    url: `/get-post-check-list-refuse`,
    headers: {
      Authorization: accessToken,
    },
  };
  return axios(config);
};
export const getPostCensorshipList = async (accessToken: string) => {
  const config = {
    method: "POST",
    url: `/get-post-check-list-censorship`,
    headers: {
      Authorization: accessToken,
    },
  };
  return axios(config);
};
export const getPosts = async (
  pageSize: number,
  currentPage: number,
  price: number,
  form: string,
  sit: number,
  fuel: string,
  numberBox: string,
  city: string,
  district: string,
  date: string,
  km: string,
  color: string,
  country: string,
  model: string,
  brand: string,
  status: string,
  post: string
) => {
  const config = {
    method: "POST",
    url: `/get-posts?pageSize=${pageSize}&currentPage=${currentPage}&price=${price}&form=${form}&sit=${sit}&fuel=${fuel}&numberBox=${numberBox}&city=${city}&district=${district}&date=${date}&km=${km}&color=${color}&country=${country}&model=${model}&brand=${brand}&status=${status}&post=${post}`,
  };
  return axios(config);
};
export const getPostHiddenList = async (accessToken: string) => {
  const config = {
    method: "POST",
    url: `/get-post-hidden-list`,
    headers: {
      Authorization: accessToken,
    },
  };
  return axios(config);
};

export const unhiddenPost = async (accessToken: string, data: any) => {
  const config = {
    method: "POST",
    url: `/update-post-hidden`,
    headers: {
      Authorization: accessToken,
    },
    data: data,
  };
  return axios(config);
};
export const EditPostFormSellCheck = async (accessToken: string, data: any) => {
  const formData = new FormData();
  if (data?.image?.fileList && data?.image?.fileList?.length > 0) {
    data.image.fileList.forEach((image: any, index: number) => {
      const imageObject = {
        uuid: image.uid,
        img: image.url,
      };
      const imageString = JSON.stringify(imageObject);

      {
        image?.response ? formData.append(`image`, image.originFileObj) : formData.append(`image`, imageString);
      }
    });
  }
  formData.append(`wardValueName`, data?.postFormEdit?.wardValueName);

  formData.append(`postId`, data?.postFormEdit?.postId);
  formData.append(`value`, data?.postFormEdit?.value);
  formData.append(`color`, data?.postFormEdit?.color);
  formData.append(`model`, data?.postFormEdit?.model);
  formData.append(`dateCar`, data?.postFormEdit?.dateCar);
  formData.append(`form`, data?.postFormEdit?.form);
  formData.append(`carNumber`, data?.postFormEdit?.carNumber);
  formData.append(`owner`, data?.postFormEdit?.owner);
  formData.append(`price`, data?.postFormEdit?.price);
  formData.append(`country`, data?.postFormEdit?.country);
  formData.append(`sit`, data?.postFormEdit?.sit);
  formData.append(`activeButton`, data?.postFormEdit?.activeButton);
  formData.append(`accessories`, data?.postFormEdit?.accessories);
  formData.append(`registry`, data?.postFormEdit?.registry);
  formData.append(`numberBox`, data?.postFormEdit?.numberBox);
  formData.append(`status`, data?.postFormEdit?.status);
  formData.append(`title`, data?.postFormEdit?.title);
  formData.append(`introducing`, data?.postFormEdit?.introducing);
  formData.append(`km`, data?.postFormEdit?.km);
  formData.append(`person`, data?.postFormEdit?.person);
  formData.append(`fullAddress`, data?.postFormEdit?.fullAddress);
  formData.append(`districtValueName`, data?.postFormEdit?.districtValueName);
  formData.append(`cityValueName`, data?.postFormEdit?.cityValueName);
  formData.append(`cityValue`, data?.postFormEdit?.cityValue);
  formData.append(`wardValue`, data?.postFormEdit?.wardValue);
  formData.append(`districtValue`, data?.postFormEdit?.districtValue);
  formData.append(`detailAddress`, data?.postFormEdit?.detailAddress);
  const config = {
    method: "PUT",
    url: `/edit-post-form-sell-check`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: accessToken,
    },
    data: formData,
  };

  return axios(config);
};
