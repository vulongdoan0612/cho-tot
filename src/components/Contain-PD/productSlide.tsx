import { Alert, Image, Skeleton } from "antd";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { AddFavouritePostIcon, AddedFavouritePostIcon, ArrowSlideNextIcon, ArrowSlidePrevIcon } from "../CustomIcons";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addFavPost, removeFavPost } from "@/services/favPost";

const ProductSlide = ({ post, checkFavPost, spin }: any) => {
  const sliderRef: any = useRef(null);
  const [alertShare, setAlertShare] = useState(false);
  const [hoveredImageSrc, setHoveredImageSrc] = useState("");
  const [active, setActive] = useState(1);
  const [hoveredImageSrc2, setHoveredImageSrc2] = useState("");
  const [active2, setActive2] = useState(1);
  const [fav, setFav] = useState(false);
  const [fav2, setFav2] = useState(false);
  const [author, setAuthor] = useState(false);

  useEffect(() => {
    if (checkFavPost.status) {
      setFav(true);
      setFav2(true);
    } else {
      setFav(false);
      setFav2(false);
    }
  }, [checkFavPost]);

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

  const settings: any = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: post?.post?.post?.image.length > 6 ? 6 : 3,
    className: "slider variable-width",

    slidesToScroll:
      post?.post?.post?.image?.length === 7
        ? 1
        : post?.post?.post?.image?.length === 8
        ? 2
        : post?.post?.post?.image?.length === 9
        ? 3
        : post?.post?.post?.image?.length === 10
        ? 4
        : post?.post?.post?.image?.length === 11
        ? 5
        : post?.post?.post?.image?.length === 12
        ? 6
        : post?.post?.post?.image?.length === 13
        ? 1
        : post?.post?.post?.image?.length === 14
        ? 2
        : post?.post?.post?.image?.length === 15
        ? 5
        : post?.post?.post?.image?.length === 16
        ? 4
        : post?.post?.post?.image?.length === 17
        ? 1
        : post?.post?.post?.image?.length === 18
        ? 4
        : post?.post?.post?.image?.length === 19
        ? 3
        : post?.post?.post?.image?.length === 20
        ? 6
        : 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const handleHoverImage = (src: string, index: number) => {
    setHoveredImageSrc(src);
    setActive(index);
  };

  const handleNextSlide = () => {
    setActive((prevActive) => {
      const newIndex = prevActive + 1 < 0 ? post?.post?.post?.image?.length + 1 : prevActive + 1;
      setHoveredImageSrc(post?.post?.post?.image[newIndex - 1]?.img);
      return newIndex;
    });
    if (active === 6) {
      sliderRef?.current?.slickNext();
    }
    if (active === 12) {
      sliderRef?.current?.slickNext();
    }
    if (active === 18) {
      sliderRef?.current?.slickNext();
    }
    if (active === post?.post?.post?.image?.length) {
      setActive(1);
      sliderRef?.current?.slickGoTo(0);
    }
  };

  const handlePrevSlide = () => {
    setActive((prevActive) => {
      const newIndex = prevActive - 1 < 0 ? post?.post?.post?.image?.length.length - 1 : prevActive - 1;
      setHoveredImageSrc(post?.post?.post?.image[newIndex - 1]?.img);
      return newIndex;
    });
    if (active === 7 || active === 13) {
      sliderRef?.current?.slickPrev();
    }
    if (active === 1) {
      setActive(post?.post?.post?.image?.length);
      setHoveredImageSrc(post?.post?.post?.image[post?.post?.post?.image?.length - 1]?.img);
      sliderRef.current.slickGoTo(post?.post?.post?.image?.length);
    }
  };

  const handleFav = async (postId: number) => {
    const token = localStorage.getItem("access_token");
    if (token !== null) {
      const updateField = {
        postId: postId,
      };
      await addFavPost(String(token), updateField);
      setAlertShare(true);
      setTimeout(() => {
        setAlertShare(false);
      }, 2000);
      setFav(true);
    } else {
      setAuthor(true);
      setTimeout(() => {
        setAuthor(false);
      }, 2000);
    }
  };

  const handleUnFav = async (postId: string) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const updateField = {
        postId: postId,
      };

      await removeFavPost(String(token), updateField);
    }
    setFav(false);
  };

  const handleHoverImage2 = (src: string, index: number) => {
    setHoveredImageSrc2(src);
    setActive2(index);
  };

  const handleNextSlide2 = () => {
    setActive2((prevActive) => {
      const newIndex = prevActive + 1 < 0 ? post?.post?.post?.image?.length + 1 : prevActive + 1;
      setHoveredImageSrc2(post?.post?.post?.image[newIndex - 1]?.img);
      return newIndex;
    });
    if (active2 === post?.post?.post?.image?.length) {
      setActive2(1);
    }
  };

  const handlePrevSlide2 = () => {
    setActive2((prevActive) => {
      const newIndex = prevActive - 1 < 0 ? post?.post?.post?.image?.length.length - 1 : prevActive - 1;
      setHoveredImageSrc2(post?.post?.post?.image[newIndex - 1]?.img);
      return newIndex;
    });
    if (active2 === 1) {
      setActive2(post?.post?.post?.image?.length);
      setHoveredImageSrc2(post?.post?.post?.image[post?.post?.post?.image?.length - 1]?.img);
    }
  };

  const handleFav2 = async (postId: number) => {
    const token = localStorage.getItem("access_token");
    if (token !== null) {
      const updateField = {
        postId: postId,
      };
      await addFavPost(String(token), updateField);
      setAlertShare(true);
      setTimeout(() => {
        setAlertShare(false);
      }, 2000);
      setFav2(true);
    } else {
      setAuthor(true);
      setTimeout(() => {
        setAuthor(false);
      }, 2000);
    }
  };

  const handleUnFav2 = async (postId: number) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const updateField = {
        postId: postId,
      };
      await removeFavPost(String(token), updateField);
    }
    setFav2(false);
  };

  return (
    <div className="slide-car">
      <div className="gallery">
        {spin ? (
          <Skeleton.Input style={{ height: "421px" }} block={true} active size="large"></Skeleton.Input>
        ) : (
          <>
            {" "}
            {post?.post?.post?.image?.length > 6 ? (
              <>
                {" "}
                <span className="count">
                  {active}/{post?.post?.post?.image?.length}
                </span>
                <SamplePrevArrow className="prev-icon" onClick={handleNextSlide} />{" "}
                <div className="add-fav">
                  {!fav && <AddFavouritePostIcon onClick={() => handleFav(post?.post?.postId)}></AddFavouritePostIcon>}
                  {fav && <AddedFavouritePostIcon onClick={() => handleUnFav(post?.post?.postId)} className="fav"></AddedFavouritePostIcon>}
                </div>
                <Image
                  className={`image-main-slide`}
                  src={hoveredImageSrc ? hoveredImageSrc : post?.post?.post?.image[0]?.img}
                  preview={false}
                  width={656}
                  height={421}
                  alt=""
                ></Image>
                <SampleNextArrow className="next-icon" onClick={handlePrevSlide} />
              </>
            ) : (
              <>
                {" "}
                <span className="count">
                  {active2}/{post?.post?.post?.image?.length}
                </span>
                <SamplePrevArrow className="prev-icon" onClick={handleNextSlide2} />{" "}
                <div className="add-fav">
                  {!fav2 && <AddFavouritePostIcon onClick={() => handleFav2(post?.post?.postId)}></AddFavouritePostIcon>}
                  {fav2 && (
                    <AddedFavouritePostIcon onClick={() => handleUnFav2(post?.post?.postId)} className="fav"></AddedFavouritePostIcon>
                  )}
                </div>
                <Image
                  className={`image-main-slide`}
                  src={hoveredImageSrc2 ? hoveredImageSrc2 : post?.post?.post?.image[0]?.img}
                  preview={false}
                  width={656}
                  height={421}
                  alt=""
                ></Image>
                <SampleNextArrow className="next-icon" onClick={handlePrevSlide2} />
              </>
            )}
          </>
        )}
      </div>
      {spin ? (
        <Skeleton.Input style={{ height: "106px" }} block={true} active size="large"></Skeleton.Input>
      ) : (
        <>
          {post?.post?.post?.image?.length <= 6 ? (
            <div className="slider-less">
              {post?.post?.post?.image.map((item: any, index: number) => {
                return (
                  <div className="slider-item" key={index}>
                    <Image
                      // style={{ width: 110 }}
                      key={index}
                      className={active2 === index + 1 ? "active" : ""}
                      preview={false}
                      src={item.img}
                      alt=""
                      width={106}
                      height={106}
                      onMouseEnter={() => handleHoverImage2(item.img, index + 1)}
                    ></Image>
                  </div>
                );
              })}
            </div>
          ) : (
            <Slider {...settings} className="slider" ref={sliderRef}>
              {post?.post?.post?.image.map((item: any, index: number) => {
                return (
                  <Image
                    key={index}
                    className={active === index + 1 ? "active" : ""}
                    preview={false}
                    src={item.img}
                    alt=""
                    width={106}
                    height={106}
                    onMouseEnter={() => handleHoverImage(item.img, index + 1)}
                  ></Image>
                );
              })}
            </Slider>
          )}
        </>
      )}
      <Alert message="Tin đã được đưa vào danh sách theo dõi" type="success" className={alertShare ? "show-alert" : ""} />
      <Alert message="Bạn cần phải đăng nhập để thêm vào danh sách yêu thích!" type="success" className={author ? "show-alert" : ""} />
    </div>
  );
};
export default ProductSlide;
