import { Image } from "antd";

const Footer = () => {
  return (
    <footer>
      <div className="wrapper-footer">
        <div className="top">
          <div className="first">
            <div className="title">TẢI ỨNG DỤNG CHỢ TỐT</div>
            <div className="content">
              <div className="left">
                <Image src="/images/group-qr.webp" width={87} height={87} alt=""></Image>
              </div>
              <div className="right">
                <Image src="/icons/ios.svg" alt="" width={94} height={32}></Image>{" "}
                <Image src="/icons/android.svg" alt="" width={94} height={32}></Image>{" "}
                <Image src="/images/huawei_app_install.webp" alt="" width={94} height={32}></Image>
              </div>
            </div>
          </div>
          <div className="second">
            <div className="title">HỖ TRỢ KHÁCH HÀNG</div>
            <span className="text">Trung tâm trợ giúp</span>
            <span className="text">An toàn mua bán</span>
            <span className="text">Liên hệ hỗ trợ</span>
          </div>
          <div className="second">
            <div className="title">VỀ CHỢ TỐT</div>
            <span className="text">Giới thiệu</span>
            <span className="text">Quy chế hoạt động sàn</span>
            <span className="text">Chính sách bảo mật</span>
            <span className="text">Giải quyết tranh chấp</span>
            <span className="text">Tuyển dụng</span>
            <span className="text">Truyền thông</span>
            <span className="text">Blog</span>
          </div>
          <div className="last">
            <div className="title">LIÊN KẾT</div>
            <div className="logo">
              <Image src="/icons/facebook.svg" alt="" width={32} height={32} preview={false}></Image>{" "}
              <Image src="/icons/youtube.svg" alt="" width={32} height={32} preview={false}></Image>{" "}
              <Image src="/icons/linkedin.svg" alt="" width={32} height={32} preview={false}></Image>
            </div>
            <div className="title">CHỨNG NHẬN</div>
            <div className="logo">
              <Image src="/images/certificate.webp" alt="" width={130} height={40}></Image>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="bottom">
          CÔNG TY TNHH CHỢ TỐT - Người đại diện theo pháp luật: Nguyễn&nbsp;Trọng&nbsp;Tấn;
          GPDKKD:&nbsp;0312120782&nbsp;do&nbsp;sở&nbsp;KH&nbsp;&amp;&nbsp;ĐT&nbsp;TP.HCM&nbsp;cấp&nbsp;ngày&nbsp;11/01/2013;
          <br />
          GPMXH: 17/GP-BTTTT do Bộ Thông tin và Truyền thông cấp&nbsp;ngày&nbsp;15/01/2019 -
          Chịu&nbsp;trách&nbsp;nhiệm&nbsp;nội&nbsp;dung:&nbsp;Trần&nbsp;Minh&nbsp;Ngọc.&nbsp;
          <a
            target="_blank"
            href="https://trogiup.chotot.com/nguoi-ban/thoa-thuan-cung-cap-va-su-dung-dich-vu-mang-xa-hoi-chotot-com/"
            rel="noreferrer"
          >
            Chính&nbsp;sách&nbsp;sử&nbsp;dụng
          </a>
          <br />
          Địa chỉ: Tầng 18, Toà nhà UOA, Số 6 đường Tân Trào, Phường Tân Phú, Quận 7, Thành phố Hồ Chí Minh, Việt Nam;
          Email:&nbsp;trogiup@chotot.vn&nbsp;-&nbsp;Tổng&nbsp;đài&nbsp;CSKH:&nbsp;19003003&nbsp;(1.000đ/phút){" "}
        </div>
      </div>
    </footer>
  );
};
export default Footer;
