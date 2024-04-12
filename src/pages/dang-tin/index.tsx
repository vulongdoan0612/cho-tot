import {
  ArrowInputIcon,
  PlusIcon,
  UploadImageIcon,
} from "@/components/CustomIcons";
import ModalCategorySelect from "@/components/Modal/ModalCategorySelect";
import Page from "@/layout/Page";
import getBase64 from "@/utils/getBase64";
import { MenuItem, Select, TextField } from "@mui/material";
import { GetProp, Image, Upload, UploadFile, UploadProps } from "antd";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import RenderOto from "@/components/RenderFormTraffic/RenderFormTraffic";

const PostSell = () => {
  const router = useRouter();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [render, setRender] = useState<any>("");
  const { category } = router.query;

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
  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
  const [value, setValue] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);
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
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const [modalCategory, setModalCategory] = useState(false);
  const handleCityChange = (event: any) => {};
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
  const renderForm = useMemo(() => {
    return (
      <>
        {" "}
        {render === "0" ? (
          <RenderOto></RenderOto>
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
          <></>
        )}
      </>
    );
  }, [render]);
  return (
    <Page style={{ backgroundColor: "#f4f4f4" }}>
      <div className="post-sell-wrapper">
        <div className="left">
          <h5>Hình ảnh và Video sản phẩm</h5>
          <p className="more-about">
            Xem thêm về&nbsp;
            <a
              href="https://trogiup.chotot.com/nguoi-ban/dang-tin/"
              target="_blank"
              rel="noreferrer"
            >
              Quy định đăng tin của Chợ Tốt
            </a>
          </p>
          <div className="upload">
            {" "}
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              className={`upload-antd ${
                fileList.length !== 0 ? "upload-antd-custom" : ""
              }`}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8
                ? null
                : fileList.length !== 0
                ? uploadedCustomSmaller
                : uploadedCustom}
            </Upload>
          </div>
        </div>
        <div className="right">
          <div
            className="category-select input-need-to-custom"
            onClick={handleModalCategory}
          >
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
          {renderForm}
        </div>
      </div>
      <ModalCategorySelect
        modalCategory={modalCategory}
        handleCancleCategory={handleCancleCategory}
        handleSelectCategory={handleSelectCategory}
        category={value}
      ></ModalCategorySelect>
    </Page>
  );
};
export default PostSell;
