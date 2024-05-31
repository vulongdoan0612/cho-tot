import CustomButton from "@/components/CustomButton";
import Page from "@/layout/Page";
import { RootState } from "@/redux/store";
import { getPostCheck } from "@/services/formPost";
import { add30DaysAndFormat } from "@/utils/addDay2";
import formatISOToCustomDate from "@/utils/convertDate";
import { useEffect } from "react";
import numberWithCommas from "@/utils/numberWithCommas";
import { Image, Skeleton } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import cookie from "cookie";
import Link from "next/link";

const ViewPostCensor = () => {
  const router = useRouter();
  const { id } = router.query;
  const { edit } = router.query;
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getDataPost();
  }, [router.query]);

  const getDataPost = async () => {
    if (id) {
      const token = localStorage.getItem("access_token");
      const response = await getPostCheck(String(token), { postId: id });

      if (response.status === 200) {
        setLoading(false);
        setData(response?.data?.postCheck);
      }
    }
  };
  const datePlus30Days = add30DaysAndFormat(data?.date);

  return (
    <Page style={{ backgroundColor: "#f4f4f4" }}>
      <div className="view-post-wrapper">
        <div className="top-part">
          <div className="annoucement">
            <Image src="https://static.chotot.com/storage/default_images/pty/tick_green_pty.png" width={20} height={20} alt="" />
            <span>
              {edit
                ? "Sửa tin thành công! Chợ Tốt sẽ duyệt nội dung mới trong chốc lát."
                : " Chúc mừng, bạn được Chợ Tốt tặng tin đăng miễn phí! Tin sẽ được duyệt trong chốc lát."}
            </span>
          </div>
          <div className="detail-info">
            <div className="product">
              <Skeleton.Button block active></Skeleton.Button>
              <div className={`${loading ? "unhidden" : "hidden"} skeleton-custom`}>
                <Image src={data?.post?.image[0]?.img} width={88} height={88} alt="" preview={false} />
              </div>
            </div>{" "}
            <div className="title-price">
              {loading ? (
                <Skeleton.Button active size="large" shape="square"></Skeleton.Button>
              ) : (
                <>
                  <span className="title">{data && data?.post?.title}</span>
                  <span className="price">{numberWithCommas(String(data?.post?.price))} đ</span>
                </>
              )}
            </div>
          </div>
          <div className="line"></div>
          <div className="description">
            <div className="left">
              <span className="title">Phương thức đăng tin</span>
              <h5>Đăng tin thường (Miễn phí)</h5>
              <span className="descrip">* Tin sẽ hiển thị trên Chợ Tốt dưới dạng tin đăng thường trong 60 ngày.</span>
            </div>
            <div className="mid">
              <span className="title">Số ngày đăng tin</span>
              <h5>60 ngày</h5>
            </div>
            <div className="right">
              <span className="title">Thời gian đăng tin</span>
              <h5>
                {formatISOToCustomDate(data?.date)} đến {datePlus30Days}
              </h5>
            </div>
          </div>
        </div>
        <div className="second-part">
          <h5>Mua thêm dịch vụ bán nhanh hơn</h5>
          <span className="descrip">Tiếp cận thêm nhiều khách hàng và bán nhanh hơn</span>
          <div className="menu">
            <div className="left">
              <div className="title">
                <span className="name">Đẩy tin thường</span>
                <span className="price">375.000 đ</span>
              </div>
              <Link href={`/services/${data?.postId}`}>
                <div className="add">+ Chọn</div>
              </Link>
            </div>
            <div className="mid">
              {" "}
              <div className="title">
                <span className="name">Tin nhiều hình ảnh</span>
                <span className="price">400.000 đ</span>
              </div>
              <Link href={`/services/${data?.postId}`}>
                <div className="add">+ Chọn</div>
              </Link>{" "}
            </div>{" "}
            <div className="right">
              {" "}
              <div className="title">
                <span className="name">Tin nổi bật - Nhiều hình ảnh</span>
                <span className="price">675.000 đ</span>
              </div>
              <Link href={`/services/${data?.postId}`}>
                <div className="add">+ Chọn</div>
              </Link>{" "}
            </div>
          </div>
        </div>
        <div className="third-part">
          {/* <CustomButton className="sell-button">Bán</CustomButton> */}
          <CustomButton className="manage-button">
            <Link href="/my-ads">Quản lý tin</Link>
          </CustomButton>
        </div>
      </div>
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
export default ViewPostCensor;
