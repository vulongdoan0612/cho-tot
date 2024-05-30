import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useMemo } from "react";
import { ToastContainer } from "react-toastify";

interface PropsPage {
  loadingData?: boolean;
  children: React.ReactNode;
  style?: any;
}

const Page = (props: PropsPage) => {
  const { children, style } = props;
  const page = useMemo(() => {
    return <>{children}</>;
  }, [children]);
  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="page" id="page" style={style}>
        <Header></Header>
        {page}
        <Footer></Footer>
      </div>
    </>
  );
};
export default Page;
