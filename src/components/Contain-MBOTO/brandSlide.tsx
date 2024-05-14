import { Image } from "antd";
import Slider from "react-slick";

const BrandSlide = () => {
  function SampleNextArrow(props: any) {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <Image src="/icons/next.svg" alt="" preview={false} width={28} height={28}></Image>
      </div>
    );
  }

  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <Image src="/icons/slide-prev.svg" alt="" preview={false} width={28} height={28}></Image>
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="brand">
      <Slider {...settings}>
        <div className="item-brand">
          <Image src="/images/2010_toyota.png" width={48} height={48} alt="" preview={false}></Image>
          <span>Toyota</span>
        </div>
        <div className="item-brand">
          <Image src="/images/2010_ford.png" width={48} height={48} alt="" preview={false}></Image>
          <span>Ford</span>
        </div>
        <div className="item-brand">
          <Image src="/images/2010_mitsubishi.png" width={48} height={48} alt="" preview={false}></Image>
          <span>Mitsubishi</span>
        </div>
        <div className="item-brand">
          <Image src="/images/2010_hyundai.png" width={48} height={48} alt="" preview={false}></Image>
          <span>Huyndai</span>
        </div>
        <div className="item-brand">
          <Image src="/images/2010_honda.png" width={48} height={48} alt="" preview={false}></Image>
          <span>Honda</span>
        </div>
        <div className="item-brand">
          <Image src="/images/2010_mercedes.png" width={48} height={48} alt="" preview={false}></Image>
          <span>Mercedes Benz</span>
        </div>
        <div className="item-brand">
          <Image src="/images/2010_audi.png" width={48} height={48} alt="" preview={false}></Image>
          <span>Audi</span>
        </div>{" "}
        <div className="item-brand">
          <Image src="/images/2010_kia_1.png" width={48} height={48} alt="" preview={false}></Image>
          <span>Kia</span>
        </div>{" "}
        <div className="item-brand">
          <Image src="/images/2010_mazda.png" width={48} height={48} alt="" preview={false}></Image>
          <span>Mazda</span>
        </div>{" "}
        <div className="item-brand">
          <Image src="/images/2010_vinfast.png" width={48} height={48} alt="" preview={false}></Image>
          <span>Vinfast</span>
        </div>{" "}
        <div className="item-brand">
          <Image src="/images/2010_subaru.png" width={48} height={48} alt="" preview={false}></Image>
          <span>Subaru</span>
        </div>
        <div className="item-brand">
          <Image src="/icons/other.svg" width={48} height={48} alt="" preview={false}></Image>
          <span>Xem thêm</span>
        </div>
      </Slider>
    </div>
  );
};
export default BrandSlide;
