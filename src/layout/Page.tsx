import Header from "@/components/Header";
import React, { useMemo } from "react";
import { ToastContainer } from "react-toastify";

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
      </div>
    </>
  );
};
export default Page;
