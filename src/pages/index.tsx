import { ArrowSlideNextIcon, ArrowSlidePrevIcon } from "@/components/CustomIcons";
import { useFetchCurrentPost } from "@/hooks/useFetchCurrentPost";
import Page from "@/layout/Page";
import { RootState } from "@/redux/store";
import formatNumberWithCommas from "@/utils/formatMoneyWithDot";
import { limitTextDescription, limitTextTitle } from "@/utils/limitText";
import timeAgo from "@/utils/timeAgo";
import { Image } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";

const HomePage = () => {
  const [showMore, setShowMore] = useState(false);
  const { currentPosts } = useSelector((state: RootState) => state.postsData);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  function SampleNextArrow(props: any) {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <ArrowSlidePrevIcon></ArrowSlidePrevIcon>
      </div>
    );
  }

  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <ArrowSlideNextIcon></ArrowSlideNextIcon>
      </div>
    );
  }

  const setting2s = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    variableWidth: true,
    className: "slider variable-width",
  };

  useFetchCurrentPost();

  const handleShow = () => {
    setShowMore((prev) => !prev);
  };
  return (
    <Page title="Chợ Tốt Xe: Mua Bán Xe Cũ Mới Cập Nhật Tháng 06/24">
      <div className="home-page-wrapper">
        <div className="main-home">
          <div className="carousel">
            {" "}
            <div className="slider-container">
              <Slider {...settings}>
                <div>
                  <Image
                    src="https://xe.chotot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fadmincentre%2Fkse5ZpYzAD5yUQLTFqBrnfrWbRJGI4sHgUOuzmXhCB0%2Fpreset%3Araw%2Fplain%2F2490932ddae63ee1d9e379277ea9d703-2878830189101743888.jpg&w=2048&q=75"
                    width={936}
                    height={234}
                    alt=""
                    preview={false}
                  ></Image>
                </div>
                <div>
                  <Image
                    src="https://xe.chotot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fadmincentre%2FwBY8TV4NR-V6320tU4YVKGS4G6J7_ovvQqcr_ZmOmws%2Fpreset%3Araw%2Fplain%2F0d84fa84f65d45795b86085f59b02035-2878830158493155844.jpg&w=2048&q=75"
                    width={936}
                    height={234}
                    alt=""
                    preview={false}
                  ></Image>
                </div>{" "}
                <div>
                  <Image
                    src="https://xe.chotot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fadmincentre%2FROxhestq1B1z2OSAh6NLBfW_fNVqm-u-HGLagfM8z7M%2Fpreset%3Araw%2Fplain%2F6471f1d4e3c666b4633197170978e093-2872753108044212130.jpg&w=1920&q=75"
                    width={936}
                    height={234}
                    alt=""
                    preview={false}
                  ></Image>
                </div>{" "}
                <div>
                  <Image
                    src="https://xe.chotot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fadmincentre%2FImmRUTJ26oqo8yN2kz8FjKUoSfb_d2NmxhzOy_9FeOU%2Fpreset%3Araw%2Fplain%2F447c1beed59ca03d4eedf604d74dc97e-2871571811134406069.jpg&w=1920&q=75"
                    width={936}
                    height={234}
                    alt=""
                    preview={false}
                  ></Image>
                </div>{" "}
                <div>
                  <Image
                    src="https://xe.chotot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fadmincentre%2FHgWtHE8kBtYFUIMRWYhVFPlEtmEPrtHue_hkPfd8Lk4%2Fpreset%3Araw%2Fplain%2F61c5ef66ef3e671aa6e186e9c0df13a8-2877677430341038050.jpg&w=1920&q=75"
                    width={936}
                    height={234}
                    alt=""
                    preview={false}
                  ></Image>
                </div>{" "}
                <div>
                  <Image
                    src="https://xe.chotot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fadmincentre%2FRh44IItIwvyKxjJa5cANAThZQQPYgsOEhkrUfAzmoSs%2Fpreset%3Araw%2Fplain%2F25c9a689992d6303e6e57808ea3e0a5f-2864224101697359959.jpg&w=1920&q=75"
                    width={936}
                    height={234}
                    alt=""
                    preview={false}
                  ></Image>
                </div>{" "}
                <div>
                  <Image
                    src="https://xe.chotot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fadmincentre%2FMyWhgasP7Dbudz0sCiY0uxQMnanOq6_JABDgRgK5V9A%2Fpreset%3Araw%2Fplain%2F6b53c8f76b1b3e952a051ae46edd78ea-2878829785617486768.jpg&w=2048&q=75"
                    width={936}
                    height={234}
                    alt=""
                    preview={false}
                  ></Image>
                </div>
              </Slider>
            </div>
          </div>{" "}
          <div className="vehicle">
            <span className="title">Khám phá danh mục Xe cộ</span>
            <div className="slide">
              <div className="wrap-item">
                <div className="item">
                  <Link href="/mua-ban-oto">
                    <Image
                      src="https://static.chotot.com/storage/new-logos/VEH/2010.svg"
                      alt=""
                      width={48}
                      height={48}
                      preview={false}
                    ></Image>{" "}
                  </Link>
                </div>
                <span>Ô tô</span>
              </div>
              <div className="wrap-item">
                <div className="item">
                  <Image
                    src="https://static.chotot.com/storage/new-logos/VEH/2020.svg"
                    alt=""
                    width={48}
                    height={48}
                    preview={false}
                  ></Image>
                </div>{" "}
                <span>Xe máy</span>
              </div>
              <div className="wrap-item">
                <div className="item">
                  <Image
                    src="https://static.chotot.com/storage/new-logos/VEH/2050.svg"
                    alt=""
                    width={48}
                    height={48}
                    preview={false}
                  ></Image>
                </div>{" "}
                <span>Xe tải, xe ben</span>
              </div>
              <div className="wrap-item">
                <div className="item">
                  <Image
                    src="https://static.chotot.com/storage/new-logos/VEH/2090.svg"
                    alt=""
                    width={48}
                    height={48}
                    preview={false}
                  ></Image>
                </div>{" "}
                <span>Xe điện</span>
              </div>
              <div className="wrap-item">
                <div className="item">
                  <Image
                    src="https://static.chotot.com/storage/new-logos/VEH/2060.svg"
                    alt=""
                    width={48}
                    height={48}
                    preview={false}
                  ></Image>
                </div>{" "}
                <span>Xe đạp</span>
              </div>
              <div className="wrap-item">
                <div className="item">
                  <Image
                    src="https://static.chotot.com/storage/new-logos/VEH/2080.svg"
                    alt=""
                    width={48}
                    height={48}
                    preview={false}
                  ></Image>
                </div>{" "}
                <span>Phương tiện khác</span>
              </div>
              <div className="wrap-item">
                <div className="item">
                  <Image
                    src="https://static.chotot.com/storage/new-logos/VEH/2030.svg"
                    alt=""
                    width={48}
                    height={48}
                    preview={false}
                  ></Image>
                </div>
                <span>Phụ tùng xe</span>
              </div>
            </div>
          </div>
          <div className="recommend">
            {" "}
            <div className="top">
              <span>Tin đăng mới nhất</span>
              <Link href="/mua-ban-oto">
                <div className="see-all">
                  Xem tất cả <Image src="/icons/right_arrow_blue.svg" alt="" preview={false} width={15} height={15}></Image>
                </div>
              </Link>
            </div>
            <div className="slide-rec">
              <Slider {...setting2s}>
                {currentPosts?.latestPosts?.map((item: any, index: number) => {
                  return (
                    <Link key={index} href={`/${item?.post?.slug}/${item.postId}`}>
                      <div className="rec-item" style={{ width: 200 }}>
                        <div>
                          <Image src={item?.post?.image[0]?.img} alt="" preview={false} height={175} width={175}></Image>
                          <span className="title-rec">{limitTextTitle(item?.post?.title)}</span>
                          <div className="infor-rec">
                            <span>
                              {limitTextDescription(
                                `${item?.post?.dateCar} - ${item?.post?.km === 0 ? "" : `${formatNumberWithCommas(item?.post?.km)} km`} ${
                                  item?.post?.activeButton
                                } - ${item?.post?.numberBox} `
                              )}
                            </span>
                          </div>
                          <span className="price">{formatNumberWithCommas(item?.post?.price)} đ</span>
                        </div>
                        <div className="bottom-rec">
                          <Image src="/icons/pro.svg" alt="" width={16} height={15}></Image>
                          <div className="ellipsis">
                            <div className="dot"></div>
                            <span>{timeAgo(item.date)}</span>
                            <div className="dot"></div>
                            <span>{item?.post?.districtValueName}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </Slider>
            </div>
          </div>
          <div className="intro">
            <span className="title">Chợ Tốt Xe - Chuyên trang mua bán xe trực tuyến hàng đầu Việt Nam</span>
            <div className={`text ${showMore ? "show-text" : ""}`}>
              <p>
                <span>
                  <span>
                    Chợ Tốt Xe ra mắt từ năm 2017, mang đến một kênh mua bán xe trực tuyến hiệu quả và dễ sử dụng cho cả người mua xe và
                    người bán xe. Hiện tại, Chợ Tốt Xe cũng là trang mua bán xe được yêu thích, giao dịch sôi động nhất hiện nay với 16
                    triệu lượt truy cập mỗi tháng. Với 40 nghìn tin đăng bán xe với đầy đủ thông tin, hình ảnh cùng giá cả rõ ràng, cụ thể,
                    bạn sẽ nhanh chóng tìm được chiếc xe phù hợp với ngân sách của mình.
                  </span>
                </span>
              </p>
              <p>
                <span>
                  <span>
                    Với điểm mạnh Dễ tìm - Dễ mua, Chợ Tốt Xe luôn cải thiện trải nghiệm cho người dùng với đầy đủ thông tin, quy trình đăng
                    bán đơn giản, nhanh chóng tìm được chiếc xe phù hợp. Đến với Chợ Tốt Xe, bạn sẽ dễ dàng thao tác để có thể{" "}
                    <a href="https://xe.chotot.com/mua-ban-xe" rel="noopener">
                      mua bán xe
                    </a>{" "}
                    thật hiệu quả theo yêu cầu của mình như theo khoảng giá xe, loại xe, hãng xe, tình trạng xe,...
                  </span>
                </span>
              </p>
              <ul>
                <li>
                  <span>
                    <span>
                      Xe máy: Tùy theo mục đích, nhu cầu sử dụng, bạn có thể chọn mua theo phân loại như&nbsp;xe số, xe tay ga, xe côn tay
                      hay xe moto phân khối lớn. Người cùng cũng có thể&nbsp;theo dung tích xe như xe gắn máy&nbsp;dưới 50cc, xe từ 100 -
                      175cc,...
                    </span>
                  </span>
                </li>
                <li>
                  <span>
                    <span>
                      Xe ô tô: Thị trường luôn bổ sung liên tục nhiều dòng xe ô tô mới để đáp ứng nhu cầu khách hàng ở nhiều phân khúc, vì
                      thế tin đăng xe ô tô mới và cũ ngày càng tăng trưởng về số lượng và chất lượng. Người dùng dễ dàng tìm thấy mẫu xe ưng
                      ý đến từ các hãng nổi tiếng như Toyota, Ford, Huyndai, Mazda, Honda, Mitsubishi, KIA, Suzuki,... Trong đó, các dòng xe
                      oto 4-5 chỗ hay 7-8&nbsp;chỗ luôn là những lựa chọn được quan tâm hàng đầu. Về phân loại, bên cạnh kiểu
                      dáng&nbsp;sedan, hatchback, xe bán tải phổ biến, các mẫu xe gầm cao như{" "}
                      <a href="https://xe.chotot.com/mua-ban-oto-suv-crossover-sdcy3" rel="noopener">
                        xe SUV
                      </a>
                      , CUV,{" "}
                      <a href="https://xe.chotot.com/mua-ban-oto-minivan-mpv-sdcy8" rel="noopener">
                        xe MPV
                      </a>{" "}
                      ngày càng thống trị thị trường ô tô Việt Nam. Ngoài lựa chọn mua xe máy xăng, máy dầu, việc&nbsp;
                      <a href="https://xe.chotot.com/mua-ban-oto-dien-sdfu4" rel="noopener">
                        mua ô&nbsp;tô điện
                      </a>
                      &nbsp;hay hybrid cũng là một xu hướng tiêu dùng nổi bật&nbsp;đang dần lên ngôi trong những năm gần đây.
                    </span>
                  </span>
                </li>
                <li>
                  <span>
                    <span>
                      Xe tải - xe ben: Hoạt động mua bán xe tải ngày càng phát triển rầm rộ, có thể kể đến các thương hiệu phổ biến như xe
                      tải Kia, xe tải Thaco, xe tải nhẹ Suzuki, xe ben Hyundai,...
                    </span>
                  </span>
                </li>
                <li>
                  <span>
                    <span>
                      Xe đạp: Hiện thị trường xe đạp tại Việt Nam đang hoạt động khá sôi nổi với 3 phân khúc chính: xe đạp thể thao, xe đạp
                      phổ thông, xe đạp trẻ em, cùng các tên tuổi xe đạp nổi tiếng như xe đạp Asama, Martin, xe đạp Giant, Jett, xe đạp
                      Phượng Hoàng,...
                    </span>
                  </span>
                </li>
                <li>
                  <span>
                    <span>
                      Xe điện: Bên cạnh xe đạp thì thị trường xe điện cũng được đẩy lên cao. Theo đó, các sản xuất không ngừng phát triển
                      thêm các dòng xe máy điện mới, cũng như là nâng cấp mẫu mã xe đạp điện để phục vụ theo nhu cầu ngày càng cao của thị
                      trường.
                    </span>
                  </span>
                </li>
                <li>
                  <span>
                    <span>
                      Phụ tùng - phụ kiện xe: Nhu cầu giao dịch mua bán phụ tùng của chủ xe ô tô, xe máy,...luôn ở mức cao để thay thế, tân
                      trang lại chiếc xe của mình. Bên cạnh đó, các phụ kiện ô tô, xe máy cũng được nhiều chủ sở hữu tìm kiếm để thể hiện cá
                      tính, sự trẻ trung và hiện đại của mình. Tùy theo sở thích, nhu cầu, bạn có thể lựa chọn các loại phụ kiện xe khác
                      nhau theo thiết kế, màu sắc, kiểu dáng, chất liệu,...
                    </span>
                  </span>
                </li>
                <li>
                  <span>
                    <span>
                      Xe chuyên dụng - xe cơ giới: Những loại xe đặc thù dùng cho những công việc, ngành nghề đặc biệt tuy không được sản
                      xuất đại trà và sử dụng rộng rãi nhưng thị trường mua bán loại xe này hiện nay cũng rất sôi động. Có thể kể đến một số
                      loại xe chuyên dụng như: Xe đầu kéo, xe đông lạnh, xe phun nước, xe bồn, xe chở rác,... hoặc xe cơ giới như: xe công
                      nông, xe máy cày, xe lu, xe xúc,...
                    </span>
                  </span>
                </li>
                <li>
                  <span>
                    <span>
                      Xe khách - xe buýt: Nắm bắt nhu cầu vận tải hành khách đang phát triển, các hãng xe cả trong và ngoài nước không ngừng
                      mở rộng danh mục sản phẩm của mình. Có thể kể đến những thương hiệu nổi tiếng như: Samco, Transinco, Thaco, Hyundai,
                      Mercedes - Benz, Ford,... đang chia nhau ở thị phần xe 16 chỗ, xe khách 29 chỗ, xe 36 chỗ, xe khách 45 chỗ,...
                    </span>
                  </span>
                </li>
              </ul>
              <p>
                <span>
                  <span>
                    Nếu bạn đang cần&nbsp;tìm mua bán xe phù hợp với nhu cầu, hãy đến với Chợ Tốt Xe để tìm được xe giá tốt có thể chốt mua
                    nhanh hoặc có thêm những{" "}
                    <a href="https://xe.chotot.com/thong-tin" rel="noopener">
                      thông tin xe
                    </a>{" "}
                    để giúp mình có được sự lựa chọn hợp lý.
                  </span>
                </span>
              </p>
              <p>
                <span>
                  <span>
                    Hoặc nếu bạn đang sở hữu một chiếc xe đã qua sử dụng và cần bán lại, đừng ngần ngại đăng tin ngay. Hàng trăm nghìn khách
                    hàng đang chờ mua xế cưng của bạn đấy!
                  </span>
                </span>
              </p>
              <p>
                <span>
                  <span>Đừng ngần ngại đăng tin ngay hôm nay để có những trải nghiệm mua bán xe tuyệt vời trên Chợ Tốt Xe!</span>
                </span>
              </p>
            </div>
            <span className={`show-more`} onClick={handleShow}>
              Thu gọn
            </span>
          </div>
        </div>
      </div>
    </Page>
  );
};
export default HomePage;
