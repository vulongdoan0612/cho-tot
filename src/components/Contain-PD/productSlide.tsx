import { Alert, Image, Skeleton } from "antd";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { AddFavouritePostIcon, AddedFavouritePostIcon, ArrowSlideNextIcon, ArrowSlidePrevIcon } from "../CustomIcons";
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
  const [currentSlideNumber, setCurrentSlideNumber] = useState(0);

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
    speed: 100,
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
        ? 6
        : post?.post?.post?.image?.length === 14
        ? 6
        : post?.post?.post?.image?.length === 15
        ? 6
        : post?.post?.post?.image?.length === 16
        ? 6
        : post?.post?.post?.image?.length === 17
        ? 6
        : post?.post?.post?.image?.length === 18
        ? 6
        : post?.post?.post?.image?.length === 19
        ? 6
        : post?.post?.post?.image?.length === 20
        ? 6
        : 2,
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
    if (post?.post?.post?.image?.length === 7) {
      if (active === 6) {
        sliderRef?.current?.slickNext();
      }
    } 
    if (post?.post?.post?.image?.length === 8) {
      if (active === 6) {
        sliderRef?.current?.slickNext();
      }
    } 
    if (post?.post?.post?.image?.length === 9) {
      if (active === 6) {
        sliderRef?.current?.slickNext();
      }
    } 
    if (post?.post?.post?.image?.length === 10) {
      if (active === 6) {
        sliderRef?.current?.slickNext();
      }
    } 
    if (post?.post?.post?.image?.length === 11) {
      if (active === 6) {
        sliderRef?.current?.slickNext();
      }
    } 
    if (post?.post?.post?.image?.length === 12) {
      if (active === 6) {
        sliderRef?.current?.slickNext();
      }
    } 
    if (post?.post?.post?.image?.length === 13) {
      if (active === 6) {
        sliderRef?.current?.slickNext();
      }
      if (active === 12) {
        sliderRef?.current?.slickNext();
      }
    } 
    if (post?.post?.post?.image?.length === 14) {
      if (active === 6 || active === 12) {
        sliderRef?.current?.slickNext();
      }
      if (currentSlideNumber === 7) {
        if (active === 13) {
          sliderRef?.current?.slickNext();
        }
      }
    } 

    if (post?.post?.post?.image?.length === 15) {
      if (active === 6) {
        sliderRef?.current?.slickNext();
      }
      if (active === 12) {
        sliderRef?.current?.slickNext();
      }
    } 
    if (post?.post?.post?.image?.length === 16) {
      if (active === 6) {
        sliderRef?.current?.slickNext();
      }
      if (active === 12) {
        sliderRef?.current?.slickNext();
      }
    } 
    if (post?.post?.post?.image?.length === 17) {
      if (active === 6) {
        sliderRef?.current?.slickNext();
      }
      if (active === 12) {
        sliderRef?.current?.slickNext();
      }
    }
    if (post?.post?.post?.image?.length === 18) {
      if (active === 6) {
        sliderRef?.current?.slickNext();
      }
      if (active === 12) {
        sliderRef?.current?.slickNext();
      }
    }
    if (post?.post?.post?.image?.length === 19) {
      if (active === 6) {
        sliderRef?.current?.slickNext();
      }
      if (active === 12) {
        sliderRef?.current?.slickNext();
      }
      if (active === 17) {
        sliderRef?.current?.slickNext();
      }
    }
    if (post?.post?.post?.image?.length === 20) {
      if (active === 6) {
        sliderRef?.current?.slickNext();
      }
      if (active === 12) {
        sliderRef?.current?.slickNext();
      }
      if (active === 17) {
        sliderRef?.current?.slickNext();
      }
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

    if (post?.post?.post?.image?.length === 7) {
      if (active === 2) {
        sliderRef?.current?.slickGoTo(0);
      }
    } 
    if (post?.post?.post?.image?.length === 8) {
      if (active === 3) {
        sliderRef?.current?.slickGoTo(0);
      }
    } 
    if (post?.post?.post?.image?.length === 9) {
      if (active === 4) {
        sliderRef?.current?.slickGoTo(0);
      }
    } 
    if (post?.post?.post?.image?.length === 10) {
      if (active === 5) {
        sliderRef?.current?.slickGoTo(0);
      }
    } 
    if (post?.post?.post?.image?.length === 11) {
      if (active === 6) {
        sliderRef?.current?.slickGoTo(0);
      }
    } 
    if (post?.post?.post?.image?.length === 12) {
      if (active === 7) {
        sliderRef?.current?.slickGoTo(0);
      }
    } 
    if (post?.post?.post?.image?.length === 13) {
      if (currentSlideNumber === 7) {
        if (active === 8) {
          sliderRef?.current?.slickPrev();
        }
      }

      if (active === 7) {
        sliderRef?.current?.slickPrev();
      }
    }
    if (post?.post?.post?.image?.length === 14) {
      if (currentSlideNumber === 8) {
        if (active === 9) {
          sliderRef?.current?.slickPrev();
        }
      }
      if (active === 13) {
        sliderRef?.current?.slickGoTo(6);
      }

      if (active === 7) {
        sliderRef?.current?.slickPrev();
      }
    } 
    if (post?.post?.post?.image?.length === 15) {
      if (currentSlideNumber === 9) {
        if (active === 10) {
          sliderRef?.current?.slickPrev();
        }
      }
      if (active === 13) {
        sliderRef?.current?.slickGoTo(6);
      }
      if (active === 7) {
        sliderRef?.current?.slickPrev();
      }
    } 
    if (post?.post?.post?.image?.length === 16) {
      if (currentSlideNumber === 10) {
        if (active === 11) {
          sliderRef?.current?.slickPrev();
        }
      }
      if (active === 13) {
        sliderRef?.current?.slickGoTo(6);
      }
      if (active === 7) {
        sliderRef?.current?.slickPrev();
      }
    }
    if (post?.post?.post?.image?.length === 17) {
      if (active === 13) {
        sliderRef?.current?.slickGoTo(6);
      }
      if (active === 7) {
        sliderRef?.current?.slickPrev();
      }
      if (currentSlideNumber === 11) {
        if (active === 12) {
          sliderRef?.current?.slickPrev();
        }
      }
    }
    if (post?.post?.post?.image?.length === 18) {
      if (active === 13) {
        sliderRef?.current?.slickPrev();
      }
      if (active === 7) {
        sliderRef?.current?.slickPrev();
      }
    }
    if (post?.post?.post?.image?.length === 19) {
      if (currentSlideNumber === 13) {
        if (active === 14) {
          sliderRef?.current?.slickPrev();
        }
      }
      if (active === 13) {
        sliderRef?.current?.slickGoTo(6);
      }
      if (active === 7) {
        sliderRef?.current?.slickPrev();
      }
    }
    if (post?.post?.post?.image?.length === 20) {
      if (currentSlideNumber === 14) {
        if (active === 15) {
          sliderRef?.current?.slickPrev();
        }
      }
      if (active === 13) {
        sliderRef?.current?.slickGoTo(6);
      }
      if (active === 7) {
        sliderRef?.current?.slickPrev();
      }
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
                       style={{ width: 110 }}
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
            <Slider
              {...settings}
              className="slider"
              ref={sliderRef}
              beforeChange={(currentSlide: number, nextSlide: number) => setCurrentSlideNumber(nextSlide)}
            >
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
