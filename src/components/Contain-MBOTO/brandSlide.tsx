import { Image } from "antd";
import Slider from "react-slick";

const BrandSlide = () => {
  function SampleNextArrow(props: any) {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <Image
          src="https://static.chotot.com/storage/chotot-icons/svg/next.svg"
          alt=""
          preview={false}
          width={28}
          height={28}
        ></Image>
      </div>
    );
  }

  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <Image
          src="https://static.chotot.com/storage/default/slide-prev.svg"
          alt=""
          preview={false}
          width={28}
          height={28}
        ></Image>
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
          <Image
            src="https://xe.chotot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fadmincentre%2F2010_toyota.png&w=256&q=90"
            width={48}
            height={48}
            alt=""
            preview={false}
          ></Image>
          <span>Toyota</span>
        </div>
        <div className="item-brand">
          <Image
            src="https://xe.chotot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fadmincentre%2F2010_ford.png&w=256&q=90"
            width={48}
            height={48}
            alt=""
            preview={false}
          ></Image>
          <span>Ford</span>
        </div>
        <div className="item-brand">
          <Image
            src="https://xe.chotot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fadmincentre%2F2010_mitsubishi.png&w=256&q=90"
            width={48}
            height={48}
            alt=""
            preview={false}
          ></Image>
          <span>Mitsubishi</span>
        </div>
        <div className="item-brand">
          <Image
            src="https://xe.chotot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fadmincentre%2F2010_hyundai.png&w=256&q=90"
            width={48}
            height={48}
            alt=""
            preview={false}
          ></Image>
          <span>Huyndai</span>
        </div>
        <div className="item-brand">
          <Image
            src="https://xe.chotot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fadmincentre%2F2010_honda.png&w=256&q=90"
            width={48}
            height={48}
            alt=""
            preview={false}
          ></Image>
          <span>Honda</span>
        </div>
        <div className="item-brand">
          <Image
            src="https://xe.chotot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fadmincentre%2F2010_mercedes.png&w=256&q=90"
            width={48}
            height={48}
            alt=""
            preview={false}
          ></Image>
          <span>Mercedes Benz</span>
        </div>
        <div className="item-brand">
          <Image
            src="https://xe.chotot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fadmincentre%2F2010_audi.png&w=256&q=90"
            width={48}
            height={48}
            alt=""
            preview={false}
          ></Image>
          <span>Audi</span>
        </div>{" "}
        <div className="item-brand">
          <Image
            src="https://xe.chotot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fadmincentre%2F2010_kia_1.png&w=256&q=90"
            width={48}
            height={48}
            alt=""
            preview={false}
          ></Image>
          <span>Kia</span>
        </div>{" "}
        <div className="item-brand">
          <Image
            src="https://xe.chotot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fadmincentre%2F2010_mazda.png&w=256&q=90"
            width={48}
            height={48}
            alt=""
            preview={false}
          ></Image>
          <span>Mazda</span>
        </div>{" "}
        <div className="item-brand">
          <Image
            src="https://xe.chotot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fadmincentre%2F2010_vinfast.png&w=256&q=90"
            width={48}
            height={48}
            alt=""
            preview={false}
          ></Image>
          <span>Vinfast</span>
        </div>{" "}
        <div className="item-brand">
          <Image
            src="https://xe.chotot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fadmincentre%2F2010_subaru.png&w=256&q=90"
            width={48}
            height={48}
            alt=""
            preview={false}
          ></Image>
          <span>Subaru</span>
        </div>
        <div className="item-brand">
          <Image
            src="https://static.chotot.com/storage/icons/logos/category/other.svg"
            width={48}
            height={48}
            alt=""
            preview={false}
          ></Image>
          <span>Xem thêm</span>
        </div>
      </Slider>
    </div>
  );
};
export default BrandSlide;
