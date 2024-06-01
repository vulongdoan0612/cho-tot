import { ArrowInputIcon, PlusIcon, UploadImageIcon, WarningIcon } from "@/components/CustomIcons";
import ModalCategorySelect from "@/components/Modal/ModalCategorySelect";
import Page from "@/layout/Page";
import getBase64 from "@/utils/getBase64";
import { TextField } from "@mui/material";
import { Alert, GetProp, Image, Skeleton, Upload, UploadFile, UploadProps } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import RenderOto from "@/components/RenderFormTraffic/RenderFormTraffic";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchDataPost } from "@/redux/reducers/postSell";
import cookie from "cookie";
import NotFound from "@/components/404";

const PostSell = () => {
  const router = useRouter();
  const { category } = router.query;
  const { id } = router.query;
  const [alertAvatar, setAlertAvatar] = useState("");
  const { account } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(true);
  const { dataPost } = useSelector((state: RootState) => state.postSell);
  const dispatch = useDispatch<AppDispatch>();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [render, setRender] = useState<string | string[] | undefined>("");
  const [value, setValue] = useState("");
  const [modalCategory, setModalCategory] = useState(false);
  const [warning, setWarning] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

  useEffect(() => {
    setRender(category);
    if (category === "0") {
      setValue("Ô tô");
    }
    if (category === "1") {
      setValue("Xe máy");
    }
    if (category === "2") {
      setValue("Xe tải, xe ben");
    }
    if (category === "3") {
      setValue("Xe điện");
    }
    if (category === "4") {
      setValue("Xe đạp");
    }
    if (category === "5") {
      setValue("Phương tiện khác");
    }
    if (category === "6") {
      setValue("Phụ tùng xe");
    }
  }, [category]);

  useEffect(() => {
    if (dataPost && dataPost.post && dataPost.post.image) {
      const newFileList: UploadFile[] = dataPost.post.image.map((image: any, index: number) => {
        return {
          uid: image?.uuid,
          name: `image_${index}`,
          status: "done",
          url: image?.img,
        };
      });
      setFileList(newFileList);
    }
  }, [dataPost]);

  useEffect(() => {
    if (id) {
      dispatch(fetchDataPost({ id, setLoading }));
    }
  }, [id]);

  const uploadedCustom = (
    <div className="upload-image-container">
      <UploadImageIcon></UploadImageIcon>
      <p>ĐĂNG TỪ 01 ĐẾN 20 HÌNH</p>
    </div>
  );

  const uploadedCustomSmaller = (
    <div>
      <PlusIcon></PlusIcon>
    </div>
  );

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleModalCategory = () => {
    setModalCategory(true);
  };

  const handleCancleCategory = () => {
    setModalCategory(false);
  };

  const handleSelectCategory = (item: any, index: number) => {
    setValue(item);
    setModalCategory(false);
    router.push(`/dang-tin?category=${index}`);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    if (render !== "") {
      setFileList(newFileList);
    }
  };

  const beforeUpload = (file: any) => {
    const isPNG = file.type === "image/png";
    const isJPGE = file.type === "image/jpeg";
    const isGIF = file.type === "image/gif";
    const isJPG = file.type === "image/jpg";
    const isLt2M = file.size / 1024 / 1024 < 2;
    const isWEBP = file.type === "image/webp";

    if (!isLt2M) {
      setAlertAvatar("Hình ảnh phải nhỏ hơn 2MB!");
      setTimeout(() => {
        setAlertAvatar("");
      }, 3000);
      return Upload.LIST_IGNORE;
    }

    if (!isGIF && !isJPGE && !isPNG && !isJPG && !isWEBP) {
      setAlertAvatar("Bạn chỉ có thể tải lên tệp PNG, JPEG, hoặc GIF!");
      setTimeout(() => {
        setAlertAvatar("");
      }, 3000);
    }
    return isPNG || isJPGE || isGIF || isJPG || isWEBP || Upload.LIST_IGNORE;
  };
  return (
    <Page style={{ backgroundColor: "#f4f4f4" }}>
      {(account?.user !== undefined && dataPost?.userId === account?.user?._id) || router.query.id === undefined ? (
        <div className="post-sell-wrapper">
          <div className="left">
            <h5>Hình ảnh và Video sản phẩm</h5>
            <p className="more-about">
              Xem thêm về&nbsp;
              <a href="https://trogiup.chotot.com/nguoi-ban/dang-tin/" target="_blank" rel="noreferrer">
                Quy định đăng tin của Chợ Tốt
              </a>
            </p>
            {category === "0" ? (
              <div className="upload">
                <Skeleton.Input
                  block={true}
                  style={{ height: "221px" }}
                  active
                  className={` ${id !== undefined && loading ? "visible-ske" : "disvisible-ske"}`}
                  size="large"
                ></Skeleton.Input>
                <Upload
                  beforeUpload={beforeUpload}
                  name="image"
                  listType="picture-card"
                  fileList={fileList}
                  className={`upload-antd ${fileList.length !== 0 ? "upload-antd-custom" : ""} ${
                    id !== undefined && loading ? "unhidden" : "hidden"
                  } skeleton-custom`}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= 20 ? null : fileList.length !== 0 ? uploadedCustomSmaller : uploadedCustom}
                </Upload>
                {previewImage && (
                  <Image
                    wrapperStyle={{ display: "none" }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                      afterOpenChange: (visible) => !visible && setPreviewImage(""),
                    }}
                    alt=""
                    src={previewImage}
                  />
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="right">
            {warning ? (
              <div className="warning">
                <WarningIcon></WarningIcon>
                <span className="text">Bạn cần đăng ít nhất 1 ảnh</span>
              </div>
            ) : (
              <></>
            )}

            <div className="category-select input-need-to-custom" onClick={handleModalCategory}>
              <TextField
                className="category"
                id="filled-multiline-flexible"
                label="Danh Mục Tin Đăng"
                value={value}
                multiline
                maxRows={4}
                variant="filled"
              />
              <ArrowInputIcon></ArrowInputIcon>
            </div>

            {render === "0" ? (
              <>
                <RenderOto handleWarning={() => setWarning(true)} fileList={fileList} id={id} dataPost={dataPost}></RenderOto>
              </>
            ) : render === "1" ? (
              <>xe máy</>
            ) : render === "2" ? (
              <>xe tải</>
            ) : render === "3" ? (
              <> xe điện</>
            ) : render === "4" ? (
              <> xe đạp</>
            ) : render === "5" ? (
              <>pt khác</>
            ) : render === "6" ? (
              <>pt xe</>
            ) : (
              <div className="banner-post" style={{ paddingTop: "30px" }}>
                {" "}
                <Image
                  src="https://static.chotot.com/storage/chotot-icons/svg/empty-category.svg"
                  alt=""
                  width={458}
                  height={275}
                  preview={false}
                ></Image>
                <span className="title">ĐĂNG NHANH - BÁN GỌN</span>
                <p className="select">Chọn “danh mục tin đăng” để đăng tin</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <span style={{ textAlign: "center", width: "100%", display: "block", fontWeight: "600", paddingTop: "1.5rem" }}>
            Bài viết không thuộc quyền sở hữu
          </span>
          <NotFound></NotFound>
        </>
      )}
      <Alert message={alertAvatar} type="success" className={alertAvatar !== "" ? "show-alert" : ""} />
      <ModalCategorySelect
        modalCategory={modalCategory}
        handleCancleCategory={handleCancleCategory}
        handleSelectCategory={handleSelectCategory}
        category={value}
      ></ModalCategorySelect>
    </Page>
  );
};
export const getServerSideProps = async (context: any) => {
  const cookies = context.req.headers.cookie;
  const parsedCookies = cookies ? cookie.parse(cookies) : {};
  const token = parsedCookies["access_token"];

  if (!token) {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
export default PostSell;
