import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NextAdapterPages from "next-query-params/pages";
import React, { useMemo } from "react";
import { ToastContainer } from "react-toastify";
import { QueryParamProvider } from "use-query-params";

interface PropsPage {
  loadingData?: boolean;
  children: React.ReactNode;
  style?: any;
}

const Page = (props: PropsPage) => {
  const { loadingData, children, style } = props;
  const page = useMemo(() => {
    return <>{children}</>;
  }, [loadingData, children]);
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
